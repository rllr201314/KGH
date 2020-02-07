<template>
    <!-- 安全认证之手机 -->
    <div class="wrap">
        <Header v-bind:head_data="comData.head_data"></Header>
        <div class="safe-authentic-tit">
            <img class="safe-status" src="../../../../static/image/security.jpg" alt="">
        </div>
        <div class="safe-authentic-content">
            <div class="safe-cell">
                <div class="safe-cell-tit" v-if="false">
                    <div class="upimg-cell">
                        <img :src="upimg.user_card" alt="">
                        <input type="file" id="upImg" accept="image/*" capture @change="addImg">
                    </div>
                </div>
                <div class="safe-strip">
                    <span class="strip-left">姓名</span>
                    <input type="text" placeholder="请填写您的姓名" v-model="username">
                </div>
                <div class="safe-strip">
                    <span class="strip-left">身份证号</span>
                    <input type="text" placeholder="请填写您的身份证号" v-model="id_num">
                </div>
                <div class="safe-strip">
                    <span class="strip-left">银行卡</span>
                    <input type="number" placeholder="请填写您实名开户的银行卡账号" v-model="card_num">
                </div>
                <div class="safe-strip">
                    <span class="strip-left">手机号</span>
                    <input type="number" placeholder="请填写您银行预留的联系电话" v-model="mobile">
                </div>
                <div class="safe-strip">
                    <span class="strip-left">验证码</span>
                    <input class="code-inp" type="number" placeholder="请输入验证码" v-model="code">
                    <span class="get-code Verification" @click="getCode" v-text="hintCode"></span>
                </div>
            </div>
        </div>
        <div class="okBtn button" @click="nextBtn">下一步</div>
        <div class="statement">
            <div class="statement-wrap">
                <div class="statement-tit">声明：</div>
                <div class="statement-con">
                    <div>本认证信息已接入公安系统，对于一切认证身份均具有法律效力</div>
                    <div v-if="false">实名认证遇到问题？您可以尝试进行<span @click="goAritificial" class="orange-color" >人工认证</span></div>
                </div>
            </div>
            <div class="statement-wrap">
                <div class="statement-tit">注意事项：</div>
                <div class="statement-con">
                    <div>实名认证请在20分钟内完成，若超出20分钟，则需要退出该界面，并重新发起认证;</div>
                    <div>同一身份证号或银行卡号24小时内认证不能超过10次，否则请在12小时后再次尝试。</div>
                </div>
            </div>
        </div>
        <Loading  v-if="showLoading"></Loading>
        <div class="pop-view" v-show="showAlert">
            <img class="hidden-pro" @click="hiddenPro" src="../../../../static/img/empty_ico.png" alt="">
            <div class="pop-title gray-color">
                尊敬的看个号用户，您好！为了提高您的实名认证通过率、避免重复提交证件照，请您仔细阅读注意事项，并按照要求上传信息
            </div>
            <div class="pop-header black-color">
                上传要求：
            </div>
            <div class="gray-color">一、认证中若需要上传身份证照片，请拍摄清晰的身份证正反面照，露出身份证四个边角；</div>
            <div class="gray-color">二、需要本人手持身份证他人拍摄，不要遮住脸部，照片清晰；</div>
            <div class="gray-color">三、请使用本人有效身份证拍照；</div>
            <div class="gray-color">四、为保证资金安全，避免提现被拒，请使用与身份证认证实名相符的银行卡信息</div>
            <div class="gray-color">五、用户提交的姓名、身份证号、照片等信息必须真实有效，银行卡开户人、身份证姓名、手机实名认证必须保持一致，且为本人操作；</div>
            <div class="gray-color">六、同一身份证号或银行卡号24小时内认证不能超过10次，否则请在12小时后再次尝试。</div>
            <div class="pop-header black-color">
                注意事项：
            </div>
            <div class="gray-color">一、实名认证成功后，该账户一旦提交提现申请，系统默认为本人操作；</div>
            <div class="gray-color">二、实名认证后，认证人信息不能更改；</div>
            <div class="gray-color">三、认证后用户有责任妥善保管账号及密码信息，切勿告知他人，因用户保管不善导致被盗号或密码失窃责任由用户自行承担；</div>
            <div class="gray-color">四、本站承诺实名认证的过程不进行信息采集，保障用户信息安全；</div>
            <div class="gray-color">五、协议签署具有法律效应，可在“云合同”<a class="orange-color dominant-color" target="_blank" href="https:www.yunhetong.com">www.yunhetong.com</a>进行查询或在线验签。</div>
        </div>
        <div class="shade" @click="hiddenPro" v-show="showAlert"></div>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
