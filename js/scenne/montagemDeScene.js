
function startGame(){
    let {scene, camera} = construirSceneInicial()
    let renderer = configureRender();
    const movement = new Movements(camera)

    animate(scene, camera, renderer)
}

function configureRender(){
    var renderer = new THREE.WebGLRenderer( {antialias:true} );
    canvas = renderer.domElement;
    canvasPosition = $(canvas).position();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    rayCaster = new THREE.Raycaster();
    return renderer
}

function construirSceneInicial(){
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0xe0f4ff);

    var camera = new THREE.PerspectiveCamera( 90, window.innerWidth/window.innerHeight, 0.1, 1000 );

    scene = montarPiso(new THREE.ImageUtils.loadTexture('../../sources/img/pisoTextura.jpg'), scene)
    return {scene, camera}
}
function montarPiso(pisoTexture, scene){
    pisoTexture.wrapS = pisoTexture.wrapT = THREE.RepeatWrapping; 
    pisoTexture.repeat.set( 20, 20 );
    var pisoMaterial = new THREE.MeshBasicMaterial( { map: pisoTexture, side: THREE.DoubleSide } );
    var pisoGeometry = new THREE.PlaneGeometry(20, 20, 20, 20);
    piso = new THREE.Mesh(pisoGeometry, pisoMaterial);

    piso.position.x = 2;
    piso.position.y = -0.5;
    piso.position.z = 3;
    piso.rotation.x  = -90 * Math.PI / 180;

    scene.add( piso );

    return scene;
}

function animate(scene, camera, renderer){
    requestAnimationFrame(()=>{animate(scene,camera,renderer)});

    renderer.render( scene, camera );
}

