<template>
  <!-- 首页 -->
  <div class="wrap title-search-wrap">
    <div class="top">
      <Header v-bind:head_data="head_data"></Header>
      <div class="tit-swiper">
        <div class="swiper-container" id="indexSwiper">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="(item,index) in swiperSrc"
              :key="index"
              @click="goPage(item.img_url)"
            >
              <img :src="item.img" alt />
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </div>
      <div class="hint">本站严禁未成年人进行游戏账号买卖</div>
      <div class="division">
        <div class="division-box flex-box">
          <img
            :src="item.img"
            alt
            class="division-item"
            v-for="item in division"
            :key="item.id"
            @click="seleDivision(item.id)"
          />
        </div>
      </div>
      <div class="recent flex-box">
        <img src="../../static/image/index/recent.png" alt />
        <div class="recent-box">
          <div class="gray-color">
            累计安全交易
            <span class="black-color" v-text="count_info"></span>笔
          </div>
          <div class="recent-des-wrap">
            <ul>
              <li
                class="black-color flex-box recent-des"
                v-for="(item,index) in order_info"
                :key="index"
              >
                <span class="goods-name">
                  【
                  <span v-text="item.game_name"></span>】
                </span>
                <span class="goods-title" v-text="item.goods_title"></span>交易成功
                <span class="goods-price">
                  ￥
                  <span v-text="Number(item.order_amount)"></span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="game-wrap">
      <Hot :hot_title="game_tit"></Hot>
      <div class="game-con flex-box">
        <div
          class="game-item"
          v-for="(item,index) in hot_game"
          :key="index"
          @click="goSellOption(item.category_id)"
        >
          <img :src="item.game_logo" :alt="item.game_name" />
          <div v-text="item.game_name"></div>
        </div>
      </div>
    </div>
    <img class="safe" src="../../static/image/index/safe.png" alt="PICC 中国人民保险" />
    <div class="down-wrap small-wrap">
      <Hot class="down-tit" :hot_title="hot_tit"></Hot>
      <div class="down-con flex-box">
        <div class="down-active">
          <img :src="active_data.game_img" alt />
          <div class="active-name" v-text="active_data.game_name"></div>
          <div class="active-des" v-text="active_data.game_des"></div>
          <div class="active-btn">下载</div>
        </div>
        <img class="game-des" :src="active_data.des_img" alt />
        <div class="down-list">
          <div class="down-item" v-for="(item,index) in hot_data" :key="index" v-if="!item.active">
            <img :src="item.game_img" :alt="item.game_name" />
            <div v-text="item.game_name"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="goods-list">
      <div
        class="goods-strip"
        v-for="(item,index) in goods_data"
        :key="index"
        @click="goDetail(item.goods_id)"
      >
        <div class="goods-strip-title flex-box">
          <div class="boutique" v-if="item.boutique == 1">精</div>
          <div class="title-ico deal-ico" v-if="item.method == 1">成品号</div>
          <div class="title-ico rent-ico" v-if="item.method == 2">出租</div>
          <div class="system-ico ios-ico" v-if="item.client_id == 1">苹果</div>
          <div class="system-ico android-ico" v-else-if="item.client_id == 2">安卓</div>
          <div class="area" v-text="item.area_name"></div>
        </div>
        <div class="goods-strip-content">
          <div class="goods-des" :class="item.isSelect?'des_false':'des_true'" v-text="item.des"></div>
          <div class="goods-ico">
            <img v-if="item.is_safe == 1" src="../../static/image/goods/safe-icon.png" alt />
            <img v-if="item.is_stage == 1" src="../../static/image/goods/stage-icon.png" alt />
            <img v-if="item.is_check == 1" src="../../static/image/goods/test-icon.png" alt />
          </div>
        </div>
        <div class="goods-strip-bottom">
          <div class="goods-price">
            ￥
            <span v-text="item.price"></span>
          </div>
          <div class="bargain" v-if="item.sell_type == 2">可议价</div>
        </div>
      </div>
    </div>
    <div class="shop-wrap margin-bottom">
      <Hot class="down-tit" :hot_title="shop_tit"></Hot>
      <img src="../../static/image/index/shop-top.png" alt class="shop-sill" />
      <div class="shop-swiper">
        <div class="swiper-container" id="shopSwiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide shop-item" v-for="(item,index) in shop_info" :key="index">
              <Store :store_data="item"></Store>
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </div>
    </div>
    <div class="hand-wrap small-wrap">
      <Hot class="down-tit" :hot_title="hand_tit"></Hot>
      <img class="hand-img" src="../../static/image/index/hand.png" :alt="hand_tit" />
    </div>
    <UserHelp></UserHelp>
    <HotLine></HotLine>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/home-page/Header";
