<template>
    <!-- 人工认证状态 -->
    <div class="wrap">
        <Header v-bind:head_data="head_data"></Header>
        <div class="safe-authentic-tit">
            <img class="safe-status" v-for="item in imgSrc" :src="item.key == status?item.url:''" alt="">
        </div>
        <div class="safe-con">
            <div class="safe-cell" v-if="status == 1?true:false">
                <img src="../../../../static/img/warn/await.png" alt="">
                <div>您的信息正在审核中</div>
                <div class="btn-all">
                    <div class="btn">审核失败</div>
                </div>
            </div>
            <div class="safe-cell" v-if="status == 2?true:false">
                <img src="../../../../static/img/warn/succ_up.png" alt="">
                <div>恭喜您认证已通过</div>
                <div class="btn-all">
                    <div class="btn">完成</div>
                </div>
            </div>
            <div class="safe-cell" v-if="status == 3?true:false">
                <img src="../../../../static/img/warn/warn_ico.png" alt="">
                <div>认证失败了！请您重新认证或者退出认证哦</div>
                <div><span class="black-color">原因：</span>照片不清晰</div>
                <div class="btn-all">
                    <div class="btn">重新认证</div>
                    <div class="btn">退出认证</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header"
export default {
    name:'SafeState',
    components:{
        Header,
    },
    data(){
        return{
            head_data:{
                show_type: 2,
                tit_text: '人工认证',
                right_icon: 2,
                showBack: false,
                showLogo: 2, //显示头部title文字
                showShare: 3, //1搜索2分享3菜单
                showBg: true, //是否显示背景
            },
            // imgSrc:{'state':'./static/img/my-center/safe/a-two.png','state':'./static/img/my-center/safe/a-three.png'}
            imgSrc:[{
                key:1,
                url:'./static/img/my-center/safe/a-two.png',
            },{
                key:2,
                url:'./static/img/my-center/safe/a-three.png'
            },{
                key:3,
                url:'./static/img/my-center/safe/a-two.png'
            }],
            status:2,
        }
    }
}
</script>
<style scoped>
.safe-authentic-tit {
    text-align: center;
    padding: 0.5rem 0 0.18rem;
}
.safe-status {
    width: 6.3rem;
    height: 1rem;
}
.safe-con{
    padding:.2rem;
}
.safe-cell{
    background: #ffffff;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    text-align:center;
    font-size:.26rem;
    color:#666666;
    padding-bottom:2.8rem;
}
.safe-cell img{
    width:1.02rem;
    height:1.02rem;
    margin:.9rem 0 .3rem;
}
.btn-all{
    display:flex;
    justify-content: center;
    margin-top:.5rem;
}
.btn{
    width:1.1rem;
    line-height:.44rem;
    color:#FFFFFF;
    font-size:.22rem;
    background:#FE7649;
    margin:0 .2rem;
    border-radius:.04rem; 
    -webkit-box-shadow: 1px 1px 9px #FE7649;
    -moz-box-shadow: 1px 1px 9px #FE7649;
    box-shadow: 1px 1px 9px #FE7649;
}
</style>
