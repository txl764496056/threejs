<template>
    <div>
        <div class="viewer" ref="viewer"></div>
        <!-- <img src="img/room1.jpg" alt=""> -->
    </div>
</template>

<script>
import "photo-sphere-viewer/dist/photo-sphere-viewer.css"
import {Viewer,AbstractPlugin} from "photo-sphere-viewer"
// 插件引入
import MarkersPlugin from "photo-sphere-viewer/dist/plugins/markers"
import "photo-sphere-viewer/dist/plugins/markers.css"
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
                    plugins:[ 
                        [MarkersPlugin,{
                            markers:[{
                                    id:"mark1",
                                    content:"ddd",
                                    longitude: 5.69810,
                                    latitude: -0.13770,
                                    image: 'img/arrow.png',
                                    width:50,
                                    height:60,
                                    tooltip:"点击看效果"
                                },{
                                    // 具有自定义样式的html标记
                                    id: 'text',
                                    longitude: 0,
                                    latitude: 6,
                                    html: '<div class="marker-text" onclick="alert(\'你点中了html标记\')">我是html标记</div> ',
                                    style: {
                                        maxWidth: '100px',
                                        color: 'white',
                                        fontSize: '20px',
                                        fontFamily: 'Helvetica, sans-serif',
                                        textAlign: 'center'
                                    },
                                    // tooltip: {
                                    //     content: 'An HTML marker',
                                    //     position: 'right'
                                    // }
                                }]
                        }]
                    ]
                });
                
            }
        },
    }
</script>

<style lang="scss" scoped>
.viewer{
    width:600px;
    height:700px;
}
.marker-text{
    font-size:14px;
    background-color:rgba(0,0,0,0.5);
}
</style>