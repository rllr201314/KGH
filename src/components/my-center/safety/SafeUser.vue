<template>
    <!-- 安全认证之手机 -->
    <div class="wrap">
        <Header v-bind:head_data="comData.head_data"></Header>
        <div class="safe-authentic-tit">
            <img class="safe-status" src="../../../../static/img/my-center/safe/three.png" alt="">
        </div>
        <div class="safe-authentic-content">
            <div class="safe-cell">
                <div class="safe-cell-tit">
                    <img src="../../../../static/img/warn/failure.png" alt="">
                </div>
                <button @click="face">提交</button>
            </div>
        </div>
        <div class="statement">
            <span class="statement-tit">声明：</span>
            <span>本认证信息已接入公安系统，对于一切认证身份均具有法律效力</span>
        </div>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
export default {
    name: "SafeUser",
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
            }
        };
    },
    methods:{
        tokenUnableListener(obj){
            var that = this;
            that.$axios.post(process.env.API_HOST+"faceToken").then((res)=>{   //veriface_token
                if(res.status == 200){
                    if(res.data.code == 200){
                        if(res.data.data.token){
                            YHTVF.setToken(res.data.data.token);
                            //重新设置token，从请求头获取token
                            YHTVF.do(obj);//调用此方法，会继续执行上次未完成的操作o
                        }
                    }
                }
            }).catch((err)=>{
                console.log(err);
            })
        },
        face(){
            var that = this;
            var backURL='http://www.kangehao.com:8010/safe-success';//识别完成返回地址,请以“http”或者“https”协议开始
            YHTVF.queryVF(
                function successFun(url){
                    window.open(url);
                },
                function failFun(data){
                    console.log(data);
                },
                backURL
            );
        }
    },
    mounted(){
        YHTVF.init("AppID", this.tokenUnableListener);//必须初始化YHTVF
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
.safe-cell-tit{
    padding:.5rem 0 .3rem;
    text-align: center;
    color:#666666;
}
.safe-cell-tit img{
    width:1.51rem;
    height:1.44rem;
}



/*声明  */
.statement{
    font-size:.24rem;
    margin: .3rem auto 0;
    width: 6.5rem;
    color:#999999;
}
.statement-tit{
    color:#666666;
}
</style>
