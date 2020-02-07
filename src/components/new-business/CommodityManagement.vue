<template>
    <!-- 商品管理 -->
    <div class="wrap CommodityManagement">
        <Header v-bind:head_data="head_data"></Header>
        <div class="nav">
            <div
                v-for="(item,i) in nav_data"
                :key="i"
                @click="seleNav(i)"
                :class="item.active?'sele-color':'unsele-color'"
            >
                <span>
                    <span v-text="item.nav_title"></span>
                    <img :src="item.nav_img" alt="">
                </span>
            </div>
        </div>
        <!-- 列表 -->
        <div class="list-commodities" v-for="(item,i) in list_commodities_data" :key="i" v-show="nav_data[0].active">
            <div class="list-commodities-left">
                <img :src="item.list_commodities_img1" alt />
            </div>
            <div class="list-commodities-in">
                <div class="list-commodities-in-top">
                    <img :src="item.list_commodities_img2" alt />
                    <img :src="item.list_commodities_img3" alt />
                    <img :src="item.list_commodities_img4" alt />
                    <span v-text="item.list_commodities_area"></span>
                </div>
                <div class="list-commodities-in-bottom">
                    <span v-text="item.list_commodities_introduce"></span>
                    <span>
                        ¥
                        <span v-text="item.list_commodities_price"></span>
                    </span>
                </div>
            </div>
            <div class="list-commodities-right">
                <div class="list-commodities-right-top">
                    <img :src="item.list_commodities_img5" alt />
                    <img :src="item.list_commodities_img6" alt />
                    <img :src="item.list_commodities_img7" alt />
                </div>
                <div class="list-commodities-right-bottom" @click="btn(i)">
                    <img :src="item.list_commodities_img8" alt />
                </div>
            </div>
            <div class="edit" v-show="item.edit">
                <ul>
                    <li>
                        <img :src="list_commodities_img9" alt />
                        <span>编辑</span>
                    </li>
                    <li>
                        <img :src="list_commodities_img10" alt />
                        <span>下架</span>
                    </li>
                    <li>
                        <img :src="list_commodities_img11" alt />
                        <span>删除</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import Header from '@/components/home-page/Header'
export default {
    name: "CommodityManagement",
    components: {
        Header
    },
    data() {
        return {
            head_data: {
                //1搜索2分享3菜单
                show_type: 2,
                right_icon: 2,
                tit_text: '商品管理',
            },
            isShow: false,
            list_commodities_img9: '../../../static/image/CommodityManagement/edit.png',
            list_commodities_img10: '../../../static/image/CommodityManagement/lower-shelf.png',
            list_commodities_img11: '../../../static/image/CommodityManagement/delete.png',

            nav_data: [
                {
                    nav_title: '销售中',
                    nav_img1: '../../../static/image/state2.png',
                    nav_img: '../../../static/image/state.png',
                    active: true,
                },
                {
                    nav_title: '已售罄',
                    nav_img1: '../../../static/image/state2.png',
                    nav_img: '../../../static/image/state.png',
                    active: false,
                },
                {
                    nav_title: '仓库中',
                    nav_img1: '../../../static/image/state2.png',
                    nav_img: '../../../static/image/state.png',
                    active: false,
                }
            ],

            list_commodities_data: [
                {
                    list_commodities_img1: '../../../static/image/CommodityManagement/lcon.png',
                    list_commodities_img2: '../../../static/image/CommodityManagement/j.png',
                    list_commodities_img3: '../../../static/image/CommodityManagement/cp.png',
                    list_commodities_img4: '../../../static/image/CommodityManagement/apple.png',
                    list_commodities_img5: '../../../static/image/CommodityManagement/b.png',
                    list_commodities_img6: '../../../static/image/CommodityManagement/f.png',
                    list_commodities_img7: '../../../static/image/CommodityManagement/y.png',
                    list_commodities_img8: '../../../static/image/CommodityManagement/more.png',
                    list_commodities_area: '安卓一区',
                    list_commodities_price: '6000',
                    list_commodities_introduce: '贵6小号， 多宝宝， 多套餐',
                    edit: false,
                },
                {
                    list_commodities_img1: '../../../static/image/CommodityManagement/lcon.png',
                    list_commodities_img2: '../../../static/image/CommodityManagement/j.png',
                    list_commodities_img3: '../../../static/image/CommodityManagement/cp.png',
                    list_commodities_img4: '../../../static/image/CommodityManagement/apple.png',
                    list_commodities_img5: '../../../static/image/CommodityManagement/b.png',
                    list_commodities_img6: '../../../static/image/CommodityManagement/f.png',
                    list_commodities_img7: '../../../static/image/CommodityManagement/y.png',
                    list_commodities_img8: '../../../static/image/CommodityManagement/more.png',
                    list_commodities_area: '安卓一区',
                    list_commodities_price: '6000',
                    list_commodities_introduce: '贵6小号， 多宝宝， 多套餐',
                    edit: false,
                },
                {
                    list_commodities_img1: '../../../static/image/CommodityManagement/lcon.png',
                    list_commodities_img2: '../../../static/image/CommodityManagement/j.png',
                    list_commodities_img3: '../../../static/image/CommodityManagement/cp.png',
                    list_commodities_img4: '../../../static/image/CommodityManagement/apple.png',
                    list_commodities_img5: '../../../static/image/CommodityManagement/b.png',
                    list_commodities_img6: '../../../static/image/CommodityManagement/f.png',
                    list_commodities_img7: '../../../static/image/CommodityManagement/y.png',
                    list_commodities_img8: '../../../static/image/CommodityManagement/more.png',
                    list_commodities_area: '安卓一区',
                    list_commodities_price: '6000',
                    list_commodities_introduce: '贵6小号， 多宝宝， 多套餐',
                    edit: false,
                },


            ]

        }
    },
    methods: {
        //选择列表 
        seleNav(index) {
            let that = this;
            for(var i in that.nav_data){
                that.nav_data[i].active = false;
            }
            that.nav_data[index].active = true;
        },
        // 操作
        btn: function (index) {
            let that = this;
            for (var i in that.list_commodities_data) {
                if (i == index) {
                    that.list_commodities_data[index].edit = !that.list_commodities_data[index].edit;
                    continue;
                }
                that.list_commodities_data[i].edit = false;
            }
        },
    }

}
</script>

