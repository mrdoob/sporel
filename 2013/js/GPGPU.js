/**
 * @author mrdoob / http://www.mrdoob.com
 */

import * as THREE from 'three';

function GPGPU( renderer ) {

	var camera = new THREE.OrthographicCamera( - 0.5, 0.5, 0.5, - 0.5, 0, 1 );

	var scene = new THREE.Scene();

	var mesh = new THREE.Mesh( new THREE.PlaneGeometry( 1, 1 ) );
	scene.add( mesh );

	this.render = function ( _scene, _camera, target ) {

		renderer.setRenderTarget( target );
		renderer.render( _scene, _camera );
		renderer.setRenderTarget( null );

	};

	this.pass = function ( shader, target ) {

		mesh.material = shader.material;

		renderer.setRenderTarget( target );
		renderer.render( scene, camera );
		renderer.setRenderTarget( null );

	};

	this.out = function ( shader ) {

		mesh.material = shader.material;
		renderer.render( scene, camera );

	};

};

export { GPGPU };
