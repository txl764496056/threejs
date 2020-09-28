<template>
    <div class="three-container" ref="canvasContainer">
        <use-explain v-if="txtList.length>0" :list="txtList"></use-explain>
        <canvas ref="canvas"></canvas>
    </div>
</template>

<script>
import UseExplain from "@/components/UseExplain"
import {RectAreaLightHelper} from "three/examples/jsm/helpers/RectAreaLightHelper.js"
let THREE = null;
let OrbitControls = null;
    export default {
        name:"RectAreaLight",
        components:{
            UseExplain
        },
        data(){
            return{
                sceneH:0,
                sceneW:0,       
                txtList:[
                    "注意地平面和物体的材质， MeshStandardMaterial 和 MeshPhysicalMaterial支持这种光源"
                ],
                renderer:null,
                camera:null,
                scene:null,
                rectlightHelper:null,

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
                let style = window.getComputedStyle(container);
                this.sceneW = parseInt(style.width);
                this.sceneH = parseInt(style.height);
                this.renderer = new THREE.WebGLRenderer({
                    canvas
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
                this.camera.position.z = 500;
                this.camera.position.x = -200;
                this.camera.position.y = 400;
                this.scene.add(this.camera);
            },
            // 灯光
            initLight(){
                let light1 = new THREE.AmbientLight("#ffffff",0.2);
                light1.position.set(100,100,0);

                let light2 = new THREE.RectAreaLight(0xffffff,5,60,60);
                this.rectlightHelper = new RectAreaLightHelper(light2);
                light2.add(this.rectlightHelper);
                light2.position.set(50,60,0);
                light2.rotation.y = Math.PI*0.5;
                this.scene.add(light1,light2);

            },
            // 添加模型
            addModel(){
                // 立方体
                let geom1 = new THREE.BoxGeometry(30,30,30);
                let material1 = new THREE.MeshStandardMaterial({color:"#ff00ff"});
                let box1 = new THREE.Mesh(geom1,material1);
                box1.position.set(-30,15,20);
                // 球体
                let geom3 = new THREE.SphereGeometry(15,30,30);
                let material3 = new THREE.MeshPhysicalMaterial({color:"#ff00ff"});
                let box3 = new THREE.Mesh(geom3,material3);
                box3.position.set(0,30,-30);
                this.scene.add(box1,box3);
                // 模拟地平面
                let geom2 = new THREE.PlaneGeometry(200,200);
                let material2 = new THREE.MeshStandardMaterial({color:"#dddddd"});
                let plane = new THREE.Mesh(geom2,material2);
                plane.rotation.x = -Math.PI*0.5;
                this.scene.add(plane);
            },
            // 辅助线
            initHelper(){
                let helper  = new THREE.AxesHelper(100);
                this.scene.add(helper);
            },
            // 控制器
            initOrbitControls(){
                this.orbit = new OrbitControls(this.camera,this.renderer.domElement);
            },
            // 渲染
            render(){
                this.renderer.render(this.scene,this.camera)
            },
            // 动画
            animate(){
                this.render();
                this.orbit.update();
                // this.rectlightHelper.update();
                requestAnimationFrame(this.animate);
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>