<style lang="scss" scoped>
.CommodityManagement {
    height: 15rem;
    padding-top: 1.41rem;
    span {
        font-family: PingFang SC;
    }
    .nav {
        height: 0.55rem;
        background: #ffffff;
        padding: 0 0.28rem;
        display: flex;
        justify-content: space-between;
        position: fixed;
        top:.86rem;
        width: 7.5rem;
        // left:0;right: 0;
        z-index: 10;
        box-shadow: 1px 1px 1px #ccc;
        .sele-color {
            color: #333333;
        }
        .unsele-color {
            color: #999999;
        }
        img {
            width: 0.18rem;
            height: 0.11rem;
            margin: 0 0.1rem;
        }
        span {
            font-size: 0.24rem;
            font-weight: 500;
            line-height: 0.55rem;
        }
    }

    .list-commodities {
        height: 1.7rem;
        width: 100%;
        background: #ffffff;
        padding: 0.26rem 0.22rem 0 0.25rem;
        margin-top: 0.2rem;
        display: flex;
        position: relative;
        
        .list-commodities-left {
            margin-right: 0.13rem;
            float: left;
            img {
                width: 0.89rem;
                height: 0.9rem;
                margin-top: 0.1rem;
            }
        }

        .list-commodities-in{
            .list-commodities-in-top{
                width: 3.3rem;
                height: 0.36rem;
                line-height: 0.36rem;
                position: relative;
                img:nth-child(2) {
                    width: 0.93rem;
                    margin: 0 0.02rem;
                }
                span {
                    display: inline-block;
                    height: 0.36rem;
                    font-size: 0.26rem;
                    color: #999999;
                    font-weight: 500;
                    position: absolute;
                    top: 0;
                    left: 2.2rem;
                }
                img:nth-child(1),img:nth-child(2),img:nth-child(3) {
                    height: 0.36rem;
                }
                img:nth-child(1),img:nth-child(3) {
                    height: 0.36rem;
                }
            }
            .list-commodities-in-bottom {
                display: flex;
                flex-direction: column;
                span:nth-child(1) {
                    font-size: 0.24rem;
                    font-weight: bold;
                    color: #333333;
                    margin-top: 0.05rem;
                }
                span:nth-child(2) {
                    font-size: 0.27rem;
                    font-weight: bold;
                    color: #fa5856;
                }
            }
        }

        .list-commodities-right {
            width: 1.5rem;
            text-align: center;
            margin-left: 1.2rem;
            .list-commodities-right-top{
                img {
                    width: 0.36rem;
                    height: 0.36rem;
                }
            }
            .list-commodities-right-bottom{
                img {
                    width: 0.64rem;
                    height: 0.26rem;
                    margin-top: 0.37rem;
                }
            }
        }

        .edit {
            width: 3.7rem;
            height: 1.4rem;
            background: #333333;
            border-radius: 0.1rem;
            padding-top: 0.2rem;
            position: absolute;
            top: 1.1rem;
            right: 1.8rem;
            z-index: 1;
            ul {
                display: flex;
                justify-content: space-around;
            }
            li{
                img {
                    width: 0.52rem;
                    height: 0.52rem;
                    display: block;
                }
                span {
                    font-size: 0.24rem;
                    color: #ffffff;
                }
            }
        }
    }
    
}



</style>