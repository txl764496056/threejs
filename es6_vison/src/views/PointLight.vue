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
        name:"PointLight",
        components:{
            UseExplain
        },
        data(){
            return {
                sceneH:0,
                sceneW:0,       
                txtList:[
                    "光源辅助线：绿色-点光源辅助线"
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
                this.renderer.shadowMap.enabled = true; //开启阴影
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
                let light1 = new THREE.PointLight("#ffffff");
                light1.position.set(60,120,30);
                light1.castShadow = true;
                this.scene.add(light1);

                // 光源辅助线
                let light1_helper = new THREE.PointLightHelper(light1,10,"#00ff00");
                this.scene.add(light1_helper);

                let light2 = new THREE.AmbientLight("#ffffff",0.3);
                light2.position.set(100,100,30);
                this.scene.add(light2);
            },
            // 添加模型
            addModel(){
                let geom1 = new THREE.BoxGeometry(30,30,30);
                let material = new THREE.MeshLambertMaterial({color:"#ee00aa"});
                let box1 = new THREE.Mesh(geom1,material);
                box1.position.set(0,15,0);
                box1.castShadow = true;
                this.scene.add(box1);

                // 地平面
                let geom2 = new THREE.PlaneGeometry(200,200);
                let material2 = new THREE.MeshLambertMaterial({color:"#aaa"});
                let plane = new THREE.Mesh(geom2,material2);
                plane.rotation.x = -Math.PI*0.5;
                plane.receiveShadow = true;
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
                this.orbit.update();
                requestAnimationFrame(this.animate);
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>