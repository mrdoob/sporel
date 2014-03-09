/**
 * @author zz85
 * @author mrdoob / http://www.mrdoob.com
 */

THREE.FBOUtils = function ( renderer, shader ) {

	var camera = new THREE.OrthographicCamera( - 0.5, 0.5, 0.5, - 0.5, 0, 1 );

	var scene = new THREE.Scene();

	var mesh = new THREE.Mesh( new THREE.PlaneGeometry( 1, 1 ), shader );
	scene.add( mesh );

	this.simulate = function ( target ) {

		renderer.render( scene, camera, target, false );

	};

};