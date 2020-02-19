<template>
    <!-- 申请理赔 -->
    <div class="wrap">
        <Header v-bind:head_data="head_data"></Header>
        <div class="apply-con">
            <div class="apply-cell">
                <div class="cell-tit">
                    <img src="../../../static/image/goodscreen/vertical.png" alt="">
                    <span>请提交理赔申请信息</span>
                </div>
                <div class="cell-con">
                    <div class="sell-strip">
                        <span class="sell-lefttext">手机号</span>
                        <span v-text="mobile"></span>
                    </div>
                    <div class="sell-strip" @click="showOpt">
                        <span class="sell-lefttext">理赔事由</span>
                        <div class="right-opt">
                            <span v-text="type"></span>
                            <img src="../../../static/img/order/next.png" alt="">
                        </div>
                    </div>
                    <div class="sell-strip">
                        <span class="sell-des">商品描述</span>
                        <textarea name="des" id="arbdes" cols="25" rows="3" placeholder="请对商品进行描述(200字以内)" v-model="des" maxlength="200"></textarea>
                    </div>
                    <div class="sell-strip">
                        <div class="sell-strip-title">
                            <span>上传截图</span>
                            <span class="red-color">（单张图片不能超过10M,最多可上传5张图片）</span>
                        </div>
                        <div class="upimg-content">
                            <div class="img-cell" v-for="(item,index) in upImgAll.imgSrc">
                                <img :src="item" alt="">
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
        <div class="nextBtn" @click="subData">提交申请</div>
        <!-- 分享弹出框 -->
        <div id="sheet" class="mui-popover mui-popover-bottom mui-popover-action">
            <!-- 可选择菜单 -->
            <ul class="pop-view">
                <li v-for="item in sele_type" v-text="item.title" @click="seleTypeFn(item.assurance_type)"></li>
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
    name: "ApplySettlement",
    components: {
        Header
    },
    data() {
        return {
            head_data:{
                show_type: 2,
                tit_text: '申请理赔',
                right_icon: 2,
            },
            o_id:null,
            mobile:null,
            type:'请选择事由',
            id:null,
            sele_type:null,
            des:'',
            upImgAll: {
                imgSrc: [],
                imgData: {
                    accept: "image/gif, image/jpeg, image/png, image/jpg"
                }
            }
        };
    },
    methods: {
        showOpt(){
            mui("#sheet").popover("toggle");
        },
        seleTypeFn(key){
            mui("#sheet").popover("toggle");
            var that = this;
            for(var i in that.sele_type){
                if(key == that.sele_type[i].assurance_type){
                    that.type = that.sele_type[i].title;
                    that.id = key;
                    break;
                }
            }
        },
        // 添加图片
        addImg(event) {
            var that = this;
            var imgSrcArr = that.upImgAll.imgSrc;
            var imgLen = imgSrcArr.length;
            if (imgLen >= 5) {
               mui.toast("图片选择到达上限", { duration: "short", type: "div" });
            } else if (imgLen < 5) {
                var imgArr = [];
                var fileLen = event.target.files.length;
                var allLen = imgLen + fileLen;
                if (allLen > 5) {
                    var addImg = 5 - imgLen;
                    for (var i = 0; i < addImg; i++) {
                        imgArr.push(event.target.files[i]);
                    }
                    mui.toast("图片选择超过上限,只保存5张", { duration: "short", type: "div" });
                }else {
                    imgArr = event.target.files;
                }
                for (var i = 0; i < imgArr.length; i++) {
                    let type = imgArr[i].type; //文件的类型，判断是否是图片
                    let size = imgArr[i].size; //文件的大小，判断图片的大小
                    if (that.upImgAll.imgData.accept.indexOf(type) == -1) {
                        mui.toast("请选择我们支持的图片格式！", { duration: "short", type: "div" });
                        return false;
                    }
                    if (size > 2097152) {
                        mui.toast("请选择2M以内的图片！", { duration: "short", type: "div" });
                        return false;
                    }
                    var reader = new FileReader();
                    reader.readAsDataURL(imgArr[i]);

                    var fileName = imgArr[i].name;
                    reader.onload = function(e) {
                        // var imgMsg = {
                        //     name: fileName, //获取文件名
                        //     img_url: this.result //reader.readAsDataURL方法执行完后，base64数据储存在reader.result里
                        // };
                        imgSrcArr.push(this.result);
                    };
                }
            }
        },
        delImg(ind) {
            var imgList = this.upImgAll.imgSrc;
            imgList.splice(ind, 1);
        },
        getconfig(){
            var that = this;
            that.$axios.post(process.env.API_HOST+'assuranceType').then((res)=>{
                if(res.status == 200){
                    if(res.data.code == 200){
                        that.sele_type = res.data.data;
                    }
                }
            }).catch((err)=>{
                console.log(err);
            })
        },
        subData(){
            var that = this;
            if(that.id == ''){
                mui.toast("理赔事件选择不能为空", { duration: "short", type: "div" });
                return false;
            }else if(that.des == ""){
                mui.toast("理赔原因不能为空", { duration: "short", type: "div" });
                return false;
            }else if(that.upImgAll.imgSrc == ''){
                mui.toast("理赔图片不能为空", { duration: "short", type: "div" });
                return false;
            }
            that.$axios.post(process.env.API_HOST+'doAssurance',{
                order_id:that.o_id,
                assurance_type:that.id,
                mobile:that.mobile,
                reason:that.des,
                images:that.upImgAll.imgSrc
            }).then((res)=>{
                if(res.status == 200){
                    if(res.data.code == 200){
                        mui.alert(res.data.msg,'提示','确认',function(){
                            that.$router.go(-1);
                        },'div');
                    }else{
                        mui.alert(res.data.msg,'提示','确认','','div');
                    }
                }
            }).catch((err)=>{
                console.log(err);
            })
        }
    },
    mounted(){
        // 图片多选 判断手机类型
        if (getIos()) {
            $("#upImg").removeAttr("capture");
        }
        function getIos() {
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/iPhone\sOS/i) == "iphone os") {
                return true;
            } else {
                return false;
            }
        }
        
        this.getconfig();
        this.mobile = this.$store.state.mobile;
        if(this.$route.query.o_id){
            this.o_id = this.$route.query.o_id;
        }else{
            this.$router.go(-1);
        }
    }
};
</script>
<style scoped>
.apply-con {
    padding: 0.2rem;
}
.apply-cell {
    background: #ffffff;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    margin-bottom: 0.2rem;
}
.cell-tit {
    line-height: 0.7rem;
    border-bottom: 0.01rem solid #e5e5e5;
}
.cell-tit span {
    display: inline-block;
    color: #333333;
    font-size: 0.28rem;
}
.cell-tit img {
    width: 0.08rem;
    height: 0.25rem;
    margin: 0 0 0 0.17rem;
    vertical-align: middle;
    border-radius: .1rem;
}
.cell-con {
    padding-left: 0.2rem;
}
.sell-strip {
    font-size: 0.26rem;
    color: #666666;
    border-bottom: 0.01rem solid #e5e5e5;
    padding-right: 0.2rem;
    position: relative;
}
.sell-lefttext {
    width: 1.3rem;
    line-height: 0.9rem;
    display: inline-block;
}
.right-opt {
    /* width: 3rem; */
    text-align: right;
    font-size: 0.24rem;
    color: #999999;
    display: inline-block;
    position: absolute;
    right: 0.2rem;
    top: 0;
}
.right-opt img {
    width: 0.13rem;
    height: 0.24rem;
    vertical-align: middle;
    margin-left: 0.2rem;
    margin-top: -0.03rem;
}
.right-opt span {
    vertical-align: middle;
    display: inline-block;
    line-height: 0.9rem;
}
.orange-color {
    text-decoration: underline;
    color: #fe7649;
}
/* .red-color {
    color: #ff5e5e;
} */
.sell-des {
    vertical-align: top;
    width: 1.3rem;
    margin: 0.25rem 0 0;
    display: inline-block;
}
#arbdes {
    border: none;
    width: 5.3rem;
    padding: 0;
    font-size: 0.24rem;
    margin: 0.25rem 0 .2rem;
    vertical-align: middle;
}

