<template>
    <!-- 新业务开通 -->
    <div class="wrap service-fulfillment">
        <div class="top">
            <Header v-bind:head_data="head_data"></Header>
            <div class="top-opening">
                <img src="../../../static/image/ywkt/game_mark.png" />
                <span>新业务开通</span>
            </div>
        </div>
        <div class="main_1">
            <div class="main_box" v-for="(item,i) in set_meal_data" :key="i" :class="item.name">
                <img :src="item.set_meal_img" />
                <div class="main_box_tit" v-text="item.set_meal_name"></div>
                <div class="main_box_des" v-text="item.set_meal_reputation"></div>
                <div class="apply-btn">申请开通</div>
            </div>
        </div>
    </div>
</template>
<script>
import Header from '@/components/home-page/Header'
export default {
    name: "Opening",
    components: {
        Header
    },
    data() {
        return {
            head_data: {
                //1搜索2分享3菜单
                show_type: 2,
                right_icon: 1,
                tit_text: '新业务开通',
            },
            set_meal_data: [
                {
                    set_meal_img: '../../../static/image/ywkt/gold_coins.png',
                    set_meal_name: '道具/金币担保交易套餐',
                    set_meal_reputation: '信誉值≥150,卖家直接给买家发货',
                    name: 'prop',
                },
                {
                    set_meal_img: '../../../static/image/ywkt/gold_coin.png',
                    set_meal_name: '道具/金币担保交易套餐',
                    set_meal_reputation: '信誉值≥150,卖家直接给买家发货',
                    name: 'account',
                },
                {
                    set_meal_img: '../../../static/image/ywkt/golden_bag.png',
                    set_meal_name: '道具/金币担保交易套餐',
                    set_meal_reputation: '信誉值≥150,卖家直接给买家发货',
                    name: 'all',
                },
            ],

        }

    },
    methods: {

    }


}
</script>

<style lang="scss" scoped>
.service-fulfillment {
    line-height: 0.21rem;
    font-family: PingFang SC;
    width: 7.5rem;
    height: 15rem;
    
    .top{
        .top-opening {
            width: 7.5rem;
            height: 0.52rem;
            background: #ffffff;
            margin-top: 0.03rem;
            line-height: 0.52rem;
            display: flex;
            img {
                width: 0.57rem;
                height: 0.41rem;
                margin: 0.06rem 0.1rem 0.07rem 0.26rem;
            }
            span {
                font-size: 0.2rem;
                font-weight: 500;
                color: #ffa303;
            }
        }
    }

    .main_1 {
        width: 7.5rem;
        padding: 0 0.2rem;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .main_box {
            width: 3.5rem;
            height: 2.1rem;
            margin-top: 0.1rem;
            background: #ffffff;
            display: flex;
            flex-direction: column;
            align-items: center;
            .main_box_tit {
                font-size: 0.24rem;
                font-weight: bold;
                color: #333333;
                line-height: 0.4rem;
            }
            .main_box_des {
                font-size: 0.16rem;
                font-weight: 400;
                color: #666666;
                width: 2.48rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                line-height: 0.3rem;
                margin-bottom: 0.1rem;
            }
            .apply-btn {
                margin: 0 auto;
                background: #ffa303;
                border-radius: 0.03rem;
                font-size: 0.16rem;
                text-align: center;
                line-height: 0.29rem;
                color: #fff;
                padding: 0.05rem 0.26rem;
            }
        }
    }

    .prop {
        padding-top: 0.2rem;
        img {
            width: 1.09rem;
            height: 0.65rem;
        }
    }
    .account {
        padding-top: 0.1rem;
        img {
            width: .65rem;
            height: 0.65rem;
            margin-bottom: .1rem;
        }
    }
    .all {
        padding-top: 0.1rem;
        img {
            width: .71rem;
            height: 0.75rem;
        }
    }

}

</style>