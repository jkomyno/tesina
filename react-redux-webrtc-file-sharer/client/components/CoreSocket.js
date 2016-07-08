import React, { Component } from 'react';
import User from './User';
import FileItem from './FileItem';
// http://www.ietf.org/rfc/rfc4122.txt
import uuid from 'uuid';
/*
 * I rely on the npm package "socket.io-p2p", which provides an abstraction
 * layer to keep this codebase as plain as possible. In turn, it uses as its
 * core the library @git https://github.com/feross/simple-peer, which relies
 * on Google's STUN server: 23.21.150.121, as you can see in the index.js file
 * inside that repository [row 140].
 */

import P2P from 'socket.io-p2p';
import io from 'socket.io-client';

// This library provides a huge number of useful functions
import _ from 'lodash';

class CoreSocket extends Component {


  componentDidMount() {
    let { onGetSocketId,
          setUserList,
          onNewUser,
          onDisconnectUser,
          onFileData,
          onPeerFile,
          onReceivedPeerFile,
          user,
          setUserEnterLeaveMessageAndColor,
          setP2pSocket,
          files
        } = this.props;

    const p2pServerIp = "http://localhost:3000";

    this.socket = io(p2pServerIp);
    this.opts = { peerOpts: { trickle: false }, autoUpgrade: false };
    this.p2psocket = new P2P(this.socket, this.opts);
    setP2pSocket(this.p2psocket);

    /*
     * Listeners: they're waiting p2pserver.js to emit certain events
     * through WebSockets.
     * Every action is defined in client/actions/actionCreators.js
     */
  
    // TODO: avoid spaghetti callback
    this.p2psocket.on('get-socket-id', (socketId) => {
      onGetSocketId(socketId);

      this.p2psocket.emit('new-user', {
        username: user,
        socketId: this.props.mySocketId
      })
    });

    this.p2psocket.on('user-list', (userList) => {
      setUserList(userList)
    });

    this.p2psocket.on('new-user', (data) => {
      const { mySocketId,
              setUserEnterLeaveMessageAndColor } = this.props;
      setUserList(data.userList);
      if (data.newUser && data.self !== mySocketId) {
        setUserEnterLeaveMessageAndColor(data.newUser + ' has entered the APP', 'green');
      }
    });

    this.p2psocket.on('disconnect-user', (data) => {
      const { setUserEnterLeaveMessageAndColor } = this.props;
      setUserList(data.userList);
      if (data.disconnectedUser) {
        setUserEnterLeaveMessageAndColor(data.disconnectedUser + ' has left the APP', 'red');
      }
    });
    
    this.p2psocket.on('file-data', (data) => {
      const files = this.props.files.files;
      const { mySocketId } = this.props;

      let isOwnFile = mySocketId === data.seederSocketId &&
            // at the moment, username is saved as an array, gotta check it out
            JSON.stringify(data.uploadedBy) === JSON.stringify(user) ? true : false;
      let fileProgressValue = 0;
      let chunkFileSize = 0;
      let fileBuffer = [],
      let fileLeechers = [];

      onFileData(files, data, isOwnFile, fileProgressValue, chunkFileSize, fileBuffer, fileLeecher);
    });

    this.p2psocket.on('peer-file', (data) => {
      const files = this.props.files.files;
      const fileObject = files.find(file => file.fileId === data.requestedFileId);

      const argFile = data.file;
      const argChunkFileSize = fileObject.chunkFileSize + data.file.byteLength;
      const argFileProgressValue = fileObject.fileProgressValue + data.file.byteLength;
      const filteredFiles = files.filter(file => file.fileId !== data.requestedFileId);

      onPeerFile(fileObject, argFile, argChunkFileSize, argFileProgressValue, filteredFiles);

      // on file received
      if (fileObject.chunkFileSize === fileObject.fileSize) {
        const blob = new window.Blob(fileObject.fileBuffer);
        // logic or (||) needed to check due to differences among the major browsers
        const urlCreator = window.URL || window.webkitURL;
        const fileUrl = urlCreator.createObjectURL(blob);
        const chunkFileSize = 0;
        const fileProgressValue = 0;
        const filteredFilesDef = files.filter(file => file.fileId !== fileObject.fileId);
        onReceivedPeerFile(fileObject, fileUrl, fileBuffer, chunkFileSize, fileProgressValue, filteredFilesDef);
        
        // Yes, we are clicking on a hidden <a> tag
        // which was created with new URL parametters above(fileURL)
        this.refs[data.requestedFileId].click();
      }
    });
    
    this.p2psocket.on('give-file-back', this.onGiveFileBack.bind(this));
  }