/* 上传图片 */
.upimg-content {
    padding: 0.2rem 0 0;
}
.img-cell {
    width: 1.5rem;
    height: 1.5rem;
    position: relative;
    display: inline-block;
    margin: 0 0.3rem 0.3rem 0;
}
.img-cell img {
    width: 1.5rem;
    height: 1.5rem;
}
.delImg {
    position: absolute;
    top: -0.1rem;
    right: -0.1rem;
    z-index: 1;
}
.delImg img {
    width: 0.32rem;
    height: 0.32rem;
}
.upimg-cell {
    vertical-align: top;
    text-align: center;
    width: 1.5rem;
    height: 1.5rem;
    position: relative;
    display: inline-block;
    margin: 0 0.3rem 0.3rem 0;
    padding: 0;
    overflow: hidden;
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
    background: -webkit-linear-gradient(#fd915f, #ffa303);
    background: -o-linear-gradient(#fd915f, #ffa303);
    background: -moz-linear-gradient(#fd915f, #ffa303);
    background: linear-gradient(to right, #fd915f, #ffa303);
}

/* ==========input========= */
input {
    margin: 0;
    padding: 0.1rem;
    font-size: 0.26rem;
    border: none;
    width: 3rem;
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

.pop-view {
    margin-top: 10px;
    background: #ffffff;
    list-style: none;
    font-size: 0.26rem;
    color: #666666;
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
