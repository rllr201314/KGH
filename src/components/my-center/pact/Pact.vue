<template>
    <!-- 电子合同 -->
    <div class="wrap">
        <Header v-bind:head_data="comData.head_data"></Header>
        <div class="hint" v-if="is_identify==2">
            <img src="../../../../static/img/my-center/amend.png" alt="">
            <span>签署电子合同需要实名认证，请前往认证</span>
            <span class="btn" @click="goAuthentication">前往认证</span>
        </div>
        <div class="pact-content">
            <div class="pact-cell">
                <div class="pact-strip" @click="goSign('ture')">
                    <div class="left-strip">
                        <span>需要我签名</span>
                        <span class="gray-color">(<span v-text="sign_num"></span>)</span>
                    </div>
                    <div class="right-strip">
                        <img src="../../../../static/img/order/next.png" alt="">
                    </div>
                </div>
                <div class="pact-strip" @click="goSign('ed')">
                    <div class="left-strip">
                        <span>已签约合同</span>
                        <span class="gray-color">(<span v-text="end_num"></span>)</span>
                    </div>
                    <div class="right-strip">
                        <img src="../../../../static/img/order/next.png" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
export default {
    name: "Pact",
    components: {
        Header
    },
    data() {
        return {
            comData: {
                head_data: {
                    show_type:2,
                    right_icon:2,
                    tit_text: "电子合同",
                    showBack: false,
                    showLogo: 2, //显示头部title文字
                    showShare: 3, //1搜索2分享3菜单
                    showBg: true, //是否显示背景
                }
            },
            sign_num:0,
            end_num:0,
            is_identify:null,
        };
    },
    methods:{
        goSign(flag){
            var that = this;
            if(that.is_identify != 1){
                that.$router.push({name:'UserAuthentication',query:{type:that.is_identify}})
            }else{
                if(flag == 'ture'){
                    that.$router.push({name:'Signature'})
                }else{
                    that.$router.push({name:'Signed'})
                }
            }
        },
        getData(){
            var that = this;
            that.$axios.post(process.env.API_HOST+"contractInfo").then((res)=>{
                if(res.status == 200){
                    if(res.data.code == 200){
                        that.sign_num = res.data.data.sign_contract;
                        that.end_num = res.data.data.end_contract;
                        that.is_identify = res.data.data.is_identify;
                    }
                }
            }).catch((err)=>{
                console.log(err)
            })
        },
        goAuthentication(){
            // this.$router.push({path:'/safe-phone'});
            this.$router.push({path:'/safe-card'});
        }
    },
    mounted(){
        this.getData()
    }
};
</script>
<style scoped>
.pact-content {
    padding: 0.2rem;
}
.pact-cell {
    background: #ffffff;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    padding-left: 0.2rem;
}
.pact-strip {
    font-size: 0.26rem;
    line-height: 0.9rem;
    color:#666666;
    border-bottom: 0.01rem solid #e5e5e5;
    position: relative;
}
.right-strip {
    position:absolute;
    right:.2rem;
    top:0;
}
.right-strip img {
    width: 0.13rem;
    height: 0.24rem;
}
.gray-color{
    color:#999999;
}
.hint{
    color:#666666;
    font-size:.26rem;
    line-height: .8rem;
    padding:0 .35rem 0 .4rem;
    background: #f9e0b8;
}
.hint img{
    width:.24rem;
    height:.23rem;
    vertical-align: middle;
}
.hint span{
    vertical-align: middle;
}
.btn{
    font-size:.22rem;
    float:right;
    background:#fce7e6;
    /* height:.44rem; */
    line-height: .24rem;
    padding:.1rem;
    border:1px solid #999999;
    border-radius:.04rem;
    margin-top:.19rem;
}
</style>
