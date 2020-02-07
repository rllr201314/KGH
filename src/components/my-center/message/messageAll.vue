<template>
    <div class="message-all-wrap wrap">
        <Header v-bind:head_data="head_data"></Header>
        <div class="list-box-wrap" v-if="!showNoData">
            <div id="minirefresh" class="minirefresh-wrap list-wrap">
                <div class="minirefresh-scroll list-con">
                  <div class="btn-all-read">
                    <img src="../../../../static/img/ic_all_read.png"/>
                    <span @click="changeToRead()">全部标记为已读</span>
                  </div>
                    <ul class="list">
                        <div class="message-strip" v-for="item in messagesData" @click="goDetail(item)">
                            <div class="left">
                                <img src="../../../../static/img/message.png" alt="">
                                <div class="mark" :hidden="item.is_read == 1"></div>
                                <div class="message-title">
                                    <div class="title" v-text="item.title"></div>
                                    <div class="gray-color" v-text="item.content"></div>
                                </div>
                            </div>
                            <div class="gray-color" v-text="item.time"></div>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
        <NoData v-if="showNoData"></NoData>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
import NoData from "@/components/multi/NoData";
export default {
    name: "MessageAll",
    data() {
        return {
            head_data: {
                show_type: 2,
                tit_text: '消息',
                right_icon: 2,
                showBack: false,
                showLogo: 2,
                showShare: 3, //1搜索2分享3菜单
                showBg: true,
            },
            num:1,
            pages:'',
            messagesData:'',
            showNoData:false,
        };
    },
    components: {
        Header,NoData
    },
    methods: {
        goDetail(data){
            var info = JSON.stringify(data)
            sessionStorage.sign = info;
            this.$router.push({name:'Message_Details',query:{sign:info}});
        },
        getData(flag) {
            var that = this;
            that.$axios
                .post(process.env.API_HOST+"msgInfo",{
                    page:that.num,
                    rows:15,
                })
                .then(res => {
                    // console.log(res);
                    if (res.status == 200) {
                        if (res.data.code == 200) {
                            var data = res.data.data.data;
                            that.pages = res.data.data.last_page;
                            if(flag == "refresh"){
                                if(data == ""){
                                    that.showNoData = true;
                                    that.miniRefresh.endDownLoading();
                                    that.messagesData = "";
                                }else{
                                    that.messagesData = data;
                                    that.showNoData = false;
                                    that.miniRefresh.endDownLoading();
                                }
                            }else if(flag == 'push'){
                                if(data == ""){
                                    that.miniRefresh.endUpLoading(true);
                                }else{
                                    that.miniRefresh.endUpLoading();
                                    for(var i in data){
                                        that.messagesData.push(data[i]);
                                    }
                                }
                            }
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        refresh() {
            var that = this;
            that.miniRefresh = new MiniRefresh({
                container: "#minirefresh",
                down: {
                    isAuto: false,
                    bounceTime: 500,
                    callback: () => {
                        that.num = 1;
                        that.getData("refresh");
                    }
                },
                up: {
                    isAuto: false,
                    loadFull: {
                        isEnable: false
                    },
                    isShowUpLoading: true,
                    callback: () => {
                        that.num++;
                        if (that.num <= that.pages) {
                            that.getData("push");
                        } else {
                            that.miniRefresh.endUpLoading(true);
                        }
                    }
                }
            });
        },
      changeToRead() {
        var that = this;
        that.$axios
          .post(process.env.API_HOST + "msgRead", {})
          .then(res => {
            // console.log(res);
            if (res.status == 200) {
              if (res.data.code == 200) {
                mui.toast(res.data.msg, {duration: "short", type: "div"});
                that.getData("refresh");
              } else if (res.data.code == 204) {
                mui.toast(res.data.msg, {duration: "short", type: "div"});
              }
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    mounted() {
        var that = this;
        that.refresh();
        that.getData('refresh');
    }
};
</script>
<style scoped>
.message-all-wrap {
    padding:0;
}
.message-strip {
    padding-right: 0.2rem;
    display: flex;
    height: 1.3rem;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e5e5e5;
}
.left{
    position:relative;
}
.mark{
    position:absolute;
    width:9px;
    height:9px;
    border-radius:50%;
    background: red;
    top:.05rem;
    left:.7rem;
}

.left img {
    width: 0.88rem;
    height: 0.88rem;
    vertical-align: middle;
    margin-right: 0.3rem;
}
.message-title {
    display: inline-block;
    vertical-align: middle;
}
.message-title div{
    width:4.5rem;
    overflow:hidden; /*超出的部分隐藏起来。*/
    white-space:nowrap;/*不显示的地方用省略号...代替*/
    text-overflow:ellipsis;/* 支持 IE */
}
.title {
    font-size: 0.28rem;
    color: #333333;
}
.gray-color {
    font-size: 0.24rem;
    color: #999999;
}


.list-box-wrap {
    padding-left: 0.2rem;
    position:relative;
    max-width:640px;
    margin:0 auto;
    height:100vh;
}
.list-wrap {
    top:.88rem;
}
.list-con{
    background: #f6f8fe;
}
.list{
    background: #ffffff;
    padding-left:.2rem;
}
.list :last-child{
    border:0;
}

.btn-all-read {
  color: #999999;
  font-size: 0.24rem;
  height: 0.8rem;
  line-height: 0.8rem;
  text-align: right;
  right: 0.2rem;
  top: 0;
  z-index: 2;
}

.btn-all-read img {
  width: 0.27rem;
  height: 0.23rem;
}

.btn-all-read span {
  float: right;
  padding-left: 0.15rem;
  padding-right: 0.15rem;
}
</style>

