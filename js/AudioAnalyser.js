var AudioAnalyser = function ( element ) {

	var AudioContext = window.AudioContext || window.webkitAudioContext;
	var context = new AudioContext();

	var analyser = context.createAnalyser();
	analyser.fftSize = 512;
	analyser.connect( context.destination );

	var gain = context.createGain();
	gain.gain.value = 10;
	gain.connect( analyser );

	var source = context.createMediaElementSource( element );
	source.connect( gain );

	//

	var frequencyData = new Uint8Array( analyser.frequencyBinCount );

	return {

		getFrequency: function () {

			return frequencyData;

		},
		update: function () {

			analyser.getByteFrequencyData( frequencyData );

		}

	};

};
