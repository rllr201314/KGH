<template>
    <!-- 下单 -->
    <div class="wrap">
        <!-- 头部 -->
        <Header v-bind:head_data="componentsData.head_data"></Header>
        <div class="placeOrder-content">
            <!-- 商品详情 -->
            <div class="placeOrder-cell">
                <img
                    class="badge"
                    v-if="goodsInfo.deal_type == 1"
                    src="../../../static/img/badge/product.png"
                    alt
                />
                <img
                    class="badge"
                    v-else-if="goodsInfo.deal_type == 5"
                    src="../../../static/img/badge/wz-badge.png"
                    alt
                />

                <div class="goods-info-top">
                    <img src="../../../static/image/vertical.png" alt />
                    <span>商品详情</span>
                </div>
                <div class="goods-info-content" @click="showAttributeFn(true)">
                    <img class="game-log" :src="goodsInfo.game_logo" alt />
                    <div class="goods-info">
                        <div class="goods-info-title" v-text="goodsInfo.goods_title"></div>
                    </div>
                    <img class="right-next" src="../../../static/img/my-center/next_ico.png" alt />
                </div>
            </div>
            <div class="goods-info-box" @click="showAttributeFn(false)" v-show="show_attribute">
                <div class="goods-info-strip">
                    <div class="text-left">系统</div>
                    <div
                        class="text-right"
                        v-if="goodsInfo.server_name != null"
                        v-text="goodsInfo.platform_name+'>'+ goodsInfo.area_name+'>'+goodsInfo.server_name"
                    ></div>
                    <div
                        class="text-right"
                        v-else
                        v-text="goodsInfo.platform_name+'>'+ goodsInfo.area_name"
                    ></div>
                </div>
                <div class="goods-info-strip">
                    <div class="text-left">商品类型</div>
                    <div class="text-right" v-if="goodsInfo.deal_type == 1">成品号</div>
                    <div class="text-right" v-else-if="goodsInfo.deal_type == 5">物资号</div>
                    <!-- <div class="text-right" v-else>代练号</div> -->
                </div>
                <div class="goods-info-strip">
                    <div class="text-left">账号绑定</div>
                    <div class="text-right" v-text="goodsInfo.account_bind"></div>
                </div>
                <div class="goods-info-strip" v-for="(item,index) in extend_attribute" :key="index">
                    <div class="text-left" v-text="item.title"></div>
                    <div class="text-right" v-text="item.value"></div>
                </div>
            </div>
            <div class="shade" @click="showAttributeFn(false)" v-show="show_attribute"></div>
            <!-- 联系方式 -->
            <div class="contact-wrap placeOrder-cell">
                <div class="goods-info-top">
                    <img src="../../../static/image/vertical.png" alt />
                    <span>联系方式</span>
                </div>
                <div class="contact-content">
                    <div class="contact-cell inpright">
                        <span class="celltext">微信号</span>
                        <input type="text" placeholder="请输入您的微信号" v-model="wx" />
                    </div>
                    <div class="contact-cell inpright">
                        <span class="celltext">手机号</span>
                        <input type="number" placeholder="请输入您的手机号" v-model="phone" />
                    </div>
                    <div class="contact-bottom red-color">请输入您真实的联系方式，以方便客服能在交易过程中的第一时间联系到您。</div>
                </div>
            </div>
            <!-- 订单详情 -->
            <div class="placeOrder-cell">
                <div class="goods-info-top">
                    <img src="../../../static/image/vertical.png" alt />
                    <span>订单详情</span>
                </div>
                <div class="contact-content">
                    <div class="contact-cell">
                        <span class="celltext">商品单价</span>
                        <div class="cell-right">
                            <span class="unit-price price">
                                ￥
                                <span v-text="goodsInfo.goods_price"></span>
                            </span>
                        </div>
                    </div>
                    <div class="contact-cell" v-if="goodsInfo.is_discusses == 1">
                        <span class="celltext">议价价格</span>
                        <div class="cell-right">
                            <span class="unit-price price">
                                ￥
                                <span v-text="goodsInfo.discuss_price"></span>
                            </span>
                        </div>
                    </div>
                    <div class="contact-cell" v-if="false">
                        <span class="celltext">商品数量</span>
                        <div class="cell-right raise-good">
                            <img src="../../../static/img/sub_price.png" alt @click="addbtn('sub')" />
                            <input type="number" v-model="num" />
                            <img src="../../../static/img/add_price.png" alt @click="addbtn('add')" />
                        </div>
                    </div>
                    <div class="contact-cell" v-if="false">
                        <span class="celltext">优惠券</span>
                        <div class="cell-right descount">
                            <span class="gray-color">无可用优惠券</span>
                            <img src="../../../static/img/order/next.png" alt />
                        </div>
                    </div>
                    <div class="contact-cell">
                        <span class="celltext">分期付款</span>
                        <div class="sele-opera">
                            <div class="opera" @click="seleOpera('nostage')">
                                <img
                                    :src="operaStage.noStage?'../../../static/img/order/okcheck.png':'../../../static/img/order/nocheck.png'"
                                    alt
                                />
                                <span>全款</span>
                            </div>
                            <div
                                class="opera"
                                @click="seleOpera('stage')"
                                v-if="goodsInfo.is_stage == 1"
                            >
                                <img
                                    :src="operaStage.stage?'../../../static/img/order/okcheck.png':'../../../static/img/order/nocheck.png'"
                                    alt
                                />
                                <span>分期</span>
                            </div>
                        </div>
                    </div>
                    <div class="order-cell" v-show="operaStage.stage">
                        <span class="celltext downPay-left">首付金额</span>
                        <div class="sele-opera downPay-right">
                            <div class="sele-downPay" @click="showOpera('downPay')">
                                <span
                                    v-for="(item,index) in downPayOpera"
                                    v-if="item.issele"
                                    v-text="item.name"
                                    :key="index"
                                ></span>
                                <img src="../../../static/img/goodscreen/downsolid.png" alt />
                            </div>
                            <div v-show="showInpDownPay">
                                <input type="number" placeholder="填写希望的首付金额" v-model="custom_price" />
                                <span class="sole">元</span>
                                <span class="custom" @click="customFn">确认</span>
                            </div>
                        </div>
                    </div>
                    <div class="order-cell" v-show="operaStage.stage && show_periods">
                        <span class="celltext downPay-left">期数</span>
                        <div class="sele-opera downPay-right">
                            <div class="sele-downPay" @click="showOpera('stage')">
                                <span
                                    v-for="(item,index) in stageOpera"
                                    v-if="item.issele"
                                    v-text="item.name"
                                    :key="index"
                                ></span>
                                <img src="../../../static/img/goodscreen/downsolid.png" alt />
                            </div>
                            <div class="gray-color">
                                <div v-for="(item,index) in stageInfo" :key="index">
                                    <span
                                        class="periodsNum"
                                    >第{{item.cur_number}}期 ￥{{item.every_month_money}}</span>
                                    <span>(本金{{item.stage_money}},利息{{item.money}}*{{item.percent_rate}}={{item.charge}})</span>
                                </div>
                            </div>
                            <span class="red-color hint">（分期支付不足全额50%，不开放安全锁）</span>
                        </div>
                    </div>
                    <div class="contact-cell" v-if="showSafe">
                        <span class="celltext">保险</span>
                        <div class="sele-opera">
                            <div class="opera" @click="seleOpera('safe')">
                                <img
                                    :src="operaSafe.safe?'../../../static/img/order/okcheck.png':'../../../static/img/order/nocheck.png'"
                                    alt
                                />
                                <span>买保险</span>
                                <span class="red-color">
                                    (￥
                                    <span class="red-color" v-text="goodsInfo.other_fee"></span>)
                                </span>
                            </div>
                            <div class="opera" @click="seleOpera('nosafe')" v-show="!forceSafe">
                                <img
                                    :src="operaSafe.noSafe?'../../../static/img/order/okcheck.png':'../../../static/img/order/nocheck.png'"
                                    alt
                                />
                                <span>不购买</span>
                            </div>
                        </div>
                    </div>
                    <div class="contact-cell" v-if="showCompact">
                        <span class="celltext">合同</span>
                        <div class="sele-opera">
                            <div class="opera" @click="seleOpera('safe')">
                                <img
                                    :src="operaSafe.safe?'../../../static/img/order/okcheck.png':'../../../static/img/order/nocheck.png'"
                                    alt
                                />
                                <span>买合同</span>
                                <span class="red-color">
                                    (￥
                                    <span class="red-color" v-text="goodsInfo.other_fee"></span>)
                                </span>
                            </div>
                            <div class="opera" @click="seleOpera('nosafe')">
                                <img
                                    :src="operaSafe.noSafe?'../../../static/img/order/okcheck.png':'../../../static/img/order/nocheck.png'"
                                    alt
                                />
                                <span>不购买</span>
                            </div>
                        </div>
                    </div>
                    <div class="contact-cell" v-show="show_periods">
                        <div class="cell-right">
                            <div class="total-price price">
                                实际支付：
                                <span class="red-color" v-text="totalPrice"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="protocol">
            <img
                :src="protocol?'../../../static/img/goodscreen/okcheck.png':'../../../static/img/goodscreen/nocheck.png'"
                alt
                @click="lookFn"
            />
            <div>
                我已阅读
                <span class="red-color" @click="getProtocol">《看个号平台交易协议》</span>
            </div>
        </div>
        <Protocal v-bind:proData="proData" v-on:isProFn="isProFn"></Protocal>

        <div class="nextBtn" @click="goPayFn">下一步</div>
        <!-- 遮罩 -->
        <div class="orderShade" v-show="showOrderShade" @click="showOrderShade = false; showDownPayBox = false;showStageBox = false"></div>
        <!-- 分期首付选项栏 -->
        <div class="stageBox" v-show="showDownPayBox">
            <div class="stageBox-cell" v-for="(item,index) in downPayOpera" :key="index" @click="seleDownPay(item.key)">
                <img
                    :src="item.issele?'../../../static/img/order/okcheck.png':'../../../static/img/order/nocheck.png'"
                    alt
                />
                {{item.name}}
            </div>
        </div>
        <div class="stageBox" v-show="showStageBox">
            <div class="stageBox-cell" v-for="(item,index) in stageOpera" :key="index" @click="seleStage(item.key)">
                <img
                    :src="item.issele?'../../../static/img/order/okcheck.png':'../../../static/img/order/nocheck.png'"
                    alt
                />
                {{item.name}}
            </div>
        </div>
        <Loading class="black-bg" v-if="showNoData"></Loading>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header"; //头部
