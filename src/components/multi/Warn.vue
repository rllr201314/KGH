<template>
    <!-- 失败弹窗 -->
    <div class="warn-wrap">
        <div class="warn-box">
            <img src="../../../static/img/warn/warn_ico.png" alt="">
            <div class="wran-text">提交失败了！请您稍后重新提交哦</div>
        </div>
        <div class="warn-shade"></div>
    </div>
</template>
<script>
export default {
    name:'Warn',
}
</script>
<style scoped>
.warn-box{
    width:4rem;
    height:3.8rem;
    text-align:center;
    background: #ffffff;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    position:fixed;
    top:30%;
    left:calc(50% - 2rem);
    z-index:9;
}
.warn-box img{
    width:1.43rem;
    height:1.44rem;
    margin:.7rem 0 .4rem;
}
.wran-text{
    width:3.1rem;
    font-size:.26rem;
    color:#333333;
    margin:0 auto;
}
.warn-shade{
    background:rgba(0, 0, 0, .3);
    position:fixed;
    top:0;
    right:0;
    bottom:0;
    left:0;
    z-index:6;
}
</style>
