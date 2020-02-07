<template>
    <div class="loading-wrap">
        <div class="loading-box">
            <img src="../../../static/img/loading.gif" alt="">
        </div>
    </div>    
</template>
<script>
export default {
    name:"Loading",
}
</script>
<style scoped>
.loading-wrap{
    position:fixed;
    top:0;right:0;bottom:0;left:0;
    background:rgba(0,0,0,0.3);
}
.loading-box{
    width:3.34rem;
    height:3.34rem;
    position:fixed;
    top:calc(50% - 1.67rem);
    left:calc(50% - 1.67rem);
    border-radius: 10px;
}

.loading-box img{
    width:3.34rem;
    height:3.34rem;
}
</style>
