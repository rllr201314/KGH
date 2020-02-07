<template>
    <!-- 佣金管理 -->
    <div class="wrap">
        <Header v-bind:head_data="comData.head_data"></Header>
        <div class="commission-content">
            <div class="commission-cell">
                <div class="commission-top-strip">
                    <div class="top-strip-tit">
                        <span class="commission-name">金牌推广员</span>
                        <span class="gray-color" v-text="commissionNum"></span>
                    </div>
                    <div class="top-strip">
                        <img src="../../../../static/img/my-center/intagral_ico.png" alt="">
                        <span class="gray-color">积分</span>
                        <span class="intagral" v-text="intagral"></span>
                        <span class="intagral-text grey-color" v-text="intagralText"></span>
                    </div>
                    <div class="top-strip">
                        <img src="../../../../static/img/my-center/getcode_ico.png" alt="">
                        <span class="gray-color">邀请码</span>
                        <span class="invite" v-text="invite"></span>
                        <img class="copy-img" src="../../../../static/img/copy.png" alt="" :data-clipboard-text="invite" @click="copyFn()" id="copy">
                    </div>
                </div>
                <div class="commission-bot-strip">
                    <div class="bot-left">
                        <div>交易次数累计</div>
                        <div>交易总金额</div>
                        <div>佣金结算累计</div>
                        <div>违规次数</div>
                    </div>
                    <div class="bot-right">
                        <div>交易次数累计</div>
                        <div>交易总金额</div>
                        <div>佣金结算累计</div>
                        <div>违规次数</div>
                    </div>
                </div>
            </div>
            <div class="commission-cell">
                <div class="manange-top">
                    <img src="../../../../static/img/goodscreen/vertical.png" alt="">
                    <span>成交记录</span>
                </div>
                <div class="commission-top-strip commission-strip" v-for="item in trading">
                    <div class="bot-left">
                        <div>买家</div>
                        <div>成交价</div>
                        <div>佣金</div>
                    </div>
                    <div class="bot-right">
                        <div v-text="item.buyer"></div>
                        <div v-text="item.clos_cost"></div>
                        <div class="red-color" v-text="item.commission">佣金</div>
                    </div>
                    <div class="time grey-color" v-text="item.time"></div>
                    <div class="settle" v-if="item.isSettle">已结算</div>
                    <div class="orange-color dominant-color" v-else>为保证交易的有效性，交易7天后自动转至余额</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
export default {
    name: "CommissionManage",
    components: {
        Header
    },
    data() {
        return {
            comData: {
                head_data: {
                    show_type: 2,
                    tit_text: '佣金管理',
                    right_icon: 2,
                    showBack: false,
                    showLogo: 2, //显示头部title文字
                    showShare: 3, //1搜索2分享3菜单
                    showBg: true, //是否显示背景
                }
            },
            commissionNum: "（210293873）",
            invite: "MJGH2",
            intagral: "20012",
            intagralText: "当前佣金结算10%",
            trading:[{
                buyer:'12476554345',
                clos_cost:'￥8288',
                commission:'￥8288',
                time:'2017-08-09  12:20',
                isSettle:true,
            },{
                buyer:'12476554345',
                clos_cost:'￥8288',
                commission:'￥8288',
                time:'2017-08-09  12:20',
                isSettle:false,
            },{
                buyer:'12476554345',
                clos_cost:'￥8288',
                commission:'￥8288',
                time:'2017-08-09  12:20',
                isSettle:true,
            }]
        };
    },
    methods: {
        copyFn() {
            let that = this;
            let clipboard = new ClipboardJS("#copy");
            clipboard.on("success", function(e) {
                clipboard.destroy();
                mui.toast("复制成功",{ duration:'short', type:'div' });
            });
            clipboard.on("error", function(e) {
                clipboard.destory();
                mui.toast("请重新点击复制",{ duration:'short', type:'div' });
            });
        }
    }
};
</script>
<style scoped>
.commission-content {
    padding: 0.2rem;
}
.commission-cell {
    font-size: 0.26rem;
    padding-left: 0.2rem;
    background: #ffffff;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    margin-bottom: 0.2rem;
}
.commission-top-strip {
    padding: 0.2rem 0;
    border-bottom: 0.01rem solid #e5e5e5;
}
.commission-top-strip img {
    width: 0.3rem;
    height: 0.3rem;
    vertical-align: middle;
    margin-right: 0.1rem;
}
.commission-top-strip span {
    margin-right: 0.1rem;
    vertical-align: middle;
}
.top-strip {
    line-height: 0.5rem;
}
.commission-name {
    font-size: 0.3rem;
    color: #333333;
}
.gray-color {
    color: #666666;
}
.intagral-text {
    font-size: 0.24rem;
}
.blue-color {
    font-size: 0.28rem;
    color: #4ac0f4;
}
.commission-bot-strip {
    padding: 0.2rem 0;
}
.bot-left,
.bot-right {
    display: inline-block;
    line-height: 0.5rem;
}
.bot-left {
    color: #666666;
    width: 2rem;
}
.bot-right {
    color: #333333;
}

.manange-top {
    line-height: 0.7rem;
    border-bottom: 0.01rem solid #e5e5e5;
}
.manange-top span {
    display: inline-block;
    color: #333333;
    font-size: 0.28rem;
}
.manange-top img {
    width: 0.13rem;
    height: 0.29rem;
    vertical-align: middle;
}
.grey-color{
    color:#999999;
}
.commission-strip{
    position: relative;
}
.time{
    position: absolute;
    right:.2rem;
    top:.2rem;
}
.red-color{
    color:#FF5E5E;
}
.orange-color{
    /* color:#FE7649; */
    line-height: .5rem;
}
.settle{
    background:#45C773;
    color:#ffffff;
    font-size:.2rem;
    display: inline-block;
    line-height: .3rem;
    padding:0 .05rem;
    position:absolute;
    top:1rem;
    right:.2rem;
}
.copy-img {
    width: 0.2rem;
    height: 0.24rem;
}
</style>
