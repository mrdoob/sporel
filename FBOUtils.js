/**
 * @author zz85
 * @author mrdoob / http://www.mrdoob.com
 */

THREE.FBOUtils = function ( size, renderer, shader ) {

	// Init RTT stuff
	var gl = renderer.getContext();
		
	if ( ! gl.getExtension( "OES_texture_float" ) ) {

		alert( "No OES_texture_float support for float textures!" );
		return;

	}

	if ( gl.getParameter( gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS ) === 0 ) {

		alert( "No support for vertex shader textures!" );
		return;

	}

	var camera = new THREE.OrthographicCamera( - 0.5, 0.5, 0.5, - 0.5, 0, 1 );

	var cpu_gpu_material = new THREE.ShaderMaterial({

		uniforms: {
			tPositions: { type: "t", value: null }
		},
		vertexShader: [

			"varying vec2 vUv;",

			"void main() {",
			"	vUv = vec2(uv.x, 1.0 - uv.y);",
			"	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
			"} "

		].join("\n"),
		fragmentShader: [

			"varying vec2 vUv;",
			"uniform sampler2D tPositions;",

			"void main() {",
			"	vec4 pos = texture2D( tPositions, vUv );",
			"	gl_FragColor = pos;",
			"}"

		].join("\n")

	});

	var scene = new THREE.Scene();

	var mesh = new THREE.Mesh( new THREE.PlaneGeometry( 1, 1 ), shader );
	scene.add( mesh );

	this.renderToTexture = function ( texture, target ) {

		cpu_gpu_material.uniforms.tPositions.value = texture;
		renderer.render( scene, camera, target, false );

	};

	this.simulate = function ( target ) {

		renderer.render( scene, camera, target, false );

	};

};