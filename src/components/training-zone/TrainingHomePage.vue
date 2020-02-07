<template>
    <!-- 代练首页 -->
    <div class="wrap HomeGageTraining">
        <Header v-bind:head_data="head_data"></Header>
        <div class="HomeGageTraining-main">
            <!-- 代练专区 -->
            <div class="top">
                <div class="top-title" v-text="HomeGageTraining_title"></div>
                <!-- 轮播图 -->
                <div class="tit-swiper">
                    <div class="swiper-container" id="indexSwiper">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" v-for="(item,index) in training_zone_data" :key="index">
                                <img :src="item.swiper_img" alt />
                            </div>
                        </div>
                    </div>
                    <div class="swiper-pagination"></div>
                </div>
                <!-- 优惠区 -->
                <div class="preferential-area">
                    <div class="mobile-game-rental-zone-nav">
                        <div
                            class="Letter-nav"
                            v-for="(item,index) in Letter_data"
                            :key="index"
                            :class="{'new1': item.i}"
                            @click="seleNav(index)"
                            v-text="item.name"
                        >
                        </div>
                    </div>
                    <div class="hot-tour">
                        <div class="hot-tour-box" v-for="(item,index) in hot_data1" :key="index">
                            <img :src="item.game_img" alt="">
                            <div class="hot-tour-box-right">
                                <span v-text="item.game_name"></span>
                                <span v-text="item.game_discount"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 代练店铺 -->
            <div class="training-shop">
                <div class="training-shop-box" v-for="(item,index) in training_shop_data" :key="index">
                    <div class="training-shop-box-left">
                        <div v-text="item.training_shop_title"></div>
                        <div v-text="item.training_shop_motto"></div>
                    </div>
                    <div class="training-shop-box-right">
                        <img :src="item.training_shop_img" alt="">
                    </div>
                </div>
            </div>
            <!-- 微信客服 -->
            <div class="wechat-customer-service">
                <ul>
                    <li>
                        <img :src="wechat_customer_service_img1" alt="">
                        <span v-text="wechat_customer_service_title1"></span>
                    </li>
                    <li>
                        <img :src="wechat_customer_service_img2" alt="">
                    </li>
                    <li>
                        <span>
                            微信号：<span id="copy" v-text="wechat_customer_service_title2"></span>
                            <span :data-clipboard-text="wechat_customer_service_title2" @click="copyFn()" id="copy">复制</span>
                        </span>                   
                    </li>
                </ul>
            </div>
        </div>
        <UserHelp/>
        <HotLine/>
        <Footer class="footer"/>
    </div>
</template>

