<template>
    <div class="wrap">
        <Header v-bind:head_data="head_data"></Header>
        <!-- 商品标题 -->
        <div class="goods-details-title">
            <div class="goods-datails-title-top">
                <div class="title-boutique" v-if="detailData.is_recommend == 1">精</div>
                <div class="title-ico deal-ico" v-if="detailData.rent_method == 1 ||detailData.rent_method == 3 ">成品号</div>
                <div class="title-ico rent-ico" v-if="detailData.rent_method == 2 ||detailData.rent_method == 3">租号</div>
                <div class="title-view-history">
                    <img src="../../../../static/img/goods-details/view_count_ico.png" alt="">
                    <span>浏览次数</span>
                    <span v-text="detailData.click_count"></span>
                </div>
            </div>
            <div class="goods-datails-title-des" v-text="detailData.goods_title"></div>
            <div class="original-price" v-if="detailData.goods_price != 0"><span class="original-text">原价</span><span>￥</span><span v-text="detailData.goods_price"></span></div>
            <div class="goods-strip-bottom">
                <div>
                    <img src="../../../../static/img/rent/rent-ico.png" alt="">
                    <span>租金</span>
                    <span class="red-color">￥</span><span class="goods_price" v-text="detailData.day_rent"></span>
                    <span>/日</span>
                </div>
                <div>
                    <img src="../../../../static/img/rent/pledge-ico.png" alt="">
                    <span>押金</span>
                    <span>￥</span><span v-text="detailData.cash"></span>
                </div>
                <div>
                    <img src="../../../../static/img/rent/pledge-ico.png" alt="">
                    <span>最短租期</span>
                    <span v-text="detailData.least_lease"></span><span>天</span>
                </div>
            </div>
            <div class="upTime">
                <span>发布时间：</span>
                <span v-text="detailData.create_time"></span>
            </div>
        </div>
        <!-- 卖家信息 -->
        <div class="seller-info" v-if="false">
            <img class="user-head-log" :src="detailData.head_img" alt="">
            <div class="seller-info-right">
                <div class="seller-right-top">
                    <div class="seller-name" v-text="detailData.username"></div>
                    <!-- 暂时保留 -->
                    <div class="seller-auth" v-if="false">
                        <img src="../../../../static/img/goods-details/Authentication_ico.png" alt="">
                        <span>已认证</span>
                    </div>
                    <div class="seller-gold" v-if="false">
                        <img src="../../../../static/img/goods-details/goldSellers_ico.png" alt="">
                        <span>金牌卖家</span>
                    </div>
                </div>
                <div class="seller-right-bottom" v-if="false">
                    <span>信誉积分</span>
                    <span v-text="goodsDetailsData.sellerInfo.credit"></span>
                </div>
            </div>
        </div>
        <!-- 服务保障 -->
        <div class="safe-info detail-info" v-if="detailData.is_safe == 1 || detailData.is_stage == 1 || detailData.is_check == 1 || detailData.is_compact == 1">
            <div class="info-left">服务保障</div>
            <div class="info-right safe-info-right">
                <img v-if="detailData.is_safe == 1" src="../../../../static/img/goodscreen/safe_ico.png" alt="">
                <img v-if="detailData.is_stage == 1" src="../../../../static/img/goodscreen/stages_ico.png" alt="">
                <img v-if="detailData.is_check == 1" src="../../../../static/img/goodscreen/verify.png" alt="">
                <img v-if="detailData.is_compact == 1" src="../../../../static/img/goodscreen/contract_ico.png" alt="">
            </div>
        </div>
        <!-- 账号绑定 -->
        <div class="accountBind-info detail-info">
            <div class="info-left">账号绑定</div>
            <div class="info-right">
                <div class="user-bind">
                    <img :src="accountBind.userBind?'../../../../static/img/goods-details/nobind_ico.png':'../../../../static/img/goods-details/okbind_ico.png'" alt="">
                    <span>绑定身份证</span>
                </div>
                <div class="user-bind">
                    <img :src="accountBind.phoneBind?'../../../../static/img/goods-details/nobind_ico.png':'../../../../static/img/goods-details/okbind_ico.png'" alt="">
                    <span>绑定手机</span>
                </div>
                <div class="user-bind">
                    <img :src="accountBind.emailBind?'../../../../static/img/goods-details/nobind_ico.png':'../../../../static/img/goods-details/okbind_ico.png'" alt="">
                    <span>绑定邮箱</span>
                </div>
            </div>
        </div>
        <!-- 商品描述 -->
        <div class="goods-details-info">
            <div class="goods-info-content">
                <div class="goods-info-strip">
                    <div class="text-left">基本信息</div>
                    <div class="text-right" v-if="detailData.server_name != null" v-text="detailData.platform_name + '>' +　detailData.area_name+'>'+detailData.server_name"></div>
                    <div class="text-right" v-else v-text="detailData.platform_name + '>' +　detailData.area_name"></div>
                </div>
                <div class="goods-info-strip">
                    <div class="text-left">等级</div>
                    <div class="text-right"><span v-text="detailData.role_level"></span>级</div>
                </div>
                <div class="goods-info-strip">
                    <div class="text-left">门派</div>
                    <div class="text-right" v-text="detailData.faction_name"></div>
                </div>
                <div class="goods-info-strip">
                    <div class="text-left">商品描述</div>
                    <div class="text-right" v-text="detailData.goods_description"></div>
                </div>
            </div>
        </div>
        <!-- 视频看号 -->
        <div class="vedio-info">
            <div class="vedio-title" v-if="detailData.video_url != null">
                <div class="vedio-title-top">
                    <span class="vertical"></span>
                    <span>视频看号</span>
                </div>
                <div class="red-color">
                    为保证您的资产安全受平台保护，请勿联系视频中的个人联系方式
                </div>
            </div>
            <!-- iframe -->
            <div class="vedio-content" v-if="detailData.video_url != null">视频</div>

            <div class="vidio-bottom">
                <div :class="safeOrflow.flow?'red-border':'black-border'" @click="cliflow('flow')">购买流程</div>
                <div :class="safeOrflow.safe?'red-border':'black-border'" @click="cliflow('safe')">安全服务</div>
            </div>
            <div class="showBox">
                <div class="showBox-left" v-show="safeOrflow.safe">
                    <div class="detail-user-opera">
                        <div class="cell user-contact">
                            <img src="../../../../static/img/goods-details/contact_ico.png" alt="">
                            <div>全程客服协助</div>
                        </div>
                        <div class="cell user-safety">
                            <img src="../../../../static/img/goods-details/safety_ico.png" alt="">
                            <div>付款安全保障</div>
                        </div>
                        <div class="cell user-Authentication">
                            <img src="../../../../static/img/goods-details/user_bind_ico.png" alt="">
                            <div>卖家身份认证</div>
                        </div>
                        <div class="cell user-settlement">
                            <img src="../../../../static/img/goods-details/settlement_ico.png" alt="">
                            <div>保险理赔</div>
                        </div>
                    </div>
                    <div class="go-verify" @click="goVerify">前往验证客服</div>
                    <!-- <div class="more-info">查看更多详情</div> -->
                </div>
                <div class="showBox-right" v-show="safeOrflow.flow">
                    <div class="flow-left">
                        <img src="../../../../static/img/goods-details/flow.png" alt="">
                    </div>
                    <div class="flow-right">
                        <div class="flow-title">下单支付</div>
                        <div class="flow-content">支付成功，进入与 [联系发货客服] 聊天界面</div>
                        <div class="flow-title">等待发货</div>
                        <div class="flow-content">客服登录卖家账号，为买家发货。</div>
                        <div class="flow-content">部分游戏需要买家同时在线才能发货，</div>
                        <div class="flow-content">请保持在线并及时与发货客服沟通。</div>
                        <div class="flow-content red-color">重要：道具交易不使用QQ沟通，谨防骗子！</div>
                        <div class="flow-title">买家收货</div>
                        <div class="flow-content">在游戏内取货</div>
                        <div class="flow-title">确认收货</div>
                        <div class="flow-content">买家确认收货</div>
                        <div class="flow-title">交易成功</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 猜你喜欢 -->
        <div class="guess" v-if="recommendData != ''">
            <img src="../../../../static/img/goods-details/left_solid.png" alt="">
            <span>猜你喜欢</span><img src="../../../../static/img/goods-details/right_solid.png" alt="">
        </div>
        <!-- 商品列表 -->
        <div v-if="recommendData != ''" class="recommend-list">
            <div class="goods-strip" v-for="item in recommendData" @click="goDetail(item.goods_id)">
                <div class="goods-strip-top">
                    <div class="goods-strip-title">
                        <div class="title-ico deal-ico" v-if="item.rent_method == 1 || item.rent_method == 3">成品号</div>
                        <div class="title-ico rent-ico" v-if="item.rent_method == 2 || item.rent_method == 3">租号</div>
                        <div class="account-type" v-if="item.client_id == 1">安卓</div>
                        <div class="account-type" v-else-if="item.client_id == 2">苹果</div>
                        <div class="account-type" v-else-if="item.client_id == 3">安卓混服</div>
                        <div class="area" v-if="item.server_name != null" v-text="item.area_name +'>' + item.server_name"></div>
                        <div class="area" v-else v-text="item.area_name"></div>
                    </div>
                    <div class="goods-des" v-text="item.goods_title"></div>
                    <div class="goods-price" v-if="item.rent_method == 1">￥
                        <span v-text="item.goods_price"></span>
                    </div>
                    <div v-if="item.rent_method == 2 || item.rent_method == 3">
                        <div class="original-price">
                            <span class="original-text">原价</span><span>￥</span><span v-text="item.goods_price"></span>
                        </div>
                        <div class="goods-strip-bottom">
                            <div>
                                <img src="../../../../static/img/rent/rent-ico.png" alt="">
                                <span>租金</span>
                                <span class="red-color">￥</span><span class="goods_price" v-text="item.day_rent"></span>
                                <span>/日</span>
                            </div>
                            <div>
                                <img src="../../../../static/img/rent/pledge-ico.png" alt="">
                                <span>押金</span>
                                <span>￥</span><span v-text="item.cash"></span>
                            </div>
                            <div>
                                <img src="../../../../static/img/rent/pledge-ico.png" alt="">
                                <span>最短租期</span>
                                <span v-text="item.least_lease"></span><span>天</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="hint-bottom" v-if="item.rent_method == 2 || item.rent_method == 3">
                    账号很便宜，约定帮完每日任务和xx活动。
                </div>
            </div>
            <div class="more-info" v-if="false">查看更多</div>
        </div>
        <!-- div -->
        <div class="goods-details-bottom">
            <div class="share goods-details-bottom-left" @click="showShareFn">
                <img src="../../../../static/img/goods-details/share_ico.png" alt="">
                <div>分享</div>
            </div>
            <div class="collect goods-details-bottom-left" @click="collect()">
                <img :src="detailData.is_collect == 1?'./static/img/goods-details/ok_collect_ico.png':'./static/img/goods-details/no_collect_ico.png'" alt="">
                <div>收藏</div>
            </div>
            <div class="goods-details-bottom-right" v-if="detailData.rent_method == 1 || detailData.rent_method == 2"></div>
            <div class="rent-btn goods-details-bottom-right" @click="rentFn" v-if="detailData.rent_method == 2 || detailData.rent_method == 3">立即租号</div>
            <div class="buy goods-details-bottom-right" @click="buyFn" v-if="detailData.rent_method == 1 || detailData.rent_method == 3">立即购买</div>
        </div>
        <!-- 议价弹框 -->
        <div class="hoodle" v-show="showShade">
            <img src="../../../../static/img/my-center/record/bargain_tit.png" alt="">
            <div class="hoodle-con">
                <input type="number" placeholder="请输入您的出价" v-model="bargain_price">
            </div>
            <div class="hoodle-btn">
                <div class="okBtn" @click="goBargain('ok')">确认</div>
                <div class="cancelBtn" @click="goBargain('no')">取消</div>
            </div>
        </div>
        <!-- 分享弹出框 -->
        <div id="sheet-share" class="mui-popover mui-popover-bottom mui-popover-action">
            <!-- 可选择菜单 -->
            <div class="pop-view">
                <div class="pop-hint">
                    分享到其他平台提高浏览量，更快速的卖出商品
                </div>
                <div class="pop-box" @click="shareFn('wechatFriend')">
                    <img src="../../../../static/img/share/wechat.png" alt="">
                    <div>微信好友</div>
                </div>
                <div class="pop-box" @click="shareFn('wechatTimeline')">
                    <img src="../../../../static/img/share/pyq.png" alt="">
                    <div>朋友圈</div>
                </div>
                <div class="pop-box" @click="copyFn()" :data-clipboard-text="url" id="copy">
                    <img src="../../../../static/img/share/copy_link.png" alt="">
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
        <div class="shade" v-show="showShade"></div>
        <NoData v-if="showNoData"></NoData>
        <Loading v-if="showLoading"></Loading>

    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
