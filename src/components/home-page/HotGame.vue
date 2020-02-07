<template>
    <div class="game-wrap">
        <Hot :hot_title="game_tit"></Hot>
        <div class="game-con flex-box">
            <div class="game-item" v-for="(item,index) in hot_game" :key="index" @click="goSellOption(item.category_id)">
                <img :src="item.game_logo" :alt="item.game_name" />
                <div v-text="item.game_name"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "HotGame",
    props:['hot_game'],
    data() {
        return {
        };
    },
    methods: {
        goSellOption(opt) {
            var that = this;
            sessionStorage.buyOrsell == 1
            //买
            that.$router.push({ name: "GoodScreen",params:{opt:opt}});
            sessionStorage.opt = opt;
        },
    },
    mounted() {
        // this.getData();
    }
}
</script>

<style scoped>
    /* .game-wrap {
    background: #ffffff;
    margin-top: 0.2rem;
    padding: 0.2rem 0.3rem 0 0.8rem;
    border-radius: 0.1rem;
    box-shadow: 0 1px 10px #cccccc;
    .game-con {
        flex-wrap: wrap;
        justify-content: space-between;
        font-size: 0.22rem;
        .game-item {
            margin-top: 0.1rem;
            margin-right: 0.46rem;
            img {
                width: 1.12rem;
                height: 1.12rem;
            }
            div {
                text-align: center;
                margin: 0.24rem 0;
            }
        }
    }
} */
</style>