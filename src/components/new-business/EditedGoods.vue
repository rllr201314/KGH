<template>
    <!-- 编辑商品 -->
    <div class="wrap edited-goods">
        <Header v-bind:head_data="head_data"></Header>
        <div class="edited-goods-main">
            <div>
                <span v-text="edited_goods_title1"></span>
                <input type="text" placeholder="请输入商品名称">
            </div>
            <div>
                <span v-text="edited_goods_title2"></span>
                <DropDownList/>
            </div>
            <div>
                <span v-text="edited_goods_title3"></span>
                <input type="text" placeholder="请输入商品价格">
            </div>
            <div>
                <span v-text="edited_goods_title4"></span>
                <van-uploader class="upload" v-model="fileList" multiple :max-count="2"/>
            </div>
            
        </div>
        <div class="edited-goods-buttom">立即修改</div>
    </div>
</template>
<script>
import Header from '@/components/home-page/Header'
import DropDownList from './DropDown/DropDownList'
export default {
    name:"EditedGoods",
    components:{
        Header,
        DropDownList
    },
    data(){
        return{
            head_data:{
                //1搜索2分享3菜单
                show_type:2,
                right_icon:2,
                tit_text:'编辑商品',
            },
            fileList: [],

            edited_goods_title1:'商品名称',
            edited_goods_title2:'商品类型',
            edited_goods_title3:'零售价',
            edited_goods_title4:'商品主图',
            edited_goods_img:'../../../static/image/state.png'
           
        }
    },
    methods:{
        afterRead(file) {
            // 此时可以自行将文件上传至服务器
            console.log(file);
        },

    }

}
</script>

<style lang="scss" scoped>
.edited-goods{
    .edited-goods-main{
        width: 7.5rem;
        // height: 3.83rem;
        background: #ffffff;
        margin: .15rem 0 .45rem 0;
        padding: .19rem .24rem 0 .24rem;
        font-family:PingFang SC;
        font-weight:500;
        span{
            font-size: .26rem;
            color:#333333;
            margin-right: 1.42rem;
        }
        div:nth-child(1){
            margin-bottom: .39rem;
        }
        div:nth-child(2){
            display: flex;
        }
        div:nth-child(3){
            margin: .39rem 0;
            span{
                margin-right: 1.68rem;
            }
        }
        div:nth-child(4){
            .upload{
                margin-top: .1rem;
            }
        }
        input{
            margin-bottom: .05rem;
            padding: 0;
            width: 1.67rem;
            height: .3rem;
            border: none;
            font-size: .24rem;
            color: #999999;
            line-height: .3rem;
        }
    }
    .edited-goods-buttom{
        width: 6.6rem;
        height: .8rem;
        color: #ffffff;
        font-size: .26rem;
        line-height: .8rem;
        text-align: center;
        background: #ffa303;
        border-radius: .1rem;
        margin: 0 auto;
    }
}




</style>