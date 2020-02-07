<template>
    <div class="pc-wrap">
        <div class="title">
            <div class="content clearfloat">
                <div class="con-left">
                    <img src="../../static/img/pc_index/home.png" alt="">
                    <span>您好，欢迎来看个号！</span>
                    <img src="../../static/img/pc_index/download.png" alt="">
                </div>
                <div class="con-right sele-btn">
                    <span @click="loginFn('login')">登录</span>
                    <span>|</span>
                    <span @click="loginFn('register')">注册</span>
                </div>
            </div>
        </div>
        <div class="head-search">
            <div class="content clearfloat">
                <img class="head-tit" src="../../static/img/pc_index/kgh-tit.png" alt="">
                <div class="search">
                    <input type="search" placeholder="请输入游戏名称" class="search-inp">
                    <div class="search-btn">搜索</div>
                </div>
            </div>
        </div>
        <div class="content-wrap">
            <div class="content">
                <ul class="nav-box flex-wrap">
                    <li></li>
                    <li>首页</li>
                    <li @click="goLink(true,'buy-order')">我购买的</li>
                    <li @click="goLink(true,'sell-order')">我出售的</li>
                    <li>热门活动<img src="../../static/img/pc_index/new-ico.png" alt=""></li>
                    <li>···</li>
                </ul>
            </div>
            <div class="carousel-wrap">
                <div class="swiper-container" id="indexSwiper">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="item in imgList">
                            <img :src="item.img" alt="">
                        </div>
                    </div>
                    <!-- <div class="swiper-pagination"></div> -->
                </div>
            </div>
            <div class="container content flex-wrap top">
                <div class="container-left">
                    <div class="hot-game cell">
                        <header>
                            <span class="vertical"></span>
                            <span>热门游戏</span>
                        </header>
                        <ul class="game-nav cell-title flex-wrap">
                            <li v-for="(item,index) in gameNav" @click="seleNav(index,'nav')" :class="index == navSlide?'on':''">
                                <a href="javascript:;" v-text="item"></a>
                            </li>
                        </ul>
                        <ul class="game-cell clearfloat">
                            <li class="game-item" v-for="item in gameList">
                                <img :src="item.url" :alt="item.text">
                                <div class="game-text" v-text="item.text"></div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="container-right">
                    <div class="cell interval">
                        <div class="cell-title clearfloat">
                            <img class="notice-img" src="../../static/img/pc_index/notice.png" alt="">
                            <span>最新公告</span>
                            <div class="title-right">
                                <span>更多</span>
                                <img class="add-img" src="../../static/img/pc_index/add-btn.png" alt="">
                            </div>
                        </div>
                        <ul class="sidebar">
                            <li class="list-strip small-list" v-for="item in noticeList">
                                <a href="javascript:;">
                                    <span v-text="item.des" class="list-text list-des"></span>
                                    <div class="list-right gray-color">
                                        <span v-text="item.time"></span>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="cell interval">
                        <div class="cell-title">
                            <div class="deal-box">
                                <img class="deal-img" src="../../static/img/pc_index/deal.png" alt="">
                                <div class="deal-content">
                                    <div>累计安全交易成交</div>
                                    <ul>
                                        <li v-for="item in deal_num" v-text="item"></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="recent">
                                <span class="vertical"></span>
                                <span>近期交易记录</span>
                            </div>
                        </div>
                        <ul class="sidebar sidebar-bg">
                            <li class="list-strip small-list" v-for="item in noticeList">
                                <a href="javascript:;">
                                    <span v-text="item.des" class="list-text list-des"></span>
                                    <div class="list-right red-color">
                                        <span>￥</span>
                                        <span v-text="item.time"></span>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="content flex-wrap plate">
                <img v-for="item in plate" :src="item.url" alt="" @click="goLink(false,item.path)">
            </div>
            <div class="container content flex-wrap">
                <div class="container-left">
                    <div class="cell interval">
                        <div class="cell-title title-font clearfloat">
                            <span class="vertical"></span>
                            <span>最近上架</span>
                            <div class="title-right">
                                <span>更多</span>
                                <img class="add-img" src="../../static/img/pc_index/add-btn.png" alt="">
                            </div>
                        </div>
                        <ul class="list">
                            <li class="list-strip big-list" v-for="(item,index) in accountList" @click="seleNav(index,'new')" :class="index == newSlide?'on':''">
                                <a href="javascript:;" class="clearfloat">
                                    <span v-text="item.name" class="list-text list-name"></span>
                                    <span v-if="item.type == 1" class="sign cph">成品号</span>
                                    <span v-text="item.des" class="list-text list-des"></span>
                                    <div class="list-right red-color">
                                        <span>￥</span>
                                        <span v-text="item.price"></span>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="cell">
                        <div class="cell-title title-font">
                            <span class="vertical"></span>
                            <span>精品推荐</span>
                            <div class="title-right">
                                <img class="refresh-img" src="../../static/img/pc_index/refresh.png" alt="">
                                <span>再换一组</span>
                            </div>
                        </div>
                        <ul class="list">
                            <li class="list-strip big-list" v-for="(item,index) in accountList" @click="seleNav(index,'boutique')" :class="index == boutiqueSlide?'on':''">
                                <a href="javascript:;" class="clearfloat">
                                    <span v-text="item.name" class="list-text list-name"></span>
                                    <span v-if="item.type == 1" class="sign cph">成品号</span>
                                    <span v-text="item.des" class="list-text list-des"></span>
                                    <span class="beautiful sign">精</span>
                                    <div class="list-right red-color">
                                        <span>￥</span>
                                        <span v-text="item.price"></span>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="container-right">
                    <div class="cell verify-box interval">
                        <div class="verify-tit">客服真伪验证</div>
                        <div class="verify-con flex-wrap" v-for="(item,index) in verifyList" :key="index">
                            <input class="search-inp" type="text" :placeholder="item.placeholder" v-model="verifyData[item.flag]" @input="clearVerifyDataFn(item.flag)">
                            <div class="search-btn" v-text="item.btnVal" @click="verifyFn(item.flag)"></div>
                        </div>
                        <div class="verify-bot flex-wrap" v-if="verifyResult == 1">
                            <img src="../../static/img/pc_index/true-user.png" alt="">
                            <div class="verify-text">
                                <div>看个号客服</div>
                                <div>为您竭诚服务</div>
                            </div>
                        </div>
                        <div class="verify-bot flex-wrap" v-if="verifyResult == 2">
                            <img src="../../static/img/pc_index/false-good.png" alt="">
                            <div class="verify-text">
                                <div>您验证的信息非看个号官方提供</div>
                                <div>请尽快<span class="red-color">停止操作</span>以免您的财产损失</div>
                            </div>
                        </div>
                        <div class="verify-bot flex-wrap" v-if="verifyResult == 3">
                            <img src="../../static/img/pc_index/false-link.png" alt="">
                            <div class="verify-text">
                                <div>您搜索的商品非看个号平台提供</div>
                                <div><span class="red-color">请勿操作</span>，谨防受骗</div>
                            </div>
                        </div>
                        <div class="verify-bot flex-wrap" v-if="verifyResult == 4">
                            <img src="../../static/img/pc_index/true-good.png" alt="">
                            <div class="verify-text">
                                <div>您搜索的商品是由看个号</div>
                                <div>平台提供的真实商品请放心交易</div>
                            </div>
                        </div>
                    </div>
                    <div class="cell interval">
                        <div class="cell-title clearfloat">
                            <img class="query-img" src="../../static/img/pc_index/query.png" alt="">
                            <span>常见问题</span>
                            <div class="title-right">
                                <span>更多</span>
                                <img class="add-img" src="../../static/img/pc_index/add-btn.png" alt="">
                            </div>
                        </div>
                        <div class="">
                            <ul class="list flex-wrap faq-wrap">
                                <li class="list-strip faq-strip" v-for="(item,index) in faq" :key="index">
                                    <a href="javascript:;"><span v-text="item" class="list-text"></span></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <img class="safe-box" src="../../static/img/pc_index/safe.png" alt="">
                </div>
            </div>
            <div class="content flex-wrap safeguard-wrap">
                <div class="safeguard-cell">
                    <img src="../../static/img/pc_index/safeguard-ico.png" alt="">
                    <div class="safeguard-right">
                        <div class="safeguard-tit">安全公正交易保障</div>
                        <div class="safeguard-con">找回包赔，交易双方签署协议、保险等方式为用户提供安全交易的服务</div>
                    </div>
                </div>
                <div class="safeguard-vertical"></div>
                <div class="safeguard-cell">
                    <img src="../../static/img/pc_index/stage-ico.png" alt="">
                    <div class="safeguard-right">
                        <div class="safeguard-tit">安全分期无压力</div>
                        <div class="safeguard-con">分期付款交易，减小资金压力</div>
                    </div>
                </div>
                <div class="safeguard-vertical"></div>
                <div class="safeguard-cell">
                    <img src="../../static/img/pc_index/server-ico.png" alt="">
                    <div class="safeguard-right">
                        <div class="safeguard-tit">7*24小时优质服务</div>
                        <div class="safeguard-con">全天客服以及电话客服，为您提供专业团队对客户进行一对一的专项服务</div>
                    </div>
                </div>
                <div class="safeguard-vertical"></div>
                <div class="safeguard-cell">
                    <img src="../../static/img/pc_index/quick-ico.png" alt="">
                    <div class="safeguard-right">
                        <div class="safeguard-tit">交易回款速度快</div>
                        <div class="safeguard-con">不限额、无抵押、24小时快速到账</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="content">
                <div class="system sele-btn">
                    <span>电脑版</span>
                    <span>|</span>
                    <span>手机版</span>
                </div>
                <div class="footer-link flex-wrap">
                    <img src="../../static/img/pc_index/safe-ico.png" alt="中国人民保险">
                    <img src="../../static/img/pc_index/yht-ico.png" alt="云合同合作商家">
                    <img src="../../static/img/pc_index/authentication-ico.png" alt="认证联盟实名网站">
                    <img src="../../static/img/pc_index/net.png" alt="山西网警备案">
                    <img src="../../static/img/pc_index/360-ico.png" alt="360可信网站">
                    <img src="../../static/img/pc_index/text-ico.png" alt="文网文认证通过">
                    <img src="../../static/img/pc_index/industry.png" alt="安全联盟行业认证">
                </div>
                <div class="help flex-wrap">
                    <ul class="l-help list">
                        <li class="list-strip"><a href="javascript:;"><span class="list-text">关于我们</span></a></li>
                        <li class="list-strip"><a href="javascript:;"><span class="list-text">隐私保护</span></a></li>
                        <li class="list-strip"><a href="javascript:;"><span class="list-text">免责声明</span></a></li>
                        <li class="list-strip"><a href="javascript:;"><span class="list-text">新手帮助</span></a></li>
                    </ul>
                    <div class="c-help"></div>
                    <div class="r-help">
                        <div class="wechat">
                            <img src="../../static/img/pc_index/subscription.png" alt="公众号"><img src="../../static/img/pc_index/applet.png" alt="">
                        </div>
                        <div class="hot-line">
                            <span>客服热线</span>
                            <span class="bold-font">400-688-6860</span>
                        </div>
                        <div class="intro">看个号7x24小时为您提供安全快捷的服务</div>
                    </div>
                </div>
                <div class="filing">
                    <div>杭州古都科技有限公司灵石县分公司@2018-2028  kangehao.com版权所有</div>
                    <div>晋ICP备18002812号-1</div>
                </div>
            </div>
        </div>
        <div class="fixed-right">
            <ul>
                <li class="fixed-sell" @click="goLink(false,'buy')">
                    <img src="../../static/img/pc_index/buy.png" alt="">
                    <div>我要买</div>
                </li>
                <li class="fixed-cell" @click="goLink(true,'sell')">我要卖</li>
                <li class="fixed-cell" @click="goLink(true,'rent-out')">帐号寄租</li>
                <li class="fixed-cell" @click="linkServer">咨询客服</li>
                <li class="fixed-cell" @click="goLink(true,'collect')">我的收藏</li>
                <li class="fixed-top">
                    <a href="javascript:;" @click="topFn">
                        <img src="../../static/img/pc_index/top.png" alt="">
                        <div>返回顶部</div>
                    </a>
                </li>
            </ul>
        </div>
        <Loading v-show="showLoading" class="showload"></Loading>
    </div>
