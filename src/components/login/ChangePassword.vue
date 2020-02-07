<template>
    <!-- 注册 -->
    <div class="wrap">
        <Header v-bind:head_data="head_data"></Header>
        <div class="register-content">
            <div class="register-cell">
                <div class="register-strip login-info">
                    <img class="code-ico" src="../../../static/img/my-center/code_ico.png" alt />
                    <input type="number" placeholder="请输入验证码" v-model="verify_code" />
                    <span class="get-code Verification" @click="getCode" v-text="hintCode"></span>
                </div>
                <div class="register-strip">
                    <img class="pass-ico" src="../../../static/img/my-center/password_ico.png" alt />
                    <input type="password" placeholder="请输入6~16个字符作为密码" v-model="password" />
                </div>
            </div>
            <div class="protocol">
                验证码将发送至您的手机
                <span v-text="showPhone"></span>请确保手机处于开机状态
            </div>
            <div class="nextBtn" @click="okChange">确定</div>
        </div>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
export default {
    name: "Register",
    components: {
        Header
    },
    data() {
        return {
            head_data: {
                show_type: 2,
                tit_text: '修改密码',
                right_icon: 2,
            },
            phoneNum: "",
            showPhone: "",
            verify_code: "",
            password: "",
            hintCode: "获取验证码",
            isGetCode: true,
        };
    },
    methods: {
        // 获取验证码
        getCode() {
            var that = this;
            if (that.isGetCode) {
                var phone = that.phoneNum;
                var reg = /^1[3-9][0-9]{9}$/g;
                if (phone == "") {
                    mui.alert("手机号码不能为空", "提示", "确定", "", "div");
                } else if (!phone.match(reg)) {
                    mui.alert("您输入的手机号不正确", "提示", "确定", "", "div");
                } else {
                    that.$axios
                        .post(process.env.API_HOST + "smsCode", {
                            mobile: phone
                        })
                        .then(function (res) {
                            if (res.status == 200) {
                                if (res.data.code == 200) {
                                    that.hintCode = 60;
                                    that.isGetCode = false;
                                    var time = setInterval(function () {
                                        that.hintCode--;
                                        if (that.hintCode <= 0) {
                                            clearInterval(time);
                                            that.isGetCode = true;
                                            that.hintCode = "获取验证码";
                                        }
                                    }, 1000);
                                    mui.toast(res.data.msg, { duration: 'short', type: 'div' });
                                } else {
                                    mui.alert(res.data.msg, "提示", "确认", "", "");
                                }
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            }
        },
        // 确认
        okChange() {
            var that = this;
            var mobile = that.phoneNum;
            var verify_code = that.verify_code;
            var password = that.password;
            var phoneReg = /^1[3-9][0-9]{9}$/g;
            var passReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
            if (mobile == "") {
                mui.toast("手机号不能为空", { duration: 'short', type: 'div' });
            } else if (!mobile.match(phoneReg)) {
                mui.toast("您输入的手机号不正确", { duration: 'short', type: 'div' });
            } else if (verify_code == "" || verify_code.length < 6) {
                mui.toast("您输入的验证码不正确", { duration: 'short', type: 'div' });
            } else if (password == "") {
                mui.toast("密码不能为空", { duration: 'short', type: 'div' });
            } else if (!password.match(passReg)) {
                mui.toast("密码为6-16位数字、字母组合", { duration: 'short', type: 'div' });
            } else {
                that.$axios
                    .post(process.env.API_HOST + "findPassword", {
                        mobile: mobile,
                        verify_code: verify_code,
                        password: password
                    })
                    .then(function (res) {
                        if (res.status == 200) {
                            if (res.data.code == 200) {
                                // mui.alert(
                                //     res.data.msg,
                                //     "提示",
                                //     "确定",
                                //     function() {
                                //         that.$router.push({
                                //             name: "MyCenter"
                                //         });
                                //     },
                                //     "div"
                                // );
                                mui.toast(res.data.msg, { duration: 'short', type: 'div' });
                                that.$router.push({ name: "MyCenter" });
                            } else {
                                mui.toast(res.data.msg, { duration: 'short', type: 'div' });
                                that.verify_code = "";
                                that.password = "";
                            }
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
    },
    mounted() {
        var that = this;
        var mobile = that.$store.state.mobile;
        if (mobile != undefined && mobile != "") {
            mobile = mobile.substr(0, 3) + "****" + mobile.substr(7);
            that.showPhone = mobile;
            that.phoneNum = that.$store.state.mobile;
        }
    }
};
</script>
<style scoped>
.register-content {
    padding: 0.2rem;
}
.register-cell {
    padding: 0 0 0 0.3rem;
    background: #ffffff;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
}
.register-strip {
    border-bottom: 0.01rem solid #e5e5e5;
    line-height: 0.9rem;
}
.pass-ico {
    width: 0.26rem;
    height: 0.3rem;
    vertical-align: middle;
}
.code-ico {
    width: 0.27rem;
    height: 0.31rem;
    vertical-align: middle;
}
.get-code {
    display: inline-block;
    font-size: 0.22rem;
    line-height: 0.6rem;
    width: 1.9rem;
    text-align: center;
    -webkit-border-radius: 0.15rem;
    -moz-border-radius: 0.15rem;
    border-radius: 0.15rem;
    vertical-align: middle;
}
/* 协议 */
.protocol {
    line-height: 0.4rem;
    padding: 0 0.2rem;
    color: #333333;
    font-size: 0.24rem;
    margin-top: 0.2rem;
}
.protocol span {
    color: #666666;
}

/* 下一步 */
.nextBtn {
    color: #ffffff;
    font-size: 0.28rem;
    margin: 0.6rem auto 0;
    width: 6.5rem;
    text-align: center;
    line-height: 0.8rem;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #fd915f;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #fd915f;
    box-shadow: 0.06rem 0.05rem 0.09rem #fd915f;
    background: -webkit-linear-gradient(#fd915f, #ffa303);
    background: -o-linear-gradient(#fd915f, #ffa303);
    background: -moz-linear-gradient(#fd915f, #ffa303);
    background: linear-gradient(to right, #fd915f, #ffa303);
}
.red-color {
    color: #ff5e5e !important;
}
/* ==========input========= */
input {
    margin: 0;
    padding: 0.1rem;
    font-size: 0.24rem;
    border: none;
    width: 4.2rem;
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

.login-info input{
  width: 4.4rem;
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