<script>
import Header from '@/components/home-page/Header'
import UserHelp from '@/components/home-page/UserHelp'
import HotLine from '@/components/home-page/Hotline'
import Footer from '@/components/home-page/Footer'
export default {
    components:{
        Header,
        UserHelp,
        HotLine,
        Footer
    },
    data(){
        return{
            head_data: {
                show_type: 1,
            },
            HomeGageTraining_title:'代练专区',
            mobile_game_rental_zone_nav_img:"../../../static/image/rent/home_page/whole.png",

            Modification:false,

            // 轮播数据
            training_zone_data: [
                {
                    id: 1,
                    swiper_img:'../../static/image/training-zone/banner1.png'
                }, 
                {
                    id: 2,
                    swiper_img:'../../static/image/training-zone/banner1.png'
                },{
                    id: 3,
                    swiper_img:'../../static/image/training-zone/banner1.png'
                },
            ],

            // 优惠区数据
            Letter_data:[
                {
                    name:"全部",
                    i:true
                },
                {
                    name:'A',
                    i:false
                },{
                    name:'B',
                    i:false
                },{
                    name:'C',
                    i:false
                },{
                    name:'D',
                    i:false
                },{
                    name:'E',
                    i:false
                },{
                    name:'F',
                    i:false
                },{
                    name:'G',
                    i:false
                },{
                    name:'H',
                    i:false
                },{
                    name:'I',
                    i:false
                },{
                    name:'J',
                    i:false
                },{
                    name:'K',
                    i:false
                },{
                    name:'L',
                    i:false
                },{
                    name:'M',
                    i:false
                },{
                    name:'N',
                    i:false
                },{
                    name:'O',
                    i:false
                },{
                    name:'P',
                    i:false
                },{
                    name:'Q',
                    i:false
                },{
                    name:'R',
                    i:false
                },{
                    name:'S',
                    i:false
                },{
                    name:'T',
                    i:false
                },{
                    name:'U',
                    i:false
                },{
                    name:'V',
                    i:false
                },{
                    name:'W',
                    i:false
                },{
                    name:'X',
                    i:false
                },{
                    name:'Y',
                    i:false
                },{
                    name:'Z',
                    i:false
                }
            ],
            hot_data1:[
                {
                    game_name: '梦幻西游',
                    game_discount:'五折优惠',
                    game_img: '../../static/image/index/ico-1.png',
                },{
                    game_name: '梦幻西游',
                    game_discount:'天天靓号出租',
                    game_img: '../../static/image/index/ico-1.png',
                },
                {
                    game_name: '梦幻西游',
                    game_discount:'第二件半价',
                    game_img: '../../static/image/index/ico-1.png',
                },
                {
                    game_name: '梦幻西游',
                    game_discount:'第二件半价',
                    game_img: '../../static/image/index/ico-1.png',
                }
            ],

            // 代练店铺数据
            training_shop_data:[
                {
                    training_shop_title:'代练店铺',
                    training_shop_motto:'实力带你上分躺赢',
                    training_shop_img:'../../static/image/training-zone/Icon.png'
                },
                {
                    training_shop_title:'代练店铺',
                    training_shop_motto:'实力带你上分躺赢',
                    training_shop_img:'../../static/image/training-zone/Icon.png'
                },
                {
                    training_shop_title:'代练店铺',
                    training_shop_motto:'实力带你上分躺赢',
                    training_shop_img:'../../static/image/training-zone/Icon.png'
                },
                {
                    training_shop_title:'代练店铺',
                    training_shop_motto:'实力带你上分躺赢',
                    training_shop_img:'../../static/image/training-zone/Icon.png'
                },
                {
                    training_shop_title:'代练店铺',
                    training_shop_motto:'实力带你上分躺赢',
                    training_shop_img:'../../static/image/training-zone/Icon.png'
                },

            ],

            // 客服数据
            wechat_customer_service_img1:'../../static/image/training-zone/wechat.png',
            wechat_customer_service_title1:'微信客服',
            wechat_customer_service_img2:'../../static/image/training-zone/qr-code.png',
            wechat_customer_service_title2:'boke1452',
        }
    },
    methods:{
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
        },

        seleNav(index){
            for(var i in this.Letter_data){
                this.Letter_data[i].i = false;
            }
            console.log(index)
            this.Letter_data[index].i = true;
        },
        // 复制
        copyFn() {
            let that = this;
            let clipboard = new ClipboardJS("#copy");
            clipboard.on("success", function (e) {
                clipboard.destroy();
                mui.toast("复制成功", { duration: "short", type: "div" });
            });
            clipboard.on("error", function (e) {
                clipboard.destory();
                mui.toast("请重新点击复制", { duration: "short", type: "div" });
            });
        },

    },
    mounted(){
        this.initSwiper();
        // this.copyFn();
    },
    
}
</script>

<style lang="scss" scoped>
.HomeGageTraining{
    font-family:PingFang SC;
    font-weight:500;
    line-height: .3rem;
}
.HomeGageTraining-main{
    margin-top: .82rem;
}
// 代练专区
.top{
    background: #ffffff;
    padding: .15rem 0 .06rem 0;
    box-shadow:1px 0px 7px 0px rgba(0, 0, 0, 0.29);
}
.top-title{
    padding-left: .24rem;
    font-size: .28rem;
    color: #333333;
    line-height: .4rem;
}
// 轮播图
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
// 优惠区
.preferential-area{
    padding: 0 .2rem;
    margin-top: .45rem;
}