import Footer from "@/components/home-page/Footer";
import Hot from "@/components/home-page/Hot";
import Store from "@/components/home-page/Store";
import HotLine from "@/components/home-page/Hotline"; //联系客服
import UserHelp from "@/components/home-page/UserHelp"; //用户帮助
import LinkServer from "@/components/common/LinkServer";

export default {
  data() {
    return {
      //头部显示内容
      head_data: {
        show_type: 1
      },
      iconTranslateX: 0, //活动图片往左
      isShowShage: false, //是否显示遮罩和活动弹框
      showShage: false,
      swiperSrc: "", //轮播图
      hot_game: "", //热门游戏
      order_info: [], //近期交易
      safe_info: "", //保险理赔
      count_info: "", //累计交易
      notice: "", //公告
      animation: false,
      division: [
        {
          id: 1,
          img: "../../static/image/index/cell-1.png"
        },
        {
          id: 2,
          img: "../../static/image/index/cell-2.png"
        },
        {
          id: 3,
          img: "../../static/image/index/cell-3.png"
        },
        {
          id: 4,
          img: "../../static/image/index/cell-4.png"
        },
        {
          id: 5,
          img: "../../static/image/index/cell-5.png"
        },
        {
          id: 6,
          img: "../../static/image/index/cell-6.png"
        }
      ],
      game_tit: "热门游戏",
      hot_tit: "热销精品",
      hot_data: [
        {
          game_name: "大话西游",
          game_img: "../../static/image/index/ico-1.png",
          des_img: "../../static/image/index/item-1.png",
          game_des: "回合制游戏",
          active: true
        },
        {
          game_name: "王者荣耀",
          game_img: "../../static/image/index/ico-1.png",
          des_img: "../../static/image/index/item-1.png",
          game_des: "回合制游戏",
          active: false
        },
        {
          game_name: "梦幻西游",
          game_img: "../../static/image/index/ico-1.png",
          des_img: "../../static/image/index/item-1.png",
          game_des: "回合制游戏",
          active: false
        }
      ],
      goods_data: [
        {
          boutique: 2,
          method: 1,
          client_id: 1,
          area_name: "苹果一区",
          img: "../../../static/img/index/ico-1.png",
          des: "贵6小号可议价，手快有手慢无",
          is_safe: 1,
          is_stage: 1,
          is_check: 1,
          price: "2000",
          sell_type: 1
        },
        {
          boutique: 1,
          method: 1,
          client_id: 1,
          area_name: "苹果一区",
          img: "../../../static/img/index/ico-1.png",
          des: "贵6小号可议价，手快有手慢无",
          is_safe: 1,
          is_stage: 1,
          is_check: 1,
          price: "2000",
          sell_type: 1
        },
        {
          boutique: 2,
          method: 2,
          client_id: 2,
          area_name: "苹果一区",
          img: "../../../static/img/index/ico-1.png",
          des: "贵6小号可议价，手快有手慢无",
          is_safe: 1,
          is_stage: 1,
          is_check: 1,
          price: "2000",
          sell_type: 2
        }
      ],
      shop_tit: "店铺推荐",
      hand_tit: "手游黑科技",
      shop_info: [
        {
          id: 1,
          logo: "../../static/image/index/shop-logo.png",
          name: "康康游戏交易专营店",
          rate: 4.5,
          good: "90%",
          make: "123",
          imgs: [
            {
              img: "../../static/image/index/shop-1.png",
              type: 1,
              des: "梦话西游各种1231231231"
            },
            {
              img: "../../static/image/index/shop-1.png",
              type: 1,
              des: "梦话西游各种1231231231"
            },
            {
              img: "../../static/image/index/shop-1.png",
              type: 1,
              des: "梦话西游各种1231231231"
            }
          ]
        },
        {
          id: 2,
          logo: "../../static/image/index/shop-logo.png",
          name: "康康游戏交易专营店",
          rate: 4.5,
          good: "90%",
          make: "123",
          imgs: [
            {
              img: "../../static/image/index/shop-1.png",
              type: 1,
              des: "梦话西游各种1231231231"
            },
            {
              img: "../../static/image/index/shop-1.png",
              type: 1,
              des: "梦话西游各种1231231231"
            },
            {
              img: "../../static/image/index/shop-1.png",
              type: 1,
              des: "梦话西游各种1231231231"
            }
          ]
        }
      ]
    };
  },
  computed: {
    iconstyle() {
      //图标动态样式
      let arr = new Array();
      arr.push("transition:0.5s;");
      arr.push("transform:translateX(" + this.iconTranslateX + "rem)");
      // arr.push('rotate('+this.iconrotate+'deg);');
      return arr.join("");
    },
    active_data() {
      var that = this;
      for (var i in that.hot_data) {
        if (that.hot_data[i].active) {
          return that.hot_data[i];
        }
      }
    }
  },
  watch: {
    hot_data: {
      handler(newVal, oldVal) {
        for (var i in newVal) {
          if (newVal[i].active) {
            console.log(this.active_des);
          }
        }
      },
      deep: true
    },
    active_data: {
      handler(newValue, oldValue) {
        console.log(newValue);
      },
      deep: true
    }
  },
  methods: {
    goPage(url) {
      if (url != "") {
        window.location.href = url;
      }
    },
    // 选择板块
    seleDivision(id) {
      let that = this;
      if (id == 1) {
        //买号
        that.$router.push({ name: "Buy" });
        sessionStorage.buyOrsell = 1;
      } else if (id == 2) {
        //道具
      } else if (id == 3) {
        //金币号
        that.$router.push({ name: "GoldGoods" });
      } else if (id == 4) {
        //礼包
      } else if (id == 5) {
        //分期
        that.$router.push({ name: "CbgStage" });
      } else if (id == 6) {
        //我要卖
        that.$router.push({ name: "Sell" });
        sessionStorage.buyOrsell = 2;
      }
    },

    // 热门游戏
    goSellOption(opt) {
      var that = this;
      sessionStorage.buyOrsell == 1;
      //买
      that.$router.push({ name: "GoodScreen", params: { opt: opt } });
      sessionStorage.opt = opt;
    },
    hiddenShage() {
      if (this.isShowShage) {
        this.isShowShage = false;
        this.iconTranslateX = 0;
      } else if (this.showShage) {
        this.showShage = false;
      }
    },
    carouselText() {
      // this.testTime = setInterval()
    },
    getData() {
      var that = this;
      return new Promise(function(resolve, reject) {
        that.$axios.post(process.env.API_HOST + "home").then(res => {
          console.log(res);
          if (res.status == 200) {
            if (res.data.code == 200) {
              that.notice = res.data.data.article_info;
              that.swiperSrc = res.data.data.loop_info;
              that.hot_game = res.data.data.hot_info;
              that.order_info = res.data.data.order_info;
              that.count_info = res.data.data.count_info;
              that.safe_info = res.data.data.safe_info;
              that.shop_info = res.data.data.shop_info;
              // that.goods_data = res.data.data
              resolve();
            }
          }
        });
      });
    },
    goDetail(id) {
      let that = this;
      console.log(that.goods_data);
      console.log(goods_id);
      // that.$router.push({ name: "Details", params: { goods_id: id } });
    },
    _isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows     Phone)/i
      );
      return flag;
    },
    initSwiper() {
      var that = this;
      new Swiper("#indexSwiper", {
        loop: true,
        // autoplay: 3000,
        // initialSlide: 0,//第一个显示的图片默认为0
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        autoplayDisableOnInteraction: false, //用户操作完是否自动切换
        pagination: ".swiper-pagination",
        paginationBulletRender: function(swiper, index, className) {
          return '<span class="' + className + '"></span>';
        }
      });
      new Swiper("#shopSwiper", {
        loop: true,
        // autoplay: 3000,
        // initialSlide: 0,//第一个显示的图片默认为0
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        autoplayDisableOnInteraction: false, //用户操作完是否自动切换
        pagination: ".swiper-pagination",
        paginationBulletRender: function(swiper, index, className) {
          return '<span class= "' + className + '"></span>';
        },
        onClick: function(swiper, event) {
          let dataset = event.target.dataset;

          console.log(dataset);
          if (dataset.class == "into") {
            that.$router.push({
              name: "ShopDetails",
              query: { id: dataset.shop_sn }
            });
          } else if (dataset.class == "goods") {
            that.$router.push({
              name: "Details",
              params: { goods_id: dataset.id }
            });
          }
        }
      });
    }
  },
  components: {
    Header,
    HotLine, //客服热线
    UserHelp, //用户帮助
    Footer,
    LinkServer,
    Hot,
    Store
  },
  mounted() {
    // 展示引导
    if (this.$route.params.type) {
      this.showShage = true;
    }
    var that = this;
    that.getData().then(that.initSwiper);

    that.time = setInterval(function() {
      $(".recent-des-wrap")
        .find("ul")
        .animate(
          {
            marginTop: "-.3rem"
          },
          500,
          function() {
            $(this)
              .css({
                marginTop: "0rem"
              })
              .find("li:first")
              .appendTo(this);
          }
        );
    }, 3000);
  },

  created() {
    // if (this._isMobile()) {
    //   this.$router.replace('/index');
    // } else {
    //   this.$router.replace('/pc_index');
    // }
  },
  beforeDestroy() {
    clearInterval(this.time);
  }
};
</script>

