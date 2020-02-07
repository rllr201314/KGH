<template>
    <!-- 安全认证之手机 -->
    <div class="wrap">
        <Header v-bind:head_data="head_data"></Header>
        <div class="safe-authentic-tit">
            <img v-if="dent_type == 1"  class="safe-status" src="../../../../static/image/Next.jpg" alt="">
            <img v-else  class="safe-status" src="../../../../static/image/security.jpg" alt="">
        </div>
        <div class="safe-authentic-content">
            <div class="safe-cell success-content">
                <img v-if="dent_type == 1" src="../../../../static/img/my-center/safe/success.png" alt="">
                <img v-else src="../../../../static/img/warn/warn_ico.png" alt="">
                <div v-text="hint"></div>
                <div class="success" @click="goMycenter" v-text="btnText"></div>
            </div>
        </div>
        <Loading  v-if="showLoading"></Loading>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
import Loading from "@/components/multi/Loading";
export default {
    name: "SafeSuccess",
    components: {
        Header,
        Loading
    },
    data() {
        return {
            head_data: {
                show_type: 2,
                tit_text: '安全认证',
                right_icon: 2,
                showBack: false,
                showLogo: 2, //显示头部title文字
                showShare: 3, //1搜索2分享3菜单
                showBg: true, //是否显示背景
            },
            hint:'',
            dent_type:null,
            btnText:null,
            showLoading:true,
        }
    },
    methods:{
        goMycenter(){
            if(this.dent_type == 1){
                this.$router.push({name:'MyCenter'})
            }else{
                // this.$router.push({name:'SafePhone'});
                this.$router.push({path:'/safe-card'});
            }
        },
        getData(){
            var that = this;
            that.$axios.post(process.env.API_HOST+"isIdentify").then(res=>{
                if(res.status == 200){
                    if(res.data.code == 200){
                        that.showLoading = false;
                        that.dent_type = res.data.data.is_identify;
                        if(that.dent_type == 1){
                            that.hint = "恭喜您认证已通过";
                            that.btnText = "完成";
                        }else{
                            that.hint = "您的实名认证信息和人脸识别信息不符请重新认证";
                            that.btnText = "重新认证";
                        }
                    }
                }
            })
        }
    },
    mounted(){
        this.getData();
    }
};
</script>
<style scoped>
.safe-authentic-content {
    padding: 0.2rem;
}
.safe-cell {
    background: #ffffff;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    padding-left:.2rem;
    margin-bottom: 0.2rem;
}
.safe-authentic-tit {
    text-align: center;
    padding: 0.5rem 0 0.18rem;
}
.safe-status {
    width: 6.3rem;
    height: 1rem;
}
.success-content{
    text-align: center;
    font-size:.26rem;
    color:#666666;
    padding-bottom:2.8rem;
}
.success-content img{
    width:1.02rem;
    height: 1.02rem;
    margin:.9rem 0 .3rem;
}
.success{
    width:1.1rem;
    line-height:.44rem;
    background:#FE7649;
    font-size:.22rem;
    color:#ffffff;
    -webkit-border-radius: 0.04rem;
    -moz-border-radius: 0.04rem;
    border-radius: 0.04rem;
    -webkit-box-shadow: 0.02rem 0.02rem 0.09rem #FE7649;
    -moz-box-shadow: 0.02rem 0.02rem 0.09rem #FE7649;
    box-shadow: 0.02rem 0.02rem 0.09rem #FE7649;
    margin:.5rem auto 0;
}


</style>
