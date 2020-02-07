<template>
    <!-- 申请开店 -->
    <div class="wrap ShopApplication">
        <Header v-bind:head_data="head_data"></Header>
        <div class="top">
            <span>1.店铺资料</span>
        </div>

        <div class="ShopApplication-main">
            <ul>
                <li>
                    <span>*</span>
                    <span>店铺头像</span>
                </li>
                <li>
                    <span>*</span>
                    <span>店铺名称</span>
                    <input type="text" placeholder="3-15汉字/字母/数字" />
                </li>
                <!-- <li>
                    <span>*</span>
                    <span>主营游戏</span>
                    <input type="text" placeholder="请输入所要经营的游戏">
                </li>-->
                <li>
                    <span>*</span>
                    <span>业务内容描述</span>
                    <!-- <DropDownList3/> -->
                    <input type="text" placeholder="请输入所要经营的游戏" />
                </li>
                <li>
                    <span>*</span>
                    <span>店铺简介</span>
                    <input type="text" placeholder="店铺的简要描述" />
                </li>
                <li>
                    <span>*</span>
                    <span>申请原因</span>
                    <input type="text" placeholder="申请店铺的原因" />
                </li>
                <li>
                    <span>*</span>
                    <span>联系方式</span>
                    <input type="number" placeholder="请输入有效11位电话号码，平台将在24内与您联系" />
                </li>
                <Sc class="sc" />
            </ul>
        </div>

        <div class="ShopApplication-button">立即申请</div>

        <div class="ShopApplication_notice">
            <span
                v-for="(item,i) in ShopApplication_notice_data"
                :key="i"
                v-text="item.ShopApplication_notice1"
            ></span>
        </div>
    </div>
</template>
<script>
import Header from '@/components/home-page/Header'
import DropDownList3 from './DropDown/DropDownList3'
import Sc from './Sc'
export default {
    name: "ShopApplication",
    components: {
        Header,
        DropDownList3,
        Sc
    },
    data() {
        return {
            head_data: {
                //1搜索2分享3菜单
                show_type: 2,
                right_icon: 1,
                tit_text: '申请开店',
            },

            fileList: [],

            ShopApplication_notice_data: [
                {
                    ShopApplication_notice1: '开店须知：'
                },
                {
                    ShopApplication_notice1: '独立的店铺，并有唯一的店名和店铺网址。'
                },
                {
                    ShopApplication_notice1: '资金快速回笼，交易后马上打款。'
                },
                {
                    ShopApplication_notice1: '提供海量的商品货源，0元进货，佣金丰厚。'
                },
                {
                    ShopApplication_notice1: '订单由客服快速发货，赚钱更轻松。'
                }
            ]

        }
    },

    methods: {
    }
}
</script>

<style lang="scss" scoped>
.ShopApplication {
    height: 16.05rem;
    .top {
        height: 0.63rem;
        padding-left: 0.23rem;
    }
    span {
        font-family: PingFang SC;
        font-weight: 500;
    }
    .top span {
        color: #333333;
        font-size: 0.3rem;
        line-height: 0.63rem;
        font-weight: bold;
    }
    .ShopApplication-main {
        background: #ffffff;
        padding: 0.1rem 0 0.1rem 0.25rem;
        position: relative;
        ul {
            li:nth-child(1) {
                margin-bottom: 1.6rem;
            }
            li:nth-child(2n) {
                margin: 0.3rem 0;
            }
            li:nth-child(4) {
                display: flex;
                align-items: center;
                // margin-bottom: .69rem;
            }
            li {
                display: flex;
                align-items: center;
                input {
                    font-size: 0.2rem;
                    color: #999999;
                    height: 0.5rem;
                    padding: 0;
                    margin-bottom: 0;
                    width: 5.2rem;
                    border: none;
                }
                span:nth-child(1) {
                    color: #ffa303;
                    height: 0.6rem;
                    line-height: 0.7rem;
                    margin-right: 0.1rem;
                }
                span:nth-child(2) {
                    font-size: 0.26rem;
                    color: #333333;
                    width: 1.66rem;
                }
            }
            .sc {
                position: absolute;
                top: 0.3rem;
                right: 2.85rem;
            }
        }
    }
    .ShopApplication-button {
        width: 6.6rem;
        height: 0.8rem;
        background: #ffa303;
        border-radius: 0.1rem;
        text-align: center;
        line-height: 0.8rem;
        color: #ffffff;
        margin: 0.31rem auto;
    }
    .ShopApplication_notice {
        padding-left: 0.46rem;
        display: flex;
        flex-direction: column;
        span {
            color: #999999;
            font-size: 0.24rem;
            line-height: 0.49rem;
        }
        span:nth-child(1) {
            color: #666666;
            font-size: 0.26rem;
            font-weight: bold;
        }
    }
}
</style>