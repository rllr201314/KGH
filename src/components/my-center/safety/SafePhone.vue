<template>
    <!-- 安全认证之手机 -->
    <div class="wrap">
        <Header v-bind:head_data="comData.head_data"></Header>
        <div class="safe-authentic-content">
            <div class="safe-cell safe-tit">
                <img class="safe-ico" src="../../../../static/img/my-center/safe/safe.png" alt="">
                <div class="hint">为了您的资产安全以及平台账号的合法性，下面将为您进行实名认证</div>
                <img class="safe-status" src="../../../../static/img/my-center/safe/one.png" alt="">
            </div>
            <div class="safe-cell">
                <div class="safe-strip">
                    <span class="safe-strip-tit">您绑定的手机号</span>
                    <span class="phone" v-text="phone"></span>
                </div>
                <div class="safe-strip">
                    <span class="safe-strip-tit">验证码</span>
                    <input type="number" placeholder="请输入验证码" v-model="code">
                    <span class="get-code Verification" @click="getCode" v-text="hintCode"></span>
                </div>
            </div>
        </div>
        <div class="okBtn button" @click="startAuthent">开始认证</div>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
export default {
    name: "SafePhone",
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
            phone: "",
            hintCode: "获取验证码",
            isGetCode: true,
            code:'',
        };
    },
    methods: {
        getCode() {
            var that = this;
            if (that.isGetCode) {
                that.$axios
                    .post(process.env.API_HOST+"check_mobile", {
                        mobile: that.$store.state.mobile
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
                            } else{
                                mui.toast(res.data.msg,{ duration:'short', type:'div' });
                                
                            }
                        }
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
            }
        },
        startAuthent(){
            var that = this;
            if(!that.code){
                mui.toast('验证码不能为空',{duration:'short',type:'div'});
            }else{
                that.$router.push({name:'SafeCard',query:{"code":that.code}})
            }
        }
    },
    mounted() {
        var that = this;
        var str = that.$store.state.mobile;
        that.phone = str.substr(0, 3) + "****" + str.substr(7);
    }
};
</script>
<style scoped>
.safe-authentic-content {
    padding: 0.2rem;
}
.safe-cell {
    font-size: 0.26rem;
    background: #ffffff;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    padding-left: 0.2rem;
    margin-bottom: 0.2rem;
}
.safe-tit {
    text-align: center;
    padding: 0 0 0.5rem 0;
}
.safe-ico {
    width: 1.19rem;
    height: 1.39rem;
    margin: 0.5rem 0 0.3rem;
}
.hint {
    color: #333333;
    width: 4.7rem;
    margin: 0 auto;
}
.safe-status {
    width: 6.3rem;
    height: 1rem;
    margin: 0.7rem 0 0 0;
}

.safe-strip {
    color: #666666;
    border-bottom: 0.01rem solid #e5e5e5;
    line-height: 0.9rem;
}
.get-code {
    display: inline-block;
    /* color: #fe7649;
    border: 1px solid #fe7649; */
    font-size: 0.22rem;
    line-height: 0.6rem;
    width: 1.9rem;
    text-align: center;
    -webkit-border-radius: 0.15rem;
    -moz-border-radius: 0.15rem;
    border-radius: 0.15rem;
    vertical-align: middle;
}
.safe-strip-tit {
    margin-right: 0.2rem;
}
.phone {
    color: #333333;
}

/* 提交申请 */
.okBtn {
    color: #ffffff;
    font-size: 0.28rem;
    margin: 0.5rem auto 0;
    width: 6.5rem;
    text-align: center;
    line-height: 0.8rem;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #fd915f;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #fd915f;
    box-shadow: 0.06rem 0.05rem 0.09rem #fd915f;
    /* background: -webkit-linear-gradient(#fd915f, #fc534a);
    background: -o-linear-gradient(#fd915f, #fc534a);
    background: -moz-linear-gradient(#fd915f, #fc534a);
    background: linear-gradient(to right, #fd915f, #fc534a); */
}

/* ==========input========= */
input {
    margin: 0;
    padding: 0.1rem;
    font-size: 0.24rem;
    border: none;
    width: 3.6rem;
    height: 0.6rem;
    vertical-align: middle;
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
