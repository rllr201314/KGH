<template>
    <!-- 冻结资产明细 -->
    <div class="wrap">
        <Header v-bind:head_data="comData.head_data"></Header>
        <div class="frost-content">
            <div class="frost-cell">
                <div class="frost-strip" v-for="item in frostData">
                    <div class="frost-strip-tit">冻结金额</div>
                    <div class="frost-strip-cen">
                        <!-- <span class="cen-ico" :class="item.issuc?'green-bg':'red-bg'"  v-text="item.ico"></span> -->
                        <span v-if="item.status == 1" class="cen-ico yellow-bg">提现中</span>
                        <span v-if="item.status == 2"  class="cen-ico green-bg">提现成功</span>
                        <span v-if="item.status == 3"  class="cen-ico red-bg">提现失败</span>
                        <span class="time" v-text="item.create_time"></span>
                        <span class="price"><span v-text="item.out_money"></span>元</span>
                    </div>
                    <div class="frost-strip-bot">
                        <span>收款账号：</span>
                        <span class="remark" v-text="item.account_name"></span>
                        <span class="remark" v-text="item.bank_account"></span>
                    </div>
                    <div class="frost-strip-bot" v-if="item.reject_reason">
                        <span>备注：</span>
                        <span class="remark" v-text="item.reject_reason"></span>
                    </div>
                </div>
            </div>
        </div>
        <NoData class="nodata" v-if="showNoData"></NoData>
    </div>
</template>
<script>
import Header from '@/components/home-page/Header'
import NoData from "@/components/multi/NoData";
    export default {
        name:'Frost',
        components:{
            Header,
            NoData
        },
        data(){
            return {
                comData:{
                    head_data:{
                        show_type:2,
                        right_icon:2,
                        tit_text: "冻结资金明细",
                        showBack:false,
                        showLogo:2,//显示头部title文字
                        showShare:3,//1搜索2分享3菜单
                        showBg:true,//是否显示背景
                    }
                },
                frostData:[],
                showNoData:false,
            }
        },
        methods:{
            getData(){
                var that = this;
                that.$axios.post(process.env.API_HOST+'withdrawInfo').then((res)=>{
                    // console.log(res);
                    if(res.status == 200){
                        if(res.data.code == 200){
                            if(res.data.data != ''){
                                that.showNoData = false;
                                that.frostData = res.data.data;
                            }else{
                                that.showNoData = true;
                            }
                        }
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            }
        },
        mounted(){
            this.getData();
        }
    }
</script>
<style scoped>
    .frost-content{
        padding:.2rem;
    }
    .frost-cell{
        background:#FFFFFF;
        -webkit-border-radius: .1rem;
        -moz-border-radius: .1rem;
        border-radius: .1rem;
        -webkit-box-shadow: .06rem .05rem .09rem #D6D6D6;
        -moz-box-shadow: .06rem .05rem .09rem #D6D6D6;
        box-shadow: .06rem .05rem .09rem #D6D6D6;
        padding-left:.2rem;
    }
    .frost-strip{
        color:#333333;
        padding:.2rem 0;
        border-bottom:.01rem solid #E5E5E5;
    }
    .frost-strip-tit{
        font-size:.28rem;
        line-height: .4rem;
    }
    .frost-strip-cen{
        line-height: .5rem;
        position: relative;
    }
    .frost-strip-cen span{
        display: inline-block;
    }
    .cen-ico{
        padding:.05rem;
        margin-right:.1rem;
        font-size:.2rem;
        line-height: .2rem;
        color:#FFFFFF;
        vertical-align: middle;
    }
    .green-bg{
        background:#45C773;
    }
    .red-bg{
        background:#FE7649;
    }
    .yellow-bg{
        background:#FEC126;
    }
    .time{
        color:#999999;
        font-size:.24rem;
        vertical-align: middle;
    }
    .price{
        color:#333333;
        font-size:.26rem;
        position:absolute;
        right:.2rem;
        top:0;
    }
    .frost-strip-bot{
        color:#666666;
        font-size:.26rem;
    }
    .remark{
        color:#999999;
        font-size:.24rem;
    }
</style>
