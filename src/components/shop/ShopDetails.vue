<template>
  <!-- 店铺详情 -->
  <div class="wrap">
    <Head :head_data="head_data"></Head>
    <div class="detail-wrap">
      <div class="store-head flex-box cell-box">
        <img class="store-logo" :src="shop_info.shop_img" alt />
        <div class="head-con">
          <div class="store-name" v-text="shop_info.shop_name"></div>
          <div class="star flex-box">
            <van-rate
              v-model="shop_info.star"
              color="#FF721C"
              void-color="#FFE3D2"
              allow-half
              void-icon="star"
              readonly
            />
            <div class="head-cash">
              <span>保证金:</span>
              <span class="head-cash-d">50w</span>
            </div>
            <img
              class="head-mark"
              @click="show_pledge = !show_pledge"
              src="../../../static/image/store/mark.png"
              alt
            />
          </div>
          <div class="icon-wrap">
            <img src="../../../static/image/store/account.png" alt />
            <img src="../../../static/image/store/rent.png" alt />
            <img src="../../../static/image/store/top-up.png" alt />
            <img src="../../../static/image/store/vs.png" alt />
          </div>
        </div>
        <div class="collect" @click="collectFn">
          <div>收藏</div>
          <div class="collect-num">
            <span v-text="shop_info.collect_count"></span>人收藏
          </div>
        </div>
      </div>
      <div class="detail-synopsis flex-box">
        <div class="synopsis-name">店铺简介:</div>
        <div class="synopsis-des" v-text="shop_info.shop_intro"></div>
      </div>
      <div class="detail-synopsis flex-box">
        <div class="synopsis-name">荣誉认证:</div>
        <div class="synopsis-des flex-box">
          <div class="synopsis-des-icon flex-box">
            <img src="../../../static/image/store/assume.png" alt="实名" />
            <span v-text="assume"></span>
          </div>
          <div class="synopsis-des-icon flex-box">
            <img src="../../../static/image/store/autonym.png" alt="认证" />
            <span v-text="assume"></span>
          </div>
        </div>
      </div>
      <div class="detail-synopsis ranking-wrap">
        <div class="synopsis-name ranking-tit flex-box">
          <div>排行榜</div>
          <ul class="flex-box">
            <li
              v-for="(item,index) in ranking"
              :key="index"
              v-text="item.name"
              :class="{'rank-active':item.active}"
              @click="seleList(item.id)"
            ></li>
          </ul>
        </div>
        <div class="ranking-list">
          <div
            class="shop-con-item"
            v-for="(ind,num) in list"
            :key="num"
            @click="toDatail(ind.goods_id)"
          >
            <img class="shop-con-item-img" :src="ind.img_url" alt />
            <div class="shop-item-con flex-box">
              <img
                class="shop-item-icon"
                src="../../../static/image/store/top-up.png"
                v-if="ind.rent_method == 1"
                alt="充值"
              />
              <div class="shop-item-des" v-text="ind.goods_title"></div>
            </div>
          </div>
          <div class="nodata" v-if="list == ''">
            <img class="nodata" src="../../../static/img/warn/nodata.png" alt />
            <div>暂时没有数据哦！</div>
          </div>
        </div>
      </div>
      <div class="recommend-wrap" v-if="JSON.stringify(shop_data) != '{}'">
        <div class="recommend-tit">店铺推荐</div>
        <div class="recommend-con">
          <Store :store_data="shop_data"></Store>
        </div>
      </div>
      <div class="pledge-box" v-show="show_pledge" @click="show_pledge = !show_pledge">
        <div class="pledge">
          <div class="pledge-tit">保证金</div>
          <div class="pledge-str">
            <span class="pledge-left">什么是保证金：</span>
            <span class="pledge-right">保证金是指保证金是指保证金是指保证金是指保证金是指保证金是指保证金是指保证金是指保证金是指</span>
          </div>
          <div class="pledge-str">
            <span class="pledge-left">什么是保证金：</span>
            <span class="pledge-right">保证金是指保证金是指保证金是指保证金是指保证金是指保证金是指保证金是指保证金是指保证金是指</span>
          </div>
          <div class="pledge-str">
            <span class="pledge-left">什么是保证金：</span>
            <span class="pledge-right">保证金是指保证金是指保证金是指保证金是指保证金是指保证金是指保证金是指保证金是指保证金是指</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Head from "@/components/home-page/Header";
import Store from "@/components/home-page/Store";
export default {
  name: "ShopDetails",
  components: {
    Head,
    Store
  },
  data() {
    return {
      head_data: {
        show_type: 2,
        go_back: 1,
        right_icon: 1,
        tit_text: "店铺首页"
      },
      rate: 4,
      assume: "已实名",
      autonym: "已认证",
      ranking: [
        {
          name: "销量排行",
          active: true,
          id: 1
        },
        {
          name: "收藏排行",
          active: false,
          id: 2
        }
      ],
      show_pledge: false,
      list: [],
      sell_rank: [],
      collect_rank: [],
      shop_info: {},
      shop_data: {}
    };
  },
  methods: {
    getData(id) {
      let that = this;
      that.$axios
        .post(`${that.baseURL}shopRecommend`, {
          shop_sn: id
        })
        .then(res => {
          console.log(res);
          if (res.status == 200) {
            if (res.data.code == 200) {
              that.shop_info = res.data.data.shop_info;
              that.sell_rank = res.data.data.sell_rank;
              that.collect_rank = res.data.data.collect_rank;
            }
          }
        });
    },
    seleList(id) {
      let that = this;
      if (id == 1) {
        that.ranking[0].active = true;
        that.ranking[1].active = false;
        that.list = that.sell_rank;
      } else if (id == 2) {
        that.ranking[1].active = true;
        that.ranking[0].active = false;
        that.list = that.collect_rank;
      }
    },
    toDatail(id) {
      this.$router.push({
        name: "Details",
        params: { goods_id: id }
      });
    },
    collectFn() {
      let that = this;
      that.$axios
        .post(`${that.baseURL}shopCollect`, {
          shop_sn: that.shop_info.shop_sn
        })
        .then(res => {
          if (res.status == 200) {
            if (res.data.code == 200) {
              mui.toast(res.data.msg);
            } else {
              mui.toast(res.data.msg);
            }
          }
        });
    }
  },
  created() {
    let that = this;
    if (that.$route.query.id != "") {
      that.getData(that.$route.query.id);
    } else {
      that.$router.go(-1);
    }
    console.log(that.$route);
  }
};
</script>

