<template>
    <!-- 租号首页 -->
    <div class="wrap rent-home-page">
        <Header v-bind:head_data="head_data"></Header>
        <div class="rent-home-page-top">
            <!-- 导航栏 -->
            <div class="rent-home-page-nav">
                <div
                    v-for="(item,index) in nav_data"
                    :key="index"
                    v-text="item.text"
                    @click="toList(item.id)"
                ></div>
            </div>
            <!-- 手游租号专区 -->
            <div class="mobile-game-rental-zone">
                <div class="down-wrap small-wrap">
                    <div class="down-wrap-title" v-text="mobile_game_rental_zone_title"></div>
                    <!-- <div class="down-con flex-box">
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
                    </div>-->
                    <!-- 字母筛选 -->
                    <!-- <div class="mobile-game-rental-zone-nav">
                        <div
                            class="Letter-nav"
                            v-for="(item,index) in Letter_data"
                            :key="index"
                            :class="{'new1': item.i}"
                            @click="seleNav(index)"
                            v-text="item.name"
                        >
                        </div>
                    </div>-->
                    <div class="tit-swiper">
                        <div class="swiper-container" id="indexSwiper">
                            <div class="swiper-wrapper">
                                <div
                                    class="swiper-slide"
                                    v-for="(item,index) in swiperSrc"
                                    :key="index"
                                    @click="goPage(item.img_url)"
                                >
                                    <img :src="item.img" alt />
                                </div>
                            </div>
                            <div class="swiper-pagination"></div>
                        </div>
                    </div>

                    <!-- 热游区 -->
                    <div class="hot-tour">
                        <div class="hot-tour-box" v-for="(item,index) in hot_data1" :key="index">
                            <img :src="item.game_img" alt />
                            <div class="hot-tour-box-right">
                                <span v-text="item.game_name"></span>
                                <span v-text="item.game_discount"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 影视 -->
            <div>
                <div class="video-library">
                    <div class="down-wrap-title" v-text="video_library_title"></div>
                    <div class="box-tab">
                        <div class="cards">
                            <div class="tab-card" v-for="(item,index) in tabdata1" :key="index">
                                <img :src="item.img" alt />
                            </div>
                        </div>
                        <div class="tabbottom">
                            <div
                                class="tab-link"
                                rel="external nofollow"
                                @click="tabsSwitch(index)"
                                v-bind:class="{active:tab.isActive}"
                                v-for="(tab,index) in tabdata"
                                :key="index"
                            >
                                <img :src="tab.nav_img" alt />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 音乐 -->
            <div>
                <div class="video-library">
                    <div class="down-wrap-title" v-text="video_library_title1"></div>
                    <div class="box-tab">
                        <div class="cards">
                            <div class="tab-card1" v-for="(item,index) in tabdata3" :key="index">
                                <img :src="item.img" alt />
                            </div>
                        </div>
                        <div class="tabbottom">
                            <div
                                class="tab-link"
                                rel="external nofollow"
                                @click="tabsSwitch1(index)"
                                v-bind:class="{active:tab.isActive}"
                                v-for="(tab,index) in tabdata2"
                                :key="index"
                            >
                                <img :src="tab.nav_img" alt />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 店铺 -->
        <div class="shop">
            <div class="shop-title">
                <div class="down-wrap-title" v-text="shop_title"></div>
                <div class="down-wrap-title-right">更多</div>
            </div>
            <div class="shop-swiper">
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

        <UserHelp />
        <HotLine />
        <Footer class="footer" />
    </div>
</template>

