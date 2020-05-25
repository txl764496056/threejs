<template>
    <div class="use-explain">
        <p class="txt">{{txt}}</p>
        <ul>
            <li class="txt"
             v-for="(item,index) in list"
             :index="index"
             :key="index" >{{item}}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        name:"UseExplain",
        props:{
            txt:{
                type:[String],
                default:''
            },
            list:{
                type:[Array],
                default(){
                    return [];
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.use-explain{
    position:absolute;
    left:0;
    top:0;
    bottom:auto;
    z-index:999;
    background-color:rgba(255,255,255,0.95);
}
.txt{
    color:#333;
    font-size:14px;
    margin:10px 0;
}
ul li{
    list-style: none;
    display:flex;
    &::before{
        content:attr(index);
        font-size:inherit;
        background-color:rgb(255, 123, 123);
        color:#ffffff;
        display:inline-block;
        padding:3px 6px;
        margin-right:10px;
        margin-bottom:auto;
    }
}
</style>