<template>
    <!-- 充值首页 -->
    <div class="wrap RechargeHomePage">
        <Header v-bind:head_data="head_data"></Header>
        <div class="RechargeHomePage-main">
            <div class="top">
                <div class="top-img">
                    <img :src="RechargeHomePage_img" alt="">
                </div>
                <!-- 代充 -->
                <div class="substitute-charge">
                    <div class="substitute-charge-title">
                        <span v-text="substitute_charge_title"></span>
                    </div>
                    <div class="substitute-charge-main">
                        <div class="substitute-charge-main-box" v-for="(item,index) in substitute_charge_data" :key="index">
                            <img :src="item.substitute_charge_img" alt="">
                            <span v-text="item.substitute_charge_name"></span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 低价专区 -->
            <div class="low-price-zone">
                <div class="substitute-charge-title low-price-zone-title">
                    <span v-text="low_price_zone_title"></span>
                </div>
                <div class="low-price-zone-img">
                    <img :src="low_price_zone_img" alt="">
                </div>
                <!-- 公用 -->
                <div class="substitute-charge-main">
                    <div class="substitute-charge-main-box" v-for="(item,index) in substitute_charge_data" :key="index">
                        <img :src="item.substitute_charge_img" alt="">
                        <span v-text="item.substitute_charge_name"></span>
                    </div>
                </div>
                <div class="quick-impact">速冲入口</div>
            </div>
            <!-- 点卡购买 -->
            <div class="spot-card-purchase">
                <div class="substitute-charge-title spot-card-purchase-title">
                    <span v-text="spot_card_purchase_title"></span>
                </div>
                <div class="spot-card-purchase-main" :class="{new1: !hide}">
                    <div class="spot-card-purchase-box" v-for="(item,index) in spot_card_purchase_data" :key="index">
                        <img :src="item.spot_card_purchase_img" alt="">
                        <span v-text="item.spot_card_purchase_name"></span>
                    </div>
                </div>
                <div class="more" @click="hide=!hide">
                    <span v-show="!hide">更多</span>
                    <img v-show="!hide" :src="more_img" alt="">
                    <span v-show="hide">返回</span>
                    <img v-show="hide" :src="more_img1" alt="">
                </div>
            </div>
            <!-- 充号 -->
            <div class="first-charge-number">
                <div class="substitute-charge-title first-charge-number-title">
                    <span v-text="first_charge_number_title"></span>
                </div>
                <div class="down-con flex-box">
                    <div class="down-active">
                        <img :src="active_data.game_img" alt />
                        <div class="active-name" v-text="active_data.game_name"></div>
                        <div class="active-des" v-text="active_data.game_des"></div>
                        <div class="active-btn">下载</div>
                    </div>
                    <img class="game-des" :src="active_data.des_img" alt />
                    <div class="down-list">
                        <div
                            class="down-item"
                            v-for="(item,index) in hot_data"
                            :key="index"
                            v-if="!item.active"
                        >
                            <img :src="item.game_img" :alt="item.game_name" />
                            <div v-text="item.game_name"></div>
                        </div>
                    </div>
                </div>

                <div class="substitute-charge-main first-charge-number-main">
                    <div class="substitute-charge-main-box" v-for="(item,index) in substitute_charge_data" :key="index">
                        <img :src="item.substitute_charge_img" alt="">
                        <span v-text="item.substitute_charge_name"></span>
                        <span>下载</span>
                    </div>
                </div>
            </div>
            <!-- 店铺推荐 -->
            <div class="shop-recommendation">
                <div class="substitute-charge-title shop-recommendation-title">
                    <span v-text="shop_recommendation_title"></span>
                </div>
                <!-- 店铺轮播 -->
                <div class="shop" :class="{new2: !ishide}">
                    <div class="shop-s wiper">
                        <div class="swiper-container" id="shopSwiper">
                            <div class="swiper-wrapper">
                                <div
                                    class="swiper-slide shop-item"
                                    v-for="(item,index) in shop_data"
                                    :key="index"
                                >
                                    <Store :store_data="item"></Store>
                                </div>
                            </div>
                            <div class="swiper-pagination"></div>
                        </div>
                    </div>

                    <div class="shop-s wiper">
                        <div class="swiper-container" id="shopSwiper">
                            <div class="swiper-wrapper">
                                <div
                                    class="swiper-slide shop-item"
                                    v-for="(item,index) in shop_data"
                                    :key="index"
                                >
                                    <Store :store_data="item"></Store>
                                </div>
                            </div>
                            <div class="swiper-pagination"></div>
                        </div>
                    </div>

                </div>
                <div class="more more1" @click="ishide=!ishide">
                    <span v-show="!ishide">更多</span>
                    <img v-show="!ishide" :src="more_img" alt="">
                    <span v-show="ishide">返回</span>
                    <img v-show="ishide" :src="more_img1" alt="">
                </div>
            </div>
        </div>
        <UserHelp/>
        <HotLine/>
        <Footer class="footer"/>
    </div>
