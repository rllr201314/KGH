<template>
    <!-- 电子保单 -->
    <div class="wrap">
        <Header v-bind:head_data="head_data"></Header>
        <div class="guaranteeslip-con">
            <div class="guaran-tit">
                <img src="../../../static/img/safe.png" alt="">
            </div>
            <div class="guaran-cell">
                <div class="cell-tit">
                    <span class="red-color">保单基本信息</span>
                    <span class="guBtn" @click="goclaims()">申请理赔</span>
                </div>
                <div class="cell-con">
                    <div class="cell-strip">
                        <span class="left-strip">保单号</span>
                        <span class="right-strip" v-text="orderInfo.assurance_sn"></span>
                    </div>
                    <div class="cell-strip">
                        <span class="left-strip">产品名称</span>
                        <span class="right-strip">网络虚拟财产保险</span>
                    </div>
                    <div class="cell-strip">
                        <span class="left-strip">投保时间</span>
                        <span class="right-strip"><span v-text="orderInfo.start_time"></span>至<span v-text="orderInfo.end_time"></span></span>
                    </div>
                    <div class="cell-strip">
                        <span class="left-strip">保单状态</span>
                        <span class="right-strip">出单成功</span>
                    </div>
                    <div class="cell-strip">
                        <span class="left-strip">保险期限</span>
                        <span class="right-strip" >中国人保与杭州古都科技有限公司灵石县分公司共同为客户提供一年的保障</span>
                    </div>
                    <div class="cell-strip">
                        <span class="left-strip">受益人</span>
                        <span class="right-strip" v-text="orderInfo.username"></span>
                    </div>
                    <div class="cell-strip">
                        <span class="left-strip">联系电话</span>
                        <span class="right-strip" v-text="orderInfo.phone_number"></span>
                    </div>
                </div>
            </div>
            <div class="guaran-cell">
                <div class="cell-tit">
                    <span class="red-color">商品信息</span>
                </div>
                <div class="cell-con">
                    <div class="cell-strip">
                        <span class="left-strip">保险金额</span>
                        <span class="right-strip"><span v-text="orderInfo.money"></span>元</span>
                    </div>
                    <div class="cell-strip">
                        <span class="left-strip">免赔额</span>
                        <span class="right-strip">每次事故绝对免赔额为200元或10%，两者以高者为准。</span>
                    </div>
                    <div class="cell-strip">
                        <span class="left-strip">投保支付费用</span>
                        <span class="right-strip"><span v-text="orderInfo.end_money"></span>元</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
export default {
    name: "GuaranteeSlip",
    components: {
        Header
    },
    data() {
        return {
            head_data:{
                show_type:2,
                tit_text:'电子保单',
                right_icon: 2,
            },
            orderInfo:{},
        };
    },
    methods:{
        getData(){
            var that = this;
            that.$axios.post(process.env.API_HOST+"assurance",{
                order_id:that.$route.query.order
            }).then((res)=>{
                // console.log(res)
                if(res.status == 200){
                    if(res.data.code == 200){
                        that.orderInfo = res.data.data;
                    }
                }
            }).catch((err)=>{
                console.log(err)
            })
        },
        goclaims(){
            this.$router.push({name:'ApplySettlement',query:{o_id:this.orderInfo.order_id}})
        }
    },
    mounted(){
        this.getData();
    }
};
</script>
<style scoped>
.guaranteeslip-con{
    padding:.2rem;
}
.guaran-tit {
    width: 3.57rem;
    height: 0.53rem;
    margin-bottom:.15rem;
}
.guaran-tit img {
    width: 3.57rem;
    height: 0.53rem;
}
.guaran-cell{
    background: #ffffff;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    margin-bottom: 0.2rem;
    padding-left:.2rem;
}
.cell-tit{
    line-height: .7rem;
    font-size:.28rem;
    position: relative;
    border-bottom:1px solid #E5E5E5;
}
/* .red-color{
    color:#FE7649;
} */
.guBtn{
    display: inline-block;
    width:1.1rem;
    height:.44rem;
    line-height:.44rem;
    -webkit-border-radius: 0.04rem;
    -moz-border-radius: 0.04rem;
    border-radius: 0.04rem;
    text-align:center;
    color:#ffffff;
    background:#C6C6C6;
    font-size:.22rem;
    position: absolute;
    top:calc(50% - 0.22rem);
    right:.2rem;
}

.cell-con{
    padding:.2rem 0;
    font-size:.26rem;
}
.cell-strip{
    line-height: .45rem;
}
.cell-strip span{
    display: inline-block;
}
.left-strip{
    width:1.7rem;
    color:#666666;
}
.right-strip{
    vertical-align: top;
    width:calc(100% - 2rem);
    color:#333333;
}
</style>
