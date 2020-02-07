<template>
    <div class="protocal-wrap" v-show="proData.isShow">
        <div class="pop-view">
            <div class="pop-view-tit" v-html="proData.con.title"></div>
            <div class="pop-view-box" v-html="proData.con.content"></div>
            <div class="nextBtn pop-view-btn" @click="hiddenPro('true')" v-text="proData.btn"></div>
            <img class="hidden-pro" @click="hiddenPro('false')" src="../../../static/img/empty_ico.png" alt="">
        </div>
        <div class="shade" v-show="proData.isShow"></div>
    </div>
</template>
<script>
export default {
    name: "Protocal",
    props: ["proData"],
    data() {
        return {};
    },
    methods: {
        hiddenPro(flag) {
            var that = this;
            that.proData.isShow = false;
            if (flag == "true") {
                that.$emit("isProFn", that.proData.val);
            }
        }
    },
};
</script>
<style scoped>
.pop-view{
    max-width: 620px;
    margin:0 auto;
    position: fixed;
    top: 1.3rem;
    left: 0.3rem;
    right: 0.3rem;
    padding-top: 0.2rem;
    border-radius: 0.1rem;
    background:#ffffff;
    z-index:15;
}
.pop-view-tit{
    color:#FFA303;
    font-size:.3rem;
    text-align:center;
    line-height:1rem;
    border-bottom:1px dashed #DCDCDC;
    padding: 0 .1rem;
}
.pop-view-box {
    padding: 0.2rem .4rem;
    min-height: 50vh;
    max-height: 68vh;
    overflow-y: scroll;

}
.pop-view-btn {
    color: #ffffff;
    font-size: 0.28rem;
    margin: 0.3rem auto;
    width: 6.5rem;
    text-align: center;
    line-height: 0.8rem;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
}
.hidden-pro {
    width: 0.24rem;
    height: 0.24rem;
    position: absolute;
    top: 0.1rem;
    right: 0.15rem;
}
.shade {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 8;
}
</style>