</template>

<script>
import Header from '@/components/home-page/Header'
import Store from '@/components/home-page/Store'
import UserHelp from '@/components/home-page/UserHelp'
import HotLine from '@/components/home-page/Hotline'
import Footer from '@/components/home-page/Footer'
export default {
    components:{
        Header,
        Store,
        UserHelp,
        HotLine,
        Footer
    },
    data(){
        return{
            head_data: {
                show_type: 1,
            },

            hide:false,
            ishide:false,
            RechargeHomePage_img:'../../static/image/recharge-area/banner.png',

            // 代充
            substitute_charge_title:'代充',
            substitute_charge_data:[
                {
                    substitute_charge_img:'../../static/image/recharge-area/wangzhe.png',
                    substitute_charge_name:'王者荣耀'
                },
                {
                    substitute_charge_img:'../../static/image/recharge-area/wendao.png',
                    substitute_charge_name:'问道'
                },
                {
                    substitute_charge_img:'../../static/image/recharge-area/xiongmao.png',
                    substitute_charge_name:'武神'
                },
                {
                    substitute_charge_img:'../../static/image/recharge-area/lianmeng.png',
                    substitute_charge_name:'英雄联盟'
                },
                {
                    substitute_charge_img:'../../static/image/recharge-area/dota2.png',
                    substitute_charge_name:'DOTA2'
                },
                {
                    substitute_charge_img:'../../static/image/recharge-area/wangzhe.png',
                    substitute_charge_name:'王者荣耀'
                },
                {
                    substitute_charge_img:'../../static/image/recharge-area/wendao.png',
                    substitute_charge_name:'问道'
                },
                {
                    substitute_charge_img:'../../static/image/recharge-area/xiongmao.png',
                    substitute_charge_name:'武神'
                }
            ],

            // 低价
            low_price_zone_title:'低价专区',
            low_price_zone_img:'../../static/image/recharge-area/djrm.jpg',

            // 点卡
            spot_card_purchase_title:'点卡购买',
            spot_card_purchase_data:[
                {
                    spot_card_purchase_img:'../../static/image/recharge-area/dianka1.png',
                    spot_card_purchase_name:'端游点卡充值'
                },
                {
                    spot_card_purchase_img:'../../static/image/recharge-area/dianka1.png',
                    spot_card_purchase_name:'端游点卡充值'
                },
                {
                    spot_card_purchase_img:'../../static/image/recharge-area/dianka1.png',
                    spot_card_purchase_name:'端游点卡充值'
                },
                {
                    spot_card_purchase_img:'../../static/image/recharge-area/dianka1.png',
                    spot_card_purchase_name:'端游点卡充值'
                },
                {
                    spot_card_purchase_img:'../../static/image/recharge-area/dianka1.png',
                    spot_card_purchase_name:'端游点卡充值'
                }
            ],
            more_img:'/../../static/image/recharge-area/xiaobiao.png',
            more_img1:'/../../static/image/recharge-area/xiaobiao1.png',

            // 充号
            first_charge_number_title:'首充号',
            hot_data: [
                {
                    game_name: '大话西游',
                    game_img: '../../static/image/index/ico-1.png',
                    des_img: '../../static/image/index/item-1.png',
                    game_des: '回合制游戏',
                    active: true,
                }, {
                    game_name: '王者荣耀',
                    game_img: '../../static/image/index/ico-1.png',
                    des_img: '../../static/image/index/item-1.png',
                    game_des: '回合制游戏',
                    active: false,
                }, {
                    game_name: '梦幻西游',
                    game_img: '../../static/image/index/ico-1.png',
                    des_img: '../../static/image/index/item-1.png',
                    game_des: '回合制游戏',
                    active: false,
                },
            ],

            // 店铺推荐
            shop_recommendation_title:'优质店铺推荐',
            shop_data: [
                {
                    id: 1,
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
                }, {
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
                },{
                    id: 3,
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
            ],

        }
    },
    methods:{
        initSwiper() {
            new Swiper('.swiper-container', {
                loop: true,
                autoplay: 3000,
                initialSlide: 0,//第一个显示的图片默认为0
                observer: true,//修改swiper自己或子元素时，自动初始化swiper
                observeParents: true,//修改swiper的父元素时，自动初始化swiper
                autoplayDisableOnInteraction: false,//用户操作完是否自动切换
                pagination: '.swiper-pagination',
                paginationBulletRender: function (swiper, index, className) {
                    return '<span class= "' + className + '"></span>';
                }
            });
        },
    },
    mounted(){
        this.initSwiper();
    },
    computed:{
        active_data() {
            var that = this;
            for (var i in that.hot_data) {
                if (that.hot_data[i].active) {
                    return that.hot_data[i];
                }
            }
        }
    },
}


</script>

<style lang="scss" scoped>
.RechargeHomePage{
    line-height: .3rem;
    font-family:PingFang SC;
    .RechargeHomePage-main{
        margin-top: .82rem;
        // 公共
        .substitute-charge-title{
            text-align: center;
            padding-top: .2rem;
            span{
                display: inline-block;
                width: 1.14rem;
                height: .21rem;
                background: url(../../../static/image/recharge-area/modification.png) no-repeat;
                background-size: 100% 100%;
                font-size: .26rem;
                color: #FF7800FF;
                text-align: center;
                line-height: .21rem;
            }
        }
        .substitute-charge-main{
            padding: 0 .2rem .22rem .2rem;
            display: flex;
            flex-wrap: wrap;
            .substitute-charge-main-box{
                margin-top: .2rem;
                margin-right: .65rem;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                img{
                    width: .8rem;
                    height: .8rem;
                    margin-bottom: .2rem;
                }
                span{
                    font-size: .24rem;
                    color: #999999FF;
                }
            }
            .substitute-charge-main-box:nth-child(5n){
                margin-right: 0;
            }
        }
        .more{
            text-align: center;
            padding: .13rem 0 .27rem 0;
            z-index: 4;
            span{
                font-size: .24rem;
                color: #999999FF;
            }
            img{
                width: .23rem;
                height: .12rem;
            }
        }

        .top{
            background: #ffffff;
            box-shadow:1px 0px 7px 0px rgba(0, 0, 0, 0.29);
            .top-img{
                height: 3.28rem;
                img{
                    width: 100%;
                }
            }
            
        }
        // 低价
        .low-price-zone{
            background: #ffffff; 
            margin-top: .2rem;
            padding-bottom: .28rem;
            box-shadow:1px 0px 7px 0px rgba(0, 0, 0, 0.29);
            .low-price-zone-title{
                span{
                    width: 1.68rem;
                    margin-bottom: .13rem;
                }
            }
            .low-price-zone-img{
                height: 2.74rem;
                img{
                    width: 100%;
                }
            }
            .quick-impact{
                width: 6rem;
                height: .7rem;
                background: #FFA303FF;
                border-radius: .15rem;
                margin: auto;
                margin-top: .08rem;
                font-size: .24rem;
                color: #ffffff;
                line-height: .7rem;
                text-align: center;
            }
        }
        // 点卡
        .spot-card-purchase{
            padding: 0 .2rem;
            background: #ffffff;
            box-shadow:1px 0px 7px 0px rgba(0, 0, 0, 0.29);
            margin-top: .2rem;
            .spot-card-purchase-title{
                span{
                    width: 1.68rem;
                    margin-bottom: .14rem;
                }
            }
            .spot-card-purchase-main{
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                .spot-card-purchase-box{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    img{
                        width: 2.63rem;
                        height: 1.55rem;
                    }
                    span{
                        font-size: .24rem;
                        color: #333333FF;
                        padding: .15rem 0 .14rem 0;
                    }
                }
            }
            .new1{
                height: 4.2rem;
                overflow: hidden;
            }
        }
        // 充号
        .first-charge-number{
            padding: 0 .2rem;
            background: #ffffff;
            box-shadow:1px 0px 7px 0px rgba(0, 0, 0, 0.29);
            margin-top: .2rem;
            .first-charge-number-title{
                span{
                    width: 1.46rem;
                    margin-bottom: .19rem;
                }
            }
            .down-con {
                .down-active {
                    width: 1.6rem;
                    text-align: center;
                    background: #ffe184;
                    padding: 0.08rem 0;
                    img {
                        width: 0.84rem;
                        height: 0.84rem;
                        margin: 0.13rem 0;
                    }
                    .active-name {
                        color: #333333;
                        font-size: 0.24rem;
                    }
                    .active-des {
                        color: #888888;
                        font-size: 0.14rem;
                        line-height: 0.4rem;
                    }
                    .active-btn {
                        width: 1rem;
                        line-height: 0.3rem;
                        border: 1px solid #ff7f27;
                        border-radius: 0.06rem;
                        color: #ff731d;
                        font-size: 0.16rem;
                        margin: auto;
                    }
                }
                .game-des {
                        width: 4.42rem;
                }
                .down-list {
                    width: 1.09rem;
                    text-align: center;
                    font-size: 0.18rem;
                    color: #333333;
                    img {
                        width: 0.66rem;
                        height: 0.65rem;
                        margin: 0.08rem 0;
                    }
                }
            }
            .first-charge-number-main{
                padding: 0 0 .22rem 0;
                .substitute-charge-main-box{
                    span:nth-child(3){
                        font-size: .26rem;
                        color: #ffa303;
                        padding: .05rem .15rem;
                        border: 1px solid #ffa303;
                        border-radius: .2rem;
                        margin: .1rem 0
                    }
                }
            }
        }
        // 店铺推荐
        .shop-recommendation{
            background: #ffffff;
            box-shadow:1px 0px 7px 0px rgba(0, 0, 0, 0.29);
            margin: .2rem 0;
            .shop-recommendation-title{
                span{
                    width: 2.09rem;
                    margin-bottom: .15rem
                }
            }
            .shop{
                background:rgba(255,255,255,1);
                margin-top: .2rem;
                padding: 0 .2rem;
                .shop-s{
                    .shop-item {
                        padding-bottom: 0.56rem;
                    }
                }
            }
            .new2{
                height: 3.7rem;
                overflow: hidden;
            }

            .more{
                padding: 0 0 .16rem 0;
            }
        }
    }
}

// 底
.footer{
    margin-top: .2rem;
}
</style>

<style>
.swiper-pagination-bullet {
    width: 0.12rem;
    height: 0.12rem;
    background: #eeeeee;
    opacity: 1;
}
.swiper-pagination-bullet-active {
    width: 0.27rem;
    height: 0.12rem;
    border-top-left-radius: 0.1rem;
    border-top-right-radius: 0.1rem;
    border-bottom-left-radius: 0.1rem;
    border-bottom-right-radius: 0.1rem;
    background: #FE7649;
}

.swiper-pagination-bullet1 {
    width: 0.16rem;
    height: 0.16rem;
    background: #eeeeee;
    opacity: 1;
}

.van-rate {
    padding-top: 0.05rem;
}
.van-rate__icon {
    font-size: 0.2rem;
}
</style>