<style lang="scss" scoped>
.detail-wrap {
  padding-top: 0.2rem;
  .cell-box {
    background: #ffffff;
  }
  .store-head {
    padding: 0.12rem 0.2rem 0.18rem;
    align-items: center;
    .store-logo {
      width: 1.1rem;
      height: 1.1rem;
      margin-right: 0.1rem;
    }
    .head-con {
      flex: 2;
      .store-name {
        font-size: 0.3rem;
        line-height: 0.5rem;
      }
      .star {
        align-items: center;
        .head-cash {
          margin: 0 0.12rem;
          font-size: 0.24rem;
          color: #666666;
          .head-cash-d {
            color: #ff721c;
            font-size: 0.2rem;
            text-decoration: underline;
          }
        }
        .head-mark {
          width: 0.21rem;
          height: 0.21rem;
        }
      }
      .icon-wrap {
        margin-top: 0.12rem;
        img {
          width: auto;
          height: 0.25rem;
        }
      }
    }
    .collect {
      padding: 0.06rem;
      min-width: 0.9rem;
      height: 0.6rem;
      background: #ff7800;
      border-radius: 0.1rem;
      text-align: center;
      font-size: 0.24rem;
      color: #ffffff;
      line-height: 0.3rem;
      cursor: pointer;
      .collect-num {
        font-size: 0.16rem;
        line-height: 0.2rem;
      }
    }
  }
  .detail-synopsis {
    background: #ffffff;
    margin-top: 0.05rem;
    padding: 0.14rem 0.2rem;
    .synopsis-name {
      font-size: 0.26rem;
      color: #555555;
      min-width: 1.2rem;
      line-height: 0.35rem;
    }
    .synopsis-des {
      font-size: 0.22rem;
      color: #666666;
      line-height: 0.35rem;
      .synopsis-des-icon {
        margin-right: 0.26rem;
        align-items: center;
        img {
          width: 0.26rem;
          height: 0.26rem;
          margin-right: 0.05rem;
        }
      }
    }
  }
  .ranking-wrap {
    .ranking-tit {
      justify-content: space-between;
      line-height: 0.4rem;
      align-items: center;
      div {
        font-size: 0.28rem;
        color: #333333;
      }
      ul {
        li {
          margin-left: 0.25rem;
          color: #666666;
          cursor: pointer;
        }
        .rank-active {
          border-bottom: 2px solid #ff721c;
        }
      }
    }
    .ranking-list {
      display: flex;
      // justify-content: space-between;
      justify-content: flex-start;
      flex-wrap: wrap;
      .shop-con-item:nth-child(3n - 1) {
        margin: 0.2rem 0.81rem 0;
      }
      .shop-con-item {
        width: 1.82rem;
        font-size: 0;
        margin-top: 0.2rem;
        .shop-con-item-img {
          width: 1.82rem;
          height: 1.82rem;
        }
        .shop-item-con {
          align-items: center;
          .shop-item-icon {
            width: 0.5rem;
            height: 0.23rem;
            margin-right: 0.05rem;
          }
          .shop-item-des {
            width: 1.2rem;
            line-height: 0.3rem;
            font-size: 0.16rem;
            color: #333333;
            overflow: hidden; /*超出的部分隐藏起来。*/
            white-space: nowrap; /*不显示的地方用省略号...代替*/
            text-overflow: ellipsis; /* 支持 IE */
          }
        }
      }
    }
    .nodata {
        width: 100%;
      font-size: 0.26rem;
      color: #999999;
      text-align: center;
      padding-bottom: .2rem;
      img {
        width: 3.55rem;
        height: 1.75rem;
        margin:  0.77rem 0;
      }
    }
  }
  .recommend-wrap {
    .recommend-tit {
      height: 0.5rem;
      line-height: 0.5rem;
      padding-left: 0.2rem;
      font-size: 0.28rem;
      color: #333333;
    }
    .recommend-con {
      background: #fff;
      padding: 0.2rem;
    }
  }
  .pledge-box {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba($color: #000000, $alpha: 0.6);
    .pledge {
      background: #fff;
      position: absolute;
      top: 30%;
      width: 6rem;
      left: calc(50% - 3rem);
      border-radius: 0.1rem;
      padding: 0.2rem;
      .pledge-tit {
        color: #ff721c;
        line-height: 0.4rem;
        font-size: 0.3rem;
      }
      .pledge-str {
        margin-top: 0.1rem;
        .pledge-left {
          font-size: 0.24rem;
          color: #000;
        }
        .pledge-right {
          font-size: 0.16rem;
          color: #666666;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.van-rate {
  padding-top: 0.05rem;
}
.van-rate__icon {
  font-size: 0.2rem;
}
</style>

