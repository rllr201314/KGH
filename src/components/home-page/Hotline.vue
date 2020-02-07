<template>
    <!-- 客服热线 -->
    <div class="hotline-content">
        <img class="hotline-img" src="../../../static/img/phone_ico.png" alt="">
        <span>客服热线：</span>
        <span class="hotline-num" v-text="tel" @click="telFn"></span>
    </div>
</template>

<script>
    export default {
        name: "Hotline",
        data(){
           return{
               tel:'029-61878888'
           }
        },
        methods:{
            telFn(){
                window.location.href = 'tel://' + this.tel;
            }
        }
    }
</script>

<style scoped>
    .hotline-content{
        text-align: center;
        line-height: .7rem;
        background: #FFFFFF;
        font-size: .26rem;
    }
    .hotline-num{
        color:#FFA303;
    }
    .hotline-content img{
        width:.23rem;
        height:.23rem;
        margin-right: .08rem;
        vertical-align: middle;
    }
</style>