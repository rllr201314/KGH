<template>
    <!-- 客服真伪验证 -->
    <div class="authenticity-wrap wrap">
        <div class="authent-header">
            <div class="goback" @click="goback">
                <img src="../../../static/img/header/back_ico.png" alt />
            </div>
            <div class="header-content">
                <div class="header-title-top">客服真伪鉴定</div>
                <div class="header-title-bottom">严防欺诈行为，维护交易安全</div>
            </div>
        </div>
        <div class="authent-content">
            <div class="authent-content-top">
                <div class="authent-cell">
                    <div class="authent-strip-inp">
                        <input class="yz"
                            type="number"
                            placeholder="请输入客服QQ进行验证"
                            v-model="qq_num"
                            @input="searchFn('qq')"
                        />
                        <span @click="authentcityFn('qq')">验证QQ客服</span>
                    </div>
                    <div class="authent-strip-inp">
                        <input class="yz"
                            type="text"
                            placeholder="请输入客服微信进行验证"
                            v-model="wx_name"
                            @input="searchFn('wx')"
                        />
                        <span @click="authentcityFn('wx')">验证微信客服</span>
                    </div>
                    <div class="authent-strip-inp">
                        <input class="yz"
                            type="url"
                            placeholder="请复制商品链接进行验证"
                            v-model="goods_name"
                            @input="searchFn('goods')"
                        />
                        <span @click="authentcityFn('goods')">验证商品链接</span>
                    </div>
                </div>
                <div class="verify-cell">
                    <div class="verify-strip-title">
                        <div class="title-txt">验证结果</div>
                    </div>
                    <div class="verifg-content" v-show="verifgType == 0">
                        <div class="verifg-center">请输入您需要验证的内容，并进行验证</div>
                    </div>
                    <div class="verifg-content" v-show="verifgType == 1">
                        <div class="verifg-img">
                            <img src="../../../static/img/my-center/true_good.png" alt />
                        </div>
                        <div class="verifg-text">
                            <div>看个号客服</div>
                            <div>
                                <span v-text="nicename"></span>竭诚为您服务！
                            </div>
                            <div class="link-up">
                                <img src="../../../static/img/my-center/news_ico.png" alt />
                                <span>在线沟通</span>
                            </div>
                        </div>
                    </div>
                    <div class="verifg-content" v-show="verifgType == 2">
                        <div class="verifg-img">
                            <img src="../../../static/img/my-center/false_good.png" alt />
                        </div>
                        <div class="verifg-text">
                            <div>您验证的信息非看个号官方提供</div>
                            <div>
                                请尽快
                                <span class="red-color dominant-color ">停止操作</span>
                            </div>
                            <div>以免您的财产损失</div>
                        </div>
                    </div>
                    <div class="verifg-content" v-show="verifgType == 3">
                        <div class="verifg-img">
                            <img src="../../../static/img/my-center/false_link.png" alt />
                        </div>
                        <div class="verifg-text">
                            <div>您搜索的商品链接非</div>
                            <div>看个号平台提供</div>
                            <div>
                                <span class="red-color dominant-color">请勿操作</span>，谨防受骗
                            </div>
                        </div>
                    </div>
                    <div class="verifg-content" v-show="verifgType == 4">
                        <div class="verifg-img">
                            <img src="../../../static/img/my-center/true_link.png" alt />
                        </div>
                        <div class="verifg-text">
                            <div>您搜索的商品是由看个号</div>
                            <div>平台提供的真实商品</div>
                            <div>请放心交易</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="service">
                举报和投诉，请联系
                <span class="go-service" @click="linkServer">在线客服</span>
            </div>
            <Footer class="footer"></Footer>
            <div class="attt" v-if="showLoading" v-text="attt"></div>
        </div>
        <Loading v-show="showLoading"></Loading>
    </div>
</template>
<script>
import Footer from "@/components/home-page/Footer";
import Loading from "@/components/multi/Loading"
export default {
    name: "Authenticity",
    components: {
        Footer,
        Loading
    },
    data() {
        return {
            verifgType: 0,//0 提示验证 1真客服 ,2假客服，3假商品链接，4真商品
            goods_name: '',
            wx_name: '',
            qq_num: '',
            nicename: '',
            showLoading: false,
            attt: '',
        };
    },
    methods: {
        linkServer(){
            this.$router.push({ name: 'Service' });
        },
        goback() {
            this.$router.go(-1);
        },
        searchFn(flag) {
            var that = this;
            if (flag == 'qq') {
                that.wx_name = '';
                that.goods_name = '';
            } else if (flag == 'wx') {
                that.qq_num = '';
                that.goods_name = '';
            } else if (flag == 'goods') {
                that.qq_num = '';
                that.wx_name = '';
            }
        },
        authentcityFn(flag) {
            var that = this;
            var request = {};
            if (flag == 'qq') {
                if (that.qq_num == '' || that.qq_num.length < 5) {
                    mui.toast("请输入正确的QQ号", { duration: "500", type: "div" });
                    return false;
                }
                request.authentic_type = 1;
                request.content = that.qq_num;
            } else if (flag == 'wx') {
                var reg = /^[a-zA-Z\d_]{5,}$/;
                if (!reg.test(that.wx_name)) {
                    mui.toast("请输入正确的微信号", { duration: "short", type: "div" });
                    return false;
                }
                request.authentic_type = 2;
                request.content = that.wx_name;
            } else if (flag == 'goods') {
                if (that.goods_name == "") {
                    mui.toast("请输入商品链接", { duration: "short", type: "div" });
                    return false;
                }
                request.authentic_type = 3;
                request.content = that.goods_name;
            }
            that.showLoading = true;
            that.$axios.post(process.env.API_HOST + "authenticKf", request).then((res) => {
                // mui.alert(JSON.stringify(res),'ti','que','','div');
                if (res.status == 200) {
                    that.showLoading = false;
                    if (res.data.code == 200) {
                        if (request.authentic_type == 1) {
                            if (res.data.data.flag == 1) {
                                that.nicename = res.data.data.nickname;
                                that.verifgType = 1;
                            } else {
                                that.verifgType = 2;
                            }
                        } else if (request.authentic_type == 2) {
                            if (res.data.data.flag == 1) {
                                that.nicename = res.data.data.nickname;
                                that.verifgType = 1;
                            } else {
                                that.verifgType = 2;
                            }
                        } else if (request.authentic_type == 3) {
                            if (res.data.data.flag == 1) {
                                that.verifgType = 4;
                            } else {
                                that.verifgType = 3;
                            }
                        }
                    } else {
                        mui.toast(res.data.msg, { duration: "short", type: "div" });
                    }
                }
            }).catch((err) => {
                console.log(err);
                that.attt = JSON.stringify(err);
            })
        }
    }
};
</script>
<style>
/* scoped 模式 访问不到 */
.mui-toast-container {
    bottom: 110px !important;
}
</style>

