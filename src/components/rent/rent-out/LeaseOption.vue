<template>
    <div class="wrap">
        <Header v-bind:head_data="head_data"></Header>
        <div class="sellOpt-top">
            <div class="game-sign">
                <img :src="sellOptData.gameLog" alt="">
                <div v-text="sellOptData.gameName"></div>
            </div>
        </div>
        <div class="sellOpt-content">
            <div class="opt-cell">
                <span class="left-text">出租方式</span>
                <div class="right-opt" @click="showPop('way')">
                    <span v-text="sellOptData.rent_way"></span>
                    <img src="../../../../static/img/order/next.png" alt="">
                </div>
            </div>
            <!-- <div class="opt-cell">
                <span class="left-text">商品类型</span>
                <div class="right-opt" @click="showPop('merchand')">
                    <span v-text="sellOptData.merchand"></span>
                    <img src="../../../../static/img/order/next.png" alt="">
                </div>
            </div> -->
            <div class="opt-cell">
                <span class="left-text">客户端</span>
                <div class="right-opt" @click="showPop('mobile')">
                    <span v-text="sellOptData.mobile"></span>
                    <img src="../../../../static/img/order/next.png" alt="">
                </div>
            </div>
            <div class="opt-cell">
                <span class="left-text">服务器</span>
                <div class="right-opt" @click="showPop('server')">
                    <span v-text="sellOptData.server"></span>
                    <img src="../../../../static/img/order/next.png" alt="">
                </div>
            </div>
        </div>
        <div class="nextBtn" @click="goNext">下一步</div>
        <!-- 出租方式 -->
        <div v-show="showMenu_way" class="type-mu">
            <div class="pop-view-tit option-gray">
                请选择商品类型
            </div>
            <ul>
                <!-- 商品类型 -->
                <li class="option-black" v-for="item in optionData.rent_method" @click="seleRentWay(item.value)" v-text="item.name"></li>
            </ul>
            <div class="pop-view-con"></div>
            <div class="pop-view-bot" @click="hiddenFn">取消</div>
        </div>
        <!-- 弹出框 -->
        <!-- 商品类型 -->
        <div v-show="showMenu_type" class="type-mu">
            <div class="pop-view-tit option-gray">
                请选择商品类型
            </div>
            <ul>
                <!-- 商品类型 -->
                <li class="option-black" v-for="item in optionData.merchand" @click="seleMerchand(item.value)" v-text="item.name"></li>
            </ul>
            <div class="pop-view-con"></div>
            <div class="pop-view-bot" @click="hiddenFn">取消</div>
        </div>
        <!-- 弹出框 -->
        <!-- 手机系统 -->
        <div v-show="showMenu_mobile" class="type-mu" :class="go_up?'go-top':''">
            <div class="pop-view-tit option-gray">
                <div>请选择客户端</div>
                <div class="search">
                    <img src="../../../../static/img/search_ico.png" alt="">
                    <input type="search" placeholder="搜索"  v-model="mobile_content" @keyup.13="show('m')" ref="input1" @blur="out('m')" @focus="focusFn">
                </div>
            </div>
            <!-- 手机系统 -->
            <ul>
                <li class="option-black" v-for="item in optionData.mobile" @click="seleMobile(item.operation_id)" v-text="item.platform_name"></li>
            </ul>
            <div class="pop-view-con"></div>
            <div class="pop-view-bot" @click="hiddenFn">取消</div>
        </div>
        <!-- 弹出框 -->
        <!-- 服务器 -->
        <div v-show="showMenu_area" class="type-mu" :class="go_up?'go-top':''">
            <!-- 可选择菜单 -->
            <div class="screen-box server-type-box">
                <!-- 平台 -->
                <div class="server-operation-box" v-if="showOpteration">
                    <div class="operation-type-strip" v-for="item in optionData.operation_info" :class="item.ischeck?'red-border dominant-colo':'black-border'" v-text="item.area_name" @click="seleOperation(item.area_id)"></div>
                </div>
                <!-- 区服 -->
                <div class="server-area-box" v-if="showOpteration">
                    <div class="area-type-search">
                        <form action="javascript:return true;">
                            <input type="search" placeholder="搜索" v-model="area_content" @keyup.13="show('a')" ref="input1" @blur="out('a')"  @focus="focusFn">
                            <img class="search-area-ico" src="../../../../static/img/search_ico.png" alt="">
                        </form>
                    </div>
                    <div class="area-type-content">
                        <div class="area-type-strip" v-for="item in optionData.area_info" :class="item.ischeck?'pitch-on':'black-bg'" v-text="item.server_name" @click="seleArea(item.server_id,'area')"></div>
                    </div>
                </div>
                <!-- 没有区的时候只显示服务器的 -->
                <div class="server-area-box" v-if="!showOpteration">
                    <div class="area-type-search">
                        <input type="search" placeholder="搜索" v-model="area_content" @keyup.13="show('s')" ref="input1" @blur="out('s')"  @focus="focusFn">
                        <img class="search-area-ico" src="../../../../static/img/search_ico.png" alt="">
                    </div>
                    <div class="area-type-content">
                        <div class="area-type-strip" v-for="item in optionData.server_info" :class="item.ischeck?'pitch-on':'black-bg'" v-text="item.area_name" @click="seleArea(item.area_id,'server')"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="share" v-show="showMenu_way || showMenu_type || showMenu_mobile || showMenu_area" @click="hiddenFn"></div>  
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
export default {
    name: "LeaseOption",
    components: {
        Header
    },
    metaInfo:{
        title:'手游号出租_看个号',
        meta:[{
            name:'keywords',
            content:'手游号,梦幻号出租寄租,大话号出租寄租'
        },{
            name:'description',
            content:'看个号(https://www.kangehao.com)是国内专业的手游交易平台，安全可靠专注手游的交易网站，提供手游账号交易、买号卖号交易的手游交易平台！'
        }]
    },
    data() {
        return {
            head_data: {
                show_type: 2,
                right_icon: 2,
                tit_text: '我要出租'
            },
            showMenu_way:false,
            showMenu_type:false,
            showMenu_mobile:false,
            showMenu_area:false,
            mobile_content:'',
            area_content:'',
            showOpteration: true, //显示平台选择
            sellOptData: {
                gameLog: "",
                gameName: "",
                rent_way:"未选择",
                merchand: "未选择",
                mobile: "未选择",
                server: "未选择",
                area:'未选择'
            },
            oldData:{},
            optionData: {
                rent_method:[],
                merchand: [],
                mobile: [],
                // 平台
                operation_info: [],
                // 服务器
                area_info: [],
                area_all: [],
                server_info: [],
            },
            upData:{
                rent_id:'',//出租方式
                category_id: "", //游戏分类id
                deal_type:'',//商品类型
                operation_id:'',//系统类型
                area_id:'',
                server_id:'',
            },
            go_up:false,
        };
    },
    methods: {
        focusFn(){
            this.go_up = true;//让弹出框上来
        },
        // 隐藏键盘
        show(flag){
            this.$refs.input1.blur();
            this.go_up = false;
        },
        out(flag){
            // console.log(flag);
            this.go_up = false;//隐藏键盘让弹出框下去
            var that = this;
            if(flag == 'm'){
                var text = that.mobile_content;
                if(text == ""){
                    that.optionData.mobile = JSON.parse(JSON.stringify(that.oldData.mobile));
                }else{
                    var mobile = that.oldData.mobile;
                    var obj = [];
                    for(var i in mobile){
                        if(mobile[i].platform_name.indexOf(text) != -1){
                            obj.push(mobile[i]);
                        }
                    }
                    if(obj != []){
                        that.optionData.mobile = obj;
                    }
                }
            }else if(flag == 's'){//没有服务器
                var text = that.area_content;
                if(text == ""){
                    that.optionData.server_info = JSON.parse(JSON.stringify(that.oldData.server_info));
                }else{
                    var server_info = that.oldData.server_info;
                    var obj = [];
                    for(var i in server_info){
                        if(server_info[i].area_name.indexOf(text) != -1){
                            obj.push(server_info[i]);
                        }
                    }
                    if(obj != []){
                        that.optionData.server_info = obj;
                    }
                    // console.log(server_info)
                }
            }else if(flag == 'a'){
                var text = that.area_content;
                if(text == ""){
                    that.optionData.area_info = JSON.parse(JSON.stringify(that.oldData.area_info));
                }else{
                    var area_info = that.oldData.area_info;
                    var obj = [];
                    for(var i in area_info){
                        if(area_info[i].server_name.indexOf(text) != -1){
                            obj.push(area_info[i]);
                        }
                    }
                    if(obj != []){
                        that.optionData.area_info = obj;
                    }
                    // console.log(server_info)
                }
            }
        },
        // 显示那个下拉菜单
        showPop(flag) {
            var that = this;
            if(flag == 'way'){
                that.showMenu_way = true;
            }else if(flag == "merchand"){
                that.showMenu_type = true;
            }else if (flag == "server") {
                if (that.sellOptData.mobile == "未选择") {
                    //还未请求平台数据
                    mui.alert("请先选择操作系统", "提示", "确认", "", "");
                    return false;
                } else if(that.sellOptData.server == '未选择' && that.showOpteration){
                    //请求完 默认选择第一个
                    that.sellOptData.server = that.optionData.operation_info[0].area_name;
                    that.sellOptData.area = that.optionData.operation_info[0].area_name;//存起来好拼接
                }
                that.showMenu_area = true;
            }else if(flag == 'mobile'){
                that.showMenu_mobile = true;
            }
        },
        // 选择出租方式-------------------------------------------------------------
        seleRentWay(ind){
            var that = this;
            that.showMenu_way = false;
            var merchand = that.optionData.rent_method;
            // console.log(merchand);
            for (var i in merchand) {
                if (ind == merchand[i].value) {
                    merchand[i].ischeck = true;
                    that.upData.rent_id = merchand[i].value;
                    that.sellOptData.rent_way = merchand[i].name;
                    that.showMenu_mobile = true;
                    continue;
                }
                merchand[i].ischeck = false;
            }
        },
        // 选择商品类型
        seleMerchand(ind) {
            var that = this;
            that.showMenu_type = false;
            var merchand = that.optionData.merchand;
            // console.log(merchand);
            for (var i in merchand) {
                if (ind == merchand[i].value) {
                    merchand[i].ischeck = true;
                    that.upData.deal_type = merchand[i].value;
                    that.sellOptData.merchand = merchand[i].name;
                    continue;
                }
                merchand[i].ischeck = false;
            }
        },
        // 选择手机系统
        seleMobile(ind) {
            var that = this;
            that.showMenu_mobile = false;
            var mobile = that.optionData.mobile;
            // console.log(mobile);
            for (var i in mobile) {
                if (ind == mobile[i].operation_id) {
                    mobile[i].ischeck = true;
                    that.upData.operation_id = mobile[i].operation_id;
                    that.sellOptData.mobile = mobile[i].platform_name;
                    that.showMenu_area = true;
                    continue;
                }
                mobile[i].ischeck = false;
            }
            that.sellOptData.server = "未选择";
            that.upData.area_id = '',
            that.upData.server_id = '',
            that.getOperation(ind);
        },
        // 选择服务器--平台
        seleOperation(ind) {
            var that = this;
            that.area_content = '';
            var operationAll = that.optionData.operation_info;
            for (var i in operationAll) {
                if (ind == operationAll[i].area_id) {
                    operationAll[i].ischeck = true;
                    that.upData.area_id = operationAll[i].area_id,
                    that.sellOptData.server = operationAll[i].area_name;
                    that.sellOptData.area = operationAll[i].area_name;
                    continue;
                }
                operationAll[i].ischeck = false;
            }
            that.upData.server_id = '';
            that.getArea(ind);
        },
        // 选择服务器--区服
        seleArea(ind, opt) {
            var that = this;
            that.showMenu_area = false;
            if (opt == "area") {
                var areaAll = that.optionData.area_info;
                for (var i in areaAll) {
                    if (ind == areaAll[i].server_id) {
                        areaAll[i].ischeck = true;
                        that.upData.server_id =  areaAll[i].server_id;
                        if(that.sellOptData.area == "未选择"){
                            that.sellOptData.area = that.optionData.operation_info[0].area_name;//存起来好拼接
                        }
                        that.sellOptData.server = that.sellOptData.area + ">" + areaAll[i].server_name;
                        continue;
                    }
                    areaAll[i].ischeck = false;
                }
            } else if (opt == "server") {
                var areaAll = that.optionData.server_info;
                for (var i in areaAll) {
                    if (ind == areaAll[i].area_id) {
                        areaAll[i].ischeck = true;
                        that.upData.area_id = areaAll[i].area_id;
                        that.sellOptData.server = areaAll[i].area_name;
                        continue;
                    }
                    areaAll[i].ischeck = false;
                }
            }
        },
        hiddenFn(){
            this.showMenu_way = false;
            this.showMenu_type = false;
            this.showMenu_mobile = false;
            this.showMenu_area = false;
        },
        // 请求平台
        getOperation(operation_id) {
            var that = this;
            that.$axios
                .post(process.env.API_HOST+"areaServer", {
                    operation_id: operation_id
                })
                .then(function(res) {
                    if (res.status == 200) {
                        if (res.data.code == 200) {
                            // console.log(res.data.data);
                            if (res.data.data.server_info == "") {
                                that.showOpteration = false;
                                that.optionData.server_info =
                                    res.data.data.area_info;
                                for (var i in that.optionData.server_info) {
                                    that.optionData.server_info[
                                        i
                                    ].ischeck = false;
                                }
                                that.oldData.server_info = JSON.parse(JSON.stringify(that.optionData.server_info));
                            } else {
                                that.showOpteration = true;
                                for (var i in res.data.data.area_info) {
                                    if (i == 0) {
                                        res.data.data.area_info[i].ischeck = true;
                                        that.upData.area_id = res.data.data.area_info[0].area_id;
                                        continue;
                                    }
                                    res.data.data.area_info[i].ischeck = false;
                                }
                                for (var i in res.data.data.server_info) {
                                    res.data.data.server_info[i].ischeck = false;
                                }
                                that.optionData.operation_info = res.data.data.area_info;
                                that.optionData.area_all = res.data.data.server_info;
                                
                                that.oldData.operation_info = JSON.parse(JSON.stringify(that.optionData.operation_info));
                                that.getArea(that.optionData.operation_info[0].area_id);
                            }
                        }
                    }
                })
                .catch(function(err) {
                    console.log(err);
                });
        },
        // // 获取服务器
        getArea(area_id) {
            var that = this;
            var all = that.optionData.area_all;
            var info = that.optionData.area_info = [];
            for (var i in all) {
                if (area_id == all[i].area_id) {
                    all[i].ischeck = false;
                    info.push(all[i]);
                }
            }
            that.oldData.area_info = JSON.parse(JSON.stringify(that.optionData.area_info));
        },
        goNext() {
            var that = this;
            var upData = that.upData;
            if(upData.category_id == ''){
                mui.alert('请重新选择游戏','提示','确认',function(){
                    that.$router.go(-1);
                },'div')
            }else if(upData.rent_id == ''){
                mui.alert('请选择出租方式','提示','确认','','div');
                return false;
            }
            // else if(upData.deal_type == ''){
            //     mui.alert('请选择商品类型','提示','确认','','div');
            //     return false;
            // }
            else if(upData.operation_id == ''){
                mui.alert('请选择操作系统','提示','确认','','div');
                return false;
            }else if(upData.area_id == '' && that.showOpteration){
                mui.alert('请选择大区','提示','确认','','div');
                return false;
            }else if(upData.server_id == '' && that.showOpteration){
                mui.alert('请选择服务器','提示','确认','','div');
                return false;
            }else if(upData.area_id == '' && !that.showOpteration){
                mui.alert('请选择区服','提示','确认','','div');
                return false;
            }else{
                upData = JSON.stringify(upData);
                that.$router.push({name:'LeaseInfo',params:{flag:1,upData:upData}});
            }
        },
        getConfig(opt){
            var that = this;
            that.$axios
                .post(process.env.API_HOST+"categoryInfo")
                .then(function(res) {
                    // console.log(res);
                    if (res.status == 200) {
                        if (res.data.code == 200) {
                            var resData = res.data.data;
                            for(var i in resData){
                                if(opt == resData[i].category_id){
                                    that.sellOptData.gameLog = resData[i].game_logo;
                                    that.sellOptData.gameName = resData[i].game_name;
                                }
                            }
                            
                        }
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        getSysConfig(opt){
            var that =this;
             // 请求商品类型 和 手机系统
            that.$axios
                .post(process.env.API_HOST+"sysConfig", {
                    category_id: opt
                })
                .then(function(res) {
                    // console.log(res);
                    if (res.status == 200) {
                        if (res.data.code == 200) {
                            that.optionData.merchand = res.data.data.deal_type;
                            that.optionData.mobile = res.data.data.platform;
                            that.optionData.rent_method = res.data.data.rent_method;
                            that.oldData = JSON.parse(JSON.stringify(that.optionData));
                        }
                    }
                })
                .catch(function(err) {
                    console.log(err);
                });
        }
    },
    mounted() {
        var that = this;
        var opt = that.$route.params.opt;
        if(opt == undefined || opt == ''){
            that.$router.go(-1); 
        }else{
            that.upData.category_id = opt;
            that.getConfig(opt);
            that.getSysConfig(opt);
        }
    }
};
</script>
<style scoped>
.sellOpt-top {
    height: 4.5rem;
    background-image: url(../../../../static/image/header/head-sell.png);
    background-repeat: no-repeat;
    background-size: 100% 4.5rem;
    padding-top: .5rem;
    margin-bottom: .25rem;
}
.game-sign {
    text-align: center;
    /* margin-top: 0.5rem; */
    font-size: 0.28rem;
}
.game-sign img {
    width: 1.11rem;
    height: 1.11rem;
    margin-bottom: 0.1rem;
}
.sellOpt-content {
    padding: 0 0.2rem;
}
.opt-cell {
    line-height: 0.9rem;
    background: #ffffff;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    margin-bottom: 0.2rem;
    padding: 0 0.2rem;
}
.left-text {
    font-size: 0.26rem;
    color: #666666;
}
.right-opt {
    width: 5rem;
    text-align: right;
    float: right;
    font-size: 0.24rem;
    color: #999999;
}
.right-opt img {
    width: 0.13rem;
    height: 0.24rem;
    vertical-align: middle;
    margin-left: 0.2rem;
    margin-top: -0.05rem;
}
.right-opt span {
    vertical-align: middle;
}



/* ====服务器==== */
.server-type-box {
    background: #f3f3f3;
    height: 4.5rem;
    display: flex;
    justify-content: flex-start;
}
.server-operation-box {
    width: 23.7%;
    text-align: center;
    display: inline-block;
    vertical-align: top;
    overflow-y: auto;
}
.operation-type-strip {
    font-size: 0.26rem;
    color: #666666;
    line-height: 0.7rem;
}
.server-area-box {
    width: 100%;
    display: inline-block;
    background: #ffffff;
    vertical-align: top;
    padding-top: 0.3rem;
    height: 100%;
}
.red-border {
    /* color: #fe7649; */
    background-image: url(../../../../static/image/vertical.png);
    background-repeat: no-repeat;
    background-size: 0.16rem 0.4rem;
    background-position: 0 70%;
}
.black-border {
    color: #666666;
}
/* 区服搜索 */
.area-type-search {
    width: 4.95rem;
    height: 0.6rem;
    position: relative;
    text-align: center;
    margin: 0 auto 0.3rem;
}
.area-type-search input {
    width: 4.95rem;
    height: 0.6rem;
    font-size: 0.24rem;
}
.search-area-ico {
    width: 0.19rem;
    height: 0.19rem;
    position: absolute;
    left: 0.1rem;
    top: 0.2rem;
}
/* 区服 */
.area-type-content {
    color: #666666;
    height: 3.2rem;
    font-size: 0.24rem;
    padding-left: 0.3rem;
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
}
.area-type-strip {
    min-width: 1.3rem;
    text-align: center;
    display: inline-block;
    padding: 0 0.15rem;
    line-height: 0.6rem;
    height: 0.6rem;
    margin: 0 0.2rem 0.3rem 0;
    -webkit-border-radius: 0.06rem;
    -moz-border-radius: 0.06rem;
    border-radius: 0.06rem;
}
.red-bg {
    color: #FFA303;
    border: 1px solid #FFA303;
    background-color: #ffdbcf;
    background-image: url(../../../../static/image/false_tag.png);
    background-repeat: no-repeat;
    background-size: 0.3rem 0.25rem;
    background-position: right bottom;
}
.black-bg {
    border: 1px solid #d2d2d2;
    background: #ffffff;
}

.pop-view {
    margin-top: 10px;
    background: #ffffff;
    text-align: center;
    list-style: none;
}
.pop-view li {
    line-height: 0.9rem;
    border-bottom: 1px solid #e5e5e5;
}
.pop-view a {
    padding: 0;
}
.pop-view-mobil {
    height: 4rem;
    overflow-y: scroll ;
    position:fixed;
    bottom:0;
    left:0;
    right:0;
}

.search {
    width: 4.7rem;
    height: 0.65rem;
    position: relative;
    margin: 0 auto 0.3rem;
}
.search img {
    width: 0.25rem;
    height: 0.22rem;
    position: absolute;
    left: 0.2rem;
    top: calc(50% - 0.13rem);
    z-index: 2;
}
.search input {
    padding: 0 .6rem;
    height: 0.6rem;
    margin: 0;
    line-height: 0.6rem;
    font-size: 0.24rem;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
}

/* ==========placeholder========= */
input{
    border:1px solid #D6D6D6;
    background:#ffffff;
}
::-webkit-input-placeholder {
    color: #999999;
    font-size: 0.24rem;
}
:-moz-placeholder {
    color: #999999;
    font-size: 0.24rem;
}
::-moz-placeholder {
    color: #999999;
    font-size: 0.24rem;
}
:-ms-input-placeholder {
    color: #999999;
    font-size: 0.24rem;
}



.type-mu{
    min-height:2rem;
    color: #333333;
    font-size: 0.28rem;
    background:#FFFFFF;
    text-align:center;
    position:fixed;
    bottom:0;
    left:0;
    right:0;
    z-index:50;
    max-width: 640px;
    margin:0 auto;
    z-index:10;
}
.pop-view-tit,.pop-view-bot{
    line-height: .9rem;
}
.pop-view-con{
    height:.2rem;
    background:rgba(0,0,0,0.3);
}
.type-mu ul{
    border-top:1px solid #e5e5e5;
    border-bottom:1px solid #e5e5e5;
    max-height:4rem;
    list-style: none;
    overflow-y:scroll;
}
/* 弹出框 */
.option-gray {
    color: #666666;
    font-size: 0.28rem;
}
.option-black {
    font-weight: 100;
    line-height:.9rem;
    border-bottom:1px solid #e5e5e5;
}


/* 遮罩 */
.share{
    background:rgba(0, 0, 0, .3);
    position:fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    z-index:8;
}


.go-top{
    /* bottom:1.5rem; */
}
</style>
