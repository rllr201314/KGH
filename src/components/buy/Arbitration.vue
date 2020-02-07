<template>
    <!-- 申请仲裁 -->
    <div class="wrap">
        <Header v-bind:head_data="componentsData.head_data"></Header>
        <div class="arbitration-content">
            <div class="arbitration-cell">
                <div class="arbitration-info-top">
                    <img src="../../../static/img/goodscreen/vertical.png" alt="">
                    <span>订单详情</span>
                </div>
                <div class="arbitration-info-content">
                    <div class="info-content-top">
                        <div class="bar">
                            <div class="text-left">订单编号</div>
                            <div class="text-left">商品名称</div>
                            <div class="text-left">所属游戏</div>
                            <div class="text-left">账号类型</div> 
                            <div class="text-left">客户端</div>
                            <div class="text-left">服务器</div>
                            <div class="text-left">价格</div>
                        </div>
                        <div class="matter">
                            <div class="text-right" v-text="order_info.order_sn"></div>
                            <div class="text-right" v-text="order_info.goods_title"></div>
                            <div class="text-right" v-text="order_info.game_name"></div>
                            <div class="text-right" v-if="order_info.deal_type==1">成品号</div>
                            <div class="text-right" v-else-if="order_info.deal_type==5">物资号</div>
                            <div class="text-right" v-else>代练号</div>
                            <div class="text-right" v-text="order_info.platform_name"></div>
                            <div class="text-right" v-if="order_info.server_name != null" v-text="order_info.area_name + '>'+ order_info.server_name"></div>
                            <div class="text-right" v-else v-text="order_info.area_name"></div>
                            <div class="text-right" v-text="order_info.server"></div>
                            <div class="text-right red-color">￥<span v-text="order_info.order_amount"></span></div>
                        </div>
                    </div>
                    <!-- 分期未还清 -->
                    <div class="info-content-bottom" v-text="arbData.arbCause" v-if="false"></div>
                </div>
            </div>

            <div class="arbitration-cell">
                <div class="arbitration-info-top">
                    <img src="../../../static/img/goodscreen/vertical.png" alt="">
                    <span>请提交仲裁信息</span>
                </div>
                <div class="arbitration-info-content">
                    <div class="arbitration-strip">
                        <span class="arbbar">手机号</span>
                        <input type="number" placeholder="请填写您的绑定手机号" v-model="phone">
                        <span class="arbbar-right orange" v-if="false">前往认证</span>
                    </div>
                    <div class="arbitration-strip" @click="showPop">
                        <span class="arbbar">仲裁事件</span>
                        <div class="arbbar-right">
                            <span v-text="arbitrate_tit"></span>
                            <img class="nextBtn" src="../../../static/img/order/next.png" alt="">
                        </div>
                    </div>
                    <div class="arb-strip">
                        <span class="arbbar">情况描述</span>
                        <textarea name="des" id="arbdes" cols="25" rows="2" placeholder="请对当前情况进行说明，方便客服处理" v-model="des"></textarea>
                    </div>
                    <div class="arb-strip addImgBox">
                        <div class="uptitle">
                            <span class="titleText">上传截图</span>
                            <span class="red-color">（单张图片不能超过2M，最多可上传5张图片）</span>
                        </div>
                        <div class="upbottom">
                            <div class="img-cell"  v-for="(item,index) in upimgAll.imgSrc">
                                <img :src="item.base64" alt="">
                                <div class="delImg" @click="delImg(index)">
                                    <img src="../../../static/img/order/delete_img.png" alt="">
                                </div>
                            </div>
                            <div class="upimg-cell">
                                <img src="../../../static/img/order/add_img.png" alt="">
                                <input type="file" id="upImg" accept="image/*" multiple @change="addImg">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="okBtn" @click="putData">提交申请</div>
        <!-- 仲裁事由 -->
        <div id="sheet" class="mui-popover mui-popover-bottom mui-popover-action">
            <!-- 可选择菜单 -->
            <ul class="pop-view">
                <li class="pop-view-tit option-gray">
                    <div>请选择事由</div>
                </li>
                <!-- 商品类型 -->
                <li class="option-black" v-for="item in arbitrate_info" @click="seleInfo(item.arbitrate_type)" v-text="item.title"></li>
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
    import Header from '@/components/home-page/Header'//头部
    export default {
        name:'Arbitration',
        components:{
            Header,
        },
        data(){
            return {
                componentsData:{
                    head_data:{
                        show_type:2,
                        right_icon:2,
                        tit_text:"申请仲裁",
                        showBack:false,//显示后退按钮
                        showLogo:2,//不显示头部log
                        showShare:3,//1搜索2分享
                        showBg:true,//是否显示背景
                    }
                },
                phone:'',
                des:'',
                arbitrate_info:{},
                order_info:{},
                arbitrate_tit:'请选择事由',
                arbitrate_type:'',
                upimgAll:{
                        imgSrc:[],
                        imgData:{
                            accept:' image/jpeg, image/png, image/jpg',
                        },
                    }
            }
        },
        methods:{
            addImg(event){
                var that = this;
                var imgSrcArr =  that.upimgAll.imgSrc;
                var len = imgSrcArr.length;
                if(len < 5){
                    var imgArr=event.target.files;
                    var addLen = imgArr.length;
                    var allLen = len + addLen;
                    var addImg = [];//存放图片
                    if(allLen > 5){
                        for(var i = 0;i < (5-len);i++){
                            addImg.push(imgArr[i]);
                        }
                        mui.toast("图片选择超过上限,只保存5张", { duration: "short", type: "div" });
                    }else{
                        addImg = imgArr;
                    }

                    for(var i = 0;i<addImg.length;i++){
                        let type=addImg[i].type;//文件的类型，判断是否是图片  
                        let size=addImg[i].size;//文件的大小，判断图片的大小
                        if(that.upimgAll.imgData.accept.indexOf(type) == -1){
                            mui.toast("请选择我们支持的图片格式！", { duration: "short", type: "div" });
                            return false;  
                        }  
                        if(size>3145728){
                            mui.toast("请选择2M以内的图片！", { duration: "short", type: "div" });
                            return false;  
                        }

                        var reader = new FileReader();
                        reader.readAsDataURL(addImg[i]);

                        var fileName = addImg[i].name;
	                    reader.onload = function(e){
		                	var imgMsg = {
		                		name : fileName,//获取文件名
		                		base64 : this.result   //reader.readAsDataURL方法执行完后，base64数据储存在reader.result里
		                    }
                            imgSrcArr.push(imgMsg);

                        }
                    }   
                }else{
                    mui.toast("图片选择到达上限", { duration: "short", type: "div" });
                }
            },
            delImg(ind){
                var imgList = this.upimgAll.imgSrc;
                imgList.splice(ind,1);
            },
            showPop() {
                mui("#sheet").popover("toggle");
            },
            seleInfo(opt){
                var that = this;
                mui("#sheet").popover("toggle");
                for(var i in that.arbitrate_info){
                    if(opt == that.arbitrate_info[i].arbitrate_type){
                        that.arbitrate_tit = that.arbitrate_info[i].title;
                        that.arbitrate_type = that.arbitrate_info[i].arbitrate_type;
                        break;
                    }
                }
                // console.log(that.arbitrate_type)
            },
            getData(){
                var that = this;
                that.$axios.post(process.env.API_HOST+"arbitrateInfo",{
                    order_id:that.$route.query.order,
                }).then((res)=>{
                    console.log(res);
                    if(res.status == 200){
                        if(res.data.code == 200){
                            that.arbitrate_info = res.data.data.arbitrate_info;
                            that.order_info = res.data.data.order_info;
                        }else{
                            mui.toast(res.data.msg, { duration: "short", type: "div" });
                            that.$router.go(-1);
                        }
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            },
            putData(){
                // 手机
                var that = this;
                var request = {};
                if (that.phone == "") {
                    mui.toast("请输入手机号", { duration: "short", type: "div" });
                    return false;
                } else {
                    var phoneReg = /^1[3-9][0-9]{9}$/g;
                    if (!that.phone.match(phoneReg)) {
                        mui.toast("您输入的手机号不正确", { duration: "short", type: "div" });
                        return false;
                    }
                    request.mobile = that.phone;
                }
                if(!that.arbitrate_type){
                    mui.toast("请选择仲裁事由", { duration: "short", type: "div" });
                    return false;
                }
                request.arbitrate_type = that.arbitrate_type;
                if(!that.des){
                    mui.toast("请输入情况描述", { duration: "short", type: "div" });
                    return false;
                }
                request.reason = that.des;
                if(that.upimgAll.imgSrc.length <= 0){
                    mui.toast("请上传截图", { duration: "short", type: "div" });
                    return false;
                }else{
                    request.images = [];
                    for(var i in that.upimgAll.imgSrc){
                        request.images.push(that.upimgAll.imgSrc[i].base64)
                    }
                }
                request.order_id = that.order_info.order_id;
                that.$axios.post(process.env.API_HOST+"doArbitrate",request).then((res)=>{
                    // console.log(res);
                    if(res.status == 200){
                        if(res.data.code == 200){
                            mui.alert(res.data.msg,'提示','确认',function(){
                                that.$router.go(-1);
                            },'div')
                        }else{
                            mui.toast(res.data.msg, { duration: "short", type: "div" });
                            that.$router.go(-1);
                        }
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            }
        },
        mounted(){
            if (getIos()) {
                $('#upImg').removeAttr("capture");
            }
            function getIos() {
                var ua=navigator.userAgent.toLowerCase();
                if (ua.match(/iPhone\sOS/i) == "iphone os") {
                    return true;
                }else {
                    return false;
                }
            }
            this.getData()
        }
    }
</script>
<style scoped>
    .arbitration-content{
        padding:.2rem;
    }
    
    .arbitration-cell{
        background:#FFFFFF;
        -webkit-border-radius: .1rem;
        -moz-border-radius: .1rem;
        border-radius: .1rem;
        -webkit-box-shadow: .06rem .05rem .09rem #D6D6D6;
        -moz-box-shadow: .06rem .05rem .09rem #D6D6D6;
        box-shadow: .06rem .05rem .09rem #D6D6D6;
        margin-bottom:.2rem;
    }
    
    .arbitration-info-top{
        line-height:.7rem;
        border-bottom:.01rem solid #E5E5E5;
    }
    
    .arbitration-info-top span{
        display: inline-block;
        color:#333333;
        font-size:.28rem;
    }
    .arbitration-info-top img{
        width:.13rem;
        height:.29rem;
        margin-left:.17rem;
        vertical-align: middle;
    }

    .arbitration-info-content{
        padding:0 0 0 .2rem;
        font-size:.24rem;
        color:#666666;
    }
    .info-content-top{
        padding:.3rem 0 .2rem;
    }
    .info-content-bottom{
        line-height: .7rem;
        text-align:center;
        border-top:.01rem solid #E5E5E5;
    }

    .bar,.matter{
        display: inline-block;
        vertical-align: top;
    }
    .bar{
        width:1.3rem;
        color:#999999;
    }
    .matter{
        width:calc(100% - 1.5rem);
    }
    .red-color{
        color:#FF5E5E;
    }
    .arbitration-strip{
        line-height:.9rem;
        padding-right:.2rem;
        border-bottom:.01rem solid #E5E5E5;
    }
    .arbitration-strip span{
        display:inline-block;
    }
    .arbbar{
        display: inline-block;
        width:1.3rem;
        vertical-align: top;
    }
    .arbitration-strip input{
        width:5rem;
        border:none;
        padding:.1rem 0;
        margin:0;
    }
    .nextBtn{
        width:.11rem;
        height:.23rem;
        vertical-align: middle;
    }
    .arbbar-right{
        float:right;
    }
    .arbbar-right span{
        color:#999999;
        vertical-align: middle;
        margin-right:.2rem;
    }
    .arb-strip{
        padding:.3rem 0;
    }
    #arbdes{
        border:none;
        width:5.3rem;
        padding:0;
        font-size:.24rem;
        margin:0;
    }
    .addImgBox{
        padding:.1rem 0;
        border-top:.01rem solid #E5E5E5;
    }
    .upbottom{
        margin-top:.2rem;
    }
    .img-cell{
        width:1.5rem;
        height:1.5rem;
        position:relative;
        display: inline-block;
        margin: 0 .3rem .3rem 0;
    }
    .img-cell img{
        width:1.5rem;
        height:1.5rem;
    }
    .delImg{
        position:absolute;
        top:-0.1rem;
        right:-0.1rem;
        z-index:1;
    }
    .delImg img{
        width:.32rem;
        height:.32rem;
    }
    .upimg-cell{
        vertical-align: top;
        text-align:center;
        width:1.5rem;
        height:1.5rem;
        position:relative;
        display: inline-block;
        margin: 0 .3rem .3rem 0;
        overflow: hidden;
    }
    .upimg-cell img{
        width:1.5rem;
        height:1.5rem;
    }
    #upImg{
        width:1.5rem;
        height:1.5rem;
        position: absolute;
        left:0;
        top:0;
        bottom:0;
        right:0;
        z-index:3;
        opacity: 0;
    }
    /* 提交申请 */
    .okBtn{
        color:#FFFFFF;
        font-size:.28rem;
        margin:.1rem auto .3rem;
        width:6.5rem;
        text-align: center;
        line-height: .8rem;
        -webkit-border-radius: .1rem;
        -moz-border-radius: .1rem;
        border-radius: .1rem;
        -webkit-box-shadow: .06rem .05rem .09rem #FD915F;
        -moz-box-shadow: .06rem .05rem .09rem #FD915F;
        box-shadow: .06rem .05rem .09rem #FD915F;
        background:-webkit-linear-gradient(#FD915F,#FC534A);
        background:-o-linear-gradient(#FD915F,#FC534A);
        background:-moz-linear-gradient(#FD915F,#FC534A);
        background:linear-gradient(to right, #FD915F , #FC534A);
    }
.pop-view {
    margin-top: 10px;
    background: #ffffff;
    text-align: center;
    list-style: none;
}

.pop-view li {
    line-height: 0.9rem;
    border-bottom: 1px solid #e5e5e5;
}

.pop-view a {
    padding: 0;
}

/* 弹出框 */
.option-gray {
    color: #666666;
    font-size: 0.28rem;
}
 
.option-black {
    color: #333333;
    font-size: 0.28rem;
    font-weight: 100;
}


    .orange{
        color:#FE7649 !important;
        text-decoration: underline;
    }
    /* ==========input========= */
    input{
        font-size:.24rem;
    }
    input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{
        -webkit-appearance: none !important;
    }
    input[type="number"]{-moz-appearance: textfield}
    ::-webkit-input-placeholder { 
        color:#999999;
        font-size:.24rem;
    }
    :-moz-placeholder {
        color:#999999;
        font-size:.24rem;
    }
    ::-moz-placeholder { 
        color:#999999;
        font-size:.24rem;
    }
    :-ms-input-placeholder {
        color:#999999;
        font-size:.24rem;
    }
</style>

<style>
 /* scoped 模式 访问不到 */
.mui-toast-container{
    bottom:80px !important;
}
</style>