<script>
import Header from '@/components/home-page/Header'
import TabSwitch from './TabSwitch'
import Store from '@/components/home-page/Store'
import UserHelp from '@/components/home-page/UserHelp'
import HotLine from '@/components/home-page/Hotline'
import Footer from '@/components/home-page/Footer'
export default {
    components: {
        Header,
        TabSwitch,
        Store,
        UserHelp,
        HotLine,
        Footer
    },
    data() {
        return {
            //头部
            head_data: {
                show_type: 1,
            },
            mobile_game_rental_zone_title: "手游租号专区",
            video_library_title: "影迷TV迷大乱炖",
            shop_title: '优质店铺为您推荐',
            mobile_game_rental_zone_nav_img: "../../../static/image/rent/home_page/whole.png",
            active: false,
            active1: false,
            //导航栏
            nav_data: [
                {
                    text: '手游',
                    id: 1,
                }, {
                    text: '端游',
                    id: 2,
                }, {
                    text: '图书游戏',
                    id: 3,
                }, {
                    text: '影视TV',
                    id: 4,
                }, {
                    text: '音乐',
                    id: 5,
                }
            ],
            //轮播图
            swiperSrc: [
                { img: "http://192.168.1.253:9099/static/images/loop/5c7e07e017023.png", img_url: ""},
                { img: "http://192.168.1.253:9099/static/images/loop/5df9c07d4a5e1.png", img_url: "http://xyq.163.com/fab/" },
                { img: "http://192.168.1.253:9099/static/images/loop/5d6876fbabff1.png", img_url: ""},
                { img: "http://192.168.1.253:9099/static/images/loop/5d8492a8f1185.png", img_url: "" },
                { img: "http://192.168.1.253:9099/static/images/loop/5c7e07e7b5d05.png", img_url: "" },
            ],
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
            // 字母筛选数据
            Letter_data: [
                {
                    name: '全部',
                    i: true,
                },
                {
                    name: 'A',
                    i: false
                }, {
                    name: 'B',
                    i: false
                }, {
                    name: 'C',
                    i: false
                }, {
                    name: 'D',
                    i: false
                }, {
                    name: 'E',
                    i: false
                }, {
                    name: 'F',
                    i: false
                }, {
                    name: 'G',
                    i: false
                }, {
                    name: 'H',
                    i: false
                }, {
                    name: 'I',
                    i: false
                }, {
                    name: 'J',
                    i: false
                }, {
                    name: 'K',
                    i: false
                }, {
                    name: 'L',
                    i: false
                }, {
                    name: 'M',
                    i: false
                }, {
                    name: 'N',
                    i: false
                }, {
                    name: 'O',
                    i: false
                }, {
                    name: 'P',
                    i: false
                }, {
                    name: 'Q',
                    i: false
                }, {
                    name: 'R',
                    i: false
                }, {
                    name: 'S',
                    i: false
                }, {
                    name: 'T',
                    i: false
                }, {
                    name: 'U',
                    i: false
                }, {
                    name: 'V',
                    i: false
                }, {
                    name: 'W',
                    i: false
                }, {
                    name: 'X',
                    i: false
                }, {
                    name: 'Y',
                    i: false
                }, {
                    name: 'Z',
                    i: false
                }
            ],
            // 热游区
            hot_data1: [
                {
                    game_name: '梦幻西游',
                    game_discount: '五折优惠',
                    game_img: '../../static/image/index/ico-1.png',
                }, {
                    game_name: '梦幻西游',
                    game_discount: '天天靓号出租',
                    game_img: '../../static/image/index/ico-1.png',
                },
                {
                    game_name: '梦幻西游',
                    game_discount: '第二件半价',
                    game_img: '../../static/image/index/ico-1.png',
                },
                {
                    game_name: '梦幻西游',
                    game_discount: '第二件半价',
                    game_img: '../../static/image/index/ico-1.png',
                }
            ],

            // 影视数据
            video_library_title: '影迷TV迷大乱炖',
            tabdata: [
                {
                    nav_img: '../../../static/image/rent/home_page/Iqiyi.png',
                    isActive: true
                }, {
                    nav_img: '../../../static/image/rent/home_page/video-card.png',
                    isActive: false
                }, {
                    nav_img: '../../../static/image/rent/home_page/Youku.png',
                    isActive: false
                },
                {
                    nav_img: '../../../static/image/rent/home_page/Mango.png',
                    isActive: false
                }],
            tabdata1: [
                {
                    img: "../../../static/image/rent/home_page/video-map.png"
                },
                {
                    img: "../../../static/image/rent/home_page/qyn.png"
                },
                {
                    img: "../../../static/image/rent/home_page/fy.png"
                },
                {
                    img: "../../../static/image/rent/home_page/qps.png"
                }
            ],

            // 音乐数据
            video_library_title1: '文艺青年真有为',
            tabdata2: [
                {
                    nav_img: '../../../static/image/rent/home_page/music-card.png',
                    isActive: true
                }, {
                    nav_img: '../../../static/image/rent/home_page/cool-dog.png',
                    isActive: false
                }, {
                    nav_img: '../../../static/image/rent/home_page/baidu.png',
                    isActive: false
                },
                {
                    nav_img: '../../../static/image/rent/home_page/thousand.png',
                    isActive: false
                }
            ],
            tabdata3: [
                {
                    img: "../../../static/image/rent/home_page/zj.png"
                },
                {
                    img: "../../../static/image/rent/home_page/fz.png"
                },
                {
                    img: "../../../static/image/rent/home_page/hx.png"
                },
                {
                    img: "../../../static/image/rent/home_page/qc.png"
                }
            ],
            // 店铺数据
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
                }, {
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
    methods: {

        initSwiper() {
            new Swiper('#indexSwiper', {
                loop: true,
                // autoplay: 3000,
                // initialSlide: 0,//第一个显示的图片默认为0
                observer: true,//修改swiper自己或子元素时，自动初始化swiper
                observeParents: true,//修改swiper的父元素时，自动初始化swiper
                autoplayDisableOnInteraction: false,//用户操作完是否自动切换
                pagination: '.swiper-pagination',
                paginationBulletRender: function (swiper, index, className) {
                    return '<span class="' + className + '"></span>';
                }
            });
            new Swiper('#shopSwiper', {
                loop: true,
                // autoplay: 3000,
                // initialSlide: 0,//第一个显示的图片默认为0
                observer: true,//修改swiper自己或子元素时，自动初始化swiper
                observeParents: true,//修改swiper的父元素时，自动初始化swiper
                autoplayDisableOnInteraction: false,//用户操作完是否自动切换
                pagination: '.swiper-pagination',
                paginationBulletRender: function (swiper, index, className) {
                    return '<span class= "' + className + '"></span>';
                }
            });
        },

        goPage(url) {
            if (url != '') {
                window.location.href = url;
            }
        },
        // initSwiper() {
        //     new Swiper('#shopSwiper', {
        //         loop: true,
        //         autoplay: 3000,
        //         initialSlide: 0,//第一个显示的图片默认为0
        //         observer: true,//修改swiper自己或子元素时，自动初始化swiper
        //         observeParents: true,//修改swiper的父元素时，自动初始化swiper
        //         autoplayDisableOnInteraction: false,//用户操作完是否自动切换
        //         pagination: '.swiper-pagination',
        //         paginationBulletRender: function (swiper, index, className) {
        //             return '<span class= "' + className + '"></span>';
        //         }
        //     });
        // },
        tabsSwitch: function (tabIndex) {
            var tabCardCollection = document.querySelectorAll(".tab-card");
            var len = tabCardCollection.length;
            for (var i = 0; i < len; i++) {
                tabCardCollection[i].style.display = "none";
                this.tabdata[i].isActive = false;
            }
            this.tabdata[tabIndex].isActive = true;
            tabCardCollection[tabIndex].style.display = "block";
        },
        tabsSwitch1: function (tabIndex) {
            var tabCardCollection = document.querySelectorAll(".tab-card1");
            var len = tabCardCollection.length;
            for (var i = 0; i < len; i++) {
                tabCardCollection[i].style.display = "none";
                this.tabdata2[i].isActive = false;
            }
            this.tabdata2[tabIndex].isActive = true;
            tabCardCollection[tabIndex].style.display = "block";
        },
        seleNav(index) {
            for (var i in this.Letter_data) {
                this.Letter_data[i].i = false;
            }
            // console.log(index)
            this.Letter_data[index].i = true;
        },
        toList(id) {
            let that = this;
            switch (id) {
                case 1:
                    that.$router.push({ name: 'RentPage', params: { opt: 1 } })
                    break;
                case 2:
                    that.$router.push({ name: 'RentPage', params: { opt: 1 } })
                    break;
                case 3:
                    that.$router.push({ name: 'RentPage', params: { opt: 3 } })
                    break;
                case 4:
                    that.$router.push({ name: 'RentPage', params: { opt: 2 } })
                    break;
                case 5:
                    that.$router.push({ name: 'RentPage', params: { opt: 2 } })
            }
        }

    },
    mounted() {
        this.initSwiper();
    },
    computed: {
        active_data() {
            var that = this;
            for (var i in that.hot_data) {
                if (that.hot_data[i].active) {
                    return that.hot_data[i];
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.rent-home-page {
    .rent-home-page-top {
        padding: 0 0.22rem 0 0.21rem;
        margin-top: 0.62rem;
        // 导航栏
        .rent-home-page-nav {
            padding: 0.18rem 0 0.17rem 0;
            display: flex;
            justify-content: space-between;
            div {
                width: 1.15rem;
                height: 0.62rem;
                border-radius: 0.1rem;
                font-size: 0.24rem;
                color: #ffffff;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            div:nth-child(1) {
                background: #2c9f67;
            }
            div:nth-child(2) {
                background: #9062c0;
            }
            div:nth-child(3) {
                background: #509fc9;
            }
            div:nth-child(4) {
                background: #f18200;
            }
            div:nth-child(5) {
                background: #cc463d;
            }
        }
        // 手游租号专区
        .mobile-game-rental-zone {
            width: 100%;
            background: #ffffff;
            box-shadow: 1px 0px 7px 0px rgba(0, 0, 0, 0.29);
            .down-wrap-title {
                color: #333333;
                font-size: 0.28rem;
                font-weight: 500;
                font-family: PingFang SC;
                padding: 0.2rem 0 0.15rem 0.2rem;
            }
            /* 轮播图 */
            .tit-swiper {
                background: #ffffff;
                #indexSwiper {
                    width: 100%;
                }
                .swiper-slide {
                    width: 7.5rem;
                    height: 3.16rem;
                }
                .swiper-slide img {
                    width: 7.5rem;
                    height: 3.16rem;
                }
            }
            .down-wrap {
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
            }
            // 字母筛选
            .mobile-game-rental-zone-nav {
                margin-top: 0.2rem;
                display: flex;
                justify-content: space-between;
                .Letter-nav {
                    padding: 0 0.05rem;
                    text-align: center;
                    line-height: 0.3rem;
                    font-size: 0.18rem;
                    color: #333333;
                    box-sizing: border-box;
                    cursor: pointer;
                    border-radius: 50%;
                    font-size: 0.1rem;
                    overflow: hidden;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .new1 {
                    padding: 0.01rem 0.1rem;
                    background: #ff8900;
                    color: #fff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .Letter-nav:nth-child(1) {
                    padding: 0 0.01rem;
                    width: 0.6rem;
                    border-radius: 0.3rem;
                }
            }
            // 热游区
            .hot-tour {
                padding: 0 0.2rem;
                display: flex;
                flex-wrap: wrap;
                .hot-tour-box {
                    width: 3.33rem;
                    height: 1.1rem;
                    display: flex;
                    margin: 0.15rem 0;
                    img {
                        width: 1.1rem;
                        height: 1.1rem;
                        margin-right: 0.19rem;
                    }
                    .hot-tour-box-right {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        span:nth-child(1) {
                            color: #333333;
                            font-size: 0.24rem;
                            padding: 0.05rem 0 0.14rem 0;
                        }
                        span:nth-child(2) {
                            color: #ffffff;
                            font-size: 0.16rem;
                            text-align: center;
                            line-height: 0.26rem;
                            padding: 0.05rem 0.04rem;
                            background: #ff5e5e;
                            border-radius: 0.1rem;
                        }
                        span:nth-child(1),
                        span:nth-child(2) {
                            max-width: 1.9rem;
                            overflow: hidden; /*溢出隐藏*/
                            text-overflow: ellipsis; /*以省略号...显示*/
                            white-space: nowrap; /*强制不换行*/
                        }
                    }
                }
            }
        }
        .video-library {
            background: #ffffff;
            margin-top: 0.2rem;
            box-shadow: 1px 0px 7px 0px rgba(0, 0, 0, 0.29);
            .down-wrap-title {
                color: #333333;
                font-size: 0.28rem;
                font-weight: 500;
                font-family: PingFang SC;
                padding: 0.2rem 0 0.15rem 0.2rem;
            }
            .box-tab {
                width: 7.07rem;
                .tab-card,
                .tab-card1 {
                    display: none;
                    height: 3.05rem;
                }
                .cards {
                    div:nth-child(1) {
                        display: block;
                    }
                    .tab-card,
                    .tab-card1 {
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
                .tabbottom {
                    display: flex;
                    justify-content: space-between;
                    .tab-link {
                        width: 1.72rem;
                        height: 0.77rem;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    img {
                        width: 1.31rem;
                        padding: 0.08rem 0 0.03rem 0;
                    }
                    .active {
                        background: #f9d5adff;
                    }
                }
            }
        }
    }
    // 店铺
    .shop {
        background: rgba(255, 255, 255, 1);
        box-shadow: 1px 0px 7px 0px rgba(0, 0, 0, 0.29);
        margin: 0.2rem 0;
        padding: 0 0.2rem;
        .shop-title{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .down-wrap-title {
                color: #333333;
                font-size: 0.28rem;
                font-weight: 500;
                font-family: PingFang SC;
                padding: 0.2rem 0 0.15rem 0.1rem;
            }
            .down-wrap-title-right{
                color: #FF721C;
                font-size: .2rem;
                font-family:PingFang SC;
                font-weight:500;
            }
        }
        
        
        .shop-item {
            padding-bottom: 0.56rem;
        }
    }
    .footer {
        margin-top: 0.2rem;
    }
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
    background: #fe7649;
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