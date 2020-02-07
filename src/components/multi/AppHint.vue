<template>
    <div class="wrap">
        <Header v-bind:head_data="head_data"></Header>
        <div class="hint-bg">
            <img class="add-img" src="../../../static/img/bill/add.png" @click="toHome" alt />
        </div>
    </div>
</template>

<script>
import Header from '@/components/home-page/Header'
export default {
    data() {
        return {
            head_data:{
                show_type:2,
                right_icon:2,
                tit_text:'添加轻应用'
            }
        }
    },
    components: {
        Header
    },
    methods: {
        toHome() {
            this.$router.push({ name: 'HomePage', params: { type: 1 } })
        }
    }
}
</script>

<style scoped>
.hint-bg{
    width: 100%;
    height: 13rem;
    background: url(../../../static/img/bill/app_hint.png) no-repeat;
    background-size: 100% 100%;
    position: relative;
}
.add-img {
    width: 3rem;height: .4rem;
    position: absolute;
    bottom: 1.5rem;
    left: calc(50% - 1.3rem);
    z-index: 1;
}
</style>