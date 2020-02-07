<template>
    <!-- 店铺列表 -->
    <div class="wrap">
        <Header :head_data="head_data"></Header>
        <div class="list-con">
            <div class="list-item" v-for="(item,index) in shop_data" :key="index">
                <Store :store_data="item"></Store>
            </div>
        </div>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header"
import Store from "@/components/home-page/Store"
export default {
    name: "ShopList",
    components: {
        Header, Store
    },
    data() {
        return {
            head_data: {
                show_type: 2,
                go_back: 1,
                right_icon: 2,
                tit_text: '游戏店铺',
            },
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
            ],
        }
    },
}
</script>
<style lang="scss" scoped>
.wrap {
    .list-con {
        .list-item {
            padding: 0.15px 0.2rem;
            background: #fff;
            margin-top: 0.2rem;
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
