<template>
  <div id="app">
    <div id="nav">
      <div class="item">
        <router-link to="/">多种材质（多个几何体拼合）</router-link>
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
  }
  a {
    color: #2c3e50;
    text-decoration: none;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.content{
  flex:1;
}
</style>
