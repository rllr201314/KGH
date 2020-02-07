<template>
    <div class="dial-wrap wrap">
        <Header v-bind:head_data="head_data"></Header>
        <div class="my-tit-btn" @click="showMyFn">查看我的奖品</div>
        <div class="dial-content">
            <div class="dial-cell">
                <img class="dial" src="../../../static/img/action/dial-con.png" alt="">
                <img class="pointer" src="../../../static/img/action/pointer.png" alt="" @click="raffleFn">
                <div class="hint">
                    <span>您还有</span><span class="num" v-text="num"></span><span>次抽奖机会</span>
                </div>
            </div>
            <div class="cell">
                <div class="tit">中奖名单</div>
                <div class="con-list">
                    <div class="list">
                        <ul>
                            <li v-for="item in items">
                                <div class="left" v-text="item.username"></div>
                                <div class="right">获得<span v-text="item.title"></span><span v-text="item.comment"></span></div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="cell">
                <div class="tit">活动规则</div>
                <div class="con rule">
                    <div>【活动时间】</div>
                    <div>2018年11月11日  00:00~23:59</div>
                    <br>
                    <div>【活动说明】</div>
                    <div>1、本次活动中奖率100%；</div>
                    <div>2、活动期间，凡在看个号平台下单购号，支付成功的用户均可获得一次幸运抽奖的机会；</div>
                    <div>3、本活动仅限购买账号、藏宝阁分期购号的买家参与，租号、充值订单不可参与；</div>
                    <div>4、所有红包奖项兑换，需要联系客服。我们会在交易完成后3个工作日内转入您的余额，万能“减免”卡中奖后即可联系客服使用；</div>
                    <div>5、抽奖总次数没有限制；</div>
                    <div>6、此活动奖品不能与其他活动奖项叠加使用；</div>
                    <div>7、本活动最终解释权归看个号平台所有。</div>
                    <br>
                    <div>【奖品说明】</div>
                    <div>特等奖：万能“减免”卡（限1人）</div>
                    <div class="gray-color">(可用于所有购买账号的手续费减免返现、分期免息、分期免手续费，也可用于抵消当前订单的手续费，仅限买家使用)</div>
                    <div>一等奖：红包200元（限3人）</div>
                    <div>二等奖：红包100元（限4人）</div>
                    <div>三等奖：红包50元（不限人数）</div>
                </div>
            </div>
        </div>
        <div class="pop-view" v-show="showPop">
            <div class="close" @click="closePop('rotate')"></div>
            <div class="pop-tit">恭喜您</div>
            <div class="pop-con">抽中<span  v-text="content"></span></div>
            <div class="pop-des" v-text="des"></div>
            <div class="btn-all">
                <div class="okbtn" @click="affirmFn">确认领取</div>
                <div class="gobtn"  @click="continueFn">继续抽奖</div>
            </div>
        </div>
        <div class="share" v-show="showPop || showMy" @click="closePop"></div>
        <div class="my-view" v-show="showMy">
            <div class="close" @click="closePop('my')"></div>
            <div class="my-tit">我的奖品</div>
            <div class="chit-wrap">
                <div class="chit-box" v-show="showList" v-for="item in mylist">
                    <div class="left-chit" v-text="item.title"></div>
                    <div class="right-chit">
                        <div v-text="item.comment"></div>
                        <div v-text="item.remark"></div>
                        <div class="time" v-text="item.time"></div>
                    </div>
                </div>
                <div class="no-award" v-show="!showList">
                    <img src="../../../static/img/action/no-award.png" alt="">
                    <div>暂时没有奖品哦~</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
