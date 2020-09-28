<template>
    <div class="three-container" ref="canvasContainer">
        <use-explain v-if="txtList.length>0" :list="txtList"></use-explain>
        <canvas ref="canvas"></canvas>
    </div>
</template>

<script>
import UseExplain from "@/components/UseExplain"
import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js';
let THREE = null;
let OrbitControls = null;
    export default {
        name:"CameraFlyControls",
        components:{
            UseExplain
        },
        data(){
            return {
                sceneH:0,
                sceneW:0,       
                txtList:[
                    "FlyControls ，update方法需要传入值才有效,(Clock对象里的delta)"
                ],
                renderer:null,
                camera:null,
                scene:null,
                flyControl:null,
                clock:null,

                orbit:null
            }
        },
        created(){
            THREE = this.$THREE;
            OrbitControls = this.$OrbitControls;
        },
        mounted(){
            this.initRenderer();
            this.initScene();
            this.initCamera();
            this.initLight();
            this.addModel();
            this.initOrbitControls();
            this.initHelper();
            this.animate();
        },
        methods:{
            // 初始化
            initRenderer(){
                let canvas = this.$refs.canvas;
                let container = this.$refs.canvasContainer;
                let style =  window.getComputedStyle(container);
                this.sceneH = parseInt(style.width);
                this.sceneW = parseInt(style.height);
                this.renderer = new THREE.WebGLRenderer({
                    canvas
                });
                this.renderer.shadowMap.enabled = true;
                // this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 默认(THREE.PCFShadowMap)的没有设置的这个清晰
                this.renderer.setSize(this.sceneW,this.sceneH);

            },
            // 场景
            initScene(){
                this.scene = new THREE.Scene();
            },  
            // 相机
            initCamera(){
                this.camera = new THREE.PerspectiveCamera(45,this.sceneW/this.sceneH,0.1,1000);
                this.camera.position.z = 500;
                this.camera.position.y = 50;
                this.scene.add(this.camera)                ;
            },
            // 灯光
            initLight(){
                let light1 = new THREE.DirectionalLight("#ffffff",0.8);
                light1.castShadow = true;
                light1.position.set(120,150,0);
                // 投影/阴影-这里是正交相加
                light1.shadow.camera.near = 10;
                light1.shadow.camera.far = 800;
                light1.shadow.camera.left = -500;
                light1.shadow.camera.right = 500;
                light1.shadow.camera.top = 500;
                light1.shadow.camera.bottom = -500;

                let light2 = new THREE.AmbientLight("#ffffff",0.6);
                light2.position.set(-80,300,0)
                this.scene.add(light1,light2);
            },
            // 添加模型
            addModel(){
                // 立方体
                let geom = new THREE.BoxGeometry(40,40,40);
                let material = new THREE.MeshPhongMaterial({color:"#ff00aa"});
                let box = new THREE.Mesh(geom,material);
                box.position.set(0,30,0);
                box.castShadow = true;//产生阴影
                this.scene.add(box);
                //地平面
                let geom2 = new THREE.PlaneGeometry(300,300,30,30);
                let material2 = new THREE.MeshLambertMaterial({color:"#bbbbbb"});
                let plane1 = new THREE.Mesh(geom2,material2);
                plane1.rotation.x = -0.3*Math.PI;
                plane1.receiveShadow = true;//接收阴影
                this.scene.add(plane1);
            },
            // 交互
            initOrbitControls(){
                // this.orbit = new OrbitControls(this.camera,this.renderer.domElement);
                this.flyControl = new FlyControls(this.camera,this.renderer.domElement);
                // this.flyControl.autoForward = true; //自动移动
                // this.flyControl.rollSpeed = Math.PI*0.2;
                this.flyControl.dragToLook = true; //手动拖动
            },
            // 辅助
            initHelper(){
                let helper = new THREE.AxesHelper(100);
                this.scene.add(helper);
            },
            // 渲染
            render(){
                this.renderer.render(this.scene,this.camera);
            },
            // 动画
            animate(){
                this.render();
                this.flyControl.update(1);
                // this.orbit.update();
                requestAnimationFrame(this.animate);
            }

        }
    }
</script>

<style lang="scss" scoped>

</style>