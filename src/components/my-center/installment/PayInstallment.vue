<template>
    <!-- 分期支付 -->
    <div class="wrap">
        <Header v-bind:head_data="head_data"></Header>
        <div class="payInstall-content">
            <div class="payInstall-cell">
                <div class="payInstall-strip">
                    <img class="lasttime" src="../../../../static/img/my-center/his.png" alt />
                    <span>最近还款期</span>
                    <span class="black" v-text="time"></span>
                    <span class="right-time" v-if="payData.delay_day != 0">
                        (逾期
                        <span class="red-color">5</span>天)
                    </span>
                </div>

                <div v-if="flag == 1">
                    <div class="payInstall-strip refund">
                        <span>还款金额</span>
                        <input type="number" v-model="repayment_amount" />
                    </div>
                    <div class="payInstall-strip">
                        <span class="strip-left">最低还款</span>
                        <span>
                            ￥
                            <span v-text="payData.charge"></span>
                        </span>
                        <span style="margin-left:.2rem;">(最低还本期利息)</span>
                    </div>
                    <div class="payInstall-strip" v-if="payData.delay_day != 0">
                        <span class="strip-left">滞纳金</span>
                        <span>
                            ￥
                            <span v-text="payData.delay_money"></span>
                        </span>
                    </div>
                    <div class="payInstall-strip">
                        <span class="strip-left">剩余本金</span>
                        <span class="red-color">
                            ￥
                            <span class="red-color" v-text="payData.total_money"></span>
                        </span>
                    </div>
                </div>
                <div v-else-if="flag == 2">
                    <div class="payInstall-strip refund">
                        <span>选择还款方式</span>
                        <div class="current" @click="seleMode('current')">
                            <img
                                :src="isCurrent?'../../../../static/img/order/okcheck.png':'../../../../static/img/order/nocheck.png'"
                                alt
                            />
                            <span>还本期</span>
                        </div>
                        <div class="all" @click="seleMode('all')">
                            <img
                                :src="isCurrent?'../../../../static/img/order/nocheck.png':'../../../../static/img/order/okcheck.png'"
                                alt
                            />
                            <span>还全部</span>
                        </div>
                    </div>
                    <div class="payInstall-strip">
                        <span class="strip-left">分期金额</span>
                        <span>
                            ￥
                            <span v-text="payData.money"></span>
                        </span>
                    </div>
                    <div class="payInstall-strip">
                        <span class="strip-left">利息</span>
                        <span>
                            ￥
                            <span v-text="payData.charge"></span>
                        </span>
                    </div>
                    <div class="payInstall-strip" v-if="payData.delay_day != 0">
                        <span class="strip-left">滞纳金</span>
                        <span>
                            ￥
                            <span v-text="payData.delay_money"></span>
                        </span>
                    </div>
                    <div class="payInstall-strip">
                        <span class="strip-left">应付金额</span>
                        <span class="red-color">
                            ￥
                            <span class="red-color" v-text="payData.total_money"></span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="nextBtn button" @click="goPay">前往支付</div>
    </div>
</template>
<script>
import Header from '@/components/home-page/Header'
export default {
    name: 'PayInstallment',
    components: {
        Header,
    },
    data() {
        return {
            head_data: {
                show_type: 2,
                right_icon: 2,
                tit_text: '支付分期'
            },
            allData: {},
            payData: {},
            flag: null,
            time: null,
            isCurrent: true,
            order_info: null,
            repayment_amount: '',//还款金额
        }
    },
    methods: {
        seleMode(flag) {
            var that = this;
            if (flag == 'current') {
                that.isCurrent = true;
                that.payData = that.allData.next_stage;
            } else if (flag == 'all') {
                that.isCurrent = false;
                that.payData = that.allData.end_stage;
            }
        },
        getData() {
            var that = this;
            that.$axios.post(process.env.API_HOST + "stagePreview", {
                order_id: that.order_info.order_id
            }).then((res) => {
                if (res.status == 200) {
                    if (res.data.code == 200) {
                        that.allData = res.data.data;
                        if (that.flag == 1) {//日分期
                            that.payData = that.allData.end_stage;
                        } else if (that.flag == 2) {//月份期
                            that.payData = that.allData.next_stage;
                        }
                    }
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        goPay() {
            let that = this;
            let stages = {};
            stages.pay_type = 3;//分期支付
            if (that.flag == 1) {
                // that.repayment_amount

                if (that.repayment_amount != '') {
                    if (that.repayment_amount > that.payData.money) {
                        mui.alert('还款金额大于剩余本金', '提示', '确认', '', 'div')
                    } else {
                        stages.stage_method = 3;
                        stages.stage_money = that.repayment_amount;//还款金额
                        stages.order_id = that.order_info.order_id;
                        stages = JSON.stringify(stages);
                        sessionStorage.info = stages;
                        that.$router.push({ name: 'Pay', params: { info: stages } })
                    }
                } else {
                    mui.alert('请输入还款金额', '提示', '确认', '', 'div')
                }
            } else if (that.flag == 2) {
                // 分期支付
                if (that.isCurrent) {//支付方式
                    stages.stage_method = 1;
                } else {
                    stages.stage_method = 2;
                }
                stages.order_id = that.order_info.order_id;
                stages = JSON.stringify(stages);
                sessionStorage.info = stages;
                that.$router.push({ name: 'Pay', params: { info: stages } })
            }
        },
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
    mounted() {
        var that = this;
        if (that.$route.params.order_info) {
            that.order_info = JSON.parse(that.$route.params.order_info)
            that.time = that.order_info.time;
            that.flag = that.order_info.type;
            that.getData();
        } else {
            that.$router.go(-1);
        }
    }
}
</script>
<style scoped>
.payInstall-content {
    padding: 0.2rem;
}
.payInstall-cell {
    background: #ffffff;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    margin-bottom: 0.2rem;
    padding: 0 0.2rem;
}
.payInstall-strip {
    line-height: 0.9rem;
    border-bottom: 0.01rem solid #e5e5e5;
}
.payInstall-strip span {
    vertical-align: middle;
    color: #666666;
    font-size: 0.26rem;
}
.lasttime {
    width: 0.29rem;
    height: 0.29rem;
    vertical-align: middle;
}
.black {
    color: #333333;
}
.refund div {
    margin-left: 0.6rem;
    display: inline-block;
}
.refund img {
    width: 0.22rem;
    height: 0.22rem;
}
.refund input {
    width: 3rem;
    height: 0.6rem;
    /* border:0; */
    margin: 0 0 0 0.4rem;
    padding: 0.1rem;
    font-size: 0.26rem;
    color: #333333;
}
.right-time {
    display: inline-block;
    margin-left: 1rem;
}
.strip-left {
    display: inline-block;
    width: 1.5rem;
}
.red-color {
    color: #fa5856 !important;
}
/* 下一步 */
.nextBtn {
    color: #ffffff;
    font-size: 0.28rem;
    margin: 0.3rem auto 0;
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
</style>
