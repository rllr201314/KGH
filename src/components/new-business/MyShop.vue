<template>
    <!-- 店铺管理 -->
    <div class="wrap service-fulfillment">
        <Header v-bind:head_data="head_data"></Header>
        <!-- 营业状态 -->
        <div class="box_1 business-status">
            <div class="business-status-left">
                <img :src="business_status_img" alt />
            </div>
            <div class="business-status-right">
                <span v-text="business_status_title"></span>
                <span v-text="business_status_class"></span>
                <span>
                    <span v-text="business_status"></span>
                    <van-switch v-model="checked" active-color="#FFA303" size=".15rem" style="margin-top: .08rem;"/>
                </span>
            </div>
        </div>
        <!-- 店铺效益 -->
        <div class="box_1 benefit">
            <div class="benefit-box" v-for="(item,i) in benefit_data" :key="i">
                <span v-text="item.benefit_title"></span>
                <p>
                    <span v-text="item.benefit_Symbol"></span>
                    <span v-text="item.benefit_number"></span>
                    <span v-text="item.benefit_Company"></span>
                </p>
                <img :src="item.benefit_Button" alt />
            </div>
        </div>
        <!-- 店铺管理 -->
        <div class="box_1 store-management">
            <div class="store-management-title" v-text="store_management_title">{{}}</div>
            <div class="store-management-main">
                <div class="store-management-box" v-for="(item,i) in store_management_data" :key="i"> 
                    <img :src="item.store_management_img" alt="">
                    <span v-text="item.store_management_title"></span>
                    <span v-text="item.store_management_introduce"></span>
                </div>
                <span class="dividing-line"></span>
            </div>
        </div>
        <!-- 订单管理 -->
        <div class="box_1 order-management">
            <span v-text="order_management_title"></span>
            <img :src="order_management_img" alt="">
        </div>
    </div>
</template>
<script>
import Header from '@/components/home-page/Header'
export default {
    name: "MyShop",
    components: {
        Header
    },
    data() {
        return {
            head_data: {
                //1搜索2分享3菜单
                show_type: 2,
                right_icon: 2,
                tit_text: '我的店铺',
            },

            business_status_img: '../../../static/image/myshop/head-portrait.png',
            business_status_title: '康康游戏交易专营店',
            business_status_class: '所属类目：手游-大话西游、梦幻西游',
            business_status: '营业状态：营业中',
            business_status_switch1: '../../../static/image/myshop/switch1.png',
            business_status_switch2: '../../../static/image/myshop/switch2.png',
            checked: true,

            benefit_data: [
                {
                    benefit_img: '../../../static/image/myshop/benefitone.png',
                    benefit_title: '已到账收益',
                    benefit_Symbol: '￥',
                    benefit_number: '18264.12',
                    benefit_Company: '元',
                    benefit_Button: '../../../static/image/myshop/button1.png'
                },
                {
                    benefit_img: '../../../static/image/myshop/benefittwo.png',
                    benefit_title: '订单成交量',
                    benefit_Symbol: '',
                    benefit_number: '124',
                    benefit_Company: '单',
                    benefit_Button: '../../../static/image/myshop/button2.png'
                },
                {
                    benefit_img: '../../../static/image/myshop/benefitthree.png',
                    benefit_title: '已到账奖励积分',
                    benefit_Symbol: '',
                    benefit_number: '254',
                    benefit_Company: '分',
                    benefit_Button: ''
                }
            ],

            store_management_title: '店铺管理',
            store_management_data: [

                {
                    store_management_img: '../../../static/image/myshop/commodity-management.png',
                    store_management_title: '商品管理',
                    store_management_introduce: '商品的添加、上架、删除'
                },
                {
                    store_management_img: '../../../static/image/myshop/store-management.png',
                    store_management_title: '店铺管理',
                    store_management_introduce: '修改店铺的基本信息'
                }
            ],

            order_management_title: '订单管理',
            order_management_img: '../../../static/image/myshop/extend.png'

        }
    },
    methods: {

        getData(){
            var that = this;
            that.$axios.post(`${that.baseURL}shopInfo`).then((res) => {
                if(res.status == 200){
                    if(res.data.code == 200){

                    }else if(res.data.code == 400){
                        mui.alert(res.data.msg,'提示','确认',function(){
                            that.$router.push({path:'/'})
                        },"div")
                    }
                }
                
            })

            
        }

    },
    mounted(){
        this.getData();
    }

}
</script>

