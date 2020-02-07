<template>
    <!-- 分期计算器 -->
    <div class="wrap">
        <Header :head_data="head_data"></Header>
        <div class="content">
            <div class="cell sele-g-box">
                <img class="logo" :src="game_data.img_src" alt />
                <div class="cell-left">
                    <span v-text="game_data.name"></span>分期计算器
                </div>
                <div class="cell-right sele-one" @click="seleOption('game')">
                    <span v-text="game_data.name"></span>
                    <img src="../../../static/img/goodscreen/downsolid.png" alt />
                </div>
            </div>
            <div class="cell sele-t-box">
                <div class="item">
                    <div class="cell-left">渠道</div>
                    <div class="cell-right sele-one" @click="seleOption('official')">
                        <span v-text="official_data.name"></span>
                        <img src="../../../static/img/goodscreen/downsolid.png" alt />
                    </div>
                </div>
                <div class="item">
                    <div class="cell-left">帐号绑定状态</div>
                    <div class="cell-right sele-one" @click="seleOption('bind')">
                        <span v-text="bind_data.name"></span>
                        <img src="../../../static/img/goodscreen/downsolid.png" alt />
                    </div>
                </div>
                <div class="item" v-show="show_safe">
                    <div class="cell-left">购买保险</div>
                    <div class="cell-right sele-two">
                        <div class="opera" @click="seleType('safe',true)">
                            <img
                                :src="is_safe == 1 ?'../../../static/img/order/okcheck.png':'../../../static/img/order/nocheck.png'"
                                alt
                            />
                            <span>买保险</span>
                        </div>
                        <div class="opera" @click="seleType('safe',false)" v-show="show_no_safe">
                            <img
                                :src="is_safe == 1?'../../../static/img/order/nocheck.png':'../../../static/img/order/okcheck.png'"
                                alt
                            />
                            <span>不买保险</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="cell">
                <div class="inp-box">
                    <div class="inp-item">
                        <div class="name">商品价格</div>
                        <input
                            type="number"
                            class="item-bottom"
                            v-model="money"
                            @input="inpMoneyFn"
                        />
                    </div>
                    <div class="inp-item">
                        <div class="name">首付方式</div>
                        <div class="item-bottom" @click="seleOption('down_payment')">
                            <span v-text="down_data.name"></span>
                            <img src="../../../static/img/goodscreen/downsolid.png" alt />
                        </div>
                    </div>
                    <div class="inp-item">
                        <div class="name">首付金额</div>
                        <input type="number" class="item-bottom" v-model="sum" :disabled="is_inp" />
                    </div>
                    <div class="inp-item">
                        <div class="name">分期期数</div>
                        <div class="item-bottom" @click="seleOption('num')">
                            <span v-text="num_data.name"></span>
                            <img src="../../../static/img/goodscreen/downsolid.png" alt />
                        </div>
                    </div>
                </div>
                <div class="nextBtn" @click="countFn">开始计算</div>
                <div class="result-wrap" v-show="show_info">
                    <div class="result-tit">计算结果</div>
                    <div class="result-con">
                        <div class="result-con-des">
                            <div>
                                首付（首付金额 + 保险费）=
                                <span v-text="down_amount"></span> +
                                <span v-text="safe_fee"></span> =
                                <span v-text="payment_amount" class="tb-item-red"></span>
                            </div>
                        </div>
                        <table>
                            <tr>
                                <th>期数</th>
                                <th>本金</th>
                                <th>利息</th>
                                <th>利率</th>
                                <th>合计</th>
                            </tr>
                            <tr v-for="(item,index) in stage_info" :key="index">
                                <td class="tb-item-black" v-text="item.stage_title"></td>
                                <td v-text="item.stage_money"></td>
                                <td v-text="item.charge"></td>
                                <td v-text="item.percent_rate"></td>
                                <td class="tb-item-red" v-text="item.every_month_money"></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <van-action-sheet
            class="pop"
            v-model="game_data.show"
            cancel-text="取消"
            :actions="game_data.actions"
            @select="seleGame"
            title="选择游戏"
        />
        <van-action-sheet
            class="pop"
            v-model="down_data.show"
            cancel-text="取消"
            :actions="down_data.actions"
            @select="seleDown"
            title="首付方式"
        />
        <van-action-sheet
            class="pop"
            v-model="num_data.show"
            cancel-text="取消"
            :actions="num_data.actions"
            @select="seleNum"
            title="分期期数"
        />
        <van-action-sheet
            class="pop"
            v-model="official_data.show"
            cancel-text="取消"
            :actions="official_data.actions"
            @select="seleOfficial"
            title="渠道"
        />
        <van-action-sheet
            class="pop"
            v-model="bind_data.show"
            cancel-text="取消"
            :actions="bind_data.actions"
            @select="seleBind"
            title="账号绑定状态"
        />
    </div>
