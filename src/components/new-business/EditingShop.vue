<template>
    <!-- 编辑店铺 -->
    <div class="wrap editing-shop">
        <Header v-bind:head_data="head_data"></Header>
        <!-- 资料 -->
        <div class="editing-shop-data">
            <span v-text="EditingShop_title1"></span>
            <div class="editing-shop-data-main">
                <div class="editing-shop-data-box" v-for="(item,i) in EditingShop_data" :key="i">
                    <!-- <img :src="item.EditingShop_img1" alt=""> -->
                    <span>*</span>
                    <span v-text="item.EditingShop_name"></span>
                    <input type="text" :placeholder="item.EditingShop_content">
                </div>
                <Sc class="sc"/>

            </div>
        </div>
        <!-- 认证 -->
        <div class="editing-shop-Authentication">
            <p>2.实名认证</p>
            <div class="editing-shop-Authentication-main">
                <span>开店需要实名认证</span>
                <span @click="goAuthentication">
                    立即前往
                    <span></span>
                </span>
                
            </div>
        </div>
        <!-- 按钮 -->
        <div class="editing-shop-modify" >立即修改</div>

    </div>
</template>
<script>
import Header from '@/components/home-page/Header'
import Sc from './Sc'
export default {
    name:"EditingShop",
    components:{
        Header,
        Sc
    },
    data(){
        return{
            head_data:{
                //1搜索2分享3菜单
                show_type:2,
                right_icon:1,
                tit_text:'编辑店铺',
            },

            EditingShop_title1:'1.店铺资料',
            EditingShop_img2:'../../../static/image/upload.png',
            EditingShop_img3:'../../../static/image/upload1.png',
            fileList: [],
            EditingShop_data:[
                {
                    EditingShop_name:'店铺头像'
                },
                {
                    EditingShop_name:'店铺名称',
                    EditingShop_content:'3-15汉子/字母/数字'
                },
                {
                    EditingShop_name:'店铺简介',
                    EditingShop_content:'修改您的店铺简介'
                }
            ]
           
        }
    },
    methods:{
        goAuthentication(){
            this.$router.push({path:'/safe-card'});
        }
    }

}
</script>

<style lang="scss" scoped>

.editing-shop{
    // 资料
    span{
        font-family:PingFang SC;
    }
    .editing-shop-data{
        span:nth-child(1),.editing-shop-Authentication p{
            display: inline-block;
            font-size: .3rem;
            color: #333333;
            margin: .2rem 0 .14rem .23rem;
        }
        .editing-shop-data-main{
            height: auto;
            background: #ffffff;
            padding:0 0 .24rem .25rem; 
            position: relative;
            .editing-shop-data-box{
                display: flex;
                align-items: center;
                span:nth-child(1){
                    color: #ffa303;
                    margin-right: .1rem;
                }
                span:nth-of-type(2){
                    font-size: .26rem;
                    color: #333333;
                    font-weight: 500;
                }
                input{
                    width: 4rem;
                    height: .2rem;
                    font-size: .2rem;
                    margin-bottom: 0;
                    color: #333333;
                    margin-left: .87rem;
                    border: none;
                }
            }
            .editing-shop-data-box:nth-child(1){
                margin-bottom: 1.63rem;
                padding-top: .22rem;
            }
            .editing-shop-data-box:nth-child(2){
                margin-bottom: .24rem;
            }
            .sc{
                position: absolute;
                top: .3rem;
                right: 2.85rem;
            }
        }
    }

    // 认证
    .editing-shop-Authentication{
        p{
            color: #999999;
            margin-bottom: 0;
            padding: .2rem 0 .19rem .2rem;
        }
        .editing-shop-Authentication-main{
            height: .6rem;
            line-height: .6rem;
            background: #ffffff;
            position: relative;
            span{
                font-size: .24rem;
                font-weight: 500;
                color: #999999;
            }
            span:nth-child(1){
                padding: .19rem 0 .18rem .46rem;
            }
            span:nth-child(2){
                position: relative;
                span{
                    display: block;
                    width: 1.03rem;
                    border-bottom: .01rem solid #FA5856FF;
                    position: absolute;
                    left: -.03rem;
                    bottom: -0.05rem;
                    z-index: 100;
                }
            }
        }
    }

    .editing-shop-modify{
        width: 6.6rem;
        height: .8rem;
        background: #ffa303;
        color: #ffffff;
        font-size: .26rem;
        line-height: .8rem;
        text-align: center;
        border-radius: .2rem;
        margin: .35rem auto;
    }
}
</style>