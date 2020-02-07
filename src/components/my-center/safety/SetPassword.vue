<template>
    <!-- 设置交易密码 -->
    <div class="wrap">
        <Header v-bind:head_data="head_data"></Header>
        <div class="register-content">
            <div class="hint-title">为了您的账户余额安全，下面的验证可能会花费您2分钟时间</div>
            <div class="register-cell">
                <div class="register-strip id-type" @click="showOpt">
                    <span class="left-text">证件类型</span>
                    <span class="left-text-content" v-text="id_type"></span>
                    <div class="right-text">
                        <img src="../../../../static/img/order/next.png" alt />
                    </div>
                </div>
                <div class="register-strip">
                    <span class="left-text">证件号</span>
                    <input type="text" placeholder="请输入您实名认证的证件号" v-model="id_num" />
                </div>
                <div class="register-strip">
                    <span class="left-text">交易密码</span>
                    <input type="password" placeholder="请勿与登录密码相同" v-model="password" />
                </div>
                <div class="register-strip verify">
                    <span class="left-text">验证码</span>
                    <input type="number" placeholder="请输入验证码" v-model="verify_code" />
                    <span class="get-code" @click="getCode" v-text="hintCode"></span>
                </div>
                <div class="register-strip verify">
                    <span class="left-text"></span>
                    <span class="left-text-content dominant-color">
                        请使用绑定手机
                        <span v-text="phone"></span>
                        获取验证码
                    </span>
                </div>
            </div>
            <div class="nextBtn button" @click="loginFn()">确认</div>
        </div>
        <!-- 分享弹出框 -->
        <div id="sheet" class="mui-popover mui-popover-bottom mui-popover-action" v-if="false">
            <!-- 可选择菜单 -->
            <ul class="pop-view">
                <li v-for="item in sele_type" v-text="item.name" @click="seleTypeFn(item.key)"></li>
            </ul>
            <!-- 取消菜单 -->
            <ul class="pop-view">
                <li class="mui-table-view-cell option-black">
                    <a href="#sheet">取消</a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
export default {
    name: "SetPassword",
    components: {
        Header
    },
    data() {
        return {
            head_data: {
                show_type: 2,
                tit_text: '交易密码设置',
                right_icon: 2,
            },
            hintCode: "获取验证码",
            isGetCode: true,
            id_num: "",
            password: "",
            verify_code: "",
            id_type: '',
            sele_type: [{
                name: '身份证',
                key: 1,
            }, {
                name: '港澳通行证',
                key: 2,
            }, {
                name: '台胞证',
                key: 3,
            }, {
                name: '护照',
                key: 4,
            }],
            phone: ''
        };
    },
    methods: {
        showOpt() {
            mui("#sheet").popover("toggle");
        },
        seleTypeFn(key) {
            mui("#sheet").popover("toggle");
            var that = this;
            for (var i in that.sele_type) {
                if (key == that.sele_type[i].key) {
                    that.id_type = that.sele_type[i].name;
                    break;
                }
            }
        },
        getCode() {
            var that = this;
            if (that.isGetCode) {
                that.$axios
                    .post(process.env.API_HOST + "smsCode", {
                        mobile: that.$store.state.mobile
                    })
                    .then(function (response) {
                        console.log(response.data);
                        var res = response;
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
                                mui.alert(res.data.msg, "提示", "确认", "", "");
                            } else {
                                mui.alert(res.data.msg, "提示", "确认", "", "");
                            }
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            }
        },
        loginFn() {
            const that = this;
            var id_num = that.id_num;
            var verify_code = that.verify_code;
            var password = that.password;
            var passReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
            var cardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            if (id_num == "") {
                mui.alert("请输入证件号", "提示", "确定", "", "div");
            } else if (cardReg.test(id_num) === false) {
                mui.alert("您输入的证件号不正确", "提示", "确定", "", "div");
            } else if (verify_code == "" || verify_code.length < 6) {
                mui.alert("您输入的验证码不正确", "提示", "确定", "", "div");
            } else if (password == "") {
                mui.alert("密码不能为空", "提示", "确定", "", "div");
            } else if (!password.match(passReg)) {
                mui.alert("密码为6-16位数字、字母组合", "提示", "确定", "", "div");
            } else {
                that.$axios
                    .post(process.env.API_HOST + "tradePwd", {  //security_pwd
                        id_number: that.id_num,
                        verify_code: verify_code,
                        password: password
                    })
                    .then(function (res) {
                        if (res.status == 200) {
                            if (res.data.code == 200) {
                                mui.alert(
                                    res.data.msg,
                                    "提示",
                                    "确定",
                                    function () {
                                        that.$router.go(-1);
                                    },
                                    "div"
                                );
                            } else {
                                mui.alert(res.data.msg, "提示", "确定", "", "div");
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
        if (that.$store.state.mobile) {
            var str = that.$store.state.mobile;
            that.phone = str.substr(0, 3) + '****' + str.substr(7);
        }
        var key = that.$route.query.type;
        for (var i in that.sele_type) {
            if (key == that.sele_type[i].key) {
                that.id_type = that.sele_type[i].name;
                break;
            }
        }
        if (that.$route.query.isset == 1) {
            that.head_data.tit_text = "修改交易密码"
        } else if (that.$route.query.isset == 2) {
            that.head_data.tit_text = "交易密码设置"
        } else {
            that.$router.go(-1);
        }
    }
};
</script>
<style scoped>
.register-content {
    padding: 0 0.2rem;
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


/* 下一步 */
.goLogin {
    color: #999999;
    font-size: 0.24rem;
    text-align: center;
    text-decoration: underline;
    margin-top: 0.2rem;
}

/* .red-color {
    color: #ff5e5e !important;
} */
/* ==========input========= */
input {
    margin: 0;
    padding: 0.1rem;
    font-size: 0.24rem;
    border: none;
    width: 5rem;
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

.hint-title {
    font-size: 0.26rem;
    color: #666666;
    line-height: 0.8rem;
}
.id-type {
    position: relative;
}
.left-text-content {
    font-size: 0.26rem;
    color: #666666;
    padding-left: 0.1rem;
}
.right-text {
    position: absolute;
    top: 0;
    right: 0.2rem;
}
.right-text img {
    width: 0.11rem;
    height: 0.23rem;
}
.left-text {
    font-size: 0.26rem;
    color: #666666;
    min-width: 1.1rem;
    margin-right: 0.1rem;
    display: inline-block;
}
.verify input {
    width: 3.2rem;
}

.pop-view {
    margin-top: 10px;
    background: #ffffff;
    list-style: none;
}

.pop-view li {
    text-align: center;
    line-height: 0.9rem;
    border-bottom: 1px solid #e5e5e5;
}

.pop-view a {
    padding: 0;
}
</style>