.mobile-game-rental-zone-nav {
    margin-top: 0.2rem;
    display: flex;
    justify-content: space-between;
    .Letter-nav {
        padding: 0 .05rem;
        text-align: center;
        line-height: 0.3rem;
        font-size: 0.18rem;
        color: #333333;
        box-sizing: border-box;
        cursor: pointer;
        border-radius: 50%;
        font-size: .1rem;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .new1 {
        padding: .01rem .1rem;
        background: #ff8900;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .Letter-nav:nth-child(1){
        padding: 0 .01rem;
        width: .6rem;
        border-radius: .3rem;
    }
    
}

.hot-tour{
    padding: 0 .2rem;
    display: flex;
    flex-wrap: wrap;
}
.hot-tour-box{
    width: 3.33rem;
    height: 1.1rem;
    display: flex;
    margin: .15rem 0;
}
.hot-tour-box img{
    width: 1.1rem;
    height: 1.1rem;
    margin-right: .19rem;
}
.hot-tour-box-right{
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.hot-tour-box-right span:nth-child(1){
    color: #333333;
    font-size: .24rem;
    padding: .05rem 0 .14rem 0;
}
.hot-tour-box-right span:nth-child(2){
    color: #ffffff;
    font-size: .16rem;
    text-align: center;
    line-height: .26rem;
    padding: .05rem .04rem;
    background: #ff5e5e;
    border-radius: .1rem;
}
.hot-tour-box-right span:nth-child(1),.hot-tour-box-right span:nth-child(2){
    max-width: 1.8rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}


.new1{
    width: .31rem;
    height: .31rem;
    border-radius: 50%;
    background: -webkit-gradient(linear, left top, right top, from(#fd915f), to(#ffa303));
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
}

// 代练店铺
.training-shop{
    // height: 3.85rem;
    padding: .12rem .2rem .07rem .2rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.training-shop-box{
    width: 3.5rem;
    height: 1.74rem;
    background: #ffffff;
    padding: 0 .21rem 0 .24rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.09rem;
    
}
.training-shop-box-left{
    width: 1.95rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.training-shop-box-left div:nth-child(1){
    font-size: .28rem;
    color: #333333;
    margin-bottom: .12rem;
}
.training-shop-box-left div:nth-child(2){
    font-size: .22rem;
    color: #666666FF;
}
.training-shop-box-right{
    width: 1.1rem;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.training-shop-box img{
    width: 100%;
    height: 1.1rem;
}
// 微信客服
.wechat-customer-service{
    background: #ffffff;
    margin-bottom: .2rem;
}
.wechat-customer-service ul{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.wechat-customer-service ul li:nth-child(1) img{
    width: .33rem;
    height: .27rem;
}
.wechat-customer-service ul li:nth-child(1) span{
    font-size: .3rem;
    color: #333333;
}
.wechat-customer-service ul li:nth-child(2) img{
    width: 1.47rem;
    height: 1.47rem;
}
.wechat-customer-service ul li:nth-child(3) span:nth-child(1){
    font-size: .26rem;
    color: #333333;
    margin-right: .16rem;
}
.wechat-customer-service ul li:nth-child(3) span:nth-child(2){
    font-size: .24rem;
    color: #666666FF;
    padding: .01rem .24rem;
    border-radius: .2rem;
    background:linear-gradient(180deg,rgba(240,240,240,1),rgba(226,226,226,1));
    border:1px solid rgba(255, 255, 255, 0.6);
    box-shadow:1px 2px 2px 0px rgba(175,175,175,1);
}
.wechat-customer-service ul li:nth-child(1){
    margin: .31rem 0 .28rem 0;
}
.wechat-customer-service ul li:nth-child(3){
    margin: .31rem 0 .22rem 0;
}
.footer{
    margin-top: .2rem;
}
</style>
<style>
.swiper-pagination-bullet {
    width: 0.10rem;
    height: 0.10rem;
    background: #999999FF;
    opacity: 1;
    margin: 0 .1rem;
}
.swiper-pagination-bullet-active {
    width: 0.24rem;
    height: 0.10rem;
    border-top-left-radius: 0.1rem;
    border-top-right-radius: 0.1rem;
    border-bottom-left-radius: 0.1rem;
    border-bottom-right-radius: 0.1rem;
    background: #FE7649;
}
.van-rate {
    padding-top: 0.05rem;
}
.van-rate__icon {
    font-size: 0.2rem;
}
.swiper-pagination{
    width: 7.5rem;
    position: none;
}
</style>