import NoData from "@/components/multi/NoData";
import Loading from "@/components/multi/Loading";
import NativeShare from "nativeshare"; //分享
export default {
    inject: ["reload"],
    name: "RentDetails",
    data() {
        return {
            head_data:{
                show_type:2,
                tit_text:"商品详情",
                right_icon:2,
            },
            nativeShare: null, //分享
            url: null, //当前页的url

            showLoading: false,
            goods_id: null,
            showNoData: false,
            showShade: false,
            bargain_price: "",
            detailData: {},
            recommendData: {},
            // 显示安全服务是购买流程
            safeOrflow: {
                safe: false,
                flow: true
            },
            // 账号绑定
            accountBind: {
                userBind: true,
                phoneBind: true,
                emailBind: true
            }
        };
    },
    components: {
        Header,
        Loading
    },
    methods: {
        // 查看安全服务还是购买流程
        cliflow(flag) {
            if (flag == "safe") {
                this.safeOrflow.safe = true;
                this.safeOrflow.flow = false;
            } else if (flag == "flow") {
                this.safeOrflow.safe = false;
                this.safeOrflow.flow = true;
            }
        },
        // 验证客服
        goVerify() {
            this.$router.push({ name: "Authenticity" });
        },
        // 分享
        shareFn(command) {
            mui("#sheet-share").popover("toggle");
            var that = this;
            var shareData = {
                title: "看个号",
                desc:
                    "NativeShare是一个整合了各大移动端浏览器调用原生分享的插件",
                // 如果是微信该link的域名必须要在微信后台配置的安全域名之内的。
                link: that.url,
                icon:
                    "https://pic3.zhimg.com/v2-080267af84aa0e97c66d5f12e311c3d6_xl.jpg",
                // 不要过于依赖以下两个回调，很多浏览器是不支持的
                success: function() {
                    alert("success");
                },
                fail: function() {
                    alert("fail");
                }
            };
            that.nativeShare.setShareData(shareData);
            var browser = {
                versions: (function() {
                    var u = navigator.userAgent,
                        app = navigator.appVersion;
                    return {
                        trident: u.indexOf("Trident") > -1, //IE内核
                        presto: u.indexOf("Presto") > -1, //opera内核
                        webKit: u.indexOf("AppleWebKit") > -1, //苹果、谷歌内核
                        gecko:
                            u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1, //火狐内核
                        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                        android:
                            u.indexOf("Android") > -1 || u.indexOf("Adr") > -1, //android终端
                        iPhone: u.indexOf("iPhone") > -1, //是否为iPhone或者QQHD浏览器
                        iPad: u.indexOf("iPad") > -1, //是否iPad
                        webApp: u.indexOf("Safari") == -1, //是否web应该程序，没有头部与底部
                        weixin: u.indexOf("MicroMessenger") > -1, //是否微信 （2015-01-22新增）
                        qq: u.match(/\sQQ/i) == " qq" //是否QQ
                    };
                })()
                // language:(navigator.browserLanguage || navigator.language).toLowerCase()
            };
            try {
                that.nativeShare.call(command);
                //  如果是微信
                if (browser.versions.weixin) {
                    mui.alert(
                        "请选择浏览器右上角的分享按钮",
                        "提示",
                        "确认",
                        "",
                        "div"
                    );
                }
            } catch (err) {
                // console.log(err);
                // //判断是否IE内核
                // if(browser.versions.trident){ alert("is IE"); }
                // //判断是否webKit内核
                if (browser.versions.webKit) {
                    mui.alert(
                        "请选择浏览器下方的分享按钮",
                        "提示",
                        "确认",
                        "",
                        "div"
                    );
                }
                // //判断是否移动端
                if (
                    browser.versions.mobile ||
                    browser.versions.android ||
                    browser.versions.ios
                ) {
                    // alert("移动端");
                }
                if (browser.versions.weixin) {
                    mui.alert(
                        "请选择浏览器右上角的分享按钮",
                        "提示",
                        "确认",
                        "",
                        "div"
                    );
                }
                //检测浏览器语言

                // var currentLang = navigator.language;   //判断除IE外其他浏览器使用语言
                // if(!currentLang){//判断IE浏览器使用语言
                //     currentLang = navigator.browserLanguage;
                // }
            }
        },
        // 复制
        copyFn() {
            mui("#sheet-share").popover("toggle");
            let that = this;
            let clipboard = new ClipboardJS("#copy");
            clipboard.on("success", function(e) {
                clipboard.destroy();
                mui.toast("复制成功", { duration: "short", type: "div" });
            });
            clipboard.on("error", function(e) {
                clipboard.destory();
                mui.toast("请重新点击复制", { duration: "short", type: "div" });
            });
        },
        // 显示分享
        showShareFn() {
            mui("#sheet-share").popover("toggle");
        },
        // 收藏
        collect() {
            var that = this;
            var token = this.$store.state.token;
            if (token == undefined || token == "") {
                that.$router.push({
                    name: "AccountLogin",
                    params: {
                        redirect: that.$router.currentRoute.name
                    }
                });
            } else {
                that.$axios
                    .post(process.env.API_HOST + "collect", {
                        goods_id: that.goods_id
                    })
                    .then(function(res) {
                        // console.log(res);
                        if (res.status == 200) {
                            if (res.data.code == 200) {
                                if (that.detailData.is_collect == 1) {
                                    that.detailData.is_collect = 2;
                                    mui.toast(res.data.msg, {
                                        duration: "short",
                                        type: "div"
                                    });
                                } else {
                                    that.detailData.is_collect = 1;
                                    mui.toast(res.data.msg, {
                                        duration: "short",
                                        type: "div"
                                    });
                                }
                            } else {
                                mui.toast(res.data.msg, {
                                    duration: "short",
                                    type: "div"
                                });
                            }
                        }
                    })
                    .catch(function(err) {});
            }
        },
        // 租号
        rentFn() {
            var that = this;
            if (that.$store.state.token) {
                that.$router.push({
                    name: "RentPlaceOrder",
                    query: { goods_id: that.goods_id }
                });
            } else {
                mui.toast("请先登陆", { duration: "short", type: "div" });
                that.$router.push({ name: "AccountLogin" });
            }
        },
        // 发送议价
        goBargain(flag, e) {
            var that = this;
            if (flag == "ok") {
                if (that.bargain_price) {
                    that.$axios
                        .post(process.env.API_HOST + "discuss", {
                            goods_id: that.goods_id,
                            discuss_price: that.bargain_price
                        })
                        .then(function(res) {
                            if (res.status == 200) {
                                mui.toast(res.data.msg, {
                                    duration: "short",
                                    type: "div"
                                });
                            } else {
                                mui.toast(res.data.msg, {
                                    duration: "short",
                                    type: "div"
                                });
                            }
                        })
                        .catch(function(err) {
                            console.log(err);
                        });
                } else {
                    mui.toast("请输入议价价格", {
                        duration: "short",
                        type: "div"
                    });
                    return false;
                }
            }
            that.bargain_price = "";
            that.showShade = false;
            // var mo = function(e) {
            //     e.preventDefault();
            // };
            // document.body.style.overflow = ""; //出现滚动条
            // document.removeEventListener("touchmove", mo, false);
        },
        // 购买
        buyFn() {
            var that = this;
            if (that.$store.state.token) {
                that.$router.push({
                    name: "PlaceOrderPage",
                    query: { goods_id: that.goods_id }
                });
            } else {
                mui.toast("请先登陆", { duration: "short", type: "div" });
                that.$router.push({ name: "AccountLogin" });
            }
        },
        // 点击推荐
        goDetail(goods_id) {
            this.$router.push({
                name: "Details",
                query: { goods_id: goods_id }
            });
        },
        // 获取数据
        getData() {
            var that = this;
            that.goods_id = that.$route.query.goods_id;
            that.showLoading = true;
            that.$axios
                .post(process.env.API_HOST + "goodsDetail", {
                    goods_id: that.goods_id
                })
                .then(function(res) {
                    // console.log(res);
                    if (res.status == 200) {
                        that.showLoading = false;
                        if (res.data.code == 200) {
                            var data = res.data.data;
                            if (data == "") {
                                that.showNoData = true;
                            } else {
                                that.showNoData = false;
                                that.detailData = data.goods_info;
                                that.recommendData = data.recommend_info;
                                if (that.detailData.goods_images != "") {
                                    that.componentsData.imgList =
                                        that.detailData.goods_images;
                                } else {
                                    var img = [];
                                    img.push({
                                        img_url:
                                            "./static/img/goods-details/detail_img.png"
                                    });
                                    that.componentsData.imgList = img;
                                }
                                var bind = data.account_bind;
                                for (var i in data.goods_info.account_bind) {
                                    if (data.goods_info.account_bind[i] == 1) {
                                        that.accountBind.userBind = false;
                                    } else if (
                                        data.goods_info.account_bind[i] == 2
                                    ) {
                                        that.accountBind.emailBind = false;
                                    } else if (
                                        data.goods_info.account_bind[i] == 3
                                    ) {
                                        that.accountBind.phoneBind = false;
                                    } else {
                                        that.accountBind.userBind = true;
                                        that.accountBind.phoneBind = true;
                                        that.accountBind.emailBind = true;
                                    }
                                }
                            }
                        } else {
                            that.$router.push({ path: "/" });
                            mui.toast(res.data.msg, {
                                duration: "short",
                                type: "div"
                            });
                        }
                    }
                })
                .catch(function(err) {
                    console.log(err);
                });
        }
    },
    watch: {
        $route: "getData"
    },
    mounted() {
        var that = this;
        if (
            that.$route.query.goods_id != "" &&
            that.$route.query.goods_id != undefined
        ) {
            that.getData();
            that.nativeShare = new NativeShare();
            that.url = window.location.href;
        } else {
            that.$router.go(-1);
        }
    }
};
</script>
<style scoped>
/* 商品标题 */
.goods-details-title {
    background: #ffffff;
    padding: 0.26rem 0.2rem 0;
    margin-bottom: 0.2rem;
}
.goods-datails-title-top {
    color: #ffffff;
    font-size: 0.24rem;
    line-height: 0.36rem;
    margin-bottom: 0.2rem;
}
/* 精品 */
.title-boutique {
    text-align: center;
    background: #fe7649;
    width: 0.36rem;
    height: 0.36rem;
    display: inline-block;
    margin-right: 0.1rem;
}
.title-ico{
    text-align: center;
    width: 0.93rem;
    height: 0.36rem;
    display: inline-block;
}
.deal-ico{
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
.title-view-history {
    color: #999999;
    float: right;
}
.title-view-history img {
    width: 0.39rem;
    height: 0.24rem;
    vertical-align: middle;
}
.title-view-history span {
    vertical-align: middle;
}
.goods-datails-title-des {
    width: 6rem;
    overflow: hidden; /*超出的部分隐藏起来。*/
    white-space: nowrap; /*不显示的地方用省略号...代替*/
    text-overflow: ellipsis; /* 支持 IE */
    display: inline-block;
    font-size: 0.3rem;
    line-height: 0.31rem;
    color: #333333;
    line-height: 0.35rem;
}

.original-price {
    color: #666666;
    font-size: 0.26rem;
    line-height: 0.5rem;
}
.original-text {
    margin-right: 0.1rem;
}
/* 底部 */
.goods-strip-bottom {
    line-height: 0.8rem;
    border-top: 1px solid #dcdcdc;
    color: #999999;
    font-size: 0.26rem;
    display: flex;
    justify-content: space-between;
}
.goods-strip-bottom img {
    width: 0.3rem;
    height: 0.3rem;
    vertical-align: middle;
}
.goods-strip-bottom span {
    vertical-align: middle;
}
.red-color {
    color: #fa5856;
}
.goods_price {
    color: #fa5856;
    font-size: 0.36rem;
}
.hint-bottom {
    line-height: 0.7rem;
    background: #f6f6f6;
    font-size: 0.26rem;
    color: #999999;
    padding-left: 0.27rem;
    border-bottom:1px solid #DCDCDC;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}

.title-goods-price {
    font-size: 0.3rem;
    color: #fa5856;
    vertical-align: middle;
    line-height: 0.5rem;
    font-weight: bold;
}
.title-goods-price span {
    font-size: 0.36rem;
}
.upTime {
    font-size: 0.24rem;
    color: #999999;
    line-height: 0.4rem;
}
.title-sellNum {
    font-size: 0.2rem;
    line-height: 0.35rem;
    padding: 0 0.1rem;
    color: #999999;
    border: 1px solid #b5b5b5;
    -webkit-border-radius: 0.18rem;
    -moz-border-radius: 0.18rem;
    border-radius: 0.18rem;
    vertical-align: middle;
}
/* 卖家信息 */
.seller-info {
    padding: 0.26rem 0.2rem;
    margin-bottom: 0.2rem;
    background: #ffffff;
}
.user-head-log {
    width: 0.8rem;
    height: 0.8rem;
    margin-right: 0.19rem;
    vertical-align: middle;
}
.seller-info-right {
    display: inline-block;
    vertical-align: middle;
    font-size: 0.26rem;
    color: #666666;
}
.seller-right-top div {
    display: inline-block;
}
.seller-right-top img {
    width: 0.25rem;
    height: 0.25rem;
    vertical-align: middle;
}

.seller-right-top span {
    vertical-align: middle;
}
.seller-name {
    vertical-align: middle;
    font-size: 0.28rem;
    color: #333333;
    margin-right: 0.32rem;
}
.seller-right-bottom {
    margin-top: 0.17rem;
}

.detail-info {
    padding: 0 0.15rem;
    background: #ffffff;
    font-size: 0.26rem;
    margin-bottom: 0.2rem;
    /* height:.9rem; */
}
.info-left {
    width: 1.19rem;
    line-height: 0.9rem;
    color: #666666;
}
.info-right {
    width: 5.5rem;
    color: #333333;
}
.detail-info div {
    display: inline-block;
}
/* 服务保障 */
.safe-info-right {
    vertical-align: middle;
}
.safe-info-right img {
    width: 0.36rem;
    height: 0.36rem;
    margin-left: 0.14rem;
}
/* 账号绑定 */
.user-bind img {
    width: 0.25rem;
    height: 0.27rem;
}
.user-bind {
    margin-left: 0.2rem;
}
/* .user-bind span{
        vertical-align: middle;
    } */
/* 商品信息 */
.goods-details-info {
    margin-bottom: 0.2rem;
    background: #ffffff;
}

/* 视频看号 */
.vedio-info {
    background: #ffffff;
    font-size: 0.26rem;
}
.vedio-title {
    padding: 0.2rem 0 0.15rem;
    font-size: 0.24rem;
}
.vedio-title-top span {
    display: inline-block;
    font-size: 0.26rem;
    color: #333333;
}
.vertical {
    width: 0.05rem;
    background: #333333;
    height: 0.2rem;
    margin-right: 0.1rem;
}
/* .red-color {
    color: #ff7171;
} */
.vedio-content {
    height: 3.6rem;
    text-align: center;
    line-height: 3.6rem;
    font-size: 0.4rem;
}
/* 安全服务 */
.vidio-bottom {
    display: flex;
    justify-content: flex-start;
}
.vidio-bottom div {
    width: 50%;
    text-align: center;
    line-height: 0.8rem;
}
.red-border {
    color: #ff7e4a;
    border-bottom: 0.04rem solid #ff7e4a;
}
.black-border {
    color: #333333;
}

.showBox-left {
    margin-top: 0.3rem;
    text-align: center;
    padding-bottom: 0.2rem;
}
.showBox-left .detail-user-opera {
    display: flex;
    justify-content: space-around;
    background: #ffffff;
    height: 1.3rem;
    padding-top: 0.1rem;
    margin-bottom: 0.3rem;
}
.detail-user-opera .cell {
    color: #666666;
    font-size: 0.26rem;
    text-align: center;
    margin: auto 0;
}
/*  user-safety user-Authentication user-settlement */
.user-contact img {
    width: 0.49rem;
    height: 0.51rem;
}
.user-safety img {
    width: 0.48rem;
    height: 0.55rem;
}
.user-Authentication img {
    width: 0.54rem;
    height: 0.52rem;
}
.user-settlement img {
    width: 0.5rem;
    height: 0.48rem;
}
.go-verify {
    width: 6.6rem;
    line-height: 0.8rem;
    color: #666666;
    font-size: 0.28rem;
    border: 1px solid #aaaaaa;
    -webkit-border-radius: 0.15rem;
    -moz-border-radius: 0.15rem;
    border-radius: 0.15rem;
    margin: 0 auto 0.2rem;
}
.more-info {
    color: #999999;
    font-size: 0.24rem;
    text-decoration: underline;
    text-align: center;
}

.showBox-right {
    padding: 0.2rem 0.2rem;
}

.flow-left img {
    width: 0.3rem;
    height: 5.46rem;
}
.flow-left,
.flow-right {
    display: inline-block;
    vertical-align: top;
}
.flow-left {
    width: 0.3rem;
    height: 5.46rem;
    margin-right: 0.18rem;
}
.flow-right {
    height: 5.46rem;
    font-size: 0.26rem;
    color: #999999;
}
.flow-title {
    color: #333333;
    margin-bottom: 0.02rem;
    line-height: 0.44rem;
}
.flow-content {
    margin-bottom: 0.05rem;
    line-height: 0.43rem;
}
/* 猜你喜欢 */
.guess {
    text-align: center;
    line-height: 0.7rem;
}
.guess img {
    width: 0.55rem;
    height: 0.03rem;
    vertical-align: middle;
}
.guess span {
    display: inline-block;
    margin: 0 0.1rem;
    color: #999999;
    font-size: 0.24rem;
    vertical-align: middle;
}

.goods-details-bottom {
    margin-top: 0.2rem;
    background: #ffffff;
    display: flex;
    justify-content: flex-start;
    -webkit-box-shadow: 0 -2px 8px #d6d6d6;
    -moz-box-shadow: 0 -2px 8px #d6d6d6;
    box-shadow: 0 -2px 8px #d6d6d6;
}
.goods-details-bottom-left,
.goods-details-bottom-right {
    /* display: inline-block; */
    text-align: center;
}
.goods-details-bottom-left {
    color: #999999;
    width: 1.3rem;
    font-size: 0.24rem;
    padding-top: 0.1rem;
    border-right: 1px solid #dcdcdc;
}
.goods-details-bottom-right {
    width: 2.5rem;
    font-size: 0.3rem;
    line-height: 1rem;
    color: #ffffff;
}
.share img {
    width: 0.43rem;
    height: 0.34rem;
}
.collect img {
    width: 0.4rem;
    height: 0.37rem;
}

.rent-btn {
    background:#FF9536;
    /* background: -webkit-linear-gradient(#ffcc4b, #feab49);
    background: -o-linear-gradient(#ffcc4b, #feab49);
    background: -moz-linear-gradient(#ffcc4b, #feab49);
    background: linear-gradient(to right, #ffcc4b, #feab49); */
}
.buy {
    background: #ff5e5e;
}

/* 推荐 */
.recommend-list{
     background:#F6F8FE;
}
/* 单条商品 */
.goods-strip {
    background: #ffffff;
    margin-bottom: 0.2rem;
}
.goods-strip-top{
    padding: 0.3rem 0.2rem 0;
}
/* 头部------ */
.goods-strip-title {
    color: #ffffff;
    font-size: 0.24rem;
    line-height: 0.36rem;
    margin-bottom: 0.2rem;
}
/* 精品 */
.boutique {
    text-align: center;
    background: #fe7649;
    width: 0.36rem;
    height: 0.36rem;
    display: inline-block;
    margin-right: 0.1rem;
}
/* .goods-type {
    text-align: center;
    width: 0.93rem;
    height: 0.36rem;
    background: -webkit-linear-gradient(#feab49, #ffcc4b);
    background: -o-linear-gradient(#feab49, #ffcc4b);
    background: -moz-linear-gradient(#feab49, #ffcc4b);
    background: linear-gradient(to right, #feab49, #ffcc4b);
    display: inline-block;
    margin-right: 0.1rem;
} */
.account-type {
    text-align: center;
    /* width:.7rem; */
    padding: 0 0.1rem;
    height: 0.36rem;
    background: -webkit-linear-gradient(
        120deg,
        rgba(104, 224, 218, 1),
        rgba(104, 223, 222, 1),
        rgba(132, 240, 178, 1),
        rgba(73, 209, 202, 1)
    );
    background: -o-linear-gradient(
        120deg,
        rgba(104, 224, 218, 1),
        rgba(104, 223, 222, 1),
        rgba(132, 240, 178, 1),
        rgba(73, 209, 202, 1)
    );
    background: -moz-linear-gradient(
        120deg,
        rgba(104, 224, 218, 1),
        rgba(104, 223, 222, 1),
        rgba(132, 240, 178, 1),
        rgba(73, 209, 202, 1)
    );
    background: linear-gradient(
        120deg,
        rgba(104, 224, 218, 1),
        rgba(104, 223, 222, 1),
        rgba(132, 240, 178, 1),
        rgba(73, 209, 202, 1)
    );
    display: inline-block;
    margin-right: 0.1rem;
}
.area {
    font-size: 0.26rem;
    color: #999999;
    display: inline-block;
}
.goods-des {
    width: 5rem;
    overflow: hidden; /*超出的部分隐藏起来。*/
    white-space: nowrap; /*不显示的地方用省略号...代替*/
    text-overflow: ellipsis; /* 支持 IE */
    display: inline-block;
    font-size: 0.3rem;
    line-height: 0.31rem;
    color: #333333;
}
.goods-price {
    font-size: 0.34rem;
    color: #fa5856;
}
.goods-price span {
    font-size: 0.36rem;
}

.hoodle {
    width: 5rem;
    position: fixed;
    top: 35%;
    left: calc(50% - 2.5rem);
    z-index: 9;
    background: #ffffff;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
}
.hoodle img {
    width: 5rem;
    height: 1.64rem;
}
.hoodle-con {
    text-align: center;
    margin-top: 0.4rem;
}
.shade {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 6;
}
.hoodle-btn {
    display: flex;
    justify-content: space-around;
    margin: 0.4rem 0;
}
.hoodle-btn div {
    width: 1.89rem;
    height: 0.6rem;
    line-height: 0.6rem;
    text-align: center;
    font-size: 0.26rem;
    color: #ffffff;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
}
.okBtn {
    background: -webkit-linear-gradient(#fd915f, #FF9536);
    background: -o-linear-gradient(#fd915f, #FF9536);
    background: -moz-linear-gradient(#fd915f, #FF9536);
    background: linear-gradient(to right, #fd915f, #FF9536);
}
.cancelBtn {
    background: #c6c6c6;
}
/* ==========input========= */

input {
    margin: 0;
    padding: 0.1rem;
    font-size: 0.24rem;
    /* border: none; */
    width: 4.6rem;
    height: 0.7rem;
    vertical-align: middle;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
}
input[type="number"] {
    -moz-appearance: textfield;
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

/* 商品信息 */
.goods-info-content {
    padding: 0.2rem;
    font-size: 0.26rem;
    display: block;
}
.goods-info-strip {
    display: flex;
    align-items: top;
    margin-bottom: 0.1rem;
    user-select: text;
}
.text-left {
    color: #666666;
    min-width: 1.5rem;
    margin-right: 0.3rem;
}
.text-right {
    color: #333333;
    word-break: break-all;
    white-space: normal;
}

.pop-view {
    margin-top: 10px;
    background: #ffffff;
    list-style: none;
}
.pop-hint {
    line-height: 0.9rem;
    text-align: center;
    font-size: 0.28rem;
    color: #999999;
    background: #f5f5f5;
}
.pop-box {
    margin: 0.3rem 0.3rem 0.4rem;
    font-size: 0.28rem;
    color: #999999;
    text-align: center;
    display: inline-block;
}
.pop-view img {
    width: 0.8rem;
    height: 0.8rem;
}

.pop-view li {
    text-align: center;
    line-height: 0.9rem;
    border-bottom: 1px solid #e5e5e5;
}

.pop-view a {
    padding: 0;
}
</style>



