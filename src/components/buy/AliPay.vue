<template>
  <div class="wrap">
    <Header v-bind:head_data="head_data"></Header>
    <div class="pay-content">
      <div class="tit">请使用支付宝扫码</div>
      <div class="con">
        <vue-qr :text="url" :size="210"></vue-qr>
        <div class="hint">手机用户请保存图片，通过支付宝识别二维码</div>
      </div>
      <div class="fot">
        <img src="../../../static/img/alipay.png" alt />
        <span>支付宝支付</span>
      </div>
      <div class="hint-bot">
        付款完成后请
        <span class="orange-color" @click="goBuyAll">点击此处</span>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/home-page/Header"; //头部
import VueQr from "vue-qr";
export default {
  name: "AliPay",
  components: {
    Header,
    VueQr
  },
  data() {
    return {
      head_data: {
        show_type: 2,
        right_icon: 2,
        tit_text: "支付宝支付",
        showBack: false, //显示后退按钮
        showLogo: 2, //不显示头部log
        showShare: 3, //1搜索2分享
        showBg: true //是否显示背景
      },
      url: ""
    };
  },
  methods: {
    goBuyAll() {
      this.$router.push({ name: "BuyOrderAll" });
    }
  },
  mounted() {
    if (this.$route.query.url) {
      this.url = this.$route.query.url;
    } else {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
.pay-content {
  text-align: center;
}
.tit {
  color: #07a0f8;
  font-size: 0.76rem;
  line-height: 1.3rem;
  background: #ffffff;
  /* font-weight:bold; */
  padding: 1rem 0 0.5rem;
}
.con {
  padding: 0.74rem 0 0.59rem;
  background: #009bf4;
}
.hint {
  width: 6rem;
  font-size: 0.38rem;
  line-height: 0.6rem;
  /* font-weight:bold; */
  margin: 0 auto;
  color: #ffffff;
  padding-top: 0.57rem;
}
.fot {
  background: #ffffff;
  padding: 0.4rem 0 0.6rem;
  color: #000000;
  font-size: 0.62rem;
}
.fot img {
  width: 1rem;
  height: 1rem;
  margin-right: 0.25rem;
  vertical-align: middle;
}
.hint-bot {
  font-size: 0.26rem;
  color: #666666;
  margin-top: 0.3rem;
}
.orange-color {
  color: #ff7e4a;
  text-decoration: underline;
}
</style>
 