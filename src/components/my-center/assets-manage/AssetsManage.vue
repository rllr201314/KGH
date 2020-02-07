<template>
    <!-- 资产明细 -->
    <div class="wrap">
        <Header v-bind:head_data="comData.head_data"></Header>
        <div class="manage-content">
            <div class="manage-cell assets-cell">
                <div class="detail-title">
                    <div @click="goDetail">
                        <img src="../../../../static/img/my-center/asset_ico.png" alt="">
                        <span>收支明细</span>
                    </div>
                </div>
                <div class="detail-content">
                    <div class="price-title">可用余额</div>
                    <div class="price">￥<span v-text="assetsData.total_money"></span></div>
                    <div class="deposit" @click="goShow">提现</div>
                </div>
            </div>
            <div class="manage-cell">
                <div class="manage-strip" @click="goFrost">
                    <span class="manage-lefttext">提现冻结资金</span>
                    <div class="right-opt" >
                        <span>￥<span v-text="assetsData.limit_money"></span></span>
                        <img src="../../../../static/img/order/next.png" alt="">
                    </div>
                </div>
                <div class="manage-strip" @click="goPledge">
                    <span class="manage-lefttext">押金</span>
                    <div class="right-opt" >
                        <span>￥0</span>
                        <img src="../../../../static/img/order/next.png" alt="">
                    </div>
                </div>
            </div>
            <div class="manage-cell">
                <div class="manage-strip" @click="addCard">
                    <span class="manage-lefttext">提现账户设置</span>
                    <div class="right-opt" >
                        <span v-if="assetsData.is_bank == 1">已绑定</span>
                        <span v-else>未绑定</span>
                        <img src="../../../../static/img/order/next.png" alt="">
                    </div>
                </div>
                <div class="manage-strip" @click="goVoucher">
                    <span class="manage-lefttext">我的代金券</span>
                    <div class="right-opt" >
                        <span>您有0张代金券可使用</span>
                        <img src="../../../../static/img/order/next.png" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Header from '@/components/home-page/Header'
    export default {
        name:'AssetsManage',
        components:{
            Header,
        },
        data(){
            return {
                comData:{
                    head_data:{
                        show_type:2,
                        right_icon:2,
                        tit_text:"资产管理",
                    }
                },
                assetsData:{}
            }
        },
        methods:{
            // 管理 银行卡
            addCard(){
                var that = this;
                // 判断有有没有绑定银行卡
                if(that.assetsData.is_bank == 1){
                    that.$router.push({name:'CardManage',query:{type:that.assetsData.is_bank,identify:that.assetsData.is_identify}})
                }else if(that.assetsData.is_bank == 2){
                    that.$router.push({name:'UserAuthentication',query:{type:that.assetsData.is_identify}})//没有绑定银行卡
                }
            },
            // 提现冻结资金
            goFrost(){
                this.$router.push({name:'Frost'})
            },
            goPledge(){
                var that = this;
                if(that.assetsData.is_identify == 1){
                    if(that.assetsData.is_bank == 1){
                        that.$router.push({name:'WithdrawDeposit',query:{type:that.assetsData.is_bank,status:2}})
                    }else{
                        mui.toast("请先设置提现账户", {duration: "short",type: "div"});
                    }
                }else{
                    that.$router.push({name:'UserAuthentication',query:{type:that.assetsData.is_identify}})
                }
            },
            getData(){
                var that = this;
                that.$axios.post(process.env.API_HOST+"incomeInfo").then((res)=>{
                    // console.log(res);
                    if(res.status == 200){
                        if(res.data.code == 200){
                            that.assetsData = res.data.data;
                        }
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            },
            // 收支明细
            goDetail(){
                this.$router.push({name:'ReceiptsAll'})
            },
            // 提现
            goShow(){
                var that = this;
                if(Number(that.assetsData.total_money) <= 0){
                    mui.toast('可提现金额不足', {duration: "short",type: "div"});
                }else{
                    if(that.assetsData.is_identify == 1){
                        if(that.assetsData.is_bank == 1){
                            that.$router.push({name:'WithdrawDeposit',query:{type:that.assetsData.is_bank}})
                        }else{
                            mui.toast("请先设置提现账户", {duration: "short",type: "div"});
                            that.$router.push({name:'UserAuthentication',query:{type:that.assetsData.is_identify}})
                        }
                    }else{
                        that.$router.push({name:'UserAuthentication',query:{type:that.assetsData.is_identify}})
                    }
                }
            },
            goVoucher(){
                this.$router.push({name: "Voucher"});
            }
        },
        mounted(){
            this.getData();
        }
    }
</script>
<style scoped>
    .manage-content{
        padding:.2rem;
    }
    .manage-cell{
        background:#FFFFFF;
        -webkit-border-radius: .1rem;
        -moz-border-radius: .1rem;
        border-radius: .1rem;
        -webkit-box-shadow: .06rem .05rem .09rem #D6D6D6;
        -moz-box-shadow: .06rem .05rem .09rem #D6D6D6;
        box-shadow: .06rem .05rem .09rem #D6D6D6;
        margin-bottom:.2rem;
        padding-left:.2rem;
    }
    .assets-cell{
        padding:0 0 .5rem 0;
    }
    .detail-title{
        color:#999999;
        font-size:.24rem;
        padding:.2rem;
    }
    .detail-title div{
        display: inline-block;
    }
    .detail-title img{
        width:.21rem;
        height:.22rem;
        vertical-align: middle;
    }
    .detail-title span{
        vertical-align: middle;
    }
    .detail-content{
        text-align: center;
    }
    .price-title{
        color:#999999;
        font-size:.26rem;
    }
    .price{
        color:#333333;
        font-size:.46rem;
        margin-top:.1rem;
    }
    .deposit{
        width:1.1rem;
        line-height: .44rem;
        color:#FFFFFF;
        font-size:.22rem;
        background:#FFA303;
        margin:.17rem auto 0;
        -webkit-border-radius: .04rem;
        -moz-border-radius: .04rem;
        border-radius: .04rem;
        -webkit-box-shadow: .01rem .01rem .09rem #FE7649;
        -moz-box-shadow: .01rem .01rem .09rem #FE7649;
        box-shadow: .01rem .01rem .09rem #FE7649;
    }
    .manage-strip{
        font-size:.26rem;
        color:#666666;
        border-bottom:.01rem solid #E5E5E5;
        padding-right:.2rem;
        position: relative;
    }
    .manage-lefttext{
        margin-right:.1rem;
        line-height: .9rem;
        display: inline-block;
    }
    .right-opt{
        text-align: right;
        position: absolute;
        right:.2rem;
        top:0;
        line-height: .9rem;
        color:#333333;
    }
    .right-opt span{
        vertical-align: middle;
    }
    .right-opt img{
        width:.13rem;
        height:.24rem;
        margin-top:-.03rem;
        margin-left:.18rem;
        vertical-align: middle;
    }
</style>
