// Custom JS code can go here

// You can customize Reveal options:
Reveal.configure({
  controls: false,
  slideNumber: true,
  history: true
  });

var socket = io("http://presentazionealbertoschiabel.herokuapp.com");

socket.on('access', function(data){
	console.log("DATA: ", JSON.stringify(data, null, 2));

	if(data.access === true) {

		var ignore = false;

		$(window).on('hashchange', function(){

			// Notify other clients that we have navigated to a new slide
			// by sending the "slide-changed" message to socket.io

			if(ignore){
				return;
			}

			var hash = window.location.hash;
			console.log("HASHCHANGE", hash);

			socket.emit('slide-changed', {
				hash: hash
			});
		});

		socket.on('navigate', function(data){

			// Another device has changed its slide. Change it in this browser, too:
			window.location.hash = data.hash;
			console.log("NAVIGATE", window.location.hash);

			// The "ignore" variable stops the hash change from
			// triggering our hashchange handler above and sending
			// us into a never-ending cycle.

			ignore = true;

			setInterval(function () {
				ignore = false;
			},100);

		});

	} else {
		console.log("error");
	}
});