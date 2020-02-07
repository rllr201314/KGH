<template>
    <!-- 收入明细详情 -->
    <div class="wrap">
        <Header v-bind:head_data="comData.head_data"></Header>
        <div class="receiptInfo-content">
            <div class="receiptInfo-num">
                <div class="left">流水号</div>
                <div class="right" v-text="infoData.bill_sn"></div>
            </div>
            <div class="receiptInfo">
                <div class="strip">
                    <div class="left">类型</div>
                    <div class="right" v-text="infoData.title"></div>
                </div>
                <div class="strip">
                    <div class="left">金额</div>
                    <div class="right">
                        <span v-if="infoData.flag == 1">+</span>
                        <span v-else>-</span>
                        <span v-text="infoData.money"></span>元
                    </div>
                </div>
                <div class="strip">
                    <div class="left">时间</div>
                    <div class="right" v-text="infoData.create_time"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Header from '@/components/home-page/Header'
    export default {
        name:'ReceiptsInfo',
        components:{
            Header,
        },
        data(){
            return {
                comData:{
                    head_data:{
                        show_type: 2,
                        tit_text: '收支明细',
                        right_icon: 2,
                        showBack:false,
                        showLogo:2,//显示头部title文字
                        showShare:3,//1搜索2分享3菜单
                        showBg:true,//是否显示背景
                    }
                },
                infoData:{},
            }
        },
        methods:{
            // 判断是不是JSON字符串
            isobjStr(str) {
                if (typeof str == "string") {
                    try {
                        if (typeof JSON.parse(str) == "object") {
                            return true;
                        }
                    } catch (e) {
                        return false;
                    }
                } else {
                    return false;
                }
            },
        },
        mounted(){
            var that = this;
            var data = that.$route.query.info;
            if(that.isobjStr(data)){
                that.infoData = JSON.parse(data);
            }else{
                that.$router.go(-1);
            }
        }
    }
</script>
<style scoped>
    .receiptInfo-content{
        font-size:.26rem;
        background:#ffffff;
        padding-left:.2rem;
    }
    .receiptInfo-num{
        line-height: .9rem;
        border-bottom:.01rem solid #E5E5E5;
        padding-right:.2rem;
    }
    .left,.right{
        display: inline-block;
    }
    .left{
        color:#666666;
    }
    .right{
        color:#333333;
    }
    .receiptInfo{
        line-height: .45rem;
        padding:.2rem 0;
        padding-right:.2rem;
    }
    .right{
        float:right;
    }
</style>
