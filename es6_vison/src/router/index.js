import Vue from 'vue'
import VueRouter from 'vue-router'
import MultipleMaterials from '../views/MultipleMaterials.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'MultipleMaterials',
    component: MultipleMaterials
  },
  {
    path:"/line_dashed_material",
    name:"LineDashedMaterial",
    component:function(){
      return import('../views/LineDashedMaterial.vue');
    }
  },
  {
    path:"/mesh_lambert_material",
    name:"MeshLambertMaterial",
    component:function(){
      return import("../views/MeshLambertMaterial.vue");
    }
  },
  {
    path:"/panoramic_preview",
    name:"PanoramicPreview",
    component:function(){
      return import("../views/PanoramicPreview.vue");
    }
  },
  {
    path:"/lens_flare",
    name:"lens_flare",
    component:function(){
      return import("../views/LensFlare.vue")
    }
  },
  {
    path:"/camera_fly_controls",
    name:"camera_fly_controls",
    component:function(){
      return import("../views/CameraFlyControls.vue");
    }
  },
  {
    path:"/rect_area_light",
    name:"rect_area_light",
    component:function(){
      return import("../views/RectAreaLight.vue");
    }
  },
  {
    path:"/hemisphere_light",
    name:"hemisphere_light",
    component:function(){
      return import("../views/HemisphereLight.vue");
    }
  },
  {
    path:"/spot_light",
    name:"spot_light",
    component:function(){
      return import("../views/SpotLight.vue");
    }
  },
  {
    path:"/point_light",
    name:"point_light",
    component:function(){
      return import("../views/PointLight.vue");
    }
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: function () {
  //     return import(/* webpackChunkName: "about" */ '../views/About.vue')
  //   }
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
