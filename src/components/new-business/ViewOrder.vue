<template>
    <!-- 查看订单 -->
    <div class="wrap ViewOrder">
        <Header v-bind:head_data="head_data"></Header>
        <div class="latest-order">
            <img src="../../../static/image/vieworder/latest-order.png" alt />
            <span>最新订单</span>
        </div>

        <div class="search">
            <div class="search-accurate search-box flex-box">
                <span class="left-text">精准搜索：</span>
                <el-select v-model="value" placeholder="下单时间">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
                <span class="line"></span>
                <el-select v-model="value" placeholder="下单时间">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
                <el-select class="last-sele" v-model="value" placeholder="订单状态">
                    <el-option-group v-for="group in order_status" :key="group.value">
                        <el-option
                            v-for="item in group.options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-option-group>
                </el-select>
            </div>
            <div class="search-order search-box flex-box">
                <span class="left-text">订单搜索：</span>
                <input type="text" />
                <img src="../../../static/image/vieworder/magnifier.png" alt />
            </div>
        </div>
        <!-- 订单 -->
        <div class="list-commodities" v-for="(item,i) in list_commodities_data" :key="i">
            <div class="list-commodities-top">
                <div class="list-commodities-top-left">
                    <img :src="item.list_commodities_img" alt />
                </div>
                <div class="list-commodities-top-in">
                    <span v-text="item.list_commodities_title"></span>
                    <span>
                        <span>(</span>
                        <span v-text="item.payment_status"></span>
                        <span>)</span>
                    </span>
                </div>
                <div class="list-commodities-top-right">
                    <span>
                        下单时间：
                        <span v-text="item.order_time"></span>
                    </span>
                    <span>
                        付款时间：
                        <span v-text="item.payment_time"></span>
                    </span>
                </div>
            </div>
            <div class="list-commodities-bottom">
                <div>
                    <span class="list-left-text">订单号</span>：
                    <span class="order" v-text="item.order_number"></span>
                </div>
                <div>
                    <span class="list-left-text">金额</span>：
                    <span class="money">
                        ¥
                        <span v-text="item.amount_of_money"></span>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Header from '@/components/home-page/Header'
