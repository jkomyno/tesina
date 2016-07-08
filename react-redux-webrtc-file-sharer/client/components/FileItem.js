import React, { Component } from 'react';
import _ from 'lodash';

class FileItem extends Component {

  // Helper Methods

  roundFileSize = (fileSize) => {
    let BYTEtoKB = Number(fileSize / 1024);
    let roundedSize = _.round(BYTEtoKB, 1);
    let withKB = roundedSize + ' KBs';
    return withKB;
  };

  getFileType = fileType => {
    let fileTypeArray =  _.split(fileType, '/', 2);
    return _.head(fileTypeArray);
  };

  getFileExtension = fileName => fileName.split('.').pop();

  render() {

    if(this.props.files.files){
      const files = this.props.files.files;
      const sortedFiles = _.orderBy(files, ['uploadedAt'], ['desc']);
      return (
        <div className="row">
          <h3>Download Files from other Peers:</h3>
          <hr/>
          <div className="col-md-6 col-sm-6 col-xs-6">
            {
              <ul>
                {
                  _.map(sortedFiles, (file, i) => (
                    <div key={i} className="file">
                      <li>
                        <p><b>File Name: </b>{file.fileName}</p>
                        <p><b>File Size: </b>{this.roundFileSize(file.fileSize)}</p>
                        <p><b>Uploaded By: </b>{file.uploadedBy}</p>
                        <p><b>Uploaded At: </b>{file.uploadedAt}</p>
                        <p><b>File Type: </b>{this.getFileType(file.fileType)}</p>
                        <p><b>File Extension: </b>{this.getFileExtension(file.fileName)}</p>
                        <p><b>Own File: </b>{file.ownFile ? "true" : "false"}</p>
                        {
                          !file.ownFile ?
                            <div>
                              <progress value={file.fileProgressValue} max={file.fileSize} />
                            </div> :
                              null
                        }
                        <br />
                        {
                          !file.ownFile ?
                          <button
                            className="btn"
                            onClick={this.props.onDownload.bind(
                              this,
                              file.seederSocketId,
                              this.props.mySocketId,
                              file.fileId,
                          )}>
                            Download
                          </button> :
                          <div>
                            {
                              file.fileLeechers ?
                                file.fileLeechers.map((leecher, i) => (
                                  <h5 key={i}>
                                    <span style={{ color: 'purple' }}>{leecher} </span>
                                    downloading/downloaded your file
                                  </h5>
                                )) :
                                null
                            }
                          </div>
                        }
                      </li>
                    </div>
                  ))
                }
              </ul>
            }
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <h4>
            There are no files here yet <span className="glyphicon glyphicon-floppy-save" />
          </h4>
        </div>
      )
    }
  }
}

export default FileItem;