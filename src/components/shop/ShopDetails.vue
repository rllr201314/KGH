<template>
    <!-- 店铺详情 -->
    <div class="wrap">
        <Head :head_data="head_data"></Head>
        <div class="detail-wrap">
            <div class="store-head flex-box cell-box">
                <img class="store-logo" src="../../../static/image/index/shop-logo.png" alt />
                <div class="head-con">
                    <div class="store-name">康康游戏交易专营店</div>
                    <div class="star flex-box">
                        <van-rate
                            v-model="rate"
                            color="#FF721C"
                            void-color="#FFE3D2"
                            allow-half
                            void-icon="star"
                            readonly
                        />
                        <div class="head-cash">
                            <span>保证金:</span>
                            <span class="head-cash-d">50w</span>
                        </div>
                        <img
                            class="head-mark"
                            @click="show_pledge = !show_pledge"
                            src="../../../static/image/store/mark.png"
                            alt
                        />
                    </div>
                    <div class="icon-wrap">
                        <img src="../../../static/image/store/account.png" alt />
                        <img src="../../../static/image/store/rent.png" alt />
                        <img src="../../../static/image/store/top-up.png" alt />
                        <img src="../../../static/image/store/vs.png" alt />
                    </div>
                </div>
                <div class="collect">
                    <div>收藏</div>
                    <div class="collect-num">
                        <span>139</span>人收藏
                    </div>
                </div>
            </div>
            <div class="detail-synopsis flex-box">
                <div class="synopsis-name">店铺简介:</div>
                <div class="synopsis-des">专业梦幻出租，每周有打折活动。欢迎新老客户常来。关注本店，更有优惠折扣福利哟~</div>
            </div>
            <div class="detail-synopsis flex-box">
                <div class="synopsis-name">荣誉认证:</div>
                <div class="synopsis-des flex-box">
                    <div class="synopsis-des-icon flex-box">
                        <img src="../../../static/image/store/assume.png" alt="实名" />
                        <span v-text="assume"></span>
                    </div>
                    <div class="synopsis-des-icon flex-box">
                        <img src="../../../static/image/store/autonym.png" alt="认证" />
                        <span v-text="assume"></span>
                    </div>
                </div>
            </div>
            <div class="detail-synopsis ranking-wrap">
                <div class="synopsis-name ranking-tit flex-box">
                    <div>排行榜</div>
                    <ul class="flex-box">
                        <li
                            v-for="(item,index) in ranking"
                            :key="index"
                            v-text="item.name"
                            :class="{'rank-active':item.active}"
                        ></li>
                    </ul>
                </div>
                <div class="ranking-list">
                    <div class="shop-con-item" v-for="(ind,num) in list" :key="num">
                        <img class="shop-con-item-img" :src="ind.img" alt />
                        <div class="shop-item-con flex-box">
                            <img
                                class="shop-item-icon"
                                src="../../../static/image/store/top-up.png"
                                v-if="ind.type == 1"
                                alt="充值"
                            />
                            <div class="shop-item-des" v-text="ind.des"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="recommend-wrap">
                <div class="recommend-tit">店铺推荐</div>
                <div class="recommend-con">
                    <Store :store_data="shop_data"></Store>
                </div>
            </div>
            <div class="pledge-box" v-show="show_pledge" @click="show_pledge = !show_pledge">
                <div class="pledge">
                    <div class="pledge-tit">保证金</div>
                    <div class="pledge-str">
                        <span class="pledge-left">什么是保证金：</span>
                        <span class="pledge-right">保证金是指保证金是指保证金是指保证金是指保证金是指保证金是指保证金是指保证金是指保证金是指</span>
                    </div>
                    <div class="pledge-str">
                        <span class="pledge-left">什么是保证金：</span>
                        <span class="pledge-right">保证金是指保证金是指保证金是指保证金是指保证金是指保证金是指保证金是指保证金是指保证金是指</span>
                    </div>
                    <div class="pledge-str">
                        <span class="pledge-left">什么是保证金：</span>
                        <span class="pledge-right">保证金是指保证金是指保证金是指保证金是指保证金是指保证金是指保证金是指保证金是指保证金是指</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Head from '@/components/home-page/Header'
import Store from '@/components/home-page/Store'
export default {
    name: "ShopDetails",
    components: {
        Head, Store
    },
    data() {
        return {
            head_data: {
                show_type: 2,
                go_back: 1,
                right_icon: 1,
                tit_text: '店铺首页',
            },
            rate: 4,
            assume: '已实名',
            autonym: '已认证',
            ranking: [
                {
                    name: "销量排行",
                    active: true,
                }, {
                    name: "收藏排行",
                    active: false,
                }
            ],
            show_pledge: false,
            list: [
                {
                    img: '../../static/image/index/shop-1.png',
                    type: 1,
                    des: '梦话西游各种1231231231'
                }, {
                    img: '../../static/image/index/shop-1.png',
                    type: 1,
                    des: '梦话西游各种1231231231'
                }, {
                    img: '../../static/image/index/shop-1.png',
                    type: 1,
                    des: '梦话西游各种1231231231'
                }, {
                    img: '../../static/image/index/shop-1.png',
                    type: 1,
                    des: '梦话西游各种1231231231'
                },
            ],
            shop_data: {
                id: 2,
                logo: '../../static/image/index/shop-logo.png',
                name: '康康游戏交易专营店',
                rate: 4.5,
                good: '90%',
                make: '123',
                imgs: [{
                    img: '../../static/image/index/shop-1.png',
                    type: 1,
                    des: '梦话西游各种1231231231'
                }, {
                    img: '../../static/image/index/shop-1.png',
                    type: 1,
                    des: '梦话西游各种1231231231'
                }, {
                    img: '../../static/image/index/shop-1.png',
                    type: 1,
                    des: '梦话西游各种1231231231'
                }]
            },
        }
    },

}
</script>