<style lang="scss" scoped>
.service-fulfillment {
    line-height: 0.3rem;
    .box_1 {
        border-radius: 0.1rem;
        background: #ffffff;
        box-shadow: 0px 3px 10px 0px rgba(51, 51, 51, 0.1);
    }
    // 营业状态
    .business-status {
        margin-top: 0.19rem;
        width: 7.5rem;
        height: 1.37rem;
        line-height: 0.4rem;
        display: flex;
        .business-status-left{
            img {
                width: 1.1rem;
                height: 1.1rem;
                margin: 0.14rem 0.08rem 0.13rem 0.22rem;
            }
        }
        .business-status-right {
            padding-top: 0.1rem;
            display: flex;
            flex-direction: column;
            span {
                font-size: 0.3rem;
                color: #333333;
                font-family: PingFang SC;
                font-weight: 500;
            }
            span:nth-child(2) {
                color: #999999;
            }
            span:nth-child(3) {
                color: #333333;
                display: flex;
                align-items: center;
                span{
                    margin-right: .1rem;
                }
            }
            span:nth-child(2),span:nth-child(3) {
                font-size: 0.22rem;
            }
        }
    }

    // 店铺效益
    .benefit {
        display: flex;
        width: 7.5rem;
        margin: 0.09rem 0 0.1rem 0;
        padding: 0.27rem 0.34rem 0.25rem 0.45rem;
        .benefit-box {
            width: 2.25rem;
            border-radius: .1rem;
            padding: 0 .08rem;
            span {
                color: #ffffff;
                font-weight: bold;
                font-family: PingFang SC;
                font-weight: 500;
            }
            span:nth-child(1){
                font-size: .24rem;
                margin-top: .3rem;
            } 
            p{
                margin-top: 0.08rem;
                margin-bottom: 0;
                span{
                    font-size:.26rem;
                }
                span:nth-child(3){
                    font-size: .18rem;
                }
            }
            img{
                width: .8rem;
                height: .3rem;
                border-radius: .05rem;
            }
        }
        div:nth-child(1) {
            background: url(../../../static/image/myshop/benefitone.png) no-repeat;
            background-size: cover;
        }
        div:nth-child(2) {
            margin: 0 0.3rem;
            background: url(../../../static/image/myshop/benefittwo.png) no-repeat;
            background-size: cover;
        }
        div:nth-child(3) {
            background: url(../../../static/image/myshop/benefitthree.png) no-repeat;
            background-size:cover;
        }
    }

    // 店铺管理
    .store-management {
        width: 7.5rem;
        height: 3.11rem;
        display: flex;
        flex-direction: column;
        .store-management-title {
            font-size: 0.28rem;
            color: #333333;
            margin: 0.21rem 0 0 0.23rem;
        }
        .store-management-main {
            display: flex;
            flex-direction: row-reverse;
            padding: 0 0.3rem;
            margin-top: 0.25rem;
            position: relative;
            .store-management-box {
                width: 3.5rem;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin-top: 0.1rem;
                img:nth-child(1){
                    width: 1.123rem;
                    height: 1.24rem;
                    margin-bottom: .07rem;
                }
                span:nth-child(2) {
                    font-size: 0.26rem;
                    color: rgba(51, 51, 51, 1);
                    margin-bottom: 0.09rem;
                }
                span:nth-child(3) {
                    font-size: 0.2rem;
                    color: #666666;
                }
            }
            .dividing-line {
                opacity: 0.5;
                display: inline-block;
                height: 1.9rem;
                border-right: 0.01rem solid rgba(153, 153, 153, 1);
                position: absolute;
                top: 0.05rem;
                right: 3.75rem;
            }
        }
    }

    // 订单管理
    .order-management {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 0.65rem;
        padding: 0 0.34rem 0 0.25rem;
        margin-top: 0.1rem;
        span {
            font-size: 0.24rem;
            font-weight: 500;
            color: #333333;
        }
        img {
            width: 0.1rem;
            height: 0.16rem;
        }
    }
}

</style>