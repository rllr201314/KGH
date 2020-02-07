<template>
    <!-- 人工认证 -->
    <div class="wrap">
        <Header v-bind:head_data="head_data"></Header>
        <div class="safe-authentic-tit">
            <img class="safe-status" src="../../../../static/img/my-center/safe/a-one.png" alt="">
        </div>
        <div class="safe-authentic-content">
            <div class="safe-cell">
                <div class="safe-strip">
                    <span class="strip-left">证件类型</span>
                    <div class="strip-right">
                        <span class="strip-con">身份证</span>
                        <img src="../../../../static/img/order/next.png" alt="">
                    </div>
                </div>
                <div class="safe-strip">
                    <span class="strip-left">真实姓名</span>
                    <input type="text" placeholder="请填写您的真实姓名" v-model="id_text">
                </div>
                <div class="safe-strip">
                    <span class="strip-left">证件号码</span>
                    <input type="number" placeholder="请填写您的证件号码" v-model="card_num">
                </div>
            </div>
            <div class="hint-tit">证件照上传 支持GIF、JPG、PNG、JPEG、BMP格式，≤6M</div>
            <div class="safe-cell flex-box">
                <img class="example" src="../../../../static/img/my-center/safe/front.png" alt="">
                <div class="upimg-cell">
                    <img :src="upimg.front" alt="">
                    <input type="file" id="upImg" accept="image/*" @change="addImg('front')">
                </div>
                <img src="../../../../static/img/my-center/safe/reverse.png" alt="">
                <div class="upimg-cell">
                    <img :src="upimg.reverse" alt="">
                    <input type="file" id="upImg" accept="image/*" @change="addImg('reverse')">
                </div>
            </div>
            <div class="hint-tit">手持证件照上传 支持GIF、JPG、PNG、JPEG、BMP格式，≤6M</div>
            <div class="safe-cell flex-box">
                <img src="../../../../static/img/my-center/safe/hand.png" alt="">
                <div class="upimg-cell">
                    <img :src="upimg.hand" alt="">
                    <input type="file" id="upImg" accept="image/*" @change="addImg('hand')">
                </div>
            </div>
            <div class="statement">
                <div class="statement-tit">注意：</div>
                <div class="statement-con">
                    <div>1.请确保上传的证件信息清晰</div>
                    <div>2.请确认实名信息与证件相符</div>
                </div>
            </div>
            <div class="protocol">
                <img :src="protocol?'../../../../static/img/goodscreen/okcheck.png':'../../../../static/img/goodscreen/nocheck.png'" alt="" @click="seleProtocol">
                <div>
                    我已阅读
                    <span class="red-color" @click="getProtocol">《看个号用户基础服务协议》</span>
                </div>
            </div>
        </div>
        <Protocal v-bind:proData="proData" v-on:isProFn="isProFn"></Protocal>
        <div class="nextBtn" @click="submitFn">下一步</div>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header"
import Protocal from "@/components/multi/Protocal";//协议
export default {
    name:"aritificial",
    components:{
        Header,Protocal
    },
    data(){
        return {
            head_data:{
                show_type: 2,
                tit_text: '人工认证',
                right_icon: 2,
                showBack: false,
                showLogo: 2, //显示头部title文字
                showShare: 3, //1搜索2分享3菜单
                showBg: true, //是否显示背景
            },
            upimg: {
                front: "./static/img/my-center/safe/add-front.png",
                reverse:"./static/img/my-center/safe/add-reverse.png",
                hand:"./static/img/my-center/safe/add-hand.png",
                imgData: "image/gif, image/jpeg, image/png, image/jpg,image/bmp",
            },
            id_text:'',
            card_num:'',
            protocol:true,
            proData: {
                isShow: false,
                con: "",
                btn: "确认已读",
                val: ""
            },
        }
    },
    methods:{
        addImg(flag) {
            var event=window.event || arguments.callee.caller.arguments[0];
            var that = this;
            var arr = [];
            let imgArr = event.target.files[0];
            let type = imgArr.type; //文件的类型，判断是否是图片
            let size = imgArr.size; //文件的大小，判断图片的大小
            if (that.upimg.imgData.indexOf(type) == -1) {
                mui.alert("请选择我们支持的图片格式！","提示","确认",null,"div");
                return false;
            }
            if (size > 6291456) {
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
                that.upimg[flag] = imgMsg.base64;
            };
        },
        seleProtocol() {
            this.protocol = !this.protocol;
        },
        getProtocol(){
            var that = this;
            that.$axios.post(process.env.API_HOST+'protocolReg').then((res)=>{
                if(res.status == 200){
                    if(res.data.code == 200){
                        that.proData.isShow = true;
                        that.proData.con = res.data.data;
                        that.proData.val = true;
                    }
                }
            })
        },
        isProFn(flag){
            var that = this;
            if(flag){
                that.registerData.protocol = true;
            }
        },
        submitFn(){
            this.$router.push({name:'SafeState'});
        }
    }
}
</script>
<style  scoped>
.safe-authentic-tit {
    text-align: center;
    padding: 0.5rem 0 0.18rem;
}
.safe-status {
    width: 6.3rem;
    height: 1rem;
}
.safe-authentic-content {
    padding: 0 0.2rem;
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
}
.safe-cell-tit {
    padding: 0.4rem 0;
}
.upimg-cell {
    width: 3.25rem;
    height: 2.2rem;
    position: relative;
    padding: 0;
    overflow: hidden;
}
#upImg {
    width: 3.25rem;
    height: 2.2rem;
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
.strip-right{
    width:calc(100% - 1.6rem);
    display: inline-block;
    position: relative;

}
.strip-con{
    font-size:.24rem;
    color:#666666;
}
.strip-right img{
    width:.13rem;
    height:.24rem;
    position:absolute;
    right:.2rem;
    top:calc(50% - .12rem);
}
.hint-tit{
    line-height:.9rem;
    text-align:center;
    font-size:.24rem;
    color:#666666;
}

.flex-box{
    padding:.2rem;
    display:flex;
    flex-wrap:wrap;
    justify-content: space-between;
}
.flex-box img {
    width: 3.25rem;
    height: 2.2rem;
}
.flex-box .example{
    margin-bottom:.2rem;
}

.statement {
    font-size: 0.24rem;
    margin: 0.3rem 0 0;
    width: 6.5rem;
    color: #999999;
    display: flex;
}
.statement-con,.statement-tit{
    display:inline-block;
}
.statement-tit {
    width:.8rem;
    color: #666666;
}
.statement-con{
    width:calc(100% - .8rem);
}
.protocol {
    margin: 0.1rem 0 0.2rem;
}
.protocol img {
    width: 0.28rem;
    height: 0.28rem;
    vertical-align: middle;
}
.protocol div {
    display: inline-block;
    font-size: 0.22rem;
    vertical-align: middle;
}

.red-color {
    color: #ff5e5e !important;
}
/* 下一步 */
.nextBtn {
    color: #ffffff;
    font-size: 0.28rem;
    margin: 0 auto 0.3rem;
    width: 6.5rem;
    text-align: center;
    line-height: 0.8rem;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #fd915f;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #fd915f;
    box-shadow: 0.06rem 0.05rem 0.09rem #fd915f;
    background: -webkit-linear-gradient(#fd915f, #fc534a);
    background: -o-linear-gradient(#fd915f, #fc534a);
    background: -moz-linear-gradient(#fd915f, #fc534a);
    background: linear-gradient(to right, #fd915f, #fc534a);
}


/* ==========input========= */
input {
    margin: 0;
    padding: 0;
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
