var Audio = function ( url ) {

	var AudioContext = window.AudioContext || window.webkitAudioContext;
	var context = new AudioContext();

	var analyser = context.createAnalyser();
	analyser.fftSize = 512;
	analyser.connect( context.destination );

	var gain = context.createGain();
	gain.gain.value = 10;
	gain.connect( analyser );

	var onLoadCallback = function () {};

	var request = new XMLHttpRequest();
	request.open( 'GET', url, true );
	request.responseType = 'arraybuffer';
	request.onload = function () {

		context.decodeAudioData( request.response, function ( buffer ) {

			var source = context.createBufferSource();
			source.buffer = buffer;
			source.connect( gain );

			init();

			source.start( 0 );

			onLoadCallback();

		} );

	};
	request.send();

	//

	var frequencyData = [];

	var frequencyCanvas = document.createElement( 'canvas' );
	frequencyCanvas.style.position = 'absolute';
	frequencyCanvas.style.top = '0px';
	frequencyCanvas.style.left = '0px';

	var frequencyContext;

	var init = function () {

		frequencyData = new Uint8Array( analyser.frequencyBinCount );

		frequencyCanvas.width = frequencyData.length * 2;
		frequencyCanvas.height = 256;

		frequencyContext = frequencyCanvas.getContext( '2d' );

	};

	this.mark = 0;

	this.onLoad = function ( callback ) {

		onLoadCallback = callback;

	};

	this.getCanvas = function () {

		return frequencyCanvas;

	};

	this.getFrequency = function () {

		return frequencyData;

	};

	this.getCurrentTime = function () {

		return context.currentTime;

	};

	this.update = function () {

		// analyser.smoothingTimeConstant = 0.1;
		analyser.getByteFrequencyData( frequencyData );

		/*
		frequencyContext.clearRect( 0, 0, frequencyCanvas.width, frequencyCanvas.height );

		for ( var i = 0, l = frequencyData.length; i < l; i ++ ) {

			frequencyContext.fillStyle = i === this.mark ? 'white' : 'red';
			frequencyContext.fillRect( i * 2, 0, 2, frequencyData[ i ] );

		}
		*/

	};

};