<template>
  <div id="app">
    <div id="nav">
      <div class="item">
        <span class="num">??</span>
        <router-link to="/">多种材质（多个几何体拼合）</router-link>
      </div>
      <div class="item">
        <span class="num">40</span>
        <router-link to="/line_dashed_material">虚线材质 LineDashedMaterial</router-link>
      </div>
      <div class="item">
        <span class="num">36</span>
        <router-link to="/mesh_lambert_material">
          高级材质(哑光)MeshLambertMaterial
        </router-link>
      </div>
      <div class="item">
        <span class="num">31</span>
        <router-link to="/lens_flare">
          特殊光源镜头光晕 LensFlare
        </router-link>
      </div>
      <div class="item">
        <span class="num">30</span>
        <router-link to="/camera_fly_controls">
          飞行相机控件 FlyControls
        </router-link>
      </div>
      <div class="item">
        <span class="num">29</span>
        <router-link to="/rect_area_light">
          特殊光源模拟窗口入射光线 RectAreaLight
        </router-link>
      </div>
      <div class="item">
        <span class="num">28</span>
        <router-link to="/hemisphere_light">
          特殊光源户外光 HemiphereLight
        </router-link>
      </div>
      <div class="item">
        <span class="num">26</span>
        <router-link to="/spot_light">
          聚光灯 SpotLight
        </router-link>
      </div>
      <div class="item">
        <span class="num">25</span>
        <router-link to="/point_light">
          点光源 PointLight
        </router-link>
      </div>

      <div class="title">其他案例</div>
      <div class="item">
        <router-link to="/panoramic_preview">全景图360度预览</router-link>
      </div>
    </div>
    <div class="content">
      <router-view ref="three-canvas"/>
    </div>
  </div>
</template>

<script>

</script>

<style lang="scss">
*{
  margin:0;
  bottom:0;
  box-sizing:border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  color: #2c3e50;
  display:flex;
}

#nav,.content{
  height:100vh;
  overflow-y:scroll;
}

#nav {
  width:300px;
  .title{
    text-align:center;
    padding:10px;
    font-size:16px;
    letter-spacing: 1px;
    background-color:rgb(71, 168, 84);
    color:#fff;
  }
  .item{
    padding:10px;
    border-bottom:1px solid #ddd;
    font-size:14px;
    position:relative;
    .num{
      background-color:rgba(255, 140, 140,0.5);
      color:#e63939;
      font-size:14px;
      display:inline-block;
      left:10px;
      top:0;
      bottom:auto;
      padding:2px 5px 6px;
      border-radius:0 0 20px 20px;
      position:absolute;
    }
  }
  a {
    color: #2c3e50;
    text-decoration: none;
    font-size:14px;
    text-align: center;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.content{
  flex:1;
}

// 画布
.three-container{
  height:100%;
  width:100%;
  position:relative;
}

.marker-text{
    font-size:14px;
    background-color:rgba(0,0,0,0.5);
    padding:10px;
}
</style>
