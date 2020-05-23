<template>
  <div id="app">
    <div id="nav">
      <div class="item">
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
          <b style="display:block;">未完成</b>
        </router-link>
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
  text-align: center;
  color: #2c3e50;
  display:flex;
}

#nav,.content{
  height:100vh;
  overflow-y:scroll;
}

#nav {
  width:300px;
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
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.content{
  flex:1;
}

// 画布
.three-canvas{
  height:100%;
  width:100%;
}
</style>
