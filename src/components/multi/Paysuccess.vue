<template>
    <!-- 失败弹窗 -->
    <div class="suc-wrap" @click="add" v-if="show">
        <div class="suc-box">
            <img src="../../../static/img/warn/succ_up.png" alt="">
            <div class="suc-text">支付成功</div>
        </div>
        <div class="suc-shade"></div>
    </div>
</template>
<script>
export default {
    name:'PaySuccess',
    data(){
        return {
            show:true
        }
    },
    methods:{
        add(){
            // console.log(this.show);
            this.show = !this.show;
        }
    }
}
</script>
<style scoped>
.suc-wrap{
    position:fixed;
    top:0;
    right:0;
    bottom:0;
    left:0;
    z-index:19;
}
.suc-box{
    width:4rem;
    height:3.8rem;
    text-align:center;
    background: #ffffff;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    position:absolute;
    top:30%;
    left:calc(50% - 2rem);
    z-index:9;
}
.suc-box img{
    width:1.02rem;
    height:1.02rem;
    margin:1.06rem 0 .4rem;
}
.suc-text{
    width:3.1rem;
    font-size:.26rem;
    color:#333333;
    margin:0 auto;
}
.suc-shade{
    background:rgba(0, 0, 0, .3);
    position: absolute;;
    top:0;
    right:0;
    bottom:0;
    left:0;
    z-index:6;
}
</style>
