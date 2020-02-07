<template>
    <div class="wrap">
        <Header v-bind:head_data="comData.head_data"></Header>
        <div class="messageDetails-con">
            <div class="sortTit">
                <span class="titText">出价记录</span>
                <div class="sort-wrap">
                    <div class="sele-sort" @click="sortFn('price')">
                        <img src="../../../../static/img/goodscreen/sort_ico.png" alt="">
                        <span>按照价格排序</span>
                    </div>
                    <div class="sele-sort" @click="sortFn('time')">
                        <img src="../../../../static/img/goodscreen/sort_ico.png" alt="">
                        <span>按照时间排序</span>
                    </div>
                </div>
            </div>
            <div class="message-cell" v-for="item in messageData">
                <div class="message-strip top">
                    <span class="left-text">买家</span>
                    <span class="right-text" v-text="item.username"></span>
                    <span class="time" v-text="item.create_time"></span>
                </div>
                <div class="message-strip">
                    <span class="left-text">出价</span>
                    <span class="right-text red-color" v-text="item.price"></span>
                </div>
                <div class="message-strip">
                    <span class="left-text">原价</span>
                    <span class="right-text" v-text="item.goods_price"></span>
                </div>
                <div class="btnBox" v-if="item.is_agree == -1">
                    <div class="green-bg" @click="Agree('ok',item.discuss_id)">同意</div>
                    <div class="red-bg" @click="Agree('no',item.discuss_id)">拒绝</div>
                </div>
                <div class="btn green-color" v-else-if="item.is_agree == 1">已同意</div>
                <div class="btn gray-bg" v-else-if="item.is_agree == 2">已拒绝</div>
                <div class="btn gray-bg" v-else-if="item.is_agree == 3">已失效</div>
            </div>
        </div>
        <NoData v-if="showNoData"></NoData>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
import NoData from "@/components/multi/NoData";
export default {
    name: "MessageDetails",
    components: {
        Header,
        NoData
    },
    data() {
        return {
            comData: {
                head_data: {
                    show_type: 2,
                    tit_text: '收到的议价消息',
                    right_icon: 2,
                    showBack: false,
                    showLogo: 2, //显示头部title文字
                    showShare: 3, //1搜索2分享3菜单
                    showBg: true, //是否显示背景
                }
            },
            showNoData:false,
            messageData:[],
            sort_price:'',
            is_price:true,//第一次点降序
            is_time:false,//默认是降序 所以再点的时候就是升序
            sort_time:1,//1-降序 2-升序
        };
    },
    methods:{
        sortFn(flag){
            var that = this;
            if(flag == 'price'){
                if(that.is_price){
                    that.sort_price = 1;
                    that.is_price = false;
                    mui.toast('价格降序',{ duration:'short', type:'div' });
                }else{
                    that.sort_price = 2;
                    that.is_price = true
                    mui.toast('价格升序',{ duration:'short', type:'div' });
                }
            }else if(flag == 'time'){
                if(that.is_time){
                    that.sort_time = 1;
                    that.is_time = false;
                    mui.toast('时间降序',{ duration:'short', type:'div' });
                }else{
                    that.sort_time = 2;
                    that.is_time = true;
                    mui.toast('时间升序',{ duration:'short', type:'div' });
                }
            };
            that.getData();
        },
        Agree(flag,id){
            var that = this;
            var opt;
            if(flag == 'ok'){
                opt = 1;
            }else if(flag == 'no'){
                opt = 2;
            }
            that.$axios.post(process.env.API_HOST+"doDiscussMsg",{
                discuss_id:id,
                is_agree:opt,
            }).then((res)=>{
                // console.log(res)
                if(res.status == 200){
                    if(res.data.code == 200){
                        mui.toast(res.data.msg,{ duration:'short', type:'div' });
                        that.getData();
                    }else{
                        mui.toast(res.data.msg,{ duration:'short', type:'div' });
                    }
                }
            }).catch((err)=>{
                console.log(err);
            })
        },
        getData(){
            var that = this;
            that.$axios.post(process.env.API_HOST+"discussMsg",{
                goods_id:that.$route.query.goods_id,
                sort_price:that.sort_price,
                sort_time:that.sort_time
            }).then(function(res){
                // console.log(res)
                if(res.status == 200){
                    if(res.data.code == 200){
                        if(res.data.data != ''){
                            that.messageData = res.data.data;
                            that.showNoData = false;
                        }else{
                            that.messageData = '';
                            that.showNoData = true;
                        }
                    }
                    // else if(res.data.code == 401){
                    //     mui.confirm("请先登陆","提示",["取消", "确认"],
                    //                 function(e) {
                    //                     if (e.index == 1) {
                    //                         that.$router.push({
                    //                             name: "AccountLogin",
                    //                             params: {
                    //                                 redirect:that.$router.currentRoute.name
                    //                             }
                    //                         });
                    //                     } else {
                    //                         that.$router.go(-1);
                    //                     }
                    //                 },
                    //                 "div"
                    //             );
                    // }
                }
            }).catch(function(err){
                console.log(err)
            })
        }
    },
    mounted() {
        var that = this;
        if (
            that.$route.query.goods_id != "" &&
            that.$route.query.goods_id != undefined
        ) {
            that.getData();
        } else {
            that.$router.go(-1);
        }
    }
};
</script>
<style scoped>
.messageDetails-con {
    padding: 0 0.2rem;
}
.sortTit {
    line-height: 0.8rem;
    font-size: 0.28rem;
    color: #333333;
    position: relative;
}

