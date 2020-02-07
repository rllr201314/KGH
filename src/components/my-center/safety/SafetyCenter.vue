<template>
    <!-- 安全中心 -->
    <div class="wrap">
        <Header v-bind:head_data="comData.head_data"></Header>
        <div class="pact-content">
            <div class="pact-cell">
                <div class="pact-strip">
                    <div class="left-strip">
                        <span>安全手机</span>
                    </div>
                    <div class="right-strip">
                        <span v-text="mobile"></span>
                    </div>
                </div>
                <div class="pact-strip">
                    <div class="left-strip">
                        <span>交易密码</span><span class="red-color dominant-color">（保护您的账户资产安全）</span>
                    </div>
                    <div class="right-strip" @click="setPassword">
                        <span class="red-border dominant-color" v-if="security == 1">修改</span>
                        <span class="red-border dominant-color" v-else>未设置</span>
                    </div>
                </div>
                <div class="pact-strip" v-if="false">
                    <div class="left-strip">
                        <span>绑定微信</span>
                    </div>
                    <div class="right-strip">
                        <span  class="red-border dominant-color">前往绑定</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
export default {
    name: "Safety_Center",
    components: {
        Header
    },
    data() {
        return {
            comData: {
                head_data: {
                    show_type: 2,
                    tit_text: '安全认证',
                    right_icon: 2,
                    showBack: false,
                    showLogo: 2, //显示头部title文字
                    showShare: 3, //1搜索2分享3菜单
                    showBg: true, //是否显示背景
                }
            },
            info:null,
            mobile:null,
            security:null,
        };
    },
    methods:{
        setPassword(){
            var that = this;
            if(that.info.is_identify == 1){
                // 设置密码
                that.$router.push({name:'Set_Password',query:{type:that.info.identify_method,isset:that.info.is_security}})
            }else{
                that.$router.push({name:'UserAuthentication',query:{type:that.info.is_identify,status:1}})
            }
        },
        getData(){
            var that = this;
            that.$axios.post(process.env.API_HOST+'securityInfo').then((res)=>{
                if(res.status == 200){
                    if(res.data.code == 200){
                        that.info = res.data.data;
                        that.mobile = res.data.data.mobile;
                        that.security = res.data.data.is_security;
                    }
                }
            }).catch((err)=>{
                console.log(err);
            })
        }
    },
    mounted(){
        this.getData();
        // this.is_identify = this.$route.query.type;
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
    color:#333333;
    font-size:.24rem;
}
.right-strip img {
    width: 0.13rem;
    height: 0.24rem;
}
.gray-color{
    color:#999999;
}
.red-border{
    text-decoration: underline;
}
</style>
