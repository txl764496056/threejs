const canvas = document.querySelector("#test");
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(900,900)

/* 相机 */
const fov = 60;
const near = 1;
const far = 7;
const aspect = 1;
const camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
camera.position.z = 5;

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1,1,1);

function createBox(geometry,color,angle,x){
    const material = new THREE.MeshPhongMaterial({color});
    const box = new THREE.Mesh(geometry,material);
    box.rotation.y = angle;
    box.rotation.x = angle;
    box.position.x = x;
    scene.add(box);
    return box;
}

let box_arr = [
    createBox(geometry,"#ff0000",0.3,-1.5),
    createBox(geometry,"#00ff00",0.3,0),
    createBox(geometry,"#0000ff",0.3,1.5)
];

/* 光照 */
const light = new THREE.DirectionalLight({color:"#ffffff",intensity:1});
light.position.set(-6,2,6);
scene.add(light);

/* 渲染 */
// renderer.render(scene,camera);

function render(){

    for(let i=0;i<box_arr.length;i++){
        box_arr[i].rotation.x += 0.02;
        box_arr[i].rotation.y += 0.02;
    }

    renderer.render(scene,camera);
    requestAnimationFrame(render);
}

requestAnimationFrame(render);