<template>
    <!-- 公告 -->
    <div class="notice-wrap">
        <div class="notice-top">
            <div class="title-left">
                <img src="../../../static/img/goodscreen/vertical.png" alt="">
                <span>资讯公告</span>
            </div>
            <div class="title-right" @click="goMessage">
                <span>更多</span>
                <img src="../../../static/img/order/next.png" alt="">
            </div>
        </div>
        <div class="notice-content">
            <div class="notice-content-text" v-for="(item,index) in notice" @click="go_detail(item.article_id,item.type)">
                <span class="orange_color" v-text="'['+item.type+']'"></span> <span v-text="item.title"></span><span class="right" v-text="item.create_time"></span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Notice",
        props:['notice'],
        data(){
            return{
            }
        },
        methods:{
            goMessage(){
                this.$router.push({name:'Affiche'})
            },
            go_detail(id,type){
                this.$router.push({name:'Affiche_Details',params:{article:id,type:type}})
            }
        }
    }
</script>

<style scoped>
    .notice-wrap{
        background:#FFFFFF;
        -webkit-border-radius: .1rem;
        -moz-border-radius: .1rem;
        border-radius: .1rem;
        -webkit-box-shadow: .06rem .05rem .09rem #D6D6D6;
        -moz-box-shadow: .06rem .05rem .09rem #D6D6D6;
        box-shadow: .06rem .05rem .09rem #D6D6D6;
        margin-bottom:.3rem;
    }
    .notice-top{
        line-height:.7rem;
        border-bottom:.01rem solid #E5E5E5;
    }
    .notice-title{
        width:.98rem;
        /*height:.21rem;*/
        background-image:url("../../../static/img/board_mark.png");
        background-repeat:no-repeat;
        background-size:.98rem .21rem;
        background-position:50%;
        text-align:center;
        color:#FE7649;
        font-size:.26rem;
        margin:0 auto;
    }
    .notice-content{
        padding:0 .22rem .25rem;
        color:#666666;
        font-size:.24rem;
    }
    .notice-content-text{
        margin-top:.25rem;
        position: relative;
    }
    .right{
        position: absolute;
        top:0;
        right:0;
    }
    .title-left {
        display: inline-block;
    }
    .title-left span {
        display: inline-block;
        color: #333333;
        font-size: 0.28rem;
    }
    .title-left img {
        width: 0.08rem;
        height: 0.25rem;
        margin-left: 0.17rem;
        vertical-align: middle;
    }
    .orange_color{
        color:#FF7E4A;
    }
.title-right {
    float: right;
    margin-right:.2rem;
}
.title-right img {
    width: 0.13rem;
    height: 0.24rem;
    vertical-align: middle;
}
.title-right span {
    font-size: 0.24rem;
    color: #999999;
}
</style>