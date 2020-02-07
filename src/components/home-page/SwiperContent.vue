<template>
    <!-- 首页轮播图 -->
    <div class="swiper-index-wrap">
        <div class="swiper-container" id="indexSwiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item,index) in swiperSrc">
                    <img class="my-lazy" :src="item.img" alt @click="jump(item.img_url)" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SwiperContent",
    props: ['swiperSrc'],
    data() {
        return {
            imgList: [{ img: 'static/img/swiper_cont.png', img_url: 'https://www.baidu.com' }, { img: 'static/img/mh_ico.png' }, { img: 'static/img/swiper_cont.png' }, { img: 'static/img/swiper_cont.png' }]
        }
    },
    methods: {
        jump(url) {
            console.log(url);
            window.location.href = url;
        },
        mySwipter() {
            var that =this;
            that.Swiper = new Swiper('#indexSwiper', {
                lazy: true,
                loop: true,
                autoplay: 3000,
                initialSlide: 1,//第一个显示的图片默认为0
                observer: true,//修改swiper自己或子元素时，自动初始化swiper
                observeParents: true,//修改swiper的父元素时，自动初始化swiper
                autoplayDisableOnInteraction: false,//用户操作完是否自动切换
                effect: 'coverflow',//切换方式
                slidesPerView: 'auto',//自适应放几个
                loopedSlides: 4,//设置sildesPerView 就要设置 loopedSlides 为slids的个数
                centeredSlides: true,
                preventClicksPropagation: true,
                coverflow: {
                    rotate: 40,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: false,
                },
            });
            that.Swiper.lazy.load();
        }
    },
    mounted() {
        var that = this;
        var time = setInterval(function () {
            if (that.swiperSrc != '') {
                that.mySwipter();
                clearInterval(time);
            }
        }, 100)
    }
}
</script>

<style scoped>
#indexSwiper {
    width: 100%;
    padding-top: 0.2rem;
}
.swiper-slide {
    width: 6.3rem;
    height: 3.16rem;
}
.swiper-slide img {
    width: 6.3rem;
    height: 3.16rem;
}
</style>