<style lang="scss" scoped>
.detail-wrap {
    padding-top: 0.2rem;
    .cell-box {
        background: #ffffff;
    }
    .store-head {
        padding: 0.12rem 0.2rem 0.18rem;
        align-items: center;
        .store-logo {
            width: 1.1rem;
            height: 1.1rem;
            margin-right: 0.1rem;
        }
        .head-con {
            flex: 2;
            .store-name {
                font-size: 0.3rem;
                line-height: 0.5rem;
            }
            .star {
                align-items: center;
                .head-cash {
                    margin: 0 0.12rem;
                    font-size: 0.24rem;
                    color: #666666;
                    .head-cash-d {
                        color: #ff721c;
                        font-size: 0.2rem;
                        text-decoration: underline;
                    }
                }
                .head-mark {
                    width: 0.21rem;
                    height: 0.21rem;
                }
            }
            .icon-wrap {
                margin-top: 0.12rem;
                img {
                    width: auto;
                    height: 0.25rem;
                }
            }
        }
        .collect {
            padding: 0.06rem;
            min-width: 0.9rem;
            height: 0.6rem;
            background: #ff7800;
            border-radius: 0.1rem;
            text-align: center;
            font-size: 0.24rem;
            color: #ffffff;
            line-height: 0.3rem;
            .collect-num {
                font-size: 0.16rem;
                line-height: 0.2rem;
            }
        }
    }
    .detail-synopsis {
        background: #ffffff;
        margin-top: 0.05rem;
        padding: 0.14rem 0.2rem;
        .synopsis-name {
            font-size: 0.26rem;
            color: #555555;
            min-width: 1.2rem;
            line-height: .4rem;
        }
        .synopsis-des {
            font-size: 0.22rem;
            color: #666666;
            line-height: 0.35rem;
            .synopsis-des-icon {
                margin-right: 0.26rem;
                align-items: center;
                img {
                    width: 0.26rem;
                    height: 0.26rem;
                    margin-right: 0.05rem;
                }
            }
        }
    }
    .ranking-wrap {
        .ranking-tit {
            justify-content: space-between;
            line-height: 0.4rem;
            align-items: center;
            div {
                font-size: 0.28rem;
                color: #333333;
            }
            ul {
                li {
                    margin-left: 0.25rem;
                    color: #666666;
                }
                .rank-active {
                    border-bottom: 2px solid #ff721c;
                }
            }
        }
        .ranking-list {
            display: flex;
            // justify-content: space-between;
            justify-content: flex-start;
            flex-wrap: wrap;
            .shop-con-item:nth-child(3n - 1) {
                margin: 0.2rem 0.81rem 0;
            }
            .shop-con-item {
                width: 1.82rem;
                font-size: 0;
                margin-top: 0.2rem;
                .shop-con-item-img {
                    width: 1.82rem;
                    height: 1.82rem;
                }
                .shop-item-con {
                    align-items: center;
                    .shop-item-icon {
                        width: 0.5rem;
                        height: 0.23rem;
                        margin-right: 0.05rem;
                    }
                    .shop-item-des {
                        width: 1.2rem;
                        line-height: 0.3rem;
                        font-size: 0.16rem;
                        color: #333333;
                        overflow: hidden; /*超出的部分隐藏起来。*/
                        white-space: nowrap; /*不显示的地方用省略号...代替*/
                        text-overflow: ellipsis; /* 支持 IE */
                    }
                }
            }
        }
    }
    .recommend-wrap {
        .recommend-tit {
            height: 0.5rem;
            line-height: 0.5rem;
            padding-left: 0.2rem;
            font-size: 0.28rem;
            color: #333333;
        }
        .recommend-con {
            background: #fff;
            padding: 0.2rem;
        }
    }
    .pledge-box {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba($color: #000000, $alpha: 0.6);
        .pledge {
            background: #fff;
            position: absolute;
            top: 30%;
            width: 6rem;
            left: calc(50% - 3rem);
            border-radius: 0.1rem;
            padding: 0.2rem;
            .pledge-tit {
                color: #ff721c;
                line-height: 0.4rem;
                font-size: 0.3rem;
            }
            .pledge-str {
                margin-top: 0.1rem;
                .pledge-left {
                    font-size: 0.24rem;
                    color: #000;
                }
                .pledge-right {
                    font-size: 0.16rem;
                    color: #666666;
                }
            }
        }
    }
}
</style>
<style lang="scss">
.van-rate {
    padding-top: 0.05rem;
}
.van-rate__icon {
    font-size: 0.2rem;
}
</style>

