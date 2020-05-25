<template>
    <div ref="canvasContainer" class="three-container">
        <use-explain :list="txtList"></use-explain>
        <canvas ref="canvas" class="three-canvas"></canvas>
    </div>
</template>

<script>
import UseExplain from "@/components/UseExplain"
let THREE = null;
let OrbitControls = null;
    export default {
        name:"MeshLambertMaterial",
        components:{
            UseExplain
        },
        data(){
            return {
                renderer:null,
                scene:null,
                sceneW:100,
                sceneH:100,
                camera:null,
                orbit:null,
                txtList:[
                    "渲染器开启阴影渲染：renderer.shadowMapEnabled = true;",
                    "灯光需要开启“引起阴影”：light.castShadow = true;",
                    "物体需要开启“引起阴影”和“接收阴影”：mesh.castShadow = mesh.receiveShadow = true;"
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
            this.iniOrbitControls();
            this.initHelper();

            this.addModel();
            this.addPlane();

            this.animate();
            
        },
        methods:{
            // 初始化
            initRenderer(){
                let canvas = this.$refs.canvas;
                let container = this.$refs.canvasContainer;
                this.renderer = new THREE.WebGLRenderer({
                    canvas,
                    antilias:true //抗锯齿
                });
                //阴影设置-------------------------------1
                this.renderer.shadowMap.enabled = true; //告诉渲染器需要阴影效果
                this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 默认(THREE.PCFShadowMap)的没有设置的这个清晰
                
                let style = window.getComputedStyle(container);
                this.sceneW = parseInt(style.width);
                this.sceneH = parseInt(style.height);
                this.renderer.setSize(this.sceneW,this.sceneH);
            },
            // 场景
            initScene(){
                this.scene = new THREE.Scene();
            },
            // 相机
            initCamera(){
                this.camera = new THREE.PerspectiveCamera(45,this.sceneW/this.sceneH,1,300);
                this.camera.position.z = 180;
                this.camera.position.y = 60;
                this.scene.add(this.camera);
            },
            // 添加模型
            addModel(){
                // 立方体
                let box_geom = new THREE.BoxGeometry(16,16,16);
                let box_material = new THREE.MeshLambertMaterial({color:"#9933aa"});
                let box = new THREE.Mesh(box_geom,box_material);
                box.position.set(20,8,0);
                //阴影设置-------------------------------2-1
                box.castShadow = true;//告诉立方体投射阴影

                // 球体
                let sphere_geom = new THREE.SphereGeometry(10,20,20);
                let sphere_material = new THREE.MeshLambertMaterial({color:"#669933"});
                let sphere = new THREE.Mesh(sphere_geom,sphere_material);
                sphere.position.set(-20,20,0);
                //阴影设置-------------------------------2-1
                sphere.castShadow = true;
                
                // 加入场景
                this.scene.add(box,sphere);
            },
            // 添加底部平面
            addPlane(){
                let geom = new THREE.PlaneGeometry(120,120,20,20);//x轴方向宽，y轴方向宽，x轴方向分段数，y轴方向分段数
                let material = new THREE.MeshLambertMaterial({color:"#999999"});
                let plane = new THREE.Mesh(geom,material);
                plane.rotation.x = -0.5*Math.PI;
                //阴影设置-------------------------------3
                plane.receiveShadow = true;//高度底部平面接受阴影
                this.scene.add(plane);
            },
            // 光
            initLight(){
                let light1 = new THREE.DirectionalLight({color:"#ffffff"});
                //阴影设置-------------------------------4
                light1.castShadow = true;//开启平行光投射
                light1.position.set(120,200,0);
                // 这里camera是正交相机（进行正交投影），与光源在同一个位置
                light1.shadow.camera.near = 20;//产生阴影的最近距离
                light1.shadow.camera.far = 400;//产生阴影的最远距离
                light1.shadow.camera.left = -165;//产生阴影距离位置的最左边位置
                light1.shadow.camera.right = 165;//最右边
                light1.shadow.camera.top = 165;//最上边
                light1.shadow.camera.bottom = -165;//最下
               
               //这两个值决定使用多少像素生成阴影 默认512，数值越大与清晰，阴影周边硬度更大
                light1.shadow.mapSize.height = 2000;
                light1.shadow.mapSize.width = 2000;

                let light2 = new THREE.AmbientLight({color:"#ffffff"});
                light2.position.set(-150,-150,0);
                this.scene.add(light1,light2);
            },
            // 交互
            iniOrbitControls(){
                this.orbit = new OrbitControls(this.camera,this.renderer.domElement);
            },
            // 渲染
            render(){
                this.renderer.render(this.scene,this.camera);
            },
            // 辅助
            initHelper(){
                let helper = new THREE.AxesHelper(30);
                this.scene.add(helper);
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