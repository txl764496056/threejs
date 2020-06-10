<template>
  <div ref="canvasContainer" class="three-container">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
// @ is an alias to /src
let THREE = null;
let OrbitControls = null;
export default {
  name: 'MultipleMaterials',
  components: {

  },
  data(){
    return {
      sceneW:0,
      sceneH:0,
      renderer:null,
      scene:null,
      camera:null,
      camera2:null,
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

    this.initOrbitControls();
    this.initHelper();

    this.addModel();

    this.animate();
    
  },
  methods:{
    // 初始化
    initRenderer(){
      let canvas = this.$refs.canvas;
      let container = this.$refs.canvasContainer;
      this.renderer = new THREE.WebGLRenderer({
        canvas:this.$refs.canvas,
        antilias:true //抗锯齿
      });
      let style = window.getComputedStyle(container);
      this.sceneW = parseInt(style.width); //保证是数值
      this.sceneH = parseInt(style.height); //保证是数值
      // 必须设置，否则会出现模型模糊
      this.renderer.setSize(this.sceneW,this.sceneH);
    },
    // 场景
    initScene(){
      this.scene = new THREE.Scene();
    },
    // 相机
    initCamera(){
      let aspect = this.sceneW/this.sceneH;
      // let aspect = 1;
      this.camera = new THREE.PerspectiveCamera(45,aspect,1,300);
      this.camera.position.z = 150;
      this.scene.add(this.camera);
      // 相机-辅助线
      let camera_helper = new THREE.CameraHelper( this.camera );
      this.scene.add(camera_helper);
    },
    // 添加模型
    addModel(){
      let geom = new THREE.BoxGeometry(40,40,40);
      let material1 = new THREE.MeshBasicMaterial({
        color:"#996600",
        transparent:true,
        opacity:0.6
      });
      let material2 = new THREE.MeshBasicMaterial({
        wireframe:true
      })
      // 两种材质，两个几何体，拼合
      let box1 = new THREE.Mesh(geom,material1);
      let box2 = new THREE.Mesh(geom,material2);
      this.scene.add(box1,box2);
    },
    // 渲染
    render(){
      this.renderer.render(this.scene,this.camera);
    },
    // 交互
    initOrbitControls(){
      this.orbit = new OrbitControls(this.camera,this.renderer.domElement);
    },
    // 辅助
    initHelper(){
      let helper = new THREE.AxesHelper(50);
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

<style lang="scss">

</style>
