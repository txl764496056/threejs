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
        name:"HemisphereLight",
        components:{
            UseExplain
        },
        data(){
            return{
                sceneH:0,
                sceneW:0,       
                txtList:[
                    "一个直接位于场景上方的光源，其颜色从天空颜色褪到地面颜色。",
                    "(color1,color2,intensity) color1:天空颜色，color2:地面颜色，intensity:光照强度",
                    "从上到下的颜色变化是HemisphereLight作用",
                    "高光和阴影时DirectionalLight作用",
                    "投影是开启投影且受DirectionalLight影响产生的",
                    "光源辅助线:绿色-户外光辅助线，红色-平行光辅助线"
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
                // 打开阴影
                this.renderer.shadowMap.enabled = true;
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
                let light1 = new THREE.HemisphereLight("#ffffff","#00ff55",0.8);
                this.scene.add(light1);
                // 光源辅助线
                let light1_helper = new THREE.HemisphereLightHelper(light1,200,"#00ff00");
                this.scene.add(light1_helper);

                let light2 = new THREE.DirectionalLight("#ffffff");
                light2.position.set(200,150,0);
                // 光源辅助线
                let light2_helper = new THREE.DirectionalLightHelper(light2,50,"#ff0000");
                this.scene.add(light2_helper);
                light2.castShadow = true;//产生阴影
                // 投影/阴影-这里是正交相加
                light2.shadow.camera.near = 10;
                light2.shadow.camera.far = 800;
                light2.shadow.camera.left = -500;
                light2.shadow.camera.right = 500;
                light2.shadow.camera.top = 500;
                light2.shadow.camera.bottom = -500;
                this.scene.add(light2);
            },
            // 添加模型
            addModel(){
                // 立方体
                let geom1 = new THREE.BoxGeometry(30,30,30);
                let material1 = new THREE.MeshStandardMaterial({color:"#ff00aa"});
                let box1 = new THREE.Mesh(geom1,material1);
                box1.castShadow = true;//产生阴影
                box1.position.set(-30,15,20);
                // 球体
                let geom3 = new THREE.SphereGeometry(30,30,30);
                let material3 = new THREE.MeshPhysicalMaterial({color:"#ff00bb"});
                let box3 = new THREE.Mesh(geom3,material3);
                box3.position.set(0,30,-30);
                box3.castShadow = true; //产生阴影
                this.scene.add(box1,box3);
                // 模拟地平面
                let geom2 = new THREE.PlaneGeometry(200,200);
                let material2 = new THREE.MeshStandardMaterial({color:"#dddddd"});
                let plane = new THREE.Mesh(geom2,material2);
                plane.rotation.x = -Math.PI*0.5;
                plane.receiveShadow = true;//接收阴影
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
                requestAnimationFrame(this.animate);
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>