<style lang="scss" scoped>
/* 提示 */
.hint {
  width: 6.04rem;
  height: 0.32rem;
  background: url(../../static/img/home-page/hint-bg.png) no-repeat;
  background-size: 6.04rem 0.32rem;
  margin: 0.05rem auto;
  text-align: center;
  line-height: 0.32rem;
  color: #fb6f60;
  font-size: 0.2rem;
}
.top {
  background: #fff;
}
/* 轮播图 */
.tit-swiper {
  background: #ffffff;
  #indexSwiper {
    width: 100%;
  }
  .swiper-slide {
    width: 7.5rem;
    height: 3.16rem;
  }
  .swiper-slide img {
    width: 7.5rem;
    height: 3.16rem;
  }
}

.division {
  background: #ffffff;
  padding: 0.2rem 0.4rem 0;
  .division-box {
    flex-wrap: wrap;
    justify-content: space-between;
    border-bottom: 1px solid #d6d7dc;
    .division-item {
      width: 1.82rem;
      height: 1.2rem;
      margin-bottom: 0.2rem;
    }
  }
}
.recent {
  font-size: 0.24rem;
  align-items: center;
  padding: 0.16rem 0.25rem 0.1rem 0.25rem;

  background: #ffffff;
  img {
    width: 2rem;
    height: 0.42rem;
    border-right: 1px solid #e1e1e1;
    padding-right: 0.11rem;
    margin-right: 0.22rem;
  }
  .recent-box {
    flex: 1;
    padding-right: 0.2rem;
  }
  .recent-box .gray-color {
    line-height: 0.4rem;
  }
  .recent-des-wrap {
    height: 25px;
    line-height: 25px;
    overflow: hidden;
  }
  .recent-des {
    width: 100%;
    transition: all 1.5s;
    .goods-title {
      max-width: 1rem;
      overflow: hidden;
      white-space: nowrap; /*不显示的地方用省略号...代替*/
      text-overflow: ellipsis; /* 支持 IE */
    }
    .goods-price {
      flex: 1;
      text-align: right;
    }
  }
}
.game-wrap {
  background: #ffffff;
  margin-top: 0.2rem;
  padding: 0.2rem 0.3rem 0 0.8rem;
  border-radius: 0.1rem;
  box-shadow: 0 1px 10px #cccccc;
  .game-con {
    flex-wrap: wrap;
    // justify-content: space-between;
    font-size: 0.22rem;
    .game-item {
      width: 1.12rem;
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
}

.safe {
  width: 7.41rem;
  height: 1.7rem;
  margin: 0.19rem 0 0.11rem 0.08rem;
}
.down-wrap {
  .down-con {
    .down-active {
      width: 1.6rem;
      text-align: center;
      background: #ffe184;
      padding: 0.08rem 0;
      img {
        width: 0.84rem;
        height: 0.84rem;
        margin: 0.13rem 0;
      }
      .active-name {
        color: #333333;
        font-size: 0.24rem;
      }
      .active-des {
        color: #888888;
        font-size: 0.14rem;
        line-height: 0.4rem;
      }
      .active-btn {
        width: 1rem;
        line-height: 0.3rem;
        border: 1px solid #ff7f27;
        border-radius: 0.06rem;
        color: #ff731d;
        font-size: 0.16rem;
        margin: auto;
      }
    }
    .game-des {
      width: 4.42rem;
    }
    .down-list {
      width: 1.09rem;
      text-align: center;
      font-size: 0.18rem;
      color: #333333;
      img {
        width: 0.66rem;
        height: 0.65rem;
        margin: 0.08rem 0;
      }
    }
  }
}

.small-wrap {
  background: #ffffff;
  width: 7.07rem;
  box-shadow: 0 1px 10px #cccccc;
  margin: 0 auto;
}
.goods-list {
  margin-bottom: 0.2rem;
  /* 单条商品 */
  .goods-strip {
    background: #ffffff;
    padding: 0.3rem 0.2rem;
    margin-top: 0.2rem;
    /* 头部------ */
    .goods-strip-title {
      color: #ffffff;
      font-size: 0.24rem;
      line-height: 0.36rem;
      margin-bottom: 0.2rem;
      /* 精品 */
      .boutique {
        text-align: center;
        background: #fe7649;
        width: 0.36rem;
        height: 0.36rem;
        display: inline-block;
        margin-right: 0.1rem;
      }
      .title-ico {
        text-align: center;
        width: 0.93rem;
        height: 0.36rem;
        display: inline-block;
        margin-right: 0.1rem;
      }
      .deal-ico {
        background: -webkit-linear-gradient(#feab49, #ffcc4b);
        background: -o-linear-gradient(#feab49, #ffcc4b);
        background: -moz-linear-gradient(#feab49, #ffcc4b);
        background: linear-gradient(to right, #feab49, #ffcc4b);
      }
      .rent-ico {
        background: -webkit-linear-gradient(#ff9090, #ff687a);
        background: -o-linear-gradient(#ff9090, #ff687a);
        background: -moz-linear-gradient(#ff9090, #ff687a);
        background: linear-gradient(to right, #ff9090, #ff687a);
      }
      .system-ico {
        text-align: center;
        padding: 0 0.1rem;
        height: 0.36rem;
        margin-right: 0.1rem;
      }
      .ios-ico {
        background: -webkit-linear-gradient(
          -30deg,
          rgba(139, 191, 255, 1),
          rgba(109, 202, 255, 1),
          rgba(98, 172, 255, 1)
        );
      }
      .android-ico {
        background: -webkit-linear-gradient(-30deg, #84f0b2, #49d1ca);
      }
      .area {
        font-size: 0.26rem;
        color: #999999;
        display: inline-block;
      }
    }
    /* 详情 -- 保障*/
    .goods-strip-content {
      margin-bottom: 0.15rem;
      position: relative;
      .goods-des {
        width: 5rem;
        display: inline-block;
        font-size: 0.3rem;
        line-height: 0.4rem;
        overflow: hidden; /*超出的部分隐藏起来。*/
        white-space: nowrap; /*不显示的地方用省略号...代替*/
        text-overflow: ellipsis; /* 支持 IE */
      }
      .des_true {
        color: #333333;
      }
      .des_false {
        color: #999999;
      }
      .goods-ico {
        position: absolute;
        top: 0;
        right: 0;
        text-align: right;
        width: 2.2rem;
      }
      .goods-ico img {
        width: 0.36rem;
        height: 0.36rem;
        margin-left: 0.12rem;
      }
    }

    /* 底部 价格 */
    .goods-strip-bottom div {
      display: inline-block;
    }
    .goods-price {
      font-size: 0.36rem;
      color: #fa5856;
      vertical-align: middle;
    }
    .bargain {
      margin-left: 0.1rem;
      line-height: 0.35rem;
      text-align: center;
      font-size: 0.2rem;
      color: #999999;
      padding: 0.02rem 0.1rem;
      border: 1px solid #b5b5b5;
      border-top-left-radius: 0.18rem;
      border-top-right-radius: 0.18rem;
      border-bottom-left-radius: 0.18rem;
      border-bottom-right-radius: 0.18rem;
      vertical-align: middle;
    }
  }
}
.shop-wrap {
  background: #ffffff;
  .shop-sill {
    width: 7.5rem;
    height: 0.62rem;
  }
  .shop-swiper {
    padding: 0.2rem 0.2rem 0;
    .shop-item {
      padding-bottom: 0.56rem;
    }
  }
}
.hand-wrap {
  font-size: 0;
  margin: 0.2rem auto;
  .hand-img {
    width: 100%;
  }
}
</style>

<style>
.swiper-pagination-bullet {
  width: 0.16rem;
  height: 0.16rem;
  background: #eeeeee;
  opacity: 1;
}
.swiper-pagination-bullet-active {
  width: 0.4rem;
  height: 0.16rem;
  border-top-left-radius: 0.1rem;
  border-top-right-radius: 0.1rem;
  border-bottom-left-radius: 0.1rem;
  border-bottom-right-radius: 0.1rem;
  background: #ffcc00;
}

.swiper-pagination-bullet1 {
  width: 0.16rem;
  height: 0.16rem;
  background: #eeeeee;
  opacity: 1;
}

.van-rate {
  padding-top: 0.05rem;
}
.van-rate__icon {
  font-size: 0.2rem;
}
</style>