import Loading from "@/components/multi/Loading";
export default {
    name: "Dial",
    components: {
        Header,
        Loading
    },
    data() {
        return {
            head_data:{
                show_type: 2,
                go_back: 1,
                right_icon: '',
                tit_text: '抽奖',
            },
            num:0,
            content:'',
            des:'',
            showPop:false,//结果弹窗
            showMy:false,//我的奖品
            isclick:true,//是否可以点击

            mylist:[],
            showList:true,

            // 文字轮播
            items:[],
        };
    },
    methods: {
        raffleFn() {
            var that = this;
            if(that.$store.state.token == ''){
                mui.confirm('请先登录','提示',['取消','确认'],function(e){
                    if(e.index == 1){
                        that.$router.push({name:'AccountLogin'})
                    }
                },'div')
                return false
            }
            // debugger
            if(that.isclick){
                if(that.num <= 0){
                    mui.alert('暂无抽奖机会','提示','确认','','div');
                    return false;
                }
                that.isclick = false;
                that.getData();
            }
        },
        rotateFunc(awards,spend){
            var that = this;
            $('.dial').stopRotate();
			$('.dial').rotate({
				angle: 0,
				duration: 9000,
				animateTo: spend + 3600, //angle是图片上各奖项对应的角度，1440是让指针固定旋转4圈
				callback: function () {
                    that.showPop = true;
                    document.body.style.overflow = "hidden"; //关闭滚动条
                    that.num--;
                    that.isclick = true;
                },
            });
        },
        // 关闭弹窗
        closePop(flag){
            if(flag == 'rotate'){
                this.showPop = false;
            }else if(flag == 'my'){
                this.showMy = false;
            }else{
                this.showPop = false;
                this.showMy = false;
            }
            document.body.style.overflow = ""; //出现滚动条 
        },
        // 确认领取
        affirmFn(){
            var that = this;
            that.closePop('rotate');
            that.getRank();
        },
        // 继续抽奖
        continueFn(){
            var that = this;
            that.closePop('rotate');
            that.getRank();
        },
        // 文字轮播
        canrouselFn(){
            var listPanel = $('.list ul');
            var nubcers = 0; //向上滚动top值
            function up() { //向上滚动
                listPanel.animate({ //中奖结果
                    'top': (nubcers - .6) + 'rem'
                }, 1500, 'linear', function () {
                    listPanel.css({
                            'top': '0rem'
                        })
                        .find("li:first").appendTo(listPanel);
                    up();
                });
            }
            up();
        },
        // 我的奖品
        showMyFn(){
            var that = this;
            if(that.$store.state.token != ''){
                that.showMy = true;
                document.body.style.overflow = "hidden"; //出现滚动条
                that.getMyRank();
            }else{
                mui.confirm('请先登录','提示',['取消','确认'],function(e){
                    if(e.index == 1){
                        that.$router.push({name:'AccountLogin'})
                    }
                },'div')
            }
        },
        // 获取抽奖次数
        getNum(){
            var that = this;
            that.$axios.post(process.env.API_HOST+"turn_num").then((res)=>{
                if(res.status == 200){
                    if(res.data.code == 200){
                        that.num = res.data.data.count;
                    }else{
                        mui.toast(res.data.msg,{ duration:'short', type:'div' });
                    }
                }
            }).catch((err)=>{
                console.log(err)
            })
        },
        // 抽奖
        getData(){
            var that = this;
            that.$axios.post(process.env.API_HOST+"turn_plate").then((res)=>{
                if(res.status == 200){
                    if(res.data.code == 200){
                        var data = res.data.data;
                        that.content = data.title;
                        that.des = data.remark;
                        that.rotateFunc(0,Number(data.angle));
                    }else{
                        that.isclick = true;
                        mui.alert(res.data.msg,'提示','确认','','div');
                    }
                }
            }).catch((err)=>{
                console.log(err)
            })
        },
        // 获取中奖名单
        getRank(){
            var that = this;
            that.$axios.post(process.env.API_HOST+"turn_rank").then((res)=>{
                if(res.status == 200){
                    if(res.data.code == 200){
                        that.items = res.data.data;
                        if(that.items.length > 5){
                            that.canrouselFn();
                        }
                    }else{
                        mui.toast(res.data.msg,{ duration:'short', type:'div' });
                    }
                }
            }).catch((err)=>{
                console.log(err)
            })
        },
        // 获取我的奖品
        getMyRank(){
           var that = this;
            that.$axios.post(process.env.API_HOST+"my_rank").then((res)=>{
                if(res.status == 200){
                    if(res.data.code == 200){
                        that.mylist = res.data.data;
                        if(that.mylist == ""){
                            that.showList = false;
                        }else{
                            that.showList = true;
                        }
                    }else{
                        mui.toast(res.data.msg,{ duration:'short', type:'div' });
                    }
                }
            }).catch((err)=>{
                console.log(err)
            }) 
        }
    },
    mounted(){
        var that = this;
        that.getRank();
        if(that.$store.state.token != ''){
            that.getNum();
        }
    }
};
</script>
<style scoped>
.dial-wrap {
    position:relative;
}
.dial-content {
    width: 100%;
    min-height: 27rem;
    background: url("../../../static/img/action/dial-bg.jpg") no-repeat;
    background-size: 100% 100%;
    padding: 2.6rem 0 .4rem;
}
.dial-cell {
    background: url("../../../static/img/action/dial-box.png");
    width: 7.5rem;
    height: 9.49rem;
    background-size: 100% 9.49rem;
    position: relative;
}

