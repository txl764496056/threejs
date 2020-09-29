<template>
    <div class="three-container" ref="canvasContainer">
        <use-explain v-if="txtList.length>0" :list="txtList"></use-explain>
        <canvas ref="canvas"></canvas>
    </div>
</template>

<script>
import UseExplain from "@/components/UseExplain"
let THREE = null;
let OrbitControls = null;
    export default {
        name:"SpotLight",
        components:{
            UseExplain
        },
        data(){
            return {
                sceneH:0,
                sceneW:0,       
                txtList:[
                    "光从一个单一的点向一个方向发射，沿着一个锥体，距离光越远，锥体的尺寸就越大。",
                    "光源辅助线：红色-聚光灯辅助线"
                ],
                renderer:null,
                camera:null,
                scene:null,

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
                this.sceneH = parseInt(style.height);
                this.sceneW = parseInt(style.width);
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
                this.camera.position.y = 300;
                this.scene.add(this.camera);
            },
            // 灯光
            initLight(){
                let light1 = new THREE.SpotLight({
                    color:"#ffffff",
                    angle:Math.PI*0.05
                });
                light1.position.set(60,70,0);
                this.scene.add(light1);
                // 光源辅助线
                let light1_helper = new THREE.SpotLightHelper(light1,"#ff0000");
                this.scene.add(light1_helper);

                let light2 = new THREE.AmbientLight("#ffffff",0.5);
                light2.position.set(200,200,0);
                this.scene.add(light2);
                // 光源辅助线
            },
            // 添加模型
            addModel(){
                let geom1 = new THREE.BoxGeometry(30,30,30);
                let material1 = new THREE.MeshLambertMaterial({color:"#9900aa"});
                let box1 = new THREE.Mesh(geom1,material1);
                box1.position.set(0,15,0);
                this.scene.add(box1);

                let geom2 = new THREE.PlaneGeometry(200,200,);
                let material2 = new THREE.MeshLambertMaterial({color:"#ffffff"});
                let plane = new THREE.Mesh(geom2,material2);
                plane.rotation.x = -Math.PI*0.5;
                this.scene.add(plane);
            },
            // 辅助
            initHelper(){
                let helper = new THREE.AxesHelper(100);
                this.scene.add(helper);
            },
            // 交互
            initOrbitControls(){
                this.orbit = new OrbitControls(this.camera,this.renderer.domElement);
            },
            // 渲染
            render(){
                this.renderer.render(this.scene,this.camera);
            },
            // 动画
            animate(){
                this.render();
                requestAnimationFrame(this.animate);
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>