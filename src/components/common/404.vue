<template>
    <div class="nodata-wrap">
        <Header v-bind:head_data="head_data"></Header>
        <img src="../../../static/img/warn/nodata.png" alt="">
        <div>暂时没有数据哦！</div>
    </div>
</template>
<script>
    import Header from '@/components/home-page/Header'
    export default {
        name:'NoData',
        components:{
            Header,
        },
        data(){
            return {
                head_data:{
                    show_type:2,
                    right_icon:2,
                    tit_text:'404',
                }
            }
        },
        methods:{
        },
        mounted(){
        }
    }
</script>
<style scoped>
    .nodata-wrap{
        font-size:.26rem;
        color:#999999;
        text-align:center;
        min-height: 100vh;
    }
    .nodata-wrap img{
        width:3.55rem;
        height:1.75rem;
        margin:3rem 0 .77rem;
    }
    .btn{
        font-size:.36rem;
        color:#ff7e4a;
        text-decoration: underline;
        margin-bottom:1rem;
    }   
</style>