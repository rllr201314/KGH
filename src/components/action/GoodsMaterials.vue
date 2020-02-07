<template>
    <div class="wrap materials-wrap">
        <Header v-bind:head_data="head_data"></Header>
        <img class="top" src="../../../static/img/home-page/wz_top.png" alt="">
        <div class="page-center">
            <div class="search-wrap" >
                <img src="../../../static/img/home-page/search.png" alt />
                <input type="text" v-model="txt" placeholder="搜索关键词" />
                <div class="btn search-btn" @click="searchFn">搜索</div>
                <div class="btn reset-btn" @click="resetFn">重置</div>
            </div>
            <div class="page-center-content">
                <div class="layout-title title">
                    <div class="server">服务器</div>
                    <div class="gold">银两数</div>
                    <div class="bind">平台</div>
                    <div class="price">价格</div>
                </div>
                <div>
                    <div class="layout-title content" v-for="(gold,index) in materials" :key="index">
                        <div class="server" v-text="gold.server"></div>
                        <div class="gold" v-text="gold.gold_num"></div>
                        <div class="bind" v-text="gold.bind"></div>
                        <div class="price">
                            ￥
                            <span v-text="gold.price"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Loading v-show="showLoading"></Loading>
    </div>
</template>

<script>
import Header from "@/components/home-page/Header";
import Loading from "@/components/multi/Loading";
export default {
    name: 'GoodsMaterials',
    components: { Header, Loading },
    data() {
        return {
            head_data:{
                show_type:2,
                tit_text:'物资代秒专区',
                right_icon:"",
            },
            txt:"",
            materials: [],
            showLoading: false,
        }
    },
    mounted() {
        this.getData();
    },
    methods:{
        getData(keywords = '') {
            var that = this;
            that.showLoading = true;
            that.$axios.post(process.env.API_HOST + "materialInfo", { keyword: keywords }).then((res) => {
                if (res.status == 200) {
                    if (res.data.code == 200) {
                        that.showLoading = false;
                        that.materials = res.data.data;
                    }
                }
            })
        },
        searchFn() {
            this.getData(this.txt);
        },
        resetFn() {
            this.txt = '';
            this.getData();
        }
    }

}
</script>

<style scoped>
.materials-wrap{
    line-height: 0;
}
.top{
    width: 100%;

}
.search-wrap {
    width: 100%;
    display: flex;
    align-items: center;
    position: absolute;
    /* bottom: 0.13rem; */
    padding: 0 0.43rem;
}
.search-wrap input {
    width: 4.8rem;
    height: 0.49rem;
    margin: 0;
    padding: 0;
    font-size: 0.24rem;
    padding-left: 0.4rem;
    margin-right: 0.14rem;
    border: 1px solid #ff959b;
}
.search-wrap img {
    width: 0.28rem;
    height: 0.28rem;
    position: absolute;
    left: 0.5rem;
}
.btn {
    padding: 0 0.1rem;
    line-height: 0.48rem;
    font-size: 0.24rem;
    border-radius: 0.05rem;
}
.search-btn {
    color: #ffffff;
    background: #ff959b;
    margin-right: 0.15rem;
}
.reset-btn {
    color: #666666;
    border: 1px solid #ff959b;
}

.page-center {
    padding: 0.2rem;
    background-image: url(../../../static/img/home-page/wz_bottom.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    height: auto;
    min-height: 8.7rem;
}

.page-center-content {
    border: 3px dashed #AAAAAA;
    padding: 0.1rem;
    border-radius: 0.1rem;
    margin-top: .7rem;
    line-height: .4rem;
    text-align: center;
}

.layout-title {
    display: flex;
    flex-direction: row;
}
.title {
    color: #50A4E1;
    font-size:.24rem;
}
.server {
    width: 25%;
}
.gold {
    width: 30%;
}
.bind {
    padding-left: 1%;
    width: 20%;
}
.price {
    padding-left: 5%;
    width: 25%;
}
.content {
    font-size: .22rem;
    color:#333333;
    padding-top: .1rem;
}
</style>