import Loading from "@/components/multi/Loading";
export default {
    name: "SafeCard",
    components: {
        Header,
        Loading,
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
            username: "",
            showLoading:false,
            id_num: "",
            card_num: "",
            mobile: "",
            upimg: {
                user_card: "./static/img/my-center/safe/user_card.png",
                imgData: "image/gif, image/jpeg, image/png, image/jpg"
            },
            code:'',
            hintCode: "获取验证码",
            isGetCode: true,
            showAlert:true,//提醒
        };
    },
    methods: {
        hiddenPro(){
            this.showAlert = false;
        },
        getCode() {
            var that = this;
            if (that.isGetCode) {
                that.$axios
                    .post(process.env.API_HOST+"authenticCode", {
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
        addImg(event) {
            var that = this;
            var arr = [];
            let imgArr = event.target.files[0];
            let type = imgArr.type; //文件的类型，判断是否是图片
            let size = imgArr.size; //文件的大小，判断图片的大小
            if (that.upimg.imgData.indexOf(type) == -1) {
                mui.alert("请选择我们支持的图片格式！","提示","确认",null,"div");
                return false;
            }
            if (size > 3145728) {
                mui.alert("请选择3M以内的图片！", "提示", "确认",null, "div");
                return false;
            }

            var reader = new FileReader();
            reader.readAsDataURL(imgArr);

            var fileName = imgArr.name;
            reader.onload = function(e) {
                var imgMsg = {
                    name: fileName, //获取文件名
                    base64: this.result //reader.readAsDataURL方法执行完后，base64数据储存在reader.result里
                };
                that.upimg.user_card = imgMsg.base64;
            };
        },
        // 前往人工认证
        goAritificial(){
            this.$router.push({name:'SafeAritificial'})
        },
        nextBtn() {
            var that = this;
            that.showLoading = true;
            if(that.username == ""){
                mui.alert("请您输入姓名","提示","确认","","div");
                that.showLoading = false;
                return false;
            }
            var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            if(reg.test(that.id_num) === false){
                mui.alert("您输入的证件号不正确","提示","确认","","div");
                that.showLoading = false;
                return false;
            }
            if(that.code == ''){
                mui.alert("验证码不能为空","提示","确认","","div");
                that.showLoading = false;
                return false;
            }
            var request = {};
            request.name = that.username;
            request.id_no = that.id_num;
            request.bank_account = that.card_num;
            request.mobile = that.mobile;
            request.verify_code = that.code;
            that.$axios
                .post(process.env.API_HOST+"authenticFour",request)
                .then(res => {
                    if (res.status == 200) {
                        if (res.data.code == 200 && res.data.data.notify_id) {
                            that.face(res.data.data.notify_id);//人脸识别
                        } else {
                            that.showLoading = false;
                            mui.alert(res.data.msg, "提示", "确认",null, "div");
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        tokenUnableListener(obj){
            var that = this;
            that.$axios.post(process.env.API_HOST+"faceToken").then((res)=>{   //veriface_token
                console.log(res)
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
        face(id){
            var that = this;
            var backURL='https://www.kangehao.com/safe-success';//识别完成返回地址,请以“http”或者“https”协议开始
            var notifyId = id;
            YHTVF.queryVF(
                function successFun(url){
                    mui.alert('信息提交成功','提示','确认',function(){
                        that.showLoading = false;
                        window.open(url);
                    },'div')
                },
                function failFun(data){
                    console.log(data);
                },
                backURL,
                notifyId
            );  
        }
    },
    mounted(){
        YHTVF.init("AppID", this.tokenUnableListener);//必须初始化YHTVF
    }
};
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
    padding-left: 0.2rem;
    margin-bottom: 0.2rem;
}

.safe-cell-tit {
    padding: 0.4rem 0;
}
.upimg-cell {
    vertical-align: top;
    text-align: center;
    width: 1.5rem;
    height: 1.5rem;
    position: relative;
    padding: 0;
    overflow: hidden;
    margin: 0 auto;
}
.upimg-cell img {
    width: 1.5rem;
    height: 1.5rem;
}
#upImg {
    width: 1.5rem;
    height: 1.5rem;
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 3;
    opacity: 0;
}

.safe-strip {
    color: #666666;
    border-bottom: 0.01rem solid #e5e5e5;
    line-height: 0.9rem;
}
.strip-left {
    width: 1.5rem;
    display: inline-block;
    font-size: 0.26rem;
}

/* 提交申请 */
.okBtn {
    color: #ffffff;
    font-size: 0.28rem;
    margin: 0.2rem auto 0;
    width: 6.5rem;
    text-align: center;
    line-height: 0.8rem;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #fd915f;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #fd915f;
    box-shadow: 0.06rem 0.05rem 0.09rem #fd915f;
}
.statement {
    font-size: 0.24rem;
    margin: 0.3rem auto 0;
    width: 6.5rem;
    color: #999999;
    /* display: flex; */
}
.statement-wrap{
    display: flex;
    margin-bottom:.2rem;
}
.statement-con,.statement-tit{
    display:inline-block;
}
.statement-tit {
    min-width:1.2rem;
    color: #666666;
}
.statement-con{
    width:calc(100% - 1.2rem);
}

.orange-color{
    /* color:#FE7649; */
    text-decoration: underline;
}
.black-color{
    color:#333333;
}
.gray-color{
    color:#666666;
}
.get-code {
    display: inline-block;
    font-size: 0.22rem;
    height: 0.6rem;
    line-height: 0.6rem;
    width: 1.9rem;
    text-align: center;
    -webkit-border-radius: 0.15rem;
    -moz-border-radius: 0.15rem;
    border-radius: 0.15rem;
    vertical-align: middle;
}
.code-inp{
    width:3rem;
}

.pop-view{
    max-width: 620px;
    margin:0 auto;
    font-size:.24rem;
    position: fixed;
    top: 1.3rem;
    left: 0.3rem;
    right: 0.3rem;
    padding:0 .3rem .25rem;
    border-radius: 0.1rem;
    background:#ffffff;
    z-index:15;
    max-height: 75vh;
    overflow-y: auto;
}
.hidden-pro {
    width: 0.24rem;
    height: 0.24rem;
    position: absolute;
    top: 0.25rem;
    right: 0.25rem;
}
.shade {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 8;
}
.pop-title{
    margin-top:.7rem;
    text-indent:2em;
    font-weight: bold;
}
.pop-header{
    font-weight: bolder;
}

/* ==========input========= */
input {
    margin: 0;
    padding: 0.1rem;
    font-size: 0.26rem;
    border: none;
    width: 4rem;
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
</style>
