<template>
    <div class="three-container" ref="canvasContainer">
        <use-explain :list="txtList"></use-explain>
        <canvas ref="canvas"></canvas>
    </div>
</template>

<script>
import UseExplain from "@/components/UseExplain"
import {Lensflare, LensflareElement} from 'three/examples/jsm/objects/Lensflare.js';
let THREE = null;
let OrbitControls = null;
    export default {
        name:"LensFlare",
        components:{
            UseExplain
        },
        data(){
            return {
                sceneH:0,
                sceneW:0,
                renderer:null,
                scene:null,
                camera:null,
                txtList:[
                    "Lensflare对象需要添加在光源上"
                ]
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
                let container = this.$refs.canvasContainer;
                let style = window.getComputedStyle(container);
                this.sceneH = parseInt(style.width);
                this.sceneW = parseInt(style.height);
                let canvas = this.$refs.canvas;
                this.renderer = new THREE.WebGLRenderer({
                    canvas,
                });
                this.renderer.setSize(this.sceneW,this.sceneH);
            },
            // 场景
            initScene(){
                this.scene = new THREE.Scene();
            },
            // 相机
            initCamera(){
                this.camera = new THREE.PerspectiveCamera(45,this.sceneW/this.sceneH,0.1,1000);
                this.camera.position.z = 400;
                this.camera.position.x = 400
                this.scene.add(this.camera);
            },
            // 灯光
            initLight(){
                let light1 = new THREE.AmbientLight("#ffffff");
                light1.position.set(0,180,0);
                let light2 = new THREE.DirectionalLight("#ffffff",0.5);
                light2.position.set(50,80,180);
                this.scene.add(light1,light2);

                let textureloader = new THREE.TextureLoader();
                let texture1 = textureloader.load("img/halo.png");

                // 添加光晕
                let lensFlare1 = new Lensflare();
                lensFlare1.addElement(new LensflareElement(texture1,256,0.5))
                light1.add(lensFlare1);
            },
            // 添加模型
            addModel(){
                let gemo = new THREE.BoxGeometry(50,50,50);
                let materail = new THREE.MeshPhongMaterial({color:"#339955"});
                let box = new THREE.Mesh(gemo,materail);
                this.scene.add(box);
            },
            // 交互
            initOrbitControls(){
                this.orbit = new OrbitControls(this.camera,this.renderer.domElement)
            },
            // 渲染
            render(){
                this.renderer.render(this.scene,this.camera)
            },
            // 辅助
            initHelper(){
                // 坐标
                let helper = new THREE.AxesHelper(100);
                this.scene.add(helper)
            },
            // 动画
            animate(){
                this.render();
                this.orbit.update();
                requestAnimationFrame(this.animate)
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>