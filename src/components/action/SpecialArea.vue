<template>
    <div class="wrap">
        <Header v-bind:head_data="head_data"></Header>
        <img class="active-img" :src="imgUrl" />
    </div>
</template>

<script>
import Header from "../home-page/Header";

export default {
    name: "SpecialArea",
    components: { Header },
    data() {
        return {
            head_data: {
                show_type: 2,
                tit_text: '',
                right_icon: "",
            },
            titles: [
                "游戏账号寄租",
                "藏宝阁分期",
                "APP充值",
            ],
            imgUrl: '',
            imgs: [
                "../../../static/img/home-page/renting.png",
                "../../../static/img/home-page/treasure_house.png",
                "../../../static/img/home-page/recharge.png",
            ],
            title: '',
            keywords: '',
        }
    },
    mounted() {
        var that = this;
        var type = that.$route.params.type;
        that.head_data.tit_text = that.titles[type];
        that.imgUrl = that.imgs[type];
        if (type == 1) {
            that.title = '藏宝阁分期_看个号';
            that.keywords = '藏宝阁,梦幻藏宝阁分期,大话藏宝阁分期';
        } else if (type == 2) {
            that.title = 'ios苹果手游充值_看个号';
            that.keywords = '苹果手游充值,苹果充值,ios充值';
        }
    },
    metaInfo() {
        return {
            title: this.title,
            meta: [{
                name: 'keywords',
                content: this.keywords,
            }, {
                name: 'description',
                content: '看个号(https://www.kangehao.com)是国内专业的手游交易平台，安全可靠专注手游的交易网站，提供手游账号交易、买号卖号交易的手游交易平台！'
            }]
        }
    }
}
</script>

<style scoped>
.active-img {
    width: 100%;
    height: 100%;
}
</style>
