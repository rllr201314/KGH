<template>
    <div class="login-wrap wrap" @keydown.enter="enterFn">
        <div class="login-header">
            <!-- <Header v-bind:showTitle="comData.showTitle"></Header> -->
            <div class="login-title">
                <img src="../../../static/image/header/back.png" alt="" @click="gobake">
                <span>手机短信登录</span>
            </div>
        </div>
        <div class="login-content">
            <div class="login-cell">
                <div class="login-strip">
                    <img class="phone-ico" src="../../../static/img/my-center/phone_ico.png" alt="">
                    <input type="number" placeholder="请输入您的手机号" v-model="phone">
                </div>
                <div class="login-strip login-info">
                    <img class="pass-ico" src="../../../static/img/my-center/code_ico.png" alt="">
                    <input type="number" placeholder="请输入验证码" v-model="verify_code">
                    <span class="get-code" @click="getCode" v-text="hintCode"></span>
                </div>
            </div>
            <div class="login-bottom">
                <span class="phone-login" @click="goAccount">账号登录</span>
                <span class="go-register" @click="goRegister">立即注册</span>
            </div>
        </div>
        <div class="nextBtn" @click="loginFn">登录</div>
        <div class="login-type" v-if="false">
            <div class="login-type-title">
                <img src="../../../static/img/goods-details/left_solid.png" alt="">
                <span>第三方授权登录</span>
                <img src="../../../static/img/goods-details/right_solid.png" alt="">
            </div>
            <div class="login-type-content">
                <img class="wechat" src="../../../static/img/my-center/wx_ico.png" alt="" @click="wxLogin" v-if="iswechat || agent_type == 1">
                <img src="../../../static/img/my-center/qq_ico.png" alt="">
            </div>
        </div>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
