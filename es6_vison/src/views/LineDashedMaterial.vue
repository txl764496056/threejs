<template>
    <div class="three-container" ref="canvasContainer">
        <canvas ref="canvas"></canvas>
    </div>
</template>

<script>
let THREE = null;
let OrbitControls = null;
    export default {
        name:"LineDashedMaterial",
        data(){
            return {
                renderer:null,
                scene:null,
                sceneH:100,
                sceneW:100,
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

            this.addModel();

            this.iniOrbitControls();

            this.animate();
        },
        methods:{
            // 初始化
            initRenderer(){
                let canvas = this.$refs.canvas;
                let container = this.$refs.canvasContainer;
                this.renderer = new THREE.WebGLRenderer({
                    canvas
                });
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
                this.camera.position.z = 150;
                this.scene.add(this.camera);
            },
            // 添加模型
            addModel(){
                let points = [
                    new THREE.Vector3(15,15,15),
                    new THREE.Vector3(-15,15,15),
                    new THREE.Vector3(-15,-15,15),
                    new THREE.Vector3(15,-15,15),
                    new THREE.Vector3(15,15,15)
                ]
                let  geom = new THREE.BufferGeometry().setFromPoints(points);
                // LineBasicMaterial -实线
                let material = new THREE.LineDashedMaterial({
                    scale:1,
                    linewidth:1,
                    dashSize:1,
                    gapSize:1,
                    color:"#ff0000"
                });
                let line = new THREE.Line(geom,material);
                line.computeLineDistances();//不可或缺的，若无，则线段不能显示为虚线
                this.scene.add(line);
            },
            // 渲染
            render(){
                this.renderer.render(this.scene,this.camera);
            },
            // 交互
            iniOrbitControls(){
                this.orbit = new OrbitControls(this.camera,this.renderer.domElement);
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