import Loading from "@/components/multi/Loading";
import Protocal from "@/components/multi/Protocal";//协议

export default {
    name: "PlaceOrder",
    components: {
        Header,
        Loading,
        Protocal
    },
    data() {
        return {
            componentsData: {
                // Header
                head_data: {
                    show_type: 2,
                    tit_text: '商品下单',
                    right_icon: 2,
                    showBack: false, //显示后退按钮
                    showLogo: 2, //不显示头部log
                    showShare: 3, //1搜索2分享
                    showBg: true, //是否显示背景
                }
            },
            proData: {
                isShow: false,
                con: "",
                btn: "确认已读",
                val: ""
            },
            protocol: true, //阅读协议
            showNoData: true,
            goodsInfo: {},
            stage: {},
            num: 1,
            phone: '',
            wx: '',
            // 首付多少
            downPayOpera: [
                {
                    issele: true,
                    name: "首付30%",
                    key: 1
                },
                {
                    issele: false,
                    name: "首付50%",
                    key: 2
                },
                {
                    issele: false,
                    name: "自定义金额（不少于30%）",
                    key: 3
                }
            ],
            // 分期信息 详细
            stageInfo: [],
            // 分期期数
            stageOpera: [
                {
                    issele: true,
                    name: "分一期",
                    key: 1
                },
                {
                    issele: false,
                    name: "分三期",
                    key: 2
                },
                {
                    issele: false,
                    name: "分五期",
                    key: 3
                }
            ],
            custom_price: '',//自定义金额
            show_periods: true,//显示分期期数
            customInfo: null,//自定义--分期期数
            showSafe: false,
            showCompact: false,
            down_price: null,//首付
            stage_num: null,//期数
            showDownPayBox: false, //首付选项显示
            showStageBox: false, //分期选项显示
            showInpDownPay: false, //自定义分期显示
            showOrderShade: false, //遮罩
            totalPrice: null,
            // 是否分期
            operaStage: {
                stage: false,
                noStage: true
            },
            // 是否购买保险
            operaSafe: {
                safe: true,
                noSafe: false
            },
            forceSafe: false,//是否强制保险
            show_attribute: false,
            extend_attribute: [],
        };
    },
    methods: {
        showAttributeFn(flag) {
            var that = this;
            if(flag) {
                that.show_attribute = true;
            }else {
                that.show_attribute = false;
            }
        },
        // 协议
        getProtocol() {
            var that = this;
            that.$axios.post(process.env.API_HOST + 'protocolSafe').then((res) => {
                // console.log(res);
                if(res.status == 200) {
                    if(res.data.code == 200) {
                        that.proData.isShow = true;
                        that.proData.con = res.data.data;
                        that.proData.val = true;
                    }
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        isProFn(flag) {
            var that = this;
            if(flag) {
                that.protocol = true;
            }
        },
        // 商品数量
        addbtn(flag) {
            var that = this;
            if(flag == "sub") {
                that.num--;
                if(that.num <= 0) {
                    that.num = 1;
                }
            }else if(flag == "add") {
                that.num++;
            }
        },
        // 选择分期和保险
        seleOpera(flag) {
            console.log(flag);
            var that = this;
            if(flag == "nostage") {
                that.operaStage.stage = false;
                that.operaStage.noStage = true;
                // 不分期
                if((that.showSafe || that.showCompact) && that.operaSafe.safe){
                    if(that.goodsInfo.is_discusses == 1){
                        that.totalPrice = Number(that.goodsInfo.discuss_price) + Number(that.goodsInfo.other_fee);
                    }else {
                        that.totalPrice = Number(that.goodsInfo.goods_price) + Number(that.goodsInfo.other_fee);
                    }
                }else{
                    if(that.goodsInfo.is_discusses == 1){
                        that.totalPrice = Number(that.goodsInfo.discuss_price);
                    }else {
                        that.totalPrice = Number(that.goodsInfo.goods_price);
                    }
                }
                if(that.showSafe) {
                    if(that.goodsInfo.force_safe == 1) {
                        that.forceSafe = false;
                    }
                }
            }else if(flag == "stage") {
                that.operaStage.stage = true;
                that.operaStage.noStage = false;
                that.down_price = 1;
                that.stage_num = 1;
                if(that.showSafe) {
                    if(that.goodsInfo.force_safe == 1) {
                        that.forceSafe = true;
                        that.operaSafe.noSafe = false;
                        that.operaSafe.safe = true;
                    }
                }
                that.sumFn();
            }else if(flag == "nosafe") {
                if(!that.operaSafe.noSafe) {
                    that.operaSafe.noSafe = true;
                    that.operaSafe.safe = false;
                    that.totalPrice = Number(that.totalPrice) - Number(that.goodsInfo.other_fee);
                }
            }else if(flag == "safe") {
                if(!that.operaSafe.safe) {
                    that.operaSafe.noSafe = false;
                    that.operaSafe.safe = true;
                    that.totalPrice = Number(that.totalPrice) + Number(that.goodsInfo.other_fee);
                }
            }
        },
        // 显示分期首付
        showOpera(opt) {
            if(opt == "downPay") {
                this.showDownPayBox = true;
            }else if(opt == "stage") {
                this.showStageBox = true;
            }
            this.showOrderShade = true;
        },
        sumFn() {
            var that = this;
            if(that.down_price == 1) {
                if((that.showSafe || that.showCompact) && that.operaSafe.safe) {
                    that.totalPrice = Number(that.stage.first_deposit_price) + Number(that.goodsInfo.other_fee);
                }else {
                    that.totalPrice = Number(that.stage.first_deposit_price);
                }
            }else if(that.down_price == 2) {
                if((that.showSafe || that.showCompact) && that.operaSafe.safe) {
                    that.totalPrice = Number(that.stage.second_deposit_price) + Number(that.goodsInfo.other_fee);
                }else {
                    that.totalPrice = Number(that.stage.second_deposit_price);
                }
            }else if(that.down_price == 3) {
                if(that.operaSafe.safe) {
                    that.totalPrice = Number(that.goodsInfo.goods_price) + Number(that.goodsInfo.other_fee);
                }else {
                    that.totalPrice = Number(that.goodsInfo.goods_price);
                }
            }
        },
        // 选择首付
        seleDownPay(opera) {
            var that = this;
            var downPayOpera = that.downPayOpera;
            for (var i in downPayOpera) {
                if(downPayOpera[i].key == opera) {
                    downPayOpera[i].issele = true;
                    if(opera == 1) {
                        that.down_price = 1;
                        that.show_periods = true;
                        that.sumFn();
                    }else if(opera == 2) {
                        that.down_price = 2;
                        that.show_periods = true;
                        that.sumFn();
                    }else {
                        that.show_periods = false;
                        that.down_price = 3;
                        that.sumFn()
                    }
                    continue;
                }
                downPayOpera[i].issele = false;
            }
            // 隐藏自定义分期输入框
            that.showInpDownPay = false; //自定义分期输入框

            // 默认将分期选择为一期
            for (var i in that.stageOpera) {
                if(that.stageOpera[i].key == 1) {
                    that.stageOpera[i].issele = true;
                    continue;
                }
                that.stageOpera[i].issele = false;
            }
            if(opera == 1) {
                that.stageInfo = that.stage.first_one_interest;
            }else if(opera == 2) {
                that.stageInfo = that.stage.second_one_interest;
            }else if(opera == 3) {
                //选择首付自定义
                that.showInpDownPay = true; //自定义分期输入框
            }
            that.showDownPayBox = false; //隐藏分期首付选项
            that.showOrderShade = false; //隐藏遮罩

            // // 滚动条可移动
            // var mo = function(e) {
            //     e.preventDefault();
            // };
            // document.body.style.overflow = ""; //出现滚动条
            // document.removeEventListener("touchmove", mo, false);
        },
        // 选择分期--期数
        seleStage(opera) {
            var that = this;
            var stageOpera = that.stageOpera;
            for (var i in stageOpera) {
                if(stageOpera[i].key == opera) {
                    stageOpera[i].issele = true;
                    if(that.down_price == 1 && opera == 1) {// 首付百分三十 分一期
                        that.stageInfo = that.stage.first_one_interest;
                        that.stage_num = 1;
                    }else if(that.down_price == 1 && opera == 2) {
                        that.stageInfo = that.stage.first_two_interest;
                        that.stage_num = 3;
                    }else if(that.down_price == 1 && opera == 3) {
                        that.stageInfo = that.stage.first_three_interest;
                        that.stage_num = 5;
                    }else if(that.down_price == 2 && opera == 1) {//首付百分之五十
                        that.stageInfo = that.stage.second_one_interest;
                        that.stage_num = 1;
                    }else if(that.down_price == 2 && opera == 2) {
                        that.stageInfo = that.stage.second_two_interest;
                        that.stage_num = 3;
                    }else if(that.down_price == 2 && opera == 3) {
                        that.stageInfo = that.stage.second_three_interest;
                        that.stage_num = 5;
                    }else if(that.down_price == 3 && opera == 1) {//自定义首付
                        that.stageInfo = that.customInfo.first_one_interest;
                        that.stage_num = 1;
                    }else if(that.down_price == 3 && opera == 2) {
                        that.stageInfo = that.customInfo.first_two_interest;
                        that.stage_num = 3;
                    }else if(that.down_price == 3 && opera == 3) {
                        that.stageInfo = that.customInfo.first_three_interest;
                        that.stage_num = 5;
                    }
                    continue;
                }
                stageOpera[i].issele = false;
            }
            that.showStageBox = false; //隐藏分期首付选项
            that.showOrderShade = false; //隐藏遮罩
        },
        // 自定义
        customFn() {
            var that = this;
            if((Number(that.goodsInfo.goods_price) * 0.3) > that.custom_price) {
                mui.alert('自定义分期首付金额不可低于原价30%', '提示', '确认', '', 'div');
                that.customInfo = null;
                that.stageInfo = null;
                that.show_periods = false;
            }else if(Number(that.goodsInfo.goods_price) < that.custom_price) {
                mui.alert('首付金额不应大于原价', '提示', '确认', '', 'div');
                that.customInfo = null;
                that.stageInfo = null;
                that.show_periods = false;
            }else {
                var goods_price = '';
                if(that.goodsInfo.is_discuss == 1) {
                    goods_price = that.goodsInfo.discuss_price;
                }else {
                    goods_price = that.goodsInfo.goods_price;
                }
                that.$axios.post(process.env.API_HOST + "selfStage", {
                    price: goods_price,
                    down_payment: that.custom_price
                }).then((res) => {
                    console.log(res)
                    if(res.status == 200) {
                        if(res.data.code == 200) {
                            that.show_periods = true;
                            that.customInfo = res.data.data;
                            that.stageInfo = that.customInfo.first_one_interest;
                            if (that.operaSafe.safe) {
                                that.totalPrice = Number(that.customInfo.first_deposit_price) + Number(that.goodsInfo.other_fee);
                            }else {
                                that.totalPrice = Number(that.customInfo.first_deposit_price);
                            }
                        }else if (res.data.code == 400) {
                            mui.alert(res.data.msg, '提示', '确认', '', 'div');
                        }
                    }
                }).catch((err) => {
                    console.log(err)
                })
            }
        },
        // 阅读协议
        lookFn() {
            this.protocol = !this.protocol;
        },
        getData() {
            var that = this;
            that.$axios
                .post(process.env.API_HOST + "orderDetail", {
                    goods_id: that.$route.query.goods_id
                })
                .then(res => {
                    // console.log(res);
                    if(res.status == 200) {
                        if (res.data.code == 200) {
                            that.showNoData = false;
                            that.goodsInfo = res.data.data.goods_info;
                            that.stage = res.data.data.stage;
                            that.extend_attribute = res.data.data.goods_info.goods_attribute;
                            // 可以选择分期的话默认 首付30% 分一期 判断可购合同还是保险
                            if(that.stage) {
                                that.stageInfo = that.stage.first_one_interest;
                            }
                            if(that.goodsInfo.is_discuss == 1) {//是否议价
                                that.totalPrice = that.goodsInfo.discuss_price;
                            }else{
                                that.totalPrice = that.goodsInfo.goods_price;
                            }
                            if(that.goodsInfo.is_safe == 2 && that.goodsInfo.is_compact == 2 && that.goodsInfo.other_is_safe == 1 && that.totalPrice >= 2000){
                                that.showSafe = true;
                                if(that.goodsInfo.is_discusses == 1){//是否议价
                                    that.totalPrice = Number(that.goodsInfo.discuss_price) + Number(that.goodsInfo.other_fee);
                                }else{
                                    that.totalPrice = Number(that.goodsInfo.goods_price) + Number(that.goodsInfo.other_fee);
                                }
                            }else if(that.goodsInfo.is_safe == 2 && that.goodsInfo.is_compact == 2 && that.goodsInfo.other_is_compact == 1 && that.totalPrice >= 2000){
                                that.showCompact = true;
                                if(that.goodsInfo.is_discusses == 1){//是否议价
                                    that.totalPrice = Number(that.goodsInfo.discuss_price) + Number(that.goodsInfo.other_fee);
                                }else{
                                    that.totalPrice = Number(that.goodsInfo.goods_price) + Number(that.goodsInfo.other_fee);
                                }
                            }

                        }else if (res.data.code == 400) {
                            that.showNoData = true;
                            mui.alert(res.data.msg, '提示', '确认', function () {
                                that.$router.go(-1);
                            }, 'div')
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        goPayFn() {
            var that = this;
            var request = {};
            // 微信
            if(that.wx == "") {
                mui.alert("请输入微信账号", "提示", "确认", "", "div");
                return false;
            }else {
                var reg = /[\u4e00-\u9fa5]/g;
                if(that.wx.match(reg)) {
                    mui.alert("请输入正确微信账号", "提示", "确认", "", "div");
                    return false;
                }
                request.wx = that.wx;
            }
            // 手机号
            if(that.phone == "") {
                mui.alert("请输入手机号", "提示", "确认", "", "div");
                return false;
            }else {
                var reg = /^1[3-9][0-9]{9}$/g;
                if (!that.phone.match(reg)) {
                    mui.alert("您输入的手机号不正确", "提示", "确定", "", "div");
                    return false;
                }
                request.mobile = that.phone;
            }
            // 判断是否勾选协议
            if(!that.protocol) {
                mui.alert("请阅读并同意《看个号平台交易协议》", "提示", "确定", "", "div");
                return false;
            }
            // 分期还是一口价 true分期
            if(that.operaStage.stage) {
                request.stage_method = that.down_price;//选择 首付金额
                if(request.stage_method == 3) {//自定义金额
                    if(!that.show_periods) {
                        mui.alert("请确认你输入的自定义价格", "提示", "确定", "", "div");
                        return false;
                    }
                    request.down_payment = that.custom_price;
                }
                request.stage_number = that.stage_num;
            }
            // 是否购买合同或者保险
            if(that.showSafe) {
                if(that.operaSafe.safe) {//买保险
                    request.is_safe = 1;
                    request.is_compact = 2;
                }else {
                    request.is_safe = 2;
                    request.is_compact = 2;
                }
            }else if (that.showCompact) {
                if(that.operaSafe.safe) {//买合同
                    request.is_safe = 2;
                    request.is_compact = 1;
                }else {
                    request.is_safe = 2;
                    request.is_compact = 2;
                }
            }else {
                request.is_safe = 2;
                request.is_compact = 2;
            }
            request.goods_id = that.$route.query.goods_id;
            request.pay_type = 1;//成品号 改

            var request = JSON.stringify(request)
            sessionStorage.info = request;//改
            that.$router.push({ name: 'Pay', params: { info: request } })
        }
    },
    mounted() {
        var that = this;
        if(that.$route.query.goods_id != "" && that.$route.query.goods_id != undefined) {
            that.getData();
        }else {
            that.$router.go(-1);
        }
    }
};
</script>
<style scoped>
.placeOrder-content {
    padding: 0.2rem 0.2rem 0;
}
/* 商品信息 */
.placeOrder-cell {
    background: #ffffff;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    margin-bottom: 0.2rem;
    position: relative;
}
.badge {
    width: 1.03rem;
    height: 1rem;
    position: absolute;
    top: 0;
    right: 0;
}
.goods-info-top {
    line-height: 0.7rem;
    border-bottom: 0.01rem solid #e5e5e5;
}

.goods-info-top span {
    display: inline-block;
    color: #333333;
    font-size: 0.28rem;
}
.goods-info-top img {
    width: 0.06rem;
    height: 0.29rem;
    margin-left: 0.17rem;
    vertical-align: middle;
    border-radius: 0.1rem;
}

.goods-info-content {
    padding: 0.2rem 0;
    font-size: 0.26rem;
    color: #666666;
}
.game-log {
    width: 1.1rem;
    height: 1.1rem;
    margin: 0 0.6rem 0 0.35rem;
    vertical-align: middle;
}
.right-next {
    width: 0.13rem;
    height: 0.24rem;
    vertical-align: middle;
    margin-right: 0.2rem;
}
.goods-info {
    display: inline-block;
    width: 4.5rem;
    vertical-align: middle;
}
.goods-info-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #333333;
}
.goods-info-box {
    max-width: 630px;
    margin: 0 auto;
    background: #ffffff;
    font-size: 0.26rem;
    color: #666666;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    padding: 0.2rem 0.48rem;
    left: 0.2rem;
    right: 0.2rem;
    position: fixed;
    z-index: 6;
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

.shade {
    position: fixed;
    left: 0;
    top: 0.88rem;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 4;
    margin: 0 auto;
    max-width: 640px;
}
.contact-content {
    padding-left: 0.2rem;
}
.contact-cell {
    line-height: 0.9rem;
    border-bottom: 0.01rem solid #e5e5e5;
    padding-right: 0.2rem;
}
.contact-cell::after {
    display: block;
    clear: both;
    content: "";
}
.inpright input {
    width: 70%;
    text-align: right;
    border: 0;
    margin: 0;
    height: 0.9rem;
    float: right;
}
.celltext {
    color: #666666;
    font-size: 0.26rem;
    display: inline-block;
    width: 1.35rem;
}

.contact-bottom {
    padding: 0.17rem;
    font-size: 0.24rem;
}
.red-color {
    color: #ff7800 !important;
}

/*  */
.cell-right {
    float: right;
}
/* 价格 */
.price {
    font-size: 0.26rem;
    color: #333333;
}

/* 商品数量 */
.raise-good input {
    width: 0.8rem;
    height: 0.42rem;
    padding: 0 0.05rem;
    outline: none;
    border: 0.01rem solid #d2d2d2;
    vertical-align: middle;
    margin: 0 0.2rem;
}
.raise-good img {
    width: 0.29rem;
    height: 0.29rem;
    vertical-align: middle;
}
/*  */
.order-cell {
    border-bottom: 0.01rem solid #e5e5e5;
    padding: 0.2rem 0.2rem 0.2rem 0;
}
/* 优惠券 */
.descount img {
    width: 0.13rem;
    height: 0.24rem;
    vertical-align: middle;
}
.gray-color {
    color: #999999;
    font-size: 0.24rem;
}
.periodsNum {
    min-width: 0.8rem;
    color: #333333;
    display: inline-block;
}
/* 选项 */
.sele-opera {
    width: 5rem;
    display: inline-block;
}
.opera {
    display: inline-block;
    margin-right: 0.7rem;
}
.opera img {
    width: 0.22rem;
    height: 0.22rem;
    vertical-align: middle;
}
.opera span {
    font-size: 0.26rem;
    color: #333333;
    vertical-align: middle;
}
/* 首付金额 */
.downPay-left {
    margin-top: 0.1rem;
}
.downPay-left,
.downPay-right {
    vertical-align: top;
}
.downPay-right input {
    width: 3rem;
    height: 0.5rem;
    margin: 0;
    padding: 0 0.1rem;
}
.custom {
    color: #ffffff;
    font-size: 0.26rem;
    background: #fc5f4e;
    display: inline-block;
    margin-left: 0.5rem;
    width: 0.8rem;

    text-align: center;
}
.sele-downPay {
    line-height: 0.5rem;
    color: #333333;
    font-size: 0.24rem;
    border: 0.01rem solid #d2d2d2;
    -webkit-border-radius: 0.06rem;
    -moz-border-radius: 0.06rem;
    border-radius: 0.06rem;
    padding: 0 0.15rem;
    display: inline-block;
    margin-bottom: 0.2rem;
}
.sele-downPay span {
    margin-right: 0.5rem;
    vertical-align: middle;
}
.sele-downPay img {
    width: 0.2rem;
    height: 0.1rem;
    vertical-align: middle;
}
.sole {
    color: #333333;
    font-size: 0.26rem;
    margin-left: 0.1rem;
}

/* 协议 */
.protocol {
    margin: 0 0 0.2rem;
    padding: 0 0.2rem;
}
.protocol img {
    width: 0.28rem;
    height: 0.28rem;
    vertical-align: middle;
}
.protocol div {
    display: inline-block;
    font-size: 0.22rem;
}
/* 下一步 */
.nextBtn {
    color: #ffffff;
    font-size: 0.28rem;
    margin: 0 auto 0.3rem;
    width: 6.5rem;
    text-align: center;
    line-height: 0.8rem;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #fd915f;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #fd915f;
    box-shadow: 0.06rem 0.05rem 0.09rem #fd915f;
    background: -webkit-linear-gradient(#fd915f, #ffa303);
    background: -o-linear-gradient(#fd915f, #ffa303);
    background: -moz-linear-gradient(#fd915f, #ffa303);
    background: linear-gradient(to right, #fd915f, #ffa303);
}

.hint {
    font-size: 0.22rem;
}
/* 分期弹出框 */
.stageBox {
    width: 4rem;
    background: #ffffff;
    color: #333333;
    font-size: 0.26rem;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    z-index: 10;
    position: fixed;
    left: calc(50% - 2rem);
    top: 45%;
}
.stageBox-cell {
    line-height: 0.9rem;
}
.stageBox-cell img {
    width: 0.22rem;
    height: 0.22rem;
    margin-left: 0.16rem;
}
.orderShade {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 8;
}

/* ==========input========= */
input {
    font-size: 0.24rem;
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

.black-bg {
    background: rgba(255, 255, 255, 1);
}
</style>