export default {
    name: "CodeLogin",
    components: {
        Header
    },
    data() {
        return {
            comData: {
                showTitle: {
                    showBack: false,
                    showLogo: 2, //显示头部title文字
                    showShare: "", //1搜索2分享3菜单
                    showBg: false, //是否显示背景
                    title: "手机短信登录",
                    goBack:1,
                }
            },
            phone: "",
            verify_code: "",
            hintCode: "获取验证码",
            isGetCode: true,
            authUrl:'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb71e735dd0db7b41&redirect_uri=http%3a%2f%2f192.168.1.177%3a8800%2faccount-login&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect',//重定向地址得换
            agent_type:null,//1是pc/2是移动
            iswechat:false,//是不是微信浏览器
        };
    },
    created(){
        if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
            this.agent_type = 2;
        } else {
            this.agent_type = 1;
        }
        var ua = window.navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
            this.iswechat =  true;
        }else{
            this.iswechat =  false;
        }
        var code = this.getUrlParam('code');
        if (code) {
            this.getAuthInfo(code);
        }
    },
    methods: {
        enterFn(){
            this.loginFn();
        },
        gobake(){
            this.$router.push({ name: "HomePage" });
        },
        // 手机登录
        goAccount() {
            var that = this;
            if(that.$route.query.register == 1){
                that.$router.replace({ name: "AccountLogin",query:{register:1}});
            }else{
                that.$router.replace({ name: "AccountLogin"});
            }
        },
        // 获取code
        getUrlParam(key) {
            var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        },
        // 发送token
        getAuthInfo(code) {
            var that = this;
            that.$axios.post(process.env.API_HOST+"mp_auth",{
                code:code
            }).then((res)=>{
                // 部署完成后测试-------------------------------------------------------
            }).catch((err)=>{
                console.log(err)
            })
        },
        // 微信登录
        wxLogin(){
            var that = this;
            if(that.agent_type == 1){

            }else if(that.agent_type == 2){
                if(that.iswechat){//是微信浏览器
                    window.location.href = this.authUrl;
                }
            }
        },
        // 注册
        goRegister() {
            this.$router.replace({ name: "Register" });
        },
        getCode() {
            var that = this;
            if (that.isGetCode) {
                var phone = that.phone;
                var reg = /^1[3-9][0-9]{9}$/g;
                if (phone == "") {
                    mui.toast("手机号码不能为空",{ duration:'short', type:'div' });
                } else if (!phone.match(reg)) {
                    mui.toast("您输入的手机号不正确",{ duration:'short', type:'div' });
                } else {
                    that.$axios.post(process.env.API_HOST+"smsCode", {
                            mobile: phone
                        })
                        .then(function(res) {
                            if (res.status == 200) {
                                if (res.data.code == 200) {
                                    that.hintCode = 60;
                                    that.isGetCode = false;
                                    var time = setInterval(function() {
                                        that.hintCode--;
                                        if (that.hintCode <= 0) {
                                            clearInterval(time);
                                            that.isGetCode = true;
                                            that.hintCode = "获取验证码";
                                        }
                                    }, 1000);
                                    mui.toast(res.data.msg,{ duration:'short', type:'div' });
                                } else {
                                    mui.toast(res.data.msg,{ duration:'short', type:'div' });
                                }
                            }
                        })
                        .catch(function(error) {
                            console.log(error);
                        });
                }
            }
        },
        loginFn() {
            const that = this;
            var mobile = that.phone;
            var verify_code = that.verify_code;
            var phoneReg = /^1[3-9][0-9]{9}$/g;
            if (mobile == "") {
                mui.toast("手机号码不能为空",{ duration:'short', type:'div' });
            } else if (!mobile.match(phoneReg)) {
                mui.toast("您输入的手机号不正确",{ duration:'short', type:'div' });
            } else if (verify_code == "" || verify_code.length < 6) {
                mui.toast("您输入的验证码不正确",{ duration:'short', type:'div' });
            } else {
                that.$axios.post(process.env.API_HOST+"smsLogin", {
                        mobile: mobile,
                        verify_code: verify_code
                    })
                    .then(function(res) {
                        if (res.status == 200) {
                            if (res.data.code == 200) {
                                if (res.data.data.token) {
                                    that.$store.commit("set_token",res.data.data.token);
                                    that.$store.commit('set_hint');
                                }
                                if (mobile) {
                                    that.$store.commit("set_mobile", mobile);
                                }
                                that.$store.commit("changeLogin",'1');//修改登录状态
                                // 修改alert 尽量改 不需要用户点击 设置一秒后跳转
                                // mui.alert(res.data.msg,"提示","确定",
                                //     function() {
                                //         // if(that.$router.currentRoute.params.redirect != undefined){
                                //         //     that.$router.replace({
                                //         //         name: that.$router.currentRoute.params.redirect
                                //         //     });
                                //         // }else{
                                //         //     that.$router.push({
                                //         //         name: "MyCenter"
                                //         //     });
                                //         // }
                                //         that.$router.go(-1);
                                //     },"div");
                                
                                mui.toast(res.data.msg,{ duration:'short', type:'div' });
                                if(that.$route.query.register == 1){
                                    that.$router.go(-3);
                                }else{
                                    that.$router.go(-1);
                                }
                            } else {
                                mui.toast(res.data.msg,{ duration:'short', type:'div' });
                                that.verify_code = "";
                            }
                        }
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }
        }
    }
};
</script>
<style scoped>
.login-wrap {
    padding-top:0;
}
.login-header {
    width: 100%;
    height: 5.24rem;
    background: url(../../../static/image/login/login_hbg.png) no-repeat;
    background-size: 100% 5.24rem;
    position: relative;
}
.login-title{
    height:.7rem;
    line-height:.7rem;
    text-align:center;
    position: absolute;
    top:0;
    left:0;
    right:0;
}
.login-title img{
    width:.25rem;
    height:.43rem;
    position: absolute;
    left:.2rem;
    top:.15rem;
}
.login-title span{
    vertical-align: middle;
    color:#FFFFFF;
    font-size:.34rem;
    color:#FFFFFF;
    font-weight: 400;
}
.login-content {
    padding: 0.3rem 0.2rem 0;
}
.login-cell {
    padding: 0 0 0 0.3rem;
    background: #ffffff;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
}
.log_ico {
    text-align: center;
}
.log_ico img {
    width: 0.9rem;
    height: 0.29rem;
    margin-left: -0.2rem;
}

.login-strip {
    border-bottom: 0.01rem solid #e5e5e5;
    line-height: 0.9rem;
}
/* .login-info{
    height: .9rem;
    line-height: 0.9rem;
    display:flex;
    justify-content: flex-start;
} */
.login-info input{
    width: 4.4rem;
}
.phone-ico {
    width: 0.23rem;
    height: 0.3rem;
    vertical-align: middle;
}
.pass-ico {
    width: 0.27rem;
    height: 0.31rem;
    vertical-align: middle;
}
.login-bottom {
    line-height: 0.7rem;
    font-size: 0.24rem;
    color: #999999;
    padding-right: 0.3rem;
}
.phone-login {
    text-decoration: underline;
}
.go-register {
    float: right;
    color: #FFA303;
}

.login-type {
    margin-top: 1rem;
    text-align: center;
}
.login-type-title {
    color: #999999;
    font-size: 0.24rem;
    margin-bottom: 0.2rem;
}
.login-type-title img {
    width: 1.17rem;
    height: 0.02rem;
    vertical-align: middle;
}
.login-type-content img {
    width: 0.6rem;
    height: 0.6rem;
}
.wechat {
    margin-right: 0.4rem;
}

/* ==========input========= */
input {
    width:6rem;
    margin: 0;
    padding: 0.1rem;
    font-size: 0.24rem;
    border: none;
    height: 0.6rem;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
}
input[type="number"] {
    -moz-appearance: textfield;
}
::-webkit-input-placeholder {
    color: #999999;
    font-size: 0.26rem;
}
:-moz-placeholder {
    color: #999999;
    font-size: 0.26rem;
}
::-moz-placeholder {
    color: #999999;
    font-size: 0.26rem;
}
:-ms-input-placeholder {
    color: #999999;
    font-size: 0.26rem;
}
</style>
