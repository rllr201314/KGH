<template>
    <!-- 已签约合同 -->
    <div class="wrap">
        <Header v-bind:head_data="head_data"></Header>
        <div class="signature-content">
            <div class="signature-title">共<span v-text="num"></span>份合同待签署</div>
            <div class="signature-cell" v-for="(item,index) in signatureData" :key="index" @click="sign(item.contract_id)">
                <div class="left-cell">
                    <img src="../../../../static/img/my-center/signature.png" alt="">
                </div>
                <div class="right-cell">
                    <div class="right-top">
                        <span v-text="item.contract_title"></span>
                        <span class="time gray-color" v-text="item.create_time"></span>
                    </div>
                    <div class="right-bot">
                        <img src="../../../../static/img/my-center/write.png" alt="">
                        <span class="gray-color" v-text="item.company_name"></span>
                        <span class="sian-type">已签署</span>
                    </div>
                </div>
            </div>
        </div>
        <NoData v-if="showNoData"></NoData>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
import NoData from "@/components/multi/NoData";
export default {
    name: "Signed",
    components: {
        Header,
        NoData
    },
    data() {
        return {
            head_data:{
                show_type:2,
                right_icon:2,
                tit_text:"已签约合同",
            },
            num:'',
            signatureData:[],
            showNoData: false,
        };
    },
    methods:{
        getData(){
            var that = this;
            that.$axios.post(process.env.API_HOST+"endContract").then((res)=>{
                // console.log(res);
                if(res.status == 200){
                    if(res.data.code == 200){
                        that.num = res.data.data.length;
                        if(res.data.data != ''){
                            that.signatureData = res.data.data;
                            YHT.init(that.signatureData[0].app_id,that.getInit);
                        }else{
                            that.showNoData = true;
                        }
                    }
                }
            }).catch((err)=>{
                console.log(err)
            })
        },
        getInit(obj){
            var that = this;
            that.$axios.post(process.env.API_HOST+"contractToken").then((res)=>{
                if(res.status == 200){
                    if(res.data.code == 200){
                        if(res.data.data.token){
                            YHT.setToken(res.data.data.token);
                            //重新设置token，从请求头获取token
                            YHT.do(obj);//调用此方法，会继续执行上次未完成的操作
                        }else{
                            that.showNoData = true;
                        }
                    }
                }
            }).catch((err)=>{
                console.log(err);
            })
        },
        sign(contract_id){
            var that = this;
            //合同签署页面
            YHT.queryContract(function successFun(url) {
                    window.open(url);
                },
                function failFun(data) {
                    console.log(data);
                },
                contract_id
            );

        },
    },
    mounted(){
        this.getData();
    },
};
</script>
<style scoped>
.signature-content {
    padding: 0.2rem;
}
.signature-title{
    font-size:.28rem;
    color:#333333;
    line-height:.5rem;
}
.signature-cell {
    line-height: .4rem;
    font-size:.24rem;
    background: #ffffff;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    margin:.1rem 0 .2rem;
    padding:.2rem;
}

.gray-color{
    color:#999999;
}
.left-cell,.right-cell{
    display: inline-block;
    vertical-align: middle;
}
.right-cell{
    width:calc(100% - 0.8rem);
}
.left-cell img{
    width:.52rem;
    height:.6rem;
    margin-right:.2rem;
}
.right-top{
    font-size:.26rem;
    color:#333333;
    position: relative;
}
.time{
    font-size:.24rem;
    position: absolute;
    top:0;
    right:0;
}
.right-bot{
    position: relative;
}
.right-bot img{
    width:.24rem;
    height:.23rem;
    vertical-align: middle;
}
.right-bot span{
    vertical-align: middle;
}
.sian-type{
    font-size:.2rem;
    line-height: .3rem;
    color:#ffffff;
    background:#45C773;
    padding:.05rem .1rem;
    position: absolute;
    top:.1rem;
    right:0;
}
</style>