.dial {
    width: 4.76rem;
    height: 4.76rem;
    position: absolute;
    top: 2.935rem;
    left: 1.54rem;
}
.pointer {
    width: 1.37rem;
    height: 1.61rem;
    position: absolute;
    top: 4.38rem;
    left: 3.22rem;
}
.hint{
    position: absolute;
    bottom:0;
    left:0;right:0;
    font-size:.38rem;
    color:#ffffff;
    text-align:center;
}
.num{
    display: inline-block;
    width:.6rem;
    height:.75rem;
    font-size:.59rem;
    overflow: hidden;
    line-height: .7rem;
    background:#2D03A1;
}
.hint span{
    vertical-align: middle;
}

.cell{
    text-align:center;
    margin-top:.6rem;
}
.tit{
    width:2.65rem;
    height:.39rem;
    font-size:.39rem;
    /* line-height: . */
    background:url('../../../static/img/action/tit-bg.png');
    background-size:2.65rem .39rem;
    color:#ffffff;
    margin:0 auto .3rem;
}
.con{
    width:6.62rem;
    margin:0 auto;
    padding:.35rem;
}


.con-list{
    width:6.62rem;
    margin:0 auto;
    padding:.35rem .5rem;
    background:#2D03A1;
}
.list{
    width:100%;
    height:2.65rem;
    font-size:.26rem;
    color:#FFFFFF;
    position: relative;
    overflow: hidden;
}
.list ul{
    position: relative;
    padding: 0;
    list-style: none;
}
.list li{
    height: .6rem;
    line-height:.5rem;
    display: flex;
    justify-content:space-between;   
}
.rule{
    min-height:3rem;
    border:2px solid rgba(46,143,229,1);
    border-radius:15px;
    text-align:left;
    color:#FFFFFF;
    font-size:.26rem;
}
.pop-view{
    width:5.8rem;
    height:5.75rem;
    text-align:center;
    color:#FFFFFF;
    background: url('../../../static/img/action/pop-bg.jpg');
    background-size:5.81rem 5.75rem;
    padding-top:1.04rem;
    position: fixed;
    top:40%;
    left:calc(50% - 2.9rem);
    z-index:15;
}
.close{
    width:.2rem;
    height:.2rem;
    background: url('../../../static/img/action/close.png');
    background-size:.2rem;

    position:absolute;
    right:0.1rem;
    top:0.4rem;
}
.pop-tit{
    font-size:.32rem;
    /* margin-bottom:.2rem; */
}
.pop-con{
    font-size:.38rem;
    color:#FDE7A9;
    line-height: .5rem;
}
.pop-des{
    width:3rem;
    font-size:.24rem;
    margin:.29rem auto 0;
}
.btn-all{
    font-size:.3rem;
    position: absolute;
    bottom:0;
    left:0;
    right:0;
}
.okbtn{
    margin-bottom:.36rem;color:#FDE7A9;
}
.gobtn{
    margin-bottom:.3rem;color:#752DD2;text-decoration: underline;
}
.share{
    position:fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background:rgba(0,0,0,0.5);
    z-index:10;
}

.my-view{
    width:5.8rem;
    background: url('../../../static/img/action/my-bg.jpg') no-repeat;
    background-size:5.81rem 7.88rem;
    position:fixed;
    top:30%;
    left:calc(50% - 2.9rem);
    z-index:15;
    border-radius: .1rem;
}
.my-view .close{
    top:.15rem;
}
.my-tit{
    padding-top:.5rem;
    font-size:.48rem;
    color:#FFFFFF;
    text-align:center;
}
.chit-wrap{
    min-height:2rem;
    max-height:6rem;
    overflow-y:scroll;
    margin:.4rem 0;
}
.chit-wrap::-webkit-scrollbar {
    display: none;
}
.chit-box{
    width:5.24rem;
    height:1.83rem;
    background: url('../../../static/img/action/chit-bg.png') no-repeat;
    background-size:5.24rem 1.83rem;
    display: flex;
    /* justify-content:space-between; */
    align-items: center;
    margin:0 auto .2rem;
}
.left-chit{
    width:1.62rem;
    text-align:center;
    font-size:.28rem;
    color:#925BDC;
}
.right-chit{
    font-size:.24rem;
    color:#666666;
    padding-left:.26rem;
    width:3.95rem;
}
.time{
    color:#999999;
}
.my-tit-btn{
    width:1.81rem;
    height:.5rem;
    font-size:.24rem;
    color:#FFFFFF;
    text-align:center;
    line-height:.5rem;
    background: url('../../../static/img/action/my-tit.png');
    background-size:1.81rem .5rem;
    position:absolute;
    top:1.08rem;
    right: .22rem;
}
/* .gray-color{

} */
.no-award{
    text-align:center;
    color:#FFFFFF;
    font-size:.24rem;
}
.no-award img{
    width:1.73rem;
    height:1.37rem;
    margin-bottom:.3rem;
}
</style>
