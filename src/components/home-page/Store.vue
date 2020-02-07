<template>
    <div class="shop-wrap">
        <div class="shop-tit flex-box">
            <img class="shop-logo" :src="store_data.logo" alt />
            <div class="shop-name-box">
                <div class="flex-box shop-name-top">
                    <div class="shop-name" v-text="store_data.name"></div>
                    <van-rate
                        v-model="store_data.rate"
                        color="#FF721C"
                        void-color="#FFE3D2"
                        allow-half
                        void-icon="star"
                        readonly
                    />
                </div>
                <div class="flex-box">
                    <div class="good">
                        好评率：
                        <span v-text="store_data.good"></span>
                    </div>
                    <div class="make">
                        最近成交：
                        <span v-text="store_data.make"></span>单
                    </div>
                </div>
            </div>
            <div class="into" @click="intoShop(store_data.id)">进店</div>
        </div>
        <div class="shop-con flex-box">
            <div class="shop-con-item" v-for="(ind,num) in store_data.imgs" :key="num">
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
</template>
<script>
export default {
    name: 'StoreCom',
    data() {
        return {

        }
    },
    props: ['store_data'],
    methods: {
        intoShop(id) {
            this.$router.push({ name: 'ShopDetails', query: { id: id } })
        }
    },
    mounted() {

    }
}
</script>
<style lang="scss" scoped>
.shop-wrap {
    .shop-tit {
        position: relative;
        align-items: center;
        margin-bottom: 0.17rem;
        .shop-logo {
            width: 0.87rem;
            height: 0.87rem;
            margin-right: 0.12rem;
        }
        .shop-name-box {
            .shop-name-top {
                align-items: center;
                margin: 0 0.1rem 0.2rem 0;
            }
            .shop-name {
                color: #333333;
                font-size: 0.22rem;
                margin-right: 0.1rem;
            }
            .good {
                color: #555555;
                font-size: 0.16rem;
                margin-right: 0.2rem;
            }
            .make {
                color: #555555;
                font-size: 0.16rem;
            }
        }
        .into {
            width: 0.71rem;
            height: 0.3rem;
            line-height: 0.3rem;
            font-size: 0.23rem;
            text-align: center;
            color: #ff721c;
            border: 1px solid #ff721c;
            border-top-left-radius: 0.15rem;
            border-top-right-radius: 0.15rem;
            border-bottom-left-radius: 0.15rem;
            border-bottom-right-radius: 0.15rem;
            position: absolute;
            top: 0.2rem;
            right: 0.2rem;
            cursor: pointer;
        }
    }
    .shop-con {
        justify-content: space-between;
        .shop-con-item {
            width: 1.82rem;
            line-height: 0.3rem;
            .shop-con-item-img {
                width: 1.82rem;
                height: 1.82rem;
            }
            .shop-item-con {
                font-size: 0;
                align-items: center;
                .shop-item-icon {
                    width: 0.5rem;
                    height: 0.23rem;
                    margin-right: 0.05rem;
                }
                .shop-item-des {
                    width: 1.2rem;
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
</style>