</template>
<script>
import Header from "@/components/home-page/Header"
export default {
    name: "StageCounter",
    methods: {
        inpMoneyFn() {
            var that = this;
            that.show_info = false;
            if (that.down_data.name != '请选择') {
                if (that.down_data.value == 1) {
                    that.sum = parseInt(that.money * 0.3);
                    that.is_inp = true;
                } else if (that.down_data.value == 2) {
                    that.sum = parseInt(that.money * 0.5);
                    that.is_inp = true;
                } else if (that.down_data.value == 3) {
                    that.is_inp = false;
                }
            }
        },
        seleOption(flag) {
            var that = this;
            if (flag == 'game') {
                that.game_data.show = true;
            } else if (flag == 'down_payment') {
                that.down_data.show = true;
            } else if (flag == 'num') {
                that.num_data.show = true;
            } else if (flag == 'official') {
                that.official_data.show = true;
            } else if (flag == 'bind') {
                that.bind_data.show = true;
            }
        },
        seleGame(item) {
            var that = this;
            that.show_info = false;
            that.game_data.show = false;
            that.game_data.name = item.name;
            that.game_data.value = item.category_id;
            that.game_data.img_src = item.game_logo;
            that.game_data.data = item;
            if (that.official_data.value == 1) {
                //官服
                var info = item.is_official;
                that.judgeFn(info);
            } else {
                //混服
                var info = item.no_official;
                that.judgeFn(info);
            }
        },
        judgeFn(info) {
            var that = this;
            if (info.seller_safe == 1 || info.is_safe != 1) {
                that.show_safe = false;
            } else if (info.buyer_safe == 1) {
                that.show_safe = true;
                that.is_safe = 1,
                    that.show_no_safe = false;
            } else if (that.bind_data.value == 1 && info.is_bind == 1) {
                if (info.bind_flag == 1) {
                    that.show_safe = true;
                    that.is_safe = 1,
                        that.show_no_safe = false;
                } else {
                    that.show_safe = false;
                }
            } else {
                that.show_safe = true;
                that.show_no_safe = true;
            }
        },
        seleOfficial(item) {
            var that = this;
            that.show_info = false;
            that.official_data.show = false;
            that.official_data.name = item.name;
            that.official_data.value = item.value;
            if (item.value == 1) {
                //官服
                var info = that.game_data.data.is_official;
                that.judgeFn(info);
            } else {
                //混服
                var info = that.game_data.data.no_official;
                that.judgeFn(info);
            }
        },
        seleBind(item) {
            var that = this;
            that.show_info = false;
            that.bind_data.show = false;
            that.bind_data.name = item.name;
            that.bind_data.value = item.value;
            if (that.official_data.value == 1) {
                //官服
                var info = that.game_data.data.is_official;
                that.judgeFn(info);
            } else {
                //混服
                var info = that.game_data.data.no_official;
                that.judgeFn(info);
            }

        },
        seleDown(item) {
            var that = this;
            that.show_info = false;
            that.down_data.show = false;
            that.down_data.name = item.name;
            that.down_data.value = item.value;
            if (that.money != '') {
                if (that.down_data.value == 1) {
                    that.sum = parseInt(that.money * 0.3);
                    that.is_inp = true;
                } else if (that.down_data.value == 2) {
                    that.sum = parseInt(that.money * 0.5);
                    that.is_inp = true;
                }
            }
            if (that.down_data.value == 3) {
                that.is_inp = false;
            }
        },
        seleNum(item) {
            var that = this;
            that.show_info = false;
            that.num_data.show = false;
            that.num_data.name = item.name;
            that.num_data.value = item.value;
        },
        seleType(flag, type) {
            var that = this;
            that.show_info = false;
            if (flag == 'official') {
                if (type) {
                    that.is_official = 1;
                } else {
                    that.is_official = 2;
                }
            } else if (flag == 'bind') {
                if (type) {
                    that.is_bind = 1;
                } else {
                    that.is_bind = 2;
                }
            } else if (flag == 'safe') {
                if (type) {
                    that.is_safe = 1;
                } else {
                    that.is_safe = 2;
                }
            }
        },
        countFn() {
            var that = this;
            if (that.game_data.name == "请选择") {
                mui.toast("请选择游戏", { duration: "short", type: "div" });
                return false;
            } else if (that.money == "") {
                mui.toast("请输入商品价格", { duration: "short", type: "div" });
                return false;
            } else if (that.down_data.name == "请选择") {
                mui.toast("请选择首付方式", { duration: "short", type: "div" });
                return false;
            } else if (that.down_data.name == "自定义" && that.sum == '') {
                mui.toast("请输入首付金额", { duration: "short", type: "div" });
                return false;
            } else if (that.num_data.name == "请选择") {
                mui.toast("请输入分期期数", { duration: "short", type: "div" });
                return false;
            }
            if (parseInt(Number(that.money) * 0.3) > Number(that.sum)) {
                mui.toast("自定义分期首付金额不得小于30%", { duration: "short", type: "div" });
                return false;
            } else if (Number(that.sum) > Number(that.money)) {
                mui.toast("自定义分期首付金额不得大于商品价格", { duration: "short", type: "div" });
                return false;
            }
            let request = {};
            // request.is_bind = that.is_bind;
            // request.is_official = that.is_official;
            request.is_bind = that.bind_data.value;
            request.is_official = that.official_data.value;
            if (that.show_safe) {
                request.is_safe = that.is_safe;
            } else {
                request.is_safe = 2;
            }
            request.goods_price = that.money;

            request.category = that.game_data.value;
            request.stage_method = that.down_data.value;
            request.stage_number = that.num_data.value;
            request.down_amount = that.sum;
            that.$toast.loading({
                mask: true,
                message: '加载中...',
                duration: 0
            })
            that.$axios.post(`${that.baseURL}stageCalculator`, request).then((res) => {
                if (res.status == 200) {
                    that.$toast.clear();
                    if (res.data.code == 200) {
                        that.show_info = true;
                        var data = res.data.data;
                        that.down_amount = data.down_amount;
                        that.safe_fee = data.safe_fee;
                        that.payment_amount = data.payment_amount;
                        that.stage_info = data.stage_info;
                    } else if (res.data.code == 400) {
                        mui.toast(res.data.msg, { duration: "short", type: "div" });
                    }
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        getGame() {
            var that = this;
            that.$axios.post(`${that.baseURL}categoryCharge`).then((res) => {
                if (res.data.code == 200) {
                    for (var i in res.data.data) {
                        res.data.data[i].name = res.data.data[i].game_name;
                    }
                    that.game_data.actions = res.data.data;
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    },
    mounted() {
        this.getGame()
    },
    data() {
        return {
            head_data: {
                show_type: 2,
                tit_text: "分期计算器",
                right_icon: 2,
            },
            game_data: {
                name: '请选择',
                show: false,
                value: '',
                img_src: '',
                data: {},
                actions: []
            },
            official_data: {
                name: '官方',
                show: false,
                value: 1,
                img_src: '',
                actions: [
                    { name: '官方', value: 1 },
                    { name: '混服', value: 2 },
                ]
            },
            bind_data: {
                name: '有绑',
                show: false,
                value: 1,
                img_src: '',
                actions: [
                    { name: '有绑', value: 1 },
                    { name: '无绑', value: 2 },
                ]
            },
            down_data: {
                name: '请选择',
                show: false,
                value: '',
                actions: [
                    { name: '30%', value: 1 },
                    { name: '50%', value: 2 },
                    { name: '自定义', value: 3 }
                ]
            },
            num_data: {
                name: '请选择',
                show: false,
                value: '',
                actions: [
                    { name: '一期', value: 1 },
                    { name: '三期', value: 3 },
                    { name: '五期', value: 5 }
                ]
            },
            show_safe: true,
            show_no_safe: true,
            is_safe: 1,
            // is_bind: 1,
            // is_official: 1,
            money: '',
            sum: '',
            is_inp: true,
            down_amount: "",
            safe_fee: "",
            payment_amount: "",
            stage_info: [],
            show_info: false,
        }
    },
    components: {
        Header,
    }
}
</script>
<style lang="scss" scoped>
.content {
    padding: 0.1rem 0.2rem;
    font-size: 0.26rem;
}
.cell {
    background: #ffffff;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    margin-bottom: 0.2rem;
    padding: 0.2rem 0.2rem;
}
.sele-g-box {
    // line-height: 1.2rem;
    .logo {
        width: 0.99rem;
        height: 0.99rem;
        vertical-align: middle;
        margin-right: 0.2rem;
    }
    .cell-left {
        width: 2.5rem;
    }
}
.cell-left {
    width: 1.7rem;
    display: inline-block;
    vertical-align: middle;
    font-size: 0.26rem;
    color: #444444;
}
.cell-right {
    font-size: 0.2rem;
    color: #666666;
}
.sele-one {
    width: 1.6rem;
    height: 0.5rem;
    line-height: 0.5rem;
    -webkit-border-radius: 0.06rem;
    -moz-border-radius: 0.06rem;
    border-radius: 0.06rem;
    border: 1px solid #d2d2d2;
    padding: 0 0.1rem;
    display: inline-block;
    position: relative;
    vertical-align: middle;
}

.sele-one img {
    width: 0.2rem;
    height: 0.1rem;
    position: absolute;
    top: calc(50% - 0.05rem);
    right: 0.2rem;
}
.sele-t-box {
    padding: 0.2rem;
}
.item {
    line-height: 0.6rem;
}
.sele-two {
    display: inline-block;
}
.opera {
    display: inline-block;
    margin-right: 0.4rem;
    min-width: 1.2rem;
}
.opera img {
    width: 0.22rem;
    height: 0.22rem;
    vertical-align: middle;
}

.inp-box {
    display: flex;
    justify-content: space-between;
    text-align: center;
    font-size: 0.26rem;
    color: #444444;
    padding: 0 0 0.25rem;
    font-size: 0;
    .inp-item {
        .name {
            font-size: 0.26rem;
            color: #444444;
            line-height: 0.6rem;
        }
    }
}
.item-bottom {
    width: 1.22rem;
    height: 0.5rem;
    border-radius: 0.05rem;
    border: 1px solid #dcdcdc;
    text-align: center;
    font-size: 0.2rem;
    color: #666666;
    line-height: 0.5rem;
    img {
        width: 0.2rem;
        height: 0.1rem;
        float: right;
        margin-top: calc(0.25rem - 0.05rem);
        margin-right: 0.1rem;
    }
}
input {
    margin: 0;
    padding: 0;
}
.result-tit {
    font-size: 0.26rem;
    color: #444444;
    font-weight: bold;
    text-align: center;
    padding-top: .2rem;
}
.result-con {
    padding: 0.2rem 0 0.2rem;
    .result-con-tit {
        padding: 0 0.4rem;
        // display: flex;
        // justify-content: space-between;
        font-size: 0.26rem;
        .result-con-tit-num {
            font-size: 0.2rem;
            color: #666666;
        }
    }
    .result-con-des {
        padding: 0 0.4rem;
        font-size: 0.2rem;
        color: #666666;
        line-height: 0.6rem;
        div {
            border-bottom: 1px solid #999999;
        }
    }
}
table {
    width: 100%;
    tr {
        line-height: 0.6rem;
    }
    th,
    td {
        width: 20%;
        text-align: center;
    }
    th {
        font-size: 0.26rem;
        color: #444444;
        font-weight: normal;
    }
    td {
        font-size: 0.2rem;
        color: #666666;
    }
    .tb-item-black {
        color: #444444;
    }
}
.tb-item-red {
    color: #ff0000;
}
.pop {
    max-height: 60%;
    max-width: 640px;
    left: auto;
}
</style>