  onGiveFileBack = (data) => {
    const { onReturnFileBack } = this.props; 
    const files = this.props.files.files;
    console.log("onGiveFileBack");
    console.log("files", files);
    let requestedFileObject = files.find(file => file.fileId === data.requestedFileId);

    // File needs to be a Blob to be passed into reader
    const file = new window.Blob([requestedFileObject.file]);
    const fileSize = requestedFileObject.fileSize;

    // Seeder sends a file with chunks, not all file at once
    let chunkSize = 32384;
    let sliceFile = offset => {
      let reader = new window.FileReader();
      reader.onload = (() => evnt => {
        this.p2psocket.emit('peer-file', {
          file: evnt.target.result,
          fileLeecher: data.leecherSocketId,
          requestedFileId: data.requestedFileId,
        });

        /*
         * Recursively execute sliceFile() if file data is not already ended.
         * The use of window.setTimeout() is inspired by a sample found in the
         * webrtc/samples repository. You can find it here:
         * https://github.com/webrtc/samples/blob/gh-pages/src/content/datachannel/filetransfer/js/main.js
         */  

        if (file.size > offset + evnt.target.result.byteLength) {
          window.setTimeout(sliceFile, 0, offset + chunkSize);
        }
      })(file);

      reader.onerror = err => {
        console.error('Error while reading file', err);
      };

      var slice = file.slice(offset, offset + chunkSize);

      // Here we read our Blob as ArrayBuffer
      reader.readAsArrayBuffer(slice);
    };

    let leechers = requestedFileObject.fileLeechers;
    leechers.push(data.leecherUsername);

    const filteredFiles = files.filter(file => file.fileId !== requestedFileObject.fileId);
    onReturnFileBack(requestedFileObject, leechers, filteredFiles);
    sliceFile(0);   
  }

  onFileSubmit = (e) => {
    e.preventDefault();
    const { mySocketId,
            user,
            setFormErrorMessage } = this.props;

    const fileInput = this.refs.fileInput;

    if (fileInput.value !== '') {
      const file = fileInput.files[0];
      const fileId = uuid.v1();
      const fileName = file.name;
      const fileSize = file.size;
      const fileType = file.type;
      this.p2psocket.emit('file-data', {
        file,
        fileId,
        fileName,
        fileSize,
        fileType,
        seederSocketId: mySocketId,
        uploadedBy: user,
        uploadedAt: new Date().toLocaleTimeString('it-IT'),
      });

      setFormErrorMessage('');
      fileInput.value = '';
    } else {
      setFormErrorMessage('All fields are required!');
    }
  }

  onDownload(seederSocketId, leecherSocketId, requestedFileId){
    const files = this.props.files.files;
    console.log("FILES: ", JSON.stringify(this.props.files.files, null, 2));
    const { user,
            p2pSocket} = this.props;

    const leecherUsername = user;

    p2pSocket.emit('ask-for-file', {
      seederSocketId,
      leecherSocketId,
      leecherUsername,
      requestedFileId,
    });
    //const fileObject = files.find(file => file.fileId === requestedFileId);

    /*
     * If file was already download in a previous time, it's possible
     * to access the already created file URL (sort of caching).
     * Else, the p2psocket receives the data
     */ 
    /*if (fileObject.fileUrl) {
      this.refs[requestedFileId].click();
    } else {
      p2pSocket.emit('ask-for-file', {
        seederSocketId,
        leecherSocketId,
        leecherUsername,
        requestedFileId,
      });
    } */
  };

  renderErrorMessage() {
    const { formErrorMessage } = this.props;
    if(!!formErrorMessage){
      return (
        <div className="alert alert-danger">
          <h5 style={{ color: 'red' }}>{formErrorMessage}</h5>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <div className="row">
          <h1 className="title">WebTorrent</h1>
          <div className="col-md-6 col-sm-6 col-xs-6">
            <form onSubmit={this.onFileSubmit} ref="">
              <div className="form-group">
                <label>Select file to send: </label>
                <input type="file" id="fileName"
                  ref="fileInput" size="40" />
              </div>
              <input className="btn btn-default" type="submit" value="Send" />
            </form>
            {this.renderErrorMessage}
          </div>
          <User {...this.props} />
        </div>
        <FileItem {...this.props} onDownload={this.onDownload}/>
      </div>

    )
  }
}

export default CoreSocket;