export default {
    name: "ViewOrder",
    components: {
        Header,
    },
    data() {
        return {
            head_data: {
                //1搜索2分享3菜单
                show_type: 2,
                right_icon: 2,
                tit_text: '查看订单',
            },
            xl: false,
            value: '',
            options: [{
                value: 'Chengdu',
                label: '成都'
            }, {
                value: 'Shenzhen',
                label: '深圳'
            }, {
                value: 'Guangzhou',
                label: '广州'
            }, {
                value: 'Dalian',
                label: '大连'
            }],
            order_status: [
                {
                    options: [{
                        value: 'Chengdu',
                        label: '成都'
                    }, {
                        value: 'Shenzhen',
                        label: '深圳'
                    }, {
                        value: 'Guangzhou',
                        label: '广州'
                    }, {
                        value: 'Dalian',
                        label: '大连'
                    }],

                }, {
                    options: [{
                        value: 'Chengdu',
                        label: '成都'
                    }, {
                        value: 'Shenzhen',
                        label: '深圳'
                    }, {
                        value: 'Guangzhou',
                        label: '广州'
                    }, {
                        value: 'Dalian',
                        label: '大连'
                    }]
                }
            ],
            list_commodities_data: [
                {
                    list_commodities_img: '../../../static/image/vieworder/lcon.png',
                    list_commodities_title: '梦话西游',
                    payment_status: '未支付',
                    order_time: '16: 40 2019-08-15',
                    payment_time: '16: 41 2019-08-24',
                    order_number: 'MH2019124862',
                    amount_of_money: '16241',
                },
                {
                    list_commodities_img: '../../../static/image/vieworder/lcon.png',
                    list_commodities_title: '梦话西游',
                    payment_status: '未支付',
                    order_time: '16: 40 2019-08-15',
                    payment_time: '16: 41 2019-08-24',
                    order_number: 'MH2019124862',
                    amount_of_money: '16241',
                },
                {
                    list_commodities_img: '../../../static/image/vieworder/lcon.png',
                    list_commodities_title: '梦话西游',
                    payment_status: '未支付',
                    order_time: '16: 40 2019-08-15',
                    payment_time: '16: 41 2019-08-24',
                    order_number: 'MH2019124862',
                    amount_of_money: '16241',
                },
                {
                    list_commodities_img: '../../../static/image/vieworder/lcon.png',
                    list_commodities_title: '梦话西游',
                    payment_status: '未支付',
                    order_time: '16: 40 2019-08-15',
                    payment_time: '16: 41 2019-08-24',
                    order_number: 'MH2019124862',
                    amount_of_money: '16241',
                }
            ]

        }
    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
.ViewOrder {
    height: 16.05rem;
    .latest-order {
        height: 0.59rem;
        img {
            width: 0.41rem;
            height: 0.43rem;
            float: left;
            margin: 0.09rem 0.09rem 0.07rem 0.3rem;
        }
        span {
            font-size: 0.28rem;
            font-family: pingFang SC;
            font-weight: 400;
            color: #333333;
            line-height: 0.59rem;
        }
    }

    .search {
        background: #ffffff;
        border-radius: 0.15rem;
        box-shadow: 0px 3px 10px 0px rgba(51, 51, 51, 0.1);
        padding: 0.2rem 0 0.2rem 0.26rem;
        .search-box {
            align-items: center;
            .left-text {
                font-size: 0.26rem;
            }
        }
        .search-accurate {
            margin-bottom: 0.2rem;
            .line {
                width: 0.5rem;
                height: 1px;
                background: #d2d2d2;
                margin: 0 0.2rem;
            }
        }
        .search-order {
            input {
                margin: 0;
                width: 5rem;
                padding: 0 0.1rem;
                font-size: 0.24rem;
                height: 0.4rem;
            }
            img {
                width: 0.32rem;
                height: 0.32rem;
                margin-left: 0.25rem;
            }
        }
    }
    
    // 订单
    .list-commodities {
        background: #ffffff;
        margin-top: 0.2rem;
        padding: 0.22rem 0 0 0.22rem;
        border-radius: 0.15rem;
        box-shadow: 0px 3px 10px 0px rgba(51, 51, 51, 0.1);
        .list-commodities-top {
            display: flex;
            span {
                font-family: PingFang SC;
                font-weight: 500;
            }
            .list-commodities-top-left {
                width: 1.1rem;
                height: 1.1rem;
                margin-right: 0.12rem;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .list-commodities-top-in {
                margin-right: 1.04rem;
                span:nth-child(1) {
                    font-size: 0.3rem;
                    color: #282828;
                    margin: 0.18rem 0 0.05rem 0;
                }
                span:nth-child(2){
                    span {
                        font-size: 0.24rem;
                        color: #ff7800;
                    }
                }
            }
            .list-commodities-top-right{
                span {
                    font-size: 0.24rem;
                    color: #999999;
                }
                span:nth-child(1) {
                    margin: 0.18rem 0 0.1rem 0;
                }
            }
        }
        .list-commodities-bottom {
            margin-top: 0.19rem;
            padding-bottom: 0.27rem;
            font-size: 0.26rem;
            .list-left-text {
                width: 1.1rem;
                display: inline-block;
                text-align-last: justify;
                text-align: justify;
                color: #333333;
            }
            .money {
                color: #ff7800;
            }
            .order {
                color: #666666;
            }
        }
        .list-commodities-top-in,
        .list-commodities-top-right,
        .list-commodities-bottom {
            display: flex;
            flex-direction: column;
        }
    }
}

</style>

<style lang="scss">
.el-select {
    .el-input__inner {
        margin: 0;
        padding: 0 0.2rem 0 0.1rem;
        width: 1.4rem;
        height: 0.4rem;
        font-size: 0.22rem;
    }
    // overflow: hidden;
}
.el-input__prefix,
.el-input__suffix {
    // top: 10px;
    right: 0px;
    // line-height: 1rem;
}
.last-sele {
    margin-left: 0.3rem;
}
.el-input__icon {
    line-height: 0.4rem;
}
</style>