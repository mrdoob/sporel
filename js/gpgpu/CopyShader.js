/**
 * @author mrdoob / http://www.mrdoob.com
 */

GPGPU.CopyShader = function () {

	var material = new THREE.ShaderMaterial( {

		uniforms: {
			texture: { type: 't', value: null }
		},
		vertexShader: [

			'varying vec2 vUv;',

			'void main() {',
			'	vUv = uv;',
			'	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
			'} '

		].join( '\n' ),
		fragmentShader: [

			'varying vec2 vUv;',
			'uniform sampler2D texture;',

			'void main() {',
			'	gl_FragColor = texture2D( texture, vUv );',
			'}'

		].join( '\n' )

	} );

	return {

		material: material,

		setTexture: function ( texture ) {

			material.uniforms.texture.value = texture;

			return this;

		}

	}

};