<style scoped>
.authenticity-wrap {
    padding: 0;
    position: relative;
}
.authent-header {
    text-align: center;
    padding-top: 0.88rem;
    height: 3.7rem;
    background: url(../../../static/image/CustomerService.jpg) no-repeat;
    background-size: 100% 3.7rem;
    position: relative;
}
.goback {
    background: rgba(0, 0, 0, 0.2);
    width: 0.46rem;
    height: 0.46rem;
    border-radius: 50%;
    position: absolute;
    top: 0.5rem;
    left: 0.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
}
.goback img {
    width: 0.16rem;
    height: 0.29rem;
    position: absolute;
    top: 0.07rem;
    left: 0.12rem;
}
.header-content {
    color: #ffffff;
    /* font-weight: bold; */
}
.header-title-top {
    font-size: 0.4rem;
    margin-bottom: 0.2rem;
}
.header-title-bottom {
    font-size: 0.28rem;
}

.authent-content {
    font-size: 0.26rem;
    position: absolute;
    top: 2.5rem;
    left: 0;
    right: 0;
}
.authent-content-top {
    padding: 0.2rem;
}
.authent-cell {
    padding: 0.4rem 0.4rem 0.1rem;
    background: #ffffff;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    margin-bottom: 0.2rem;
}
.authent-strip-inp {
    margin-bottom: 0.3rem;
    line-height: 0.76rem;
    border: 1px solid #d2d2d2;
    border-radius: 0.06rem;
    display: flex;
    justify-content: flex-start;
}
.authent-strip-inp span {
    width: calc(100% - 4.4rem);
    text-align: center;
    color: #ffffff;
    display: inline-block;
    background: -webkit-linear-gradient(#fd915f, #FFA303);
    background: -o-linear-gradient(#fd915f, #FFA303);
    background: -moz-linear-gradient(#fd915f, #FFA303);
    background: linear-gradient(to right, #fd915f, #FFA303);
}

.verify-cell {
    background: #ffffff;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    margin-bottom: 0.2rem;
}
.verify-strip-title {
    line-height: 0.7rem;
    border-bottom: 0.01rem solid #e5e5e5;
}
.title-txt {
    background-image: url("../../../static/img/board_mark_big.png");
    background-repeat: no-repeat;
    background-size: 1.49rem 0.21rem;
    background-position: 50%;
    text-align: center;
    width: 1.49rem;
    color: #FFA303;
    font-size: 0.26rem;
    margin: 0 auto;
}
.verifg-content {
    color: #333333;
    padding: 0.7rem 0;
}
.verifg-img {
    width: 1.2rem;
    height: 1.17rem;
    display: inline-block;
    margin: 0 0.7rem 0 1rem;
    vertical-align: middle;
}
.verifg-img img {
    width: 1.2rem;
    height: 1.17rem;
}
.verifg-center {
    text-align: center;
}
.verifg-text {
    vertical-align: middle;
    display: inline-block;
    line-height: .4rem;
}
.link-up {
    display: inline-block;
    margin-top: 0.1rem;
}
.link-up img {
    width: 0.29rem;
    height: 0.26rem;
    vertical-align: middle;
}
.link-up span {
    color: #666666;
    font-size: 0.24rem;
    vertical-align: middle;
}

.service {
    font-size: 0.24rem;
    color: #999999;
    text-align: center;
    margin: 0.6rem 0 0.3rem;
}
.go-service {
    color: #FFA303;
    text-decoration: underline;
}


/* ==========input========= */
input {
    margin: 0;
    padding: 0.1rem;
    font-size: 0.24rem;
    border: none;
    width: 4.4rem;
    height: 0.76rem;
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
    font-size: 0.24rem;
}
:-moz-placeholder {
    color: #999999;
    font-size: 0.24rem;
}
::-moz-placeholder {
    color: #999999;
    font-size: 0.24rem;
}
:-ms-input-placeholder {
    color: #999999;
    font-size: 0.24rem;
}
/* .footer{
    position:absolute;
    bottom:0;
    left:0;
    right:0;
} */
.attt {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 111111111111;
    background: white;
    width: 5rem;
    display: flex;
    flex-wrap: wrap;
}
</style>

