/**
 * @author mrdoob / http://www.mrdoob.com
 */

import * as THREE from 'three';

function CopyShader() {

	var material = new THREE.ShaderMaterial( {

		uniforms: {
			sampler: { type: 't', value: null }
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
			'uniform sampler2D sampler;',

			'void main() {',
			'	gl_FragColor = texture2D( sampler, vUv );',
			'}'

		].join( '\n' )

	} );

	return {

		material: material,

		setTexture: function ( texture ) {

			material.uniforms.sampler.value = texture;

			return this;

		}

	}

};

export { CopyShader };