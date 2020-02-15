<template>
    <div class="hot-wrap">
        <img src="../../../static/image/index/hot.png" alt="火热">
        <span v-text="hot_title"></span>
        <img src="../../../static/image/index/hot.png" alt="火热">
    </div>
</template>
<script>
export default {
    name:'Hot',
    data(){
        return {
            // hot_title:'',
        }
    },
    props:['hot_title'],
}
</script>
<style lang="scss" scoped>
.hot-wrap{
    font-size:.3rem;
    color:#FFA303;
    text-align: center;
    line-height: .7rem;
    img{
        width: .21rem;
        height: .25rem;
    }
    span{
        display: inline-block;
        margin:0 .1rem;
    }
}
</style>
