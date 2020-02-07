<template>
  <div class="head-wrap">
    <div class="head-box-1" v-if="head_data.show_type == 1">
      <div class="head-tit flex-box">
        <img
          class="classify"
          src="../../../static/image/common/menu.png"
          alt="分类"
          @click="showShade1=!showShade1"
        />
        <img class="logo" src="../../../static/image/common/logo.png" alt="看个号手游交易平台" />
        <img
          class="center-icon"
          src="../../../static/image/common/center-ico.png"
          alt="个人中心"
          @click="seleLink('mycenter')"
        />
      </div>
      <div class="head-input flex-box">
        <img src="../../../static/img/header/search.png" alt />
        <input type="text" placeholder="想找点什么？" />
      </div>
      
      <!-- 类别 -->
      <div class="classification" v-show="showShade1" @click="disappear()">
        <div class="triangle"></div>
        <div class="classification-box">
          <div
            class="classification-main"
            v-for="item in classification_data"
            :key="item.id"
            @click="seleDivision(item.id)"
          >
            <div>
              <img :src="item.img" alt />
            </div>
            <span v-text="item.title"></span>
          </div>
        </div>
      </div>

      <div class="shade" v-show="showShade1||isShowKind" @click="isShowKind?isShowKind = false:''"></div>


    </div>
    <div class="head-box-1 head-box-0" v-if="head_data.show_type == 3">
      <div class="head-tit flex-box">
        <img
          class="back"
          src="../../../static/image/header/back.png"
          alt="返回"
          @click="seleLink('rollback')"
        />
        <div class="head-input flex-box sousuo">
          <img src="../../../static/img/header/search.png" alt />
          <input type="text" placeholder="想找点什么？" />
        </div>
        <img
          class="menu"
          :style="iconstyle"
          @click="cliMenu"
          src="../../../static/image/header/menu.png"
          alt="菜单"
        />
      </div>
    </div>
    <div class="head-box-2" v-else-if="head_data.show_type == 2">
      <div class="head-tit flex-box">
        <img
          class="back"
          src="../../../static/image/header/back.png"
          alt="返回"
          @click="seleLink('rollback')"
        />
        <span class="tit-text" v-text="head_data.tit_text"></span>
        <img
          class="share"
          v-if="head_data.right_icon == 1"
          @click="cliShare"
          src="../../../static/image/header/share.png"
          alt="分享"
        />
        
        <div v-else-if="head_data.right_icon === 2" class="menu-wrap">
          <img
            class="menu"
            :style="iconstyle"
            @click="cliMenu"
            src="../../../static/image/header/menu.png"
            alt="菜单"
          />
          <span v-show="(confirm_trade == 1 || is_msg == 1 )&& !showMenu" class="red-circle"></span>
        </div>

        <img
          v-else-if="head_data.right_icon == 3"
          class="add"
          src="../../../static/image/header/hAdd_ico.png"
          alt
          @click="addCard"
        />

        <div v-else></div>
      </div>
    </div>
    <transition name="fade">
      <div class="showMenu" v-show="showMenu" transiton="fade">
        <div class="tohome" @click="toPage('home')">
          <img src="../../../static/img/header-menu/tohome_ico.png" alt />
          <span>首页</span>
        </div>
        <div class="tosell" @click="toPage('sell')">
          <img src="../../../static/img/header-menu/tosell_ico.png" alt />
          <span>我要卖</span>
        </div>
        <div class="take" @click="toPage('take')">
          <img src="../../../static/img/header-menu/take_ico.png" alt />
          <span>收货</span>
          <span v-show="confirm_trade == 1" class="red-circle"></span>
        </div>
        <div class="service" @click="toPage('message')">
          <img src="../../../static/img/header-menu/service_ico.png" alt />
          <span>消息</span>
          <span v-show="is_msg == 1" class="red-circle"></span>
        </div>
        <div class="user" @click="toPage('my')">
          <img src="../../../static/img/header-menu/user_ico.png" alt />
          <span>个人中心</span>
        </div>
        <div class="history" @click="toPage('browse')">
          <img src="../../../static/img/header-menu/history_ico.png" alt />
          <span>浏览历史</span>
        </div>
      </div>
    </transition>
    <div class="header-shade" v-show="showMenu" @click="cliMenu"></div>
    <div id="header-share" class="mui-popover mui-popover-bottom mui-popover-action">
      <!-- 可选择菜单 -->
      <div class="pop-view">
        <div class="pop-hint">分享到其他平台提高浏览量，更快速的卖出商品</div>
        <div class="pop-box" @click="shareFn('wechatFriend')" v-if="false">
          <img src="../../../static/img/share/wechat.png" alt />
          <div>微信好友</div>
        </div>
        <div class="pop-box" @click="shareFn('wechatTimeline')" v-if="false">
          <img src="../../../static/img/share/pyq.png" alt />
          <div>朋友圈</div>
        </div>
        <div class="pop-box" @click="copyFn()" :data-clipboard-text="url" id="copy">
          <img src="../../../static/img/share/copy_link.png" alt />
          <div>复制链接</div>
        </div>
      </div>
      <!-- 取消菜单 -->
      <ul class="pop-view">
        <li class="mui-table-view-cell option-black">
          <a href="#sheet-share">取消</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["reload"], //刷新页面
  name: "Header",
  data() {
    return {
      showMenu: false, //是否显示菜单
      iconrotate: 0, //旋转de
      confirm_trade: null,
      is_msg: null,
      my_msg: null,
      url: null, //当前页的url

      isShowKind: false, //点击显示租号套餐列表
      showShade1: false,

      // 分类
      classification_data: [
        {
          id: 1,
          img: "../../static/image/header/maimai.png",
          title: "买卖号"
        },
        {
          id: 2,
          img: "../../static/image/header/zuhao.png",
          title: "租号"
        },
        {
          id: 3,
          img: "../../static/image/header/chongzhi.png",
          title: "充值"
        },
        {
          id: 4,
          img: "../../static/image/header/dailian.png",
          title: "代练"
        },
        {
          id: 5,
          img: "../../static/image/header/yeyou.png",
          title: "页游"
        }
      ]
    };
  },
  props: ["head_data"],
  mounted() {
    this.getMsg();
    this.url = window.location.href;
  },
  computed: {
    iconstyle() {
      //图标动态样式
      let arr = new Array();
      arr.push("transition:0.5s;");
      arr.push("transform:");
      arr.push("rotate(" + this.iconrotate + "deg);");
      return arr.join("");
    }
  },
  methods: {
    showAppHint() {
      this.$router.push({ name: "AppHint" });
    },
    cliSearch() {
      // 点击搜索
      var that = this;
      that.$router.push({ name: "Buy" });
      sessionStorage.buyOrsell = 1;
    },
    // 点击菜单
    cliMenu() {
      this.showMenu = !this.showMenu;
      if (this.iconrotate == 90) {
        this.iconrotate = 0;
      } else {
        this.iconrotate = 90;
      }
    },
    // 点击分享
    cliShare() {
      mui("#sheet-share").popover("toggle");
    },
    // + 添加提现账号
    addCard() {
      this.$router.push({
        name: "UserAuthentication",
        query: { type: this.head_data.identify }
      });
    },
    seleLink(flag) {
      var that = this;
      if (flag == "rollback") {
        if (window.history.length <= 1) {
          that.$router.push({ path: "/" });
        } else {
          if (that.head_data.back == 1) {
            that.$router.push({ name: "HomePage" });
          } else if (that.head_data.back == 2) {
            that.$router.push({ name: "MyCenter" });
          } else {
            that.$router.go(-1);
          }
        }
      } else if (flag == "mycenter") {
        var token = that.$store.state.token;
        if (token == undefined || token == "") {
          that.$router.push({
            name: "AccountLogin",
            params: { redirect: "MyCenter" }
          });
        } else {
          that.$router.push({ name: "MyCenter" });
        }
      }
    },
    toPage(flag) {
      var that = this;
      that.cliMenu();
      if (flag == "home") {
        if(this.$route.name != "HomePage"){
          that.$router.push({ name: "HomePage" });
        }
      } else if (flag == "sell") {
        if(this.$route.name != "Sell"){
          that.$router.push({ name: "Sell" });
        }
        sessionStorage.buyOrsell = 2;
        that.reload();
      } else if (flag == "my") {
        var token = that.$store.state.token;
        if (token == undefined || token == "") {
          that.$router.push({
            name: "AccountLogin",
            params: { redirect: "MyCenter" }
          });
        } else {
          if(this.$route.name != "MyCenter"){
            that.$router.push({ name: "MyCenter" });
          }
        }
      } else if (flag == "browse") {
        if(this.$route.name != "BrowseRecord"){
          that.$router.push({ name: "BrowseRecord" });
        }
      } else if (flag == "message") {
        if(this.$route.name != "MessageAll_Server"){
          that.$router.push({ name: "MessageAll_Server" });
        }
      } else if (flag == "take") {
        if(this.$route.name != "BuyOrderAll"){
          that.$router.push({ name: "BuyOrderAll" });
        }
      }
    },
    getMsg() {
      var that = this;
      if (that.$store.state.token) {
        that.$axios
          .post(process.env.API_HOST + "tipMsg")
          .then(res => {
            // console.log(res);
            if (res.status == 200) {
              if (res.data.code == 200) {
                that.is_msg = res.data.data.is_msg;
                that.confirm_trade = res.data.data.confirm_trade;
                that.my_msg = res.data.data.my_msg;
              }
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },

    // 分类
    disappear() {
      var that = this;
      this.showShade1 = false;
    },
    seleDivision(id) {
        if (id == 1) {
            if (this.$route.name != "HomePage") {
                this.$router.push({ name: "HomePage" });
            }
        } else if (id == 2) {
            if (this.$route.name != "RentHomePage") {
                this.$router.push({ name: "RentHomePage" });
            }
        } else if (id == 3) {
            if (this.$route.name != "RechargeHomePage") {
                this.$router.push({ name: "RechargeHomePage" });
            }
        } else if (id == 4) {
            if (this.$route.name != "TrainingHomePage") {
                this.$router.push({ name: "TrainingHomePage" });
            }
        } else if (id == 5) {
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.head-wrap {
  max-width: 640px;
  margin: 0 auto;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  .head-box-1 {
    position: relative;
    // height: 1.26rem;
    background: url(../../../static/image/header/head-bg.png) no-repeat;
    background-size: 7.5rem 1.49rem;
    padding: 0.17rem 0.43rem 0.06rem;
    .head-tit {
      justify-content: space-between;
      align-items: center;
      .classify {
        width: 0.43rem;
        height: 0.43rem;
        z-index: 10;
      }
      .logo {
        width: 1.87rem;
        height: 0.63rem;
      }
      .center-icon {
        width: 0.36rem;
        height: 0.38rem;
      }
    }
    .head-input {
      margin-top: 0.1rem;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 3px;
      height: 0.52rem;
      margin-bottom: 0.01rem;
      align-items: center;
      input {
        border: 0;
        background-color: transparent;
        margin: 0;
        padding: 0;
        height: 0.52rem;
        font-size: 0.2rem;
        color: #ffffff;
      }
      img {
        width: 0.26rem;
        height: 0.27rem;
        margin: 0 0.11rem 0 0.2rem;
      }
      ::-webkit-input-placeholder {
        font-size: 0.2rem;
        color: #ffffff;
      }
    }
    // 类别
    .classification {
      z-index: 10;
      width: 7.08rem;
      background: #ffffff;
      margin: 0 auto;
      border-radius: 0.15rem;
      padding: 0 0.81rem 0.15rem 0.81rem;
      position: absolute;
      top: 1.1rem;
      left: 0.208rem;
      .triangle {
        width: 0;
        height: 0;
        border-right: 0.15rem solid transparent;
        border-left: 0.15rem solid transparent;
        border-bottom: 0.22rem solid #ffffff;
        position: absolute;
        left: 0.28rem;
        top: -0.21rem;
      }
      .classification-box {
        display: flex;
        flex-wrap: wrap;
        .classification-main {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-right: 1.38rem;
          margin-top: 0.2rem;
          div {
            width: 0.8rem;
            height: 0.8rem;
            background: linear-gradient(
              135deg,
              rgba(255, 169, 53, 1) 0%,
              rgba(255, 85, 0, 1) 100%
            );
            box-shadow: 0px 0px 15px 0px rgba(255, 169, 53, 0.4);
            border-radius: 0.2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              width: 0.48rem;
              height: 0.53rem;
            }
          }
          span {
            font-size: 0.24rem;
            color: #333333;
            font-family: PingFang SC;
            font-weight: 500;
            width: 0.9rem;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .classification-main:nth-child(3n) {
          margin-right: 0;
        }
      }
    }
  }
  .shade {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 6;
  }

  .head-box-2 {
    padding: 0.19rem 0.22rem 0.24rem;
    background: url(../../../static/image/header/head-bg-small1.jpg) no-repeat;
    background-size: 7.5rem 0.86rem;
    .head-tit {
      justify-content: space-between;
      align-items: center;
      .back {
        width: 0.25rem;
        height: 0.43rem;
      }
      .tit-text {
        font-size: 0.34rem;
        color: #ffffff;
      }
      .share {
        width: 0.47rem;
        height: 0.39rem;
      }
      .menu {
        width: 0.33rem;
        height: 0.32rem;
      }
      .add {
        width: 0.35rem;
        height: 0.35rem;
      }
    }
  }
  // 遮罩
  .header-shade {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0);
    z-index: 8;
  }
  /*菜单栏*/
  .showMenu {
    width: 2.28rem;
    font-size: 0.28rem;
    color: #ffffff;
    background: url(../../../static/image/header/menubg.png) no-repeat;
    // opacity: 0.9;
    background-size: 2.28rem 5.46rem;
    position: absolute;
    right: 0.2rem;
    top: 0.9rem;
    text-align: left;
    padding: 0 0.25rem 0 0.2rem;
    -webkit-border-radius: 0.06rem;
    -moz-border-radius: 0.06rem;
    border-radius: 0.06rem;
    overflow: hidden;
    z-index: 99;
  }
  .tohome,
  .tosell,
  .take,
  .user,
  .service,
  .history {
    line-height: 0.85rem;
    border-bottom: 0.01rem solid #7d7d7d;
  }
  .menu-cell {
    line-height: 0.85rem;
    border-bottom: 0.01rem solid #7d7d7d;
    display: flex;
    align-items: center;
  }
  .showMenu .history {
    border: 0;
  }
  .showMenu img {
    margin-right: 0.2rem;
    vertical-align: middle;
  }
  .tohome img {
    width: 0.31rem;
    height: 0.3rem;
  }
  .tosell img {
    width: 0.29rem;
    height: 0.3rem;
  }
  .take img {
    width: 0.29rem;
    height: 0.27rem;
  }
  .user img {
    width: 0.31rem;
    height: 0.31rem;
  }
  .service img {
    width: 0.34rem;
    height: 0.37rem;
  }
  .history img {
    width: 0.33rem;
    height: 0.33rem;
  }

  
}
.back {
  width: 0.25rem;
  height: 0.43rem;
}
.menu {
  width: 0.33rem;
  height: 0.32rem;
}
.sousuo {
  width: 3rem;
  height: 0.52rem;
}
.head-wrap .head-box-1 .sousuo {
  width: 5.35rem;
}
.head-wrap .head-box-0 {
  // padding: .2rem .2rem;
  height: 1rem;
}


</style> 