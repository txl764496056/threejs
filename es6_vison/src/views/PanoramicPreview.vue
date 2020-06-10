<template>
    <div>
        <div class="viewer" ref="viewer"></div>
        <!-- <img src="img/room1.jpg" alt=""> -->
    </div>
</template>

<script>
import "photo-sphere-viewer/dist/photo-sphere-viewer.css"
import {Viewer,AbstractPlugin} from "photo-sphere-viewer"
    export default {
        name:"PanoramicPreview",
        data(){
            return {
                room:"img/ktv1.jpg"
            }
        },
        mounted(){
            this.$nextTick(()=>{
                this.createViewer();
            })
        },
        methods: {
            createViewer() {
                let container = this.$refs.viewer;
                const viewer = new Viewer({
                    container:container,
                    // panorama:"img/room1.jpg"
                    panorama:this.room,
                    // navbar:true, //是否显示导航条，默认值:true
                    // plugins:[{
                    //     "MarkersPlugin":{
                    //         markers:[{
                    //             id:"marker1",
                    //             img:"img/arrow.png"
                    //         }]
                    //     }
                    // }]
                }); 
                console.log(viewer.getPlugin)
                // console.log(new AbstractPlugin(viewer))
                // viewer.plugins.MarkersPlugin={
                //     markers:[{
                //         id:"text",
                //         longitude:0,
                //         latitude:0,
                //         html:"<b>marker</b>",
                //         style:{
                //             fontSize:"30px",
                //             color:"#ff0000"
                //         }
                //     }] 
                // } 
            }
        },
    }
</script>

<style lang="scss" scoped>
.viewer{
    width:600px;
    height:700px;
}
</style>