</template>
<script>
import Loading from "@/components/multi/Loading"
export default {
    name:"Pc_index",
    components:{
        Loading
    },
    data(){
        return{
            showLoading:false,
            imgList:[{img:'static/img/swiper_cont.png'},{img:'static/img/pc_index/slideshow.png'},{img:'static/img/swiper_cont.png'},{img:'static/img/pc_index/slideshow.png'}],
            gameNav:['推荐','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
            navSlide:0,//导航栏
            newSlide:null,//最新上架
            boutiqueSlide:null,//精品推荐
            gameList:[{
                url:'static/img/mh_ico.png',
                text:'梦幻西游'
            },{
                url:'static/img/mh_ico.png',
                text:'梦幻西游'
            },{
                url:'static/img/mh_ico.png',
                text:'梦幻西游'
            },{
                url:'static/img/mh_ico.png',
                text:'梦幻西游'
            },{
                url:'static/img/mh_ico.png',
                text:'梦幻西游'
            },{
                url:'static/img/mh_ico.png',
                text:'梦幻西游'
            }],
            plate:[
                {url:'./static/img/pc_index/rent.png',path:'rent'},
                {url:'./static/img/pc_index/topup.png',path:'special-area?type=2'},
                {url:'./static/img/pc_index/cbg.png',path:'special-area?type=1'},
                {url:'./static/img/pc_index/gold.png',path:'gold-goods'}
            ],
            accountList:[
                {name:'大话西游',type:1,des:'方寸山xxxxxxxxxx100级高输出力士方寸山xxxxxxxxxx100级高输出力士方寸山xxxxxxxxxx100级高输出力士方寸山xxxxxxxxxx100级高输出力士',price:'1000'},
                {name:'大话西游',type:1,des:'方寸山xxxxxxxxxx100级高输出力士',price:'1000'},
                {name:'大话西游',type:1,des:'方寸山xxxxxxxxxx100级高输出力士',price:'1000'},
                {name:'大话西游',type:1,des:'方寸山xxxxxxxxxx100级高输出力士',price:'1000'}],
            noticeList:[
                {des:'看个号改版了!',time:'2018-01-10'},
                {des:'看个号改版了!',time:'2018-01-10'},
                {des:'看个号改版了!',time:'2018-01-10'},
                {des:'看个号改版了!',time:'2018-01-10'},
            ],
            deal_num:['1','2','3','4'],
            verifyList:[
                {placeholder:'请输入QQ客服进行验证',btnVal:'验证QQ客服',flag:'qq'},
                {placeholder:'请输入客服微信进行验证',btnVal:'验证微信客服',flag:'wx'},
                {placeholder:'请复制商品链接进行验证',btnVal:'验证商品链接',flag:'link'},
            ],
            verifyData:{qq:'',wx:'',link:''},
            verifyResult:0,
            faq:['买东西要手续费吗？','买东西要手续费吗？','买东西要手续费吗？','买东西要手续费吗？','买东西要手续费吗？'],

        } 
    },
    methods:{
        linkServer(){
            this.$router.push({ name: 'Service' });
        },
        mySwipter(){
            new Swiper ('#indexSwiper', {
                loop:true,
                autoplay : 5000,
                initialSlide :1,//第一个显示的图片默认为0
                observer:true,//修改swiper自己或子元素时，自动初始化swiper
                observeParents:true,//修改swiper的父元素时，自动初始化swiper
                autoplayDisableOnInteraction:false,//用户操作完是否自动切换
                pagination:'.swiper-pagination',
            });
        },
        seleNav(index,flag){
            if(flag == 'nav'){
                this.navSlide = index;
            }else if(flag == 'new'){
                this.newSlide = index;
            }else if(flag == 'boutique'){
                this.boutiqueSlide = index;
            }
        },
        // 登录
        loginFn(flag){
            if(flag == 'login'){
                this.$router.push({path:'account-login'})
            }else if(flag == 'register'){
                this.$router.push({path:'register'})
            }
        },
        // 判断是否登录
        existToken(){
            var token = this.$store.state.token == ''|| undefined ? false:true;
            return token;
        },
        // 跳转
        goLink(judge,flag){
            // 需要判断是否登录
            var that = this;
            if(judge && !that.existToken()){
                that.$router.push({path:'account-login'})
                return false;
            }
            that.$router.push({path:flag})
        },
        // 清空其他验证的内容
        clearVerifyDataFn(flag){
            var that = this;
            for(var i in that.verifyData){
                if(flag == i){
                    continue;
                }
                that.verifyData[i] = '';
            }
        },
        verifyFn(flag){
            var that = this;
            var request = {};
            if(flag == 'qq'){
                if(that.verifyData.qq == '' || that.verifyData.qq.length < 5){
                    mui.toast("请输入正确的QQ号", { duration: "500", type: "div" });
                    return false;
                }
                request.authentic_type = 1;
                request.content = that.verifyData.qq;
            }else if(flag == 'wx'){
                var reg=/^[a-zA-Z\d_]{5,}$/;    
                if(!reg.test(that.verifyData.wx)){
                    mui.toast("请输入正确的微信号", { duration: "short", type: "div" });
                    return false;
                }
                request.authentic_type = 2;
                request.content = that.verifyData.wx;
            }else if(flag == 'link'){
                if(that.verifyData.link == ""){
                    mui.toast("请输入商品链接", { duration: "short", type: "div" });
                    return false;
                }
                request.authentic_type = 3;
                request.content = that.verifyData.link;
            }
            that.showLoading = true;
            that.$axios.post(process.env.API_HOST+"authenticKf",request).then((res)=>{
                if(res.status == 200){
                    that.showLoading = false;
                        console.log(res)
                    if(res.data.code == 200){
                        if(request.authentic_type == 1){
                            if(res.data.data.flag == 1){
                                that.nicename = res.data.data.nickname;
                                that.verifyResult = 1;
                            }else{
                                that.verifyResult = 2;
                            }
                        }else if(request.authentic_type == 2){
                            if(res.data.data.flag == 1){
                                that.nicename = res.data.data.nickname;
                                that.verifyResult = 1;
                            }else{
                                that.verifyResult = 2;
                            }
                        }else if(request.authentic_type == 3){
                            if(res.data.data.flag == 1){
                                that.verifyResult = 4;
                            }else{
                                that.verifyResult = 3;
                            }
                        }
                    }else{
                        mui.toast(res.data.msg, { duration: "short", type: "div" });
                    }
                }
            }).catch((err)=>{
                console.log(err);
                that.attt = JSON.stringify(err);
            })
        },
        topFn(){
            $(window).scrollTop(0);
        }
    },
    mounted(){
        var that = this;
        var time = setInterval(function(){
            if(that.imgList != ''){
                that.mySwipter();
                clearInterval(time);
            }
        },500)
    }
};
</script>
<style scoped>
    ul{
        list-style:none;
    }
    /* 公共样式 */
    .vertical{
        width:5px;
        height:16px;
        display: inline-block;
        border-radius: 2px;
        vertical-align: middle;
        margin-right:10px;
        margin-top:-3px;
    }
    .cell-title{
        line-height:50px;
        padding-right:20px;
        margin-left:20px;
        font-family: MicrosoftYaHei;
        font-weight: bold;
        font-size:18px;
    }
    .title-font{
        border-bottom:1px solid #E5E5E5;
    }
    .flex-wrap{
        display:flex;
    }
    .content{
        width:1200px;
        margin:0 auto;
    }
    .clearfloat:after{
        display:block;
        clear:both;
        content:"";
    }
    .interval{
        margin-bottom:26px;
    }
    .big-list{
        margin-bottom:20px;
    }
    .small-list{
        margin-bottom:15px;
    }
    .red-color{
        color:#FF4E4E;
    }
    .gray-color{
        color:#999999;
    }
    .search-inp{
        border:2px solid #FE7649;
        border-right:none;
        border-radius: 0;
        margin:0;
        background:#ffffff;
    }
    .search-btn{
        margin-left:-2px;text-align: center;line-height: 40px;color:#FFFFFF;
        background:-webkit-linear-gradient(#FD915F,#FC534A);
        background:-o-linear-gradient(#FD915F,#FC534A);
        background:-moz-linear-gradient(#FD915F,#FC534A);
        background:linear-gradient(to right, #FD915F , #FC534A);
    }
    /* *************************** */
    .pc-wrap{
        min-width:1200px;
    }
    .title{
        background:#EEEEEE;
        font-size:14px;
        line-height:40px;
    }
    
    .con-left{
        float:left;
        color:#666666;
    }
    .con-right{
        float:right;
        color: #999999;
    }
    .con-left img:nth-of-type(1){
        width:19px;
        height:16px;
        vertical-align: middle;
    }
    .con-left img:nth-of-type(2){
        width:11px;
        height:15px;
        vertical-align: middle;
    }
    .con-left span{
        margin:0 32px 0 8px;
        vertical-align: middle;
    }

    .sele-btn span{
        vertical-align:middle;
    }
    .con-right span:nth-child(1){
        text-decoration:underline;
    }
    .sele-btn span:nth-child(1){
        color:#FE7649;
        cursor: pointer;
    }
    .sele-btn span:nth-child(2){
        margin:0 14px;
        vertical-align:top;
    }
    .sele-btn span:nth-child(3){
        cursor: pointer;
    }
    /* 搜索栏 */
    .head-search{
        padding:30px 0;
    }
    .head-tit{
        float: left;
        margin-right:94px;
    }
    .search{
        float: left;
        display: flex;
        align-items: center;
    }
    .search input{
        width:474px;
        height:40px;
    }
    .search div{
        width:119px;
        font-size:18px;
    }
    /* 内容部分 */
    .top{
        margin-top:-50px;
        position:relative;
        z-index:10;
    }
    /* 导航栏 */
    .nav-box{
        justify-content:flex-start;
        align-items: center;
        line-height:47px;
        font-size:18px;
        font-weight:550;
        color:#333333;
    }
    .nav-box li{
        width:189px;
        text-align:center;
        cursor: pointer;
    }
    .nav-box li:nth-child(1){
        background:url('../../static/img/pc_index/safe-tit.png') no-repeat;
        background-size:189px 47px;
        height:47px;
    }
    .nav-box li:nth-child(2){
        color:#FC6550;
    }
    .nav-box li:nth-last-child(2) img{
        width:28px;
        height:18px;
        vertical-align: top;
    }
    .nav-box li:nth-last-child(1){
        font-weight: 900;
    }
    /* 轮播图 */
    .carousel-wrap{
        width:1920px;
        height:524px;
        position: relative;
        left:50%;
        margin-left:-960px;
    }
    #indexSwiper{
        width:1920px;
        height:524px;
    }
    #indexSwiper img{
        width:100%;
        height:100%;
    }
    /* 内容部分 */
    .container{
        justify-content:space-between;
    }
    .container-left{
        width:784px;
    }
    .container-right{
        width:390px;
    }
    .hot-game header{
        color:#FFFFFF;
        line-height:50px;
        padding-left:20px;
        background:-webkit-linear-gradient(#FD8B5D,#FC5F4E);
        background:-o-linear-gradient(#FD8B5D,#FC5F4E);
        background:-moz-linear-gradient(#FD8B5D,#FC5F4E);
        background:linear-gradient(to right, #FD8B5D , #FC5F4E);
    }
    .hot-game header span:nth-child(1){
        background:#ffffff;
    }
    .cell{
        background:#ffffff;
    }
    /* 热门游戏 */
    .game-nav{
        font-size:14px;
        justify-content:space-between;
    }
    .game-nav li{
        min-width:20px;
        text-align:center;
    }
    .game-nav a{
        display: block;
        color:#666666;    
        /* transition: all .3s ease; */
    }
    .game-nav a:hover,.game-nav li.on a{
        border-bottom: 3px solid #FE7649;
    }
    .game-cell{
        text-align:center;
        color:#333333;
        font-size:16px;
        padding: 10px 0;
    }
    .game-item{
        width:196px;
        float:left;
        padding:20px 0;
    }
    .game-item img{
        width:87px;
        height:88px;
        margin-bottom:5px;
    }
    /* 板块 */
    .plate{
        justify-content:space-between;
        padding:26px 0;
    }
    .plate img{
        width:284px;
        height:93px;
    }
    .title-font .vertical{
        background:#FE7649;
        box-shadow:0px 3px 7px 0px rgba(254, 73, 118, 0.35);
    }
    .title-right{
        font-size:14px;
        color:#999999;
        float:right;
        font-weight: 400;
    }
    .title-right .add-img{
        width:11px;
        height:11px;
    }
    .title-right .refresh-img{
        width:19px;
        height:18px;
        margin-bottom:-4px;
        margin-right:10px;
    }
    /* 列表 */
    .list{
        padding:20px 20px 10px;
    }
    .list-strip{
        font-size:14px;
    }
    .list-strip a{
        color:#666666;
        display:block;
    }
    .list-name{
        color:#333333;
    }
    .list-des{
        display: inline-block;
        vertical-align: middle;
        max-width:400px;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap
    }
    .sign{
        color:#ffffff;
        font-size:12px;
        display: inline-block;
        line-height:18px;
        padding:0 3px;
        margin:0 6px 0 10px;
    }
    .beautiful{
        background:#FE7649;
    }
    .cph{
        background:-webkit-linear-gradient(#FFCC4B,#FEAB49);
        background:-o-linear-gradient(#FFCC4B,#FEAB49);
        background:-moz-linear-gradient(#FFCC4B,#FEAB49);
        background:linear-gradient(to right, #FFCC4B , #FEAB49);
    }
    .list-strip a:hover .list-text,.list-strip.on a .list-text{
        color:#FE7649 !important;
    }
    .list-right{
        float:right;
    }
    .list-right span:nth-child(1){
        font-size:13px;
    }
    .notice-img{
        width:22px;
        height:18px;
        margin-bottom:-3px;
        margin-right:10px;
    }
    .sidebar{
        padding:0 20px 10px ;
    }
    .sidebar-bg{
        background:url('../../static/img/pc_index/safe-bg.png') no-repeat;
        background-size:158px 139px;
        background-position:top center;
    }
    .deal-box{
        padding:28px 0 0px;
    }
    .deal-img{
        width:45px;height:51px;
        margin-right:7px;
        vertical-align: bottom;
    }
    .deal-content{
        display:inline-block;
        vertical-align: bottom;
        line-height: 18px;
    }
    .deal-content div{
        font-size:16px;
        font-family:MicrosoftYaHei;
        font-weight:bold;
        font-style:italic;
    }
    .deal-content ul{
        margin-top:5px;
        font-weight:normal;
    }
    .deal-content ul li{
        display: inline-block;
        margin-right:4px;
        background:#FE7649;
        font-size:14px;
        color:#ffffff;
        width: 16px;
        line-height:16px;
        text-align:center;
    }
    .recent .vertical{
        background:#666666;
        box-shadow:0px 1px 3px 0px #666666;
    }
    .recent{
        color:#333333;
        font-size: 16px;
    }
    /* 客服验证 */
    .verify-box{
        text-align:center;
        padding-bottom:16px;
    }
    .verify-tit{
        padding: 28px 0 19px;
        color:#333333;
        font-size: 16px;
    }
    .verify-con{
        font-size:14px;
        width:322px;
        margin: 0 auto 14px;
    }
    .verify-con .search-inp{
        border:1px solid #DCDCDC;
        border-right:0;
        width:206px;
    }
    .verify-con .search-btn{
        width:116px ;
    }
    .verify-bot{
        align-items: center;
        text-align:left;
        font-size:12px;
        color:#666666;
        padding:16px 0 0 33px;
    }
    .verify-bot img{
        width:55px;
        height:53px;
        margin-right:16px;
    }
    /* 常见问题 */
    .query-img{
        width:23px;
        height:23px;
        vertical-align: middle;
    }
    .faq-wrap{
        flex-wrap: wrap;
        list-style:disc;
        margin-left:20px;
        color:#A0A0A0;
        padding:0 0 0 20px;
    }
    .faq-strip{
        width:50%;
        margin-bottom:10px;
    }
    .safe-box{
        width:390px;
        height:212px;
    }
    /* 安全交易保障 */
    .safeguard-wrap{
        padding:40px 0;
        justify-content: space-between;
    }
    .safeguard-cell img{
        width:63px;
        height: 64px;
        vertical-align: top;
        margin-right:10px;
    }
    .safeguard-right{
        width:168px;
        display:inline-block;
        vertical-align: top;
        font-size:14px;
        padding-top:5px;
    }
    .safeguard-tit{
        line-height:30px;
        color:#333333;
    }
    .safeguard-con{
        color:#999999;
    }
    .safeguard-vertical{
        width:1px;
        height:42px;
        background:#D2D2D2;
        margin-top:10px;
    }


    ::-webkit-input-placeholder{
        font-size:14px;
        font-family:MicrosoftYaHei;
        color:#999999;
    } 
    :-moz-placeholder{
        font-size:14px;
        font-family:MicrosoftYaHei;
        color:#999999;
    }           
    ::-moz-placeholder{
        font-size:14px;
        font-family:MicrosoftYaHei;
        color:#999999;
    }          
    :-ms-input-placeholder{
        font-size:14px;
        font-family:MicrosoftYaHei;
        color:#999999;
    }      

    /* 尾部 */
    .footer{
        text-align:center;
        background: #ffffff;
        padding: 30px 0;
    }
    .system{
        color:#999999;
        font-size:14px;
    }
    .footer-link{
        width:945px;
        justify-content: space-between;
        align-items: center;
        margin:25px auto;
    }
    .footer-link img{
        width:126px;
        height: 46px;
    }
    .footer-link img:nth-last-child(1){
        width:96px;
        height:37px;
    }
    .help{
        justify-content: center;
        margin-bottom:33px;
        align-items:center;
        line-height: 20px;
    }
    .l-help{
        padding:0;
    }
    .l-help li{
        margin-bottom:5px;
    }
    .l-help li a span{
        font-size:12px;
        color:#666666;
    }
    .c-help{
        width:1px;
        height:90px;
        background:#E5E5E5;
        margin:0 25px;
    }
    .r-help{
        text-align:left;
        margin-right:-171px;
    }
    .wechat img{
        width:54px;
        height:55px;
    }
    .hot-line{
        font-size:12px;
        color:#999999;
    }
    .bold-font{
        color:#333333;
        font-weight: bold;
    }
    .intro{
        font-size:12px;color:#666666;
    }
    .filing{
        font-size:12px;color:#999999;line-height: 20px;
    }
    @media (max-width:1440px) {
        .fixed-right{
            right:0 !important;
            margin-right:0!important;
        }
    }
    @media (min-width:1440px) {
        .fixed-right{
            right:50% ;
        }
    }
    .fixed-right{
        position:fixed;
        margin-right: -707px;
        top:50%;
        z-index:10;
        margin-top:-180px;
        background:#E5E5E5;
    }
    .fixed-right li{
        width:60px;
        font-size:12px;
        text-align: center;
        margin-bottom:2px;
    }
    .fixed-right li:nth-last-child(1){
        margin-bottom:0;
    }
    .fixed-cell{
        line-height: 60px;
        background: #ffffff;
    }
    .fixed-sell{
        padding:10px 0 5px;
        height: 60px;
        color:#ffffff;
        background:-webkit-linear-gradient(#FD915F,#FC534A);
        background:-o-linear-gradient(#FD915F,#FC534A);
        background:-moz-linear-gradient(#FD915F,#FC534A);
        background:linear-gradient(to right, #FD915F , #FC534A);
    }
    .fixed-sell img{
        width:28px;
        height:21px;
    }
    .fixed-sell div{
        line-height: 10px;
    }
    .fixed-top{
        background: #ffffff;
    }
    .fixed-top a{
        color:#666666;
        display: block;
        padding:10px 0;
        max-height: 60px;

    }
    .fixed-top div{
        line-height: 10px;
    }
    .fixed-top img{
        width:21px;
        height:13px;
    }
    .showload{
        z-index:9999;
    }
</style>
