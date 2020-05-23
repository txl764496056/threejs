<template>
    <canvas ref="canvas" class="three-canvas"></canvas>
</template>

<script>
let THREE = null;
let OrbitControls = null;
    export default {
        name:"MeshLambertMaterial",
        data(){
            return {
                renderer:null,
                scene:null,
                sceneW:100,
                sceneH:100,
                camera:null,
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
                this.renderer = new THREE.WebGLRenderer({
                    canvas
                });
                //阴影设置-------------------------------1
                this.renderer.shadowMap.enabled = true; //告诉渲染器需要阴影效果
                this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 默认(THREE.PCFShadowMap)的没有设置的这个清晰
                
                let style = window.getComputedStyle(canvas);
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
                let geom = new THREE.BoxGeometry(15,15,15);
                let material = new THREE.MeshLambertMaterial({color:"#9933aa"});
                let box = new THREE.Mesh(geom,material);
                box.position.set(20,15,0);
                //阴影设置-------------------------------2
                box.castShadow = true;//告诉立方体投射阴影
                this.scene.add(box);
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
                light1.position.set(150,150,0);
                light1.shadow.camera.near = 20;
                light1.shadow.camera.far = 300;
                // light1.shadow.camera.left = -50;
                // light1.shadow.camera.right = 50;
                light1.shadow.camera.top = -50;
                // 复制网上的代码，以下6行
                // light1.shadow.camera.near = 20; //产生阴影的最近距离
                // light1.shadow.camera.far = 200; //产生阴影的最远距离
                // light1.shadow.camera.left = -50; //产生阴影距离位置的最左边位置
                // light1.shadow.camera.right = 50; //最右边
                // light1.shadow.camera.top = 50; //最上边
                // light1.shadow.camera.bottom = -50; //最下

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