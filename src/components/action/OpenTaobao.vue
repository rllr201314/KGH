<template>
    <div class="wrap">
        <Header v-bind:head_data="head_data"></Header>
        <div class="tb-wrap">
            <img src="../../../static/img/bill/b-top.png" alt class="top" />
            <div class="bottom">
                <img class="code" src="../../../static/img/bill/b-code.jpg" alt preview/>
                <div class="hint">长按图片保存</div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from "@/components/home-page/Header"
export default {
    name: "OpenTaobao",
    components: {
        Header,
    },
    data() {
        return {
            head_data: {
                show_type: 2, //显示头部title文字
                right_icon: 2, 
                tit_text: "看个号淘宝店"
            },
        }
    },
    methods: {
       
    },
    mounted(){
        this.$previewRefresh();
    }
}
</script>

<style scoped>
.topup-wrap {
    width: 100%;
    height: calc(100vh - 0.86rem);
}
.tb-wrap {
    display: flex;
    flex-wrap: wrap;
}
.top {
    width: 100%;
    /* height: auto; */
    height: 4.45rem;
}
.bottom {
    width: 100%;
    height: 8.9rem;
    background: url(../../../static/img/bill/b-bottom.png) no-repeat;
    background-size: 100% 100%;
}
.bottom img {
    display: block;
    /* margin: 0 auto; */
}
.code {
    width: 2.61rem;
    height: 3.35rem;
    margin: 1.27rem auto 0;
}
.btn {
    width: 1.35rem;
    height: 0.46rem;
    margin: 0.28rem auto 0;
}
.hint{
    font-size: .3rem;
    text-align: center;
    margin-top: 0.28rem ;
    color:#7c7c7c;
}
</style>