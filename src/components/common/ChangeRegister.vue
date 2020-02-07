<template>
    <div class="wrap">
        <Header :head_data="head_data"></Header>
        <div class="content">
            <div class="cell">
                <span class="name">游戏选择：</span>
                <input type="disabled" disabled v-model="gameName">
            </div>
            <div class="cell">
                <span class="name">订单号：</span>
                <input type="disabled" disabled v-model="orderSn">
            </div>
            <div class="cell">
                <span class="name">运行平台：</span>
                <input type="text" placeholder="必填" v-model="submitData.platform_name">
            </div>
            <div class="cell">
                <span class="name">游戏账号：</span>
                <input class="mui-input-clear" type="text" placeholder="必填" v-model="submitData.account">
            </div>
            <div class="cell">
                <span class="name">登录密码：</span>
                <input type="password" placeholder="必填" v-model="submitData.password">
            </div>
            <div class="cell">
                <span class="name">实名信息：</span>
                <div @click="selectBindFn(1)"><img :src="realNameInfo.userNum?'../../../static/img/pay/choose.png':'../../../static/img/pay/noChoose.png'" alt="">身份证</div>
                <div @click="selectBindFn(2)"><img :src="realNameInfo.email?'../../../static/img/pay/choose.png':'../../../static/img/pay/noChoose.png'" alt="">邮箱</div>
                <div @click="selectBindFn(4)"><img :src="realNameInfo.nBind?'../../../static/img/pay/choose.png':'../../../static/img/pay/noChoose.png'" alt="">无</div>
            </div>
            <div class="cell">
                <span class="name">安全手机：</span>
                <input type="text" placeholder="必填" v-model="submitData.safe_phone">
            </div>
            <div class="cell">
                <span class="name">绑定邮箱：</span>
                <input type="text" v-model="submitData.bind_email">
            </div>
            <div class="cell">
                <span class="name">关联手机：</span>
                <input type="text" placeholder="必填" v-model="submitData.union_mobile">
            </div>
            <div class="cell">
                <span class="name">安全锁：</span>
                <input type="text" placeholder="必填" v-model="submitData.safe_lock">
            </div>
        </div>
        <div class="nextBtn" @click="confirmFn">确认并提交</div>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
export default {
    name: "ChangeRegister",
    components: {
        Header
    }, 
    data() {
        return {
            head_data:{
                show_type:2,
                right_icon:'',
                tit_text:'换绑登记',
                back:1,
            },
            realNameInfo:{
                userNum:false,
                email:false,
                nBind:true,
            },
            gameName:"",
            orderSn:'',
            submitData:{
                bind_str:'',
                account:'',
                password:'',
                platform_name:'',
                safe_phone:'',
                bind_email:'',
                union_mobile:'',
                safe_lock:'',
                account_bind:2,
            }
        };
    },
    methods:{
        selectBindFn(val){
            var that = this;
            for(var i in that.realNameInfo){
                that.realNameInfo[i] = false;
            }
            if(val == 1){
                that.realNameInfo.userNum = true;
                that.submitData.account_bind = 1;
            }else if(val == 2){
                that.realNameInfo.email = true;
                that.submitData.account_bind = 1;
            }else if(val == 4){
                that.realNameInfo.nBind = true;
                that.submitData.account_bind = 2;
            }
        },
        getData(str){
            var that = this;
            that.$axios.post(`${that.baseURL}gatherBindInfo`,{bind_str:str}).then((res) => {
                if(res.status == 200){
                    if(res.data.code == 200){
                        that.gameName = res.data.data.game_name;
                        that.orderSn = res.data.data.order_sn;
                    }else{
                        mui.alert(res.data.msg,"提示","确认","","div");
                    }
                }
            }).catch((err) => {
                console.log(err);
            })
        },
        submitFn(data){
            var that = this;
            that.$axios.post(`${that.baseURL}bindInfo`,data).then((res) => {
                if(res.status == 200){
                    if(res.data.code == 200){
                        mui.alert(res.data.msg,"提示","确认",function(){
                            that.$router.push({path:'/'})
                        },"div");
                    }else{
                        mui.alert(res.data.msg,"提示","确认","","div");
                    }
                }
            }).catch((err) => {
                console.log(err);
            })
        },
        confirmFn(){
            var data = this.submitData;
            if(data.platform_name == ""){
                mui.toast("运行平台为空", { duration: "short", type: "div" });
                return false;
            }else if(data.account == ""){
                mui.toast("游戏平台为空", { duration: "short", type: "div" });
                return false;
            }else if(data.password == ""){
                mui.toast("密码为空", { duration: "short", type: "div" });
                return false;
            }else if(data.account_bind == ""){
                mui.toast("请选择实名信息", { duration: "short", type: "div" });
                return false;
            }else if(data.safe_phone == ""){
                mui.toast("安全手机为空", { duration: "short", type: "div" });
                return false;
            }else if(data.union_mobile == ""){
                mui.toast("关联手机为空", { duration: "short", type: "div" });
                return false;
            }else if(data.safe_lock == ""){
                mui.toast("安全锁为空", { duration: "short", type: "div" });
                return false;
            }
            this.submitFn(data);
        }
    },
    mounted(){
        if(this.$route.params.bind_str){
            this.getData(this.$route.params.bind_str);
            this.submitData.bind_str = this.$route.params.bind_str;
        }else{
            this.$router.go(-1);
        }
    }
};
</script>
<style lang="scss" scoped>
.wrap {
    background: #ffffff;
}
.content{
    padding-top:.43rem;
}
.cell {
    font-size: 0.26rem;
    color:#666666;
    margin-bottom:.2rem;
    input {
        width: 4.14rem;
        height: 0.6rem;
        border-radius: 0.05rem;
        border: 1px solid #d2d2d2;
        vertical-align: middle;
        margin:0;padding: 0 .2rem;
    }
    span{
        vertical-align: middle;
        display: inline-block;
        width:2.13rem;text-align: right;
    }
    div{
        display:inline-block;
        margin-right: .4rem;
        img{
            width:.35rem;height:.35rem;
            vertical-align: middle;
            margin-right:.2rem;
        }
    }
}

/* 下一步 */
.nextBtn {
    color: #ffffff;
    font-size: 0.28rem;
    margin: 0.4rem auto 0;
    width: 5.5rem;
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
</style>