.sort-wrap {
    color: #999999;
    font-size: 0.24rem;
    position: absolute;
    top: 0;
    right: 0;
}
.sort-wrap .sele-sort:nth-child(1) {
    margin-right: 0.6rem;
}
.sele-sort {
    display: inline-block;
}
.sele-sort img {
    width: 0.22rem;
    height: 0.23rem;
    margin-right: 0.1rem;
}

.message-cell {
    background: #ffffff;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    margin-bottom: 0.2rem;
    padding: 0.2rem;
    font-size: 0.26rem;
    position: relative;
}
.message-strip {
    line-height: 0.5rem;
}
.message-strip span {
    display: inline-block;
}
.top {
    position: relative;
}
.time {
    font-size: 0.24rem;
    color: #999999;
    position: absolute;
    right: 0;
    top: 0;
}
.left-text {
    width: 1.5rem;
    color:#666666;
}
.red-color{
    color:#FF5E5E;
}
.btnBox{
    width:2.5rem;
    height: .44rem;
    font-size:.22rem;
    text-align:center;
    -webkit-border-radius: 0.04rem;
    -moz-border-radius: 0.04rem;
    border-radius: 0.04rem;
    color:#FFFFFF;
    position: absolute;
    top:.9rem;
    right:.3rem;
    display:flex;
    justify-content:space-between;
}
.btnBox div{
    width:1.1rem;
    line-height: .44rem;
}
.btn{
    width:1.1rem;
    height: .44rem;
    font-size:.22rem;
    text-align:center;
    -webkit-border-radius: 0.04rem;
    -moz-border-radius: 0.04rem;
    border-radius: 0.04rem;
    color:#FFFFFF;
    position: absolute;
    top:.9rem;
    right:.7rem;
}
.green-color{
    color:#45C773;
    background:none;
}
.green-bg{
    background:#45C773;
    -webkit-box-shadow:  1px 1px 5px #45C773;
    -moz-box-shadow: 1px 1px 5px #45C773;
    box-shadow: 1px 1px 5px #45C773;
}
.red-bg{
    background:#FE7649;
    -webkit-box-shadow:  1px 1px 5px #FE7649;
    -moz-box-shadow: 1px 1px 5px #FE7649;
    box-shadow: 1px 1px 5px #FE7649;
}
.gray-bg{
    background: #C6C6C6;
}
</style>
