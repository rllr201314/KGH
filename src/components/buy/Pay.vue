<template>
    <!-- 支付 -->
    <div class="wrap">
        <Header v-bind:head_data="componentsData.head_data"></Header>
        <div class="pay-content">
            <div class="pay-cell">
                <div class="info-title">
                    <img src="../../../static/image/vertical.png" alt />
                    <span>请选择支付方式</span>
                    <span v-text="hint"></span>
                </div>
                <div class="info-cell">
                    <div class="cell-tit">
                        <div
                            class="tit-strip"
                            @click="seleline('on')"
                            :class="is_line?'red-top':''"
                        >线上支付</div>
                        <div
                            class="tit-strip"
                            @click="seleline('no')"
                            :class="!is_line?'red-top':''"
                            v-if="showOffline"
                        >线下支付</div>
                    </div>
                    <div class="opt-cell" v-show="is_line">
                        <div class="showPay">
                            <div
                                class="pay-strip"
                                v-for="(item,index) in online"
                                :key="index"
                                @click="selePayFun(item.key)"
                                :class="item.issele?'red-border':'black-border'"
                            >
                                <img :src="item.imgsrc" alt />
                            </div>
                        </div>
                        <div class="online-hint">
                            因
                            <span v-text="charge.name"></span>支付渠道规定收取
                            <span v-text="charge.rate"></span>手续费，故加收
                            <span class="dominant-color" v-text="charge.price"></span>
                            <span class="dominant-color">元</span>
                        </div>
                    </div>
                    <div class="opt-cell remind" v-show="!is_line && off_line">
                        <img src="../../../static/img/order/wallet.png" alt />
                        <div>线下支付主要通过银行卡或支付宝进行转账。请先确认“前往支付”</div>
                    </div>
                    <div class="opt-cell-order" v-if="!is_line && !off_line">
                        <div class="order">
                            <div class="order-box">
                                <span>订单号：</span>
                                <span class="strip-con" v-text="order_num"></span>
                                <img
                                    class="copy-img"
                                    src="../../../static/img/copy.png"
                                    alt
                                    :data-clipboard-text="order_num"
                                    @click="copyFn()"
                                    id="copy"
                                />
                            </div>
                            <div class="dominant-color">转账的同时请您备注订单号以便核实</div>
                        </div>
                        <div class="pay-way">
                            <div class="pay-way-tit">
                                <img src="../../../static/img/order/zfb_ico.png" alt />
                                <span>支付宝转账</span>
                            </div>
                            <div class="pay-way-con">
                                <div class="order-box">
                                    <span>收款方：</span>
                                    <span class="strip-con" v-text="order_info.ali.username"></span>
                                    <img
                                        class="copy-img"
                                        src="../../../static/img/copy.png"
                                        alt
                                        :data-clipboard-text="order_info.ali.username"
                                        @click="copyFn()"
                                        id="copy"
                                    />
                                </div>
                                <div class="order-box">
                                    <span>支付宝账户：</span>
                                    <span class="strip-con" v-text="order_info.ali.account">></span>
                                    <img
                                        class="copy-img"
                                        src="../../../static/img/copy.png"
                                        alt
                                        :data-clipboard-text="order_info.ali.account"
                                        @click="copyFn()"
                                        id="copy"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="across"></div>
                        <div class="pay-way">
                            <div class="pay-way-tit">
                                <img src="../../../static/img/order/card.png" alt />
                                <span>银行卡转账</span>
                            </div>
                            <div class="pay-way-con">
                                <div class="order-box">
                                    <span>开户名：</span>
                                    <span class="strip-con" v-text="order_info.bank.username"></span>
                                    <img
                                        class="copy-img"
                                        src="../../../static/img/copy.png"
                                        alt
                                        :data-clipboard-text="order_info.bank.username"
                                        @click="copyFn()"
                                        id="copy"
                                    />
                                </div>
                                <div class="order-box">
                                    <span>开户行：</span>
                                    <span class="strip-con" v-text="order_info.bank.bank_name"></span>
                                    <img
                                        class="copy-img"
                                        src="../../../static/img/copy.png"
                                        alt
                                        :data-clipboard-text="order_info.bank.bank_name"
                                        @click="copyFn()"
                                        id="copy"
                                    />
                                </div>
                                <div class="order-box">
                                    <span>银行帐号：</span>
                                    <span class="strip-con" v-text="order_info.bank.account"></span>
                                    <img
                                        class="copy-img"
                                        src="../../../static/img/copy.png"
                                        alt
                                        :data-clipboard-text="order_info.bank.account"
                                        @click="copyFn()"
                                        id="copy"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pay-info">
                    <div class="left-pay-info">实际支付</div>
                    <div class="right-pay-info">
                        <div class="isbalance">
                            <div class="balance-left" @click="Balace('true')" v-if="false">
                                <img
                                    :src="deposit?'../../../static/img/goodscreen/okcheck.png':'../../../static/img/goodscreen/nocheck.png'"
                                    alt
                                />
                                <span>使用押金抵扣</span>
                            </div>
                            <div @click="Balace('false')">
                                <img
                                    :src="isbalace?'../../../static/img/goodscreen/okcheck.png':'../../../static/img/goodscreen/nocheck.png'"
                                    alt
                                />
                                <span>使用余额抵扣</span>
                            </div>
                        </div>
                        <div class="deduction" v-if="deposit || isbalace">
                            <div class="deduction-strip" v-if="deposit">
                                押金抵扣 -￥
                                <span v-text="deposit_price"></span>
                            </div>
                            <div class="deduction-strip" v-if="isbalace">
                                余额抵扣 -￥
                                <span v-text="remaining_price"></span>
                            </div>
                        </div>
                        <div class="pay-price dominant-color">
                            ￥
                            <span v-text="price"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="pop-view" v-show="show_pop">
            <div>您正在使用余额抵扣/押金抵扣</div>
            <input type="password" placeholder="请输入看个号平台的交易密码" v-model="password" />
            <div class="btn-all">
                <div class="btn okbtn" @click="subPass">确认</div>
                <div class="btn canclebtn" @click="hiddenPop">取消</div>
            </div>
        </div>
        <div class="share" v-show="show_pop"></div>
        <div class="nextBtn" @click="goPayFn" v-text="ok_text" v-if="showBtn"></div>
        <div class="pop" v-show="showCode">
            <div class="code-box">
                <div class="code-tit">
                    <div class="code-tit-top">通联支付</div>
                    <div class="code-tit-bot" v-text="bank_name"></div>
                </div>
                <div class="code-con">
                    <div class="code-price">
                        ￥
                        <span v-text="codePrice"></span>
                    </div>
                    <input type="number" v-model="code" placeholder="请输入验证码" />
                    <span class="code-get-btn" v-text="codeText" @click="getCode()"></span>
                    <div class="code-hint">
                        验证码已发送至
                        <span v-text="codePhone"></span>手机上
                    </div>
                    <div class="code-enter-btn" @click="enCodeFn()">确认</div>
                </div>
                <div class="code-bot">
                    <img src="../../../static/img/pay/close.png" alt="关闭" @click="closeCodeFn()" />
                </div>
            </div>
        </div>
        <Loading class="loading" v-show="showLoading"></Loading>
        <LinkServer v-bind:is_line="is_line" class="fixedRight"></LinkServer>
        <div class="pop" v-show="judge_pay">
            <div class="en-time">
                支付结果确认中（
                <span v-text="en_time"></span>）
            </div>
        </div>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
import Loading from "@/components/multi/Loading";
import LinkServer from "@/components/common/LinkServer";
export default {
    name: "PayTest",
    data() {
        return {
            componentsData: {
                head_data: {
                    show_type: 2,
                    tit_text: '商品下单',
                    right_icon: 2,
                },
                payInfo: {
                    showTitle: true,
                    payment: {
                        online: true,
                        noline: false
                    }
                }
            },
            charge: {
                name: '',
                price: 0,
                rate: '',
            },//线上支付手续费
            fee_info: '',//手续费信息
            password: '',//安全交易密码
            show_pop: false,
            hint: '（请在下单后40分钟之内完成支付）',
            selePrice: true,//是否可以选择余额支付或者押金支付 下单成功后不可选择
            showPaySuccess: false,
            old_price: 0,//价格
            deposit_sum: 0,//押金
            deposit_price: 0,//扣除押金
            remaining_price: 0,//扣除余额
            showBtn: true,
            stage_info: null,//分期信息
            rent_info: null,//租号信息
            rent_unpaid_o: null,//租号未支付
            relet_info: null,//租号续租
            relet_unpaid_o: null,//租号续租未支付
            order_id: null,
            ok_text: '前往支付',
            order_num: null,
            order_info: null,
            showLoading: true,
            goods_info: null,
            price: null,
            is_line: true, //线上true 线下false
            off_line: true,//未选择线下true 选择线下false
            payment_method: 2,//默认支付宝
            showOffline: true,//显示线下付款
            online: [
                // {
                //     key: 3,
                //     issele: true,
                //     imgsrc: "../../../static/img/order/allinpay.png",
                //     name:'通联'
                // },
                {
                    key: 2,
                    issele: true,
                    imgsrc: "../../../static/img/order/zfbpay.png",
                    name: '支付宝'
                },
                {
                    key: 1,
                    issele: false,
                    imgsrc: "../../../static/img/order/wxpay.png",
                    name: '微信'
                }
            ],
            isbalace: false,
            deposit: false,
            link: null,
            submitData: null,
            info_type: null,
            showCode: false,//显示短信的弹框
            bank_name: '',//选择银行卡和签约银行卡页面返回
            codePrice: '', code: '', codeText: '获取验证码', codePhone: '', isGetCode: true,
            judge_pay: false,//判断支付结果
            en_time: 10,//确认支付结果
        };
    },
    components: {
        Header,
        Loading,
        LinkServer,
    },
    watch: {
        code(newVal, oldVal) {
            if (newVal.length >= 10) {
                this.code = newVal.slice(0, 10)
            }
        }
    },
    methods: {
        // 关闭输入验证码页面
        closeCodeFn() {
            this.showCode = false;
            this.timeFn();
            this.$router.replace({ path: '/buy-unpaid' })
        },
        // 重新获取验证码
        getCode() {
            var that = this;
            if (that.isGetCode) {
                let request = {};
                request.order_sn = that.order_sn;//订单编号
                request.bank_id = that.bank_id;
                request.pay_info = that.pay_info;//返回的支付信息
                that.$axios.post(`${that.baseURL}pay_sms`, request).then((res) => {
                    if (res.status == 200) {
                        if (res.data.code == 200) {
                            that.timeFn(true);
                            that.pay_info = res.data.data.pay_info;
                            mui.toast(res.data.msg, { duration: "short", type: "div" });
                        } else if (res.data.code == 400) {
                            mui.alert(res.data.msg, "提示", "确认", "", "div");
                        }
                    }
                }).catch((err) => {
                    console.log(err)
                })
            }
        },
        // 确认验证码 银联支付
        enCodeFn() {
            var that = this;
            if (!that.code) {
                mui.alert("请输入验证码", "提示", "确认", "", "div");
                return false;
            }
            that.showLoading = true;
            let request = {};
            request.bank_id = that.bank_id;
            request.pay_info = that.pay_info;
            request.sms_code = that.code;
            request.order_sn = that.order_sn;
            that.$axios.post(`${that.baseURL}confirm_pay`, request).then((res) => {
                if (res.status == 200) {
                    that.showLoading = false;
                    if (res.data.code == 200) {
                        that.$router.push({ name: 'AllinpaySuccess', query: { sum: that.codePrice } });
                    } else if (res.data.code == 212) {
                        that.pay_info = res.data.data.pay_info;//更新支付信息
                        mui.alert(res.data.msg, "提示", "确认", "", "div");
                    } else if (res.data.code == 213) {
                        mui.toast(res.data.msg, { duration: 'short', type: 'div' });
                        that.showCode = false;
                        that.judge_pay = true;
                        let time = setInterval(function () {
                            that.en_time--;
                            if (that.en_time <= 0) {
                                clearInterval(time);
                            }
                        }, 1000)
                        setTimeout(function () {
                            that.$axios.post(`${that.baseURL}pay_search`, { order_sn: res.data.data.order_sn }).then((res) => {
                                if (res.status == 200) {
                                    if (res.data.code == 200) {
                                        that.$router.push({ name: 'AllinpaySuccess', query: { sum: that.codePrice } });
                                    } else if (res.data.code == 400) {
                                        that.$router.push({ name: 'AllinpayFailed', query: { msg: res.data.msg } })
                                    }
                                }
                            }).catch((err) => {
                                console.log(err)
                            })
                        }, 6000)
                    } else if (res.data.code == 214) {
                        that.code = '';
                        mui.alert(res.data.msg, "提示", "确认", "", "div");
                    } else if (res.data.code == 400) {
                        that.$router.push({ name: 'AllinpayFailed', query: { msg: res.data.msg } })
                    }
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        // 倒计时
        timeFn(flag) {
            var that = this;
            let timer = setInterval(() => { }, 1);
            for (let i = 0; i < timer; i++) {
                clearInterval(i)
            }
            if (flag) {
                that.codeText = 60;
                that.isGetCode = false;
                let time = setInterval(function () {
                    that.codeText--;
                    if (that.codeText <= 0) {
                        clearInterval(time);
                        that.isGetCode = true;
                        that.codeText = "获取验证码";
                    }
                }, 1000);
            }
        },
        Balace(flag) {
            var that = this;
            if (that.selePrice) {//判断可不可以选余额或者押金支付，确认支付后不可再点击
                if (flag == 'true') {//押金支付
                    that.deposit = !that.deposit;
                    that.isbalace = false;
                    if (that.deposit) {//使用
                        if (Number(that.deposit_sum) > Number(that.price)) {
                            that.deposit_price = that.price;
                            that.price = 0;
                        } else {
                            that.price = Number(that.old_price) - Number(that.deposit_sum);
                            that.deposit_price = Number(that.deposit_sum);
                        }
                    } else {
                        that.price = Number(that.old_price);
                    }
                } else if (flag == 'false') {//余额支付                   
                    that.isbalace = !that.isbalace;
                    that.deposit = false;
                    if (that.isbalace) {//选择余额支付
                        that.remaining_price = that.fee_info.remaining_deduction;//扣除余额显示
                        if (that.is_line) {//线上支付
                            var data = that.online;
                            for (var i in data) {
                                if (data[i].issele == true) {
                                    switch (data[i].name) {
                                        case "通联":
                                            that.charge.price = that.fee_info.chinapay_remaining_charge;
                                            that.price = that.fee_info.chinapay_remaining_amount;
                                            that.charge.rate = that.fee_info.chinapay_rate;
                                            break;
                                        case "支付宝":
                                            that.charge.price = that.fee_info.alli_remaining_charge;
                                            that.price = that.fee_info.alli_remaining_amount;
                                            that.charge.rate = that.fee_info.alli_rate;
                                            break;
                                        case "微信":
                                            that.charge.price = that.fee_info.wx_remaining_charge;
                                            that.price = that.fee_info.wx_remaining_amount;
                                            that.charge.rate = that.fee_info.wx_rate;
                                            break;
                                    }
                                }
                            }
                        } else {
                            that.price = that.fee_info.offline_remaining_amount;
                        }
                    } else {//取消余额支付
                        if (that.is_line) {//线上支付
                            var data = that.online;
                            for (var i in data) {
                                if (data[i].issele == true) {
                                    switch (data[i].name) {
                                        case "通联":
                                            that.charge.price = that.fee_info.chinapay_charge;
                                            that.price = that.fee_info.chinapay_amount;
                                            that.charge.rate = that.fee_info.chinapay_rate;
                                            break;
                                        case "支付宝":
                                            that.charge.price = that.fee_info.alli_charge;
                                            that.price = that.fee_info.alli_amount;
                                            that.charge.rate = that.fee_info.alli_rate;
                                            break;
                                        case "微信":
                                            that.charge.price = that.fee_info.wx_charge;
                                            that.price = that.fee_info.wx_amount;
                                            that.charge.rate = that.fee_info.wx_rate;
                                            break;
                                    }
                                }
                            }
                        } else {
                            that.price = that.fee_info.offline_amount;
                        }
                    }
                }
            }
        },
        seleline(flag) {
            var that = this;
            // 选择线上线下后默认未选余额押金抵扣
            that.isbalace = false;
            that.deposit = false;
            if (flag == "on") {
                that.is_line = true;
                that.ok_text = "前往支付";
                var data = that.online;
                for (var i in data) {
                    if (data[i].issele == true) {
                        if (data[i].name == "通联") {
                            that.price = that.fee_info.chinapay_amount;
                            that.old_price = that.fee_info.chinapay_amount;
                            that.charge.name = data[i].name;
                            that.charge.price = that.fee_info.chinapay_charge;
                            that.charge.rate = that.fee_info.chinapay_rate;
                            break;
                        } else if (data[i].name == "支付宝") {
                            that.price = that.fee_info.alli_amount;
                            that.old_price = that.fee_info.alli_amount;
                            that.charge.name = data[i].name;
                            that.charge.price = that.fee_info.alli_charge;
                            that.charge.rate = that.fee_info.alli_rate;
                            break;
                        } else if (data[i].name == "微信") {
                            that.price = that.fee_info.wx_amount;
                            that.old_price = that.fee_info.wx_amount;
                            that.charge.name = data[i].name;
                            that.charge.price = that.fee_info.wx_charge;
                            that.charge.rate = that.fee_info.wx_rate;
                            break;
                        }
                    }
                }
            } else {
                that.is_line = false;
                that.price = that.fee_info.offline_amount;
                that.old_price = that.fee_info.offline_amount;
                if (that.off_line) {
                    that.ok_text = "前往支付";
                } else {
                    that.ok_text = "查看订单";
                }
            }
        },
        // 选择线上支付 方式
        selePayFun(opt) {
            var that = this;
            // 选择线上支付后默认未选余额押金抵扣
            that.isbalace = false;
            that.deposit = false;
            var payAll = that.online;
            for (var i in payAll) {
                if (opt == payAll[i].key) {
                    payAll[i].issele = true;
                    that.payment_method = opt;
                    that.charge.name = payAll[i].name;
                    continue;
                }
                payAll[i].issele = false;
            }
            for (var i in payAll) {
                if (payAll[i].issele == true) {
                    if (payAll[i].name == "通联") {
                        that.price = that.fee_info.chinapay_amount;
                        that.old_price = that.fee_info.chinapay_amount;
                        that.charge.name = payAll[i].name;
                        that.charge.price = that.fee_info.chinapay_charge;
                        that.charge.rate = that.fee_info.chinapay_rate;
                        break;
                    } else if (payAll[i].name == "支付宝") {
                        that.price = that.fee_info.alli_amount;
                        that.old_price = that.fee_info.alli_amount;
                        that.charge.name = payAll[i].name;
                        that.charge.price = that.fee_info.alli_charge;
                        that.charge.rate = that.fee_info.alli_rate;
                        break;
                    } else if (payAll[i].name == "微信") {
                        that.price = that.fee_info.wx_amount;
                        that.old_price = that.fee_info.wx_amount;
                        that.charge.name = payAll[i].name;
                        that.charge.price = that.fee_info.wx_charge;
                        that.charge.rate = that.fee_info.wx_rate;
                        break;
                    }
                }
            }
        },
        // 复制
        copyFn() {
            let that = this;
            let clipboard = new ClipboardJS("#copy");
            clipboard.on("success", function (e) {
                clipboard.destroy();
                mui.toast("复制成功", { duration: 'short', type: 'div' });
            });
            clipboard.on("error", function (e) {
                clipboard.destory();
                mui.toast("请重新点击复制", { duration: 'short', type: 'div' });
            });
        },
        // 判断是不是JSON字符串
        isobjStr(str) {
            if (typeof str == "string") {
                try {
                    if (typeof JSON.parse(str) == "object") {
                        return true;
                    }
                } catch (e) {
                    return false;
                }
            } else {
                return false;
            }
        },
        // 提交安全交易密码
        subPass() {
            var that = this;
            that.submitData.password = that.password;
            that.subData(that.link, that.submitData);
            that.show_pop = false;
            that.password = '';
        },
        // 取消交易密码弹窗
        hiddenPop() {
            var that = this;
            that.show_pop = false;
            that.password = '';
            that.showLoading = false;
        },
        // 提交信息
        subData(url, request) {
            var that = this;
            // 如果选择余额支付 支付金额够 可以不用选择银行卡 is_remaining_sum==1//余额支付
            //判断线上支付 && 银联支付 && 没有银行卡id 
            if (request.is_remaining_sum == 1 && that.price == 0) {
                that.payFn(url, request)
            } else if (that.is_line && that.payment_method == 3 && !request.bank_id) {
                // let p_method = {};
                // p_method.url = url;
                // p_method.request = request;
                // p_method.codePrice = that.price;
                // p_method.info_type = that.info_type;
                // p_method = JSON.stringify(p_method);
                // sessionStorage.p_method = p_method;
                // if(that.fee_info.bank_sign == 1){//已签约选卡
                //     that.$router.push({name:'AllinpaySelect',query:{p_method:p_method}})
                // }else if(that.fee_info.bank_sign == 2){//未签约 添加信息
                //     that.$router.push({name:'AllinpayAddInfo',query:{p_method:p_method}})
                // }

                // 以上保留 暂时升级
                mui.alert("快捷支付升级中，请选择其他支付方式", '提示', '确认', '', 'div');
                that.showLoading = false;
            } else {
                that.payFn(url, request)
            }
        },
        payFn(url, request) {
            let that = this;
            that.$axios.post(process.env.API_HOST + url, request).then((res) => {
                that.showLoading = false;
                if (res.status == 200) {
                    if (res.data.code == 200) {
                        mui.alert(res.data.msg, '提示', '确认', '', 'div');
                        that.componentsData.head_data.back = 2;
                        if (that.is_line) {
                            var type = that.online;
                            var type_id = '';
                            for (var i in type) {
                                if (type[i].issele == true) {
                                    type_id = type[i].key;
                                    break;
                                }
                            }
                            if (type_id == 3) {
                                that.$router.push({ name: 'AllinpaySuccess', query: { sum: that.codePrice } })
                            } else if (type_id == 2) {
                                // 支付宝
                                that.$router.push({ name: 'AliPay', query: { url: res.data.data.pay_url } })
                            } else if (type_id == 1) {
                                // 微信
                                that.$router.push({ name: 'WechatPay', query: { url: res.data.data.pay_url } })
                            }
                        } else {//线下
                            var data = res.data.data;
                            that.off_line = false;
                            that.order_num = data.order_sn;
                            console.log(data.bank_account)
                            that.order_info = data.bank_account;
                            that.selePrice = false;//点击下单不可以再选择余额支付
                            if (url == 'stageBuy') {
                                that.showBtn = false;
                            } else {
                                that.ok_text = "查看订单";
                            }
                        }
                    } else if (res.data.code == 212) {//银联支付 输入验证码
                        that.order_sn = res.data.data.order_sn;
                        that.pay_info = res.data.data.pay_info;
                        that.codePhone = res.data.data.mobile;
                        that.showCode = true;
                        that.timeFn(true);
                        mui.toast(res.data.msg, { duration: "short", type: "div" });
                    } else if (res.data.code == 201) {//余额支付完成
                        // mui.toast(res.data.msg,{ duration:'short', type:'div' });
                        console.log(that.stage_info)
                        if (that.stage_info) {
                            mui.alert(res.data.msg, '提示', '确认', function () {
                                that.$router.go(-1);
                            }, 'div');
                        } else {
                            mui.alert(res.data.msg, '提示', '确认', function () {
                                that.$router.replace({ name: "BuyTradingStatus" });
                            }, 'div');
                        }
                    } else if (res.data.code == 220 || res.data.code == 221) {//通联支付
                        mui.toast(res.data.msg, { duration: "short", type: "div" });
                        let p_method = {};
                        p_method.url = url;
                        p_method.request = request;
                        // p_method.info_type = that.info_type;//注释同 mounted 从选择银行卡或添加银行卡返回
                        p_method = JSON.stringify(p_method);
                        sessionStorage.p_method = p_method;
                        if (res.data.code == 220) {//通联支付 没有签约 没绑定银行卡
                            that.$router.push({ name: 'AllinpayAddInfo', query: { p_method: p_method } })
                        } else {//通联支付 签约 选择银行卡
                            that.$router.push({ name: 'AllinpaySelect', query: { p_method: p_method } })
                        }
                    } else if (res.data.code == 202) {
                        // 未实名认证
                        mui.alert(res.data.msg, '提示', '确认', function () {
                            that.$router.push({ name: 'UserAuthentication', query: { type: 2, status: 1 } })
                        }, 'div');
                    } else if (res.data.code == 203) {
                        // 未设置安全交易密码
                        mui.alert(res.data.msg, '提示', '确认', function () {
                            that.$router.push({ name: 'Safety_Center', query: { type: 1 } });//type:1，已实名认证
                        }, 'div');
                    } else if (res.data.code == 205) {
                        // 订单已存在
                        mui.alert(res.data.msg, '提示', '确认', function () {
                            that.$router.push({ name: 'BuyUnpaidStatus', });//跳到未支付订单
                        }, 'div');
                    } else if (res.data.code == 400) {
                        mui.alert(res.data.msg, '提示', '确认', '', 'div');

                    }
                }
            }).catch((err) => {
                console.log(err);
            })
        },
        // 点击支付按钮
        goPayFn() {
            var that = this;
            if (!that.is_line && !that.off_line) {
                that.$router.push({ name: "BuyOrderAll" });//未支付
            } else {
                // 调支付
                that.showLoading = true;
                that.getData();
            }
        },
        getData() {
            var that = this;
            var request = {};
            var url;
            // 判断是下单过来还是订单过来
            if (that.goods_info && !that.order_id) {//成品号下单
                url = 'buy';
                request = that.returnRequest(url, that.goods_info);
            } else if (!that.goods_info && that.order_id) {//待支付订单 成品号 && 藏宝阁
                url = 'trading';
                request = that.returnRequest(url, that.order_id);
            } else if (that.stage_info) {//分期支付
                url = 'stageBuy';
                request = that.returnRequest(url, that.stage_info);
            } else if (that.rent_info) {//租号下单
                url = 'rentBuy';
                request = that.returnRequest(url, that.rent_info);
            } else if (that.rent_unpaid_o) {//租号未支付
                url = 'rentTrading';
                request = that.returnRequest(url, that.rent_unpaid_o);
            } else if (that.relet_info) {//续租
                url = "reletBuy";
                request = that.returnRequest(url, that.relet_info);
            } else if (that.relet_unpaid_o) {//续租未支付
                url = 'reletTrading';
                request = that.returnRequest(url, that.relet_unpaid_o);
            }
            // 判断有没有用余额支付
            if (that.isbalace && Number(that.remaining_price) > 0) {
                request.is_remaining_sum = 1;
                that.show_pop = true;//显示安全密码弹框
                that.link = url;
                that.submitData = request;
            } else {
                request.is_remaining_sum = 2;
                that.subData(url, request);
            }
        },
        returnRequest(url, request) {
            let that = this;
            let data = {};
            //选择线上还是线下支付
            if (url == 'feeInfo' || url == 'buy') {//成品号get金额 || 成品号下单***
                data.goods_id = request.goods_id;
                data.is_compact = request.is_compact;
                data.is_safe = request.is_safe;
                // 判断是否分期 不分期就没传值过来
                if (request.stage_method) {
                    data.stage_method = request.stage_method;
                    data.stage_number = request.stage_number;
                    if (data.stage_method == 3) {//自定义分期
                        data.down_payment = request.down_payment;//自定义分期金额
                    }
                }
                if (url == 'buy') {//成品号下单 加参数
                    data.mobile = request.mobile;
                    data.wx = request.wx;
                }
            }else if(url == 'paymentInfo' || url == 'trading'){//成品号未支付get金额 || 成品号未支付下单***       
                data.order_id = request.order_id;
            } else if (url == 'stageFee' || url == 'stageBuy') {//分期支付get金额 || 分期支付下单***
                data.order_id = request.order_id;
                data.stage_method = request.stage_method;//还款方式 
                // 日分期 还款金额
                if (request.stage_money) {
                    data.stage_money = request.stage_money;
                }
            } else if (url == 'rentFee' || url == 'rentBuy') {//租号get金额 || 租号下单***  rent_order
                data.goods_id = request.goods_id;
                data.lease_time = request.lease_time;
                if (request.package_id) {
                    data.package_id = request.package_id;
                }
                if (url == 'rentBuy') {//成品号下单 加参数
                    data.mobile = request.mobile;
                    data.wx = request.wx;
                }
            } else if (url == 'rentPayment' || url == 'rentTrading' || url == 'reletTrading') {//租号&&续租 未支付get金额 || 租号&&续租未支付下单***
                data.order_id = request.order_id;
            } else if (url == 'reletFee' || url == 'reletBuy') {//续租get金额 ||续租下单***
                data.order_id = request.order_id;
                data.lease_time = request.lease_time;
                if (url == 'reletBuy') {//续租下单 加参数   relet_order
                    data.mobile = request.mobile;
                    data.wx = request.wx;
                }
            }

            // 支付方式 ***
            if (that.is_line) {
                data.payment_method = that.payment_method;
                // 判断支付方式为银联支付 && 有选银行卡
                if (data.payment_method == 3 && request.bank_id) {
                    data.bank_id = request.bank_id;
                }
            } else {
                data.payment_method = 4;//选择线下支付
            }
            return data;
        },
        // 计算手续费和金额
        Fee(url, request) {
            let that = this;
            var data = that.returnRequest(url, request);
            that.$axios.post(`${that.baseURL + url}`, data).then((res) => {
                // console.log(res);
                if (res.status == 200) {
                    if (res.data.code == 200) {
                        that.showLoading = false;
                        that.fee_info = res.data.data;
                        var data = that.online;
                        for (var i in data) {
                            if (data[i].issele == true) {
                                if (data[i].name == "支付宝") {
                                    that.price = that.fee_info.alli_amount;
                                    that.old_price = that.fee_info.alli_amount;
                                    that.charge.name = data[i].name;
                                    that.charge.price = that.fee_info.alli_charge;
                                    that.charge.rate = that.fee_info.alli_rate;
                                    break;
                                }
                            }
                        }
                        //成品号未支付 租号未支付 
                        if (request.pay_type == 2 || request.pay_type == 5) {
                            that.hint = '（' + res.data.msg + '）';
                        }
                    } else if (res.data.code != 401) {
                        mui.alert(res.data.msg, '提示', '确认', function () {
                            that.$router.go(-1);
                        }, 'div')
                    }
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        judgeFee(info_type) {
            let that = this;
            if (info_type.pay_type == 1) {//成品号下单
                that.goods_info = info_type;
                that.Fee('feeInfo', info_type)
            } else if (info_type.pay_type == 2 || info_type.pay_type == 8) {//未支付订单 成品号 && 藏宝阁
                that.order_id = info_type;
                that.Fee('paymentInfo',info_type);         
            }else if(info_type.pay_type == 3){//分期支付
                that.stage_info = info_type;
                that.Fee('stageFee', info_type)
            } else if (info_type.pay_type == 4) {//租号
                that.rent_info = info_type;
                that.Fee('rentFee', info_type)
            } else if (info_type.pay_type == 5) {//租号未支付
                that.rent_unpaid_o = info_type;
                that.Fee('rentPayment', info_type)
            } else if (info_type.pay_type == 6) {//续租
                that.relet_info = info_type;
                that.Fee('reletFee', info_type);
            } else if (info_type.pay_type == 7) {//续租未支付
                that.relet_unpaid_o = info_type;
                that.Fee('rentPayment', info_type);
            } else if (!info_type.pay_type) {
                that.$router.go(-1);
            }
        }
    },
    mounted() {
        var that = this;
        let info = sessionStorage.getItem('info');
        let p_method = sessionStorage.getItem('p_method');
        if (that.$route.params.info == info) {
            if (that.isobjStr(info)) {
                let info_type = JSON.parse(info);
                that.info_type = info_type;
                that.judgeFee(info_type)
            }
        } else if (that.$route.params.info == p_method) {//选择银行卡或者签约完银行卡回来
            if (that.isobjStr(p_method)) {
                let p_request = JSON.parse(p_method);
                // that.info_type = p_request.info_type;
                that.bank_name = p_request.bank_name;
                that.codePrice = p_request.codePrice;
                that.bank_id = p_request.request.bank_id;
                that.subData(p_request.url, p_request.request);//直接调用支付方法。
                //暂时需求不需要，因下单完成直接扣除余额，再调获取金额接口会产生手续费以扣除bug,因此info_type对象暂时不需用传递
                // that.judgeFee(p_request.info_type);
            }
        } else {
            that.$router.go(-1);
        }

    },
    beforeRouteLeave(to, from, next) {
        if (to.path == '/place-order' || to.path == '/rent-orders') {
            sessionStorage.removeItem('p_method');
            sessionStorage.removeItem('info');
            this.$router.go(-3);//跳转到选择游戏类型
        } else if (to.path == '/installment') {
            sessionStorage.removeItem('p_method');
            sessionStorage.removeItem('info');
            this.$router.go(-1);
        } else {
            next();
        }
    },
};
</script>
<style scoped lang="scss">
.pay-content {
    padding: 0.2rem 0.2rem 0;
}
.pay-cell {
    padding: 0 0.2rem;
    background: #ffffff;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    margin-bottom: 0.2rem;
}
.info-title {
    line-height: 0.7rem;
    /* border-bottom:1px solid #e5e5e5; */
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.info-title span {
    display: inline-block;
    color: #333333;
    font-size: 0.28rem;
}
.info-title span:nth-last-child(1) {
    font-size: 0.26rem;
    color: #999999;
}
.info-title img {
    width: 0.08rem;
    height: 0.25rem;
    margin-right: 0.1rem;
    border-radius: 0.1rem;
}

.pay-info {
    font-size: 0.26rem;
    padding: 0.4rem 0;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
}
.left-pay-info {
    width: 1.6rem;
}
.right-pay-info {
    width: 100%;
}
.isbalance {
    margin: 0.2rem 0;
}
.isbalance img {
    width: 0.28rem;
    height: 0.28rem;
    vertical-align: middle;
}
.isbalance span {
    vertical-align: middle;
}
.isbalance div {
    display: inline-block;
}
.balance-left {
    margin-right: 0.8rem;
}
.deduction {
    background: #f6f6f6;
    -webkit-border-radius: 0.06rem;
    -moz-border-radius: 0.06rem;
    border-radius: 0.06rem;
    padding: 0.2rem;
    color: #999999;
    margin-bottom: 0.2rem;
}
.deduction div {
    margin-bottom: 0.15rem;
}
.deduction div:nth-last-child(1) {
    margin-bottom: 0;
}

/* 下一步 */
.nextBtn {
    color: #ffffff;
    font-size: 0.28rem;
    margin: 0.5rem auto;
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
.info-cell {
    font-size: 0;
}
.cell-tit {
    display: flex;
    justify-content: flex-start;
    font-size: 0.26rem;
    height: 0.56rem;
    line-height: 0.56rem;
    position: relative;
    top: 1px;
}
.cell-tit div {
    width: 1.65rem;
    text-align: center;
    /* border-bottom: 1px solid red; */
}
.red-top {
    // border-top: 0.05rem solid #ff7e4a;
    border-left: 1px solid #e5e5e5;
    border-right: 1px solid #e5e5e5;
    border-bottom: 1px solid #ffffff;
}
.opt-cell {
    padding: 0.4rem 0 0.2rem;
    border: 1px solid #e5e5e5;
}
.opt-cell-order {
    font-size: 0.24rem;
    border: 1px solid #e5e5e5;
}
/* 确认订单 */
.order {
    width: 6.14rem;
    margin: 0.2rem auto 0.1rem;
    padding: 0.2rem 0.5rem;
    background: #f6f8fe;
    border-top-left-radius: 0.53rem;
    border-top-right-radius: 0.53rem;
    border-bottom-left-radius: 0.53rem;
    border-bottom-right-radius: 0.53rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
}
.order-box {
    color: #999999;
    margin-bottom: 0.1rem;
}
.copy-img {
    width: 0.2rem;
    height: 0.24rem;
}
.strip-con {
    color: #666666;
    margin: 0 0.15rem;
}
.pay-way {
    padding: 0.2rem 0.1rem 0.1rem;
}
.across {
    width: 100%;
    height: 0.1rem;
    background: #f6f8fe;
}
.pay-way-tit {
    font-weight: bold;
}
.pay-way-tit img {
    width: 0.4rem;
    height: 0.4rem;
    vertical-align: middle;
}
.pay-way-con {
    margin-left: 0.5rem;
}
/* 线上支付 */
.showPay {
    display: flex;
    justify-content: flex-start;
    padding-left: 0.4rem;
}
/* 线下支付 */
.remind {
    display: flex;
    justify-content: flex-start;
    padding: 0.4rem 0.2rem 0.4rem 0.14rem;
    align-items: center;
}
.remind img {
    width: 0.89rem;
    height: 0.89rem;
    margin-right: 0.21rem;
}
.remind div {
    color: #999999;
    font-size: 0.26rem;
}

.pay-strip {
    width: 1.4rem;
    height: 0.58rem;
    margin-right: 0.5rem;
    overflow: hidden;
}
.pay-strip img {
    width: 1.4rem;
    height: 0.58rem;
}
.red-border {
    border: 1px solid #ff8b45;
}
.black-border {
    border: 1px solid #dddddd;
}
.online-hint {
    font-size: 0.24rem;
    color: #999999;
    margin: 0.28rem 0 0 0.4rem;
}

.pop-view {
    width: 5rem;
    height: 3.28rem;
    background: #ffffff;
    padding: 0.31rem;
    color: #666666;
    font-size: 0.28rem;
    line-height: 0.6rem;
    border-radius: 0.1rem;
    position: fixed;
    top: 30%;
    left: calc(50% - 2.5rem);
    z-index: 15;
}
.pop-view input {
    font-size: 0.24rem;
    width: 100%;
    color: #999999;
    margin: 0;
}
.btn-all {
    display: flex;
    justify-content: flex-start;
}
.btn {
    width: 1.89rem;
    border-radius: 0.3rem;
    text-align: center;
    margin: 0 0.15rem;
    color: #ffffff;
    margin-top: 0.4rem;
}
.okbtn {
    background: #ffa303;
}
.canclebtn {
    background: #c6c6c6;
}
.share {
    background: rgba(0, 0, 0, 0.3);
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}
@media (max-width: 1440px) {
    .fixedRight {
        right: 0 !important;
        margin-right: 0 !important;
    }
}
@media (min-width: 1440px) {
    .fixedRight {
        right: 50% !important;
        margin-right: -307px;
    }
}
.loading {
    z-index: 4;
}
.pop {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 2;
    .pop-img {
        width: 4.2rem;
        height: 2.6rem;
        position: absolute;
        top: calc(50% - 1.3rem);
        left: calc(50% - 2.1rem);
    }
}
.en-time {
    width: 6rem;
    position: absolute;
    top: 4rem;
    left: calc(50% - 3rem);
    line-height: 2rem;
    background: #ffffff;
    text-align: center;
}
.code-box {
    width: 6.54rem;
    position: absolute;
    left: calc(50% - 3.27rem);
    // font-size:0;
    top: 2rem;
    .code-tit {
        width: 100%;
        height: 1.45rem;
        color: #ffffff;
        text-align: center;
        border-top-left-radius: 0.05rem;
        border-top-right-radius: 0.05rem;
        background: url(../../../static/img/pay/code-tit-bg.png);
        background-size: 6.54rem 1.45rem;
        .code-tit-top {
            font-size: 0.4rem;
            line-height: 0.8rem;
        }
        .code-tit-bot {
            font-size: 0.32rem;
        }
    }
    .code-con {
        background: #ffffff;
        padding-bottom: 0.7rem;
        border-bottom-left-radius: 0.05rem;
        border-bottom-right-radius: 0.05rem;
        padding-top: 0.56rem;
        .code-price {
            color: #ff3735;
            font-size: 0.26rem;
            text-align: center;
            padding: 0 0 0.41rem;
            span {
                font-size: 0.64rem;
            }
        }
        input {
            width: 2.54rem;
            height: 0.6rem;
            margin: 0 0.66rem 0 0.67rem;
            vertical-align: middle;
            background: #f0f0f0;
            border: 0;
            font-size: 0.24rem;
        }
        input::placeholder {
            color: #bcbcbc;
        }
        .code-get-btn {
            width: 1.96rem;
            line-height: 0.6rem;
            font-size: 0.22rem;
            text-align: center;
            display: inline-block;
            background: #ffffff;
            color: #fe7649;
            vertical-align: middle;
            border-radius: 0.15rem;
            border: 1px solid #fe7649;
        }
        .code-hint {
            padding-left: 0.67rem;
            font-size: 0.24rem;
            color: #999999;
            line-height: 0.6rem;
            span {
                color: #666666;
            }
        }
        .code-enter-btn {
            color: #ffffff;
            font-size: 0.28rem;
            background: url(../../../static/img/pay/code-btn-bg.png) no-repeat;
            background-size: 5.22rem 1.04rem;
            border-radius: 0.02rem;
            margin-top: 0.8rem;
            width: 5.22rem;
            height: 1.04rem;
            text-align: center;
            line-height: 0.89rem;
            margin: 0.2rem auto 0;
        }
    }
    .code-bot {
        margin-top: 0.6rem;
        text-align: center;
        img {
            width: 0.55rem;
            height: 0.55rem;
        }
    }
}

input[type="password"]{
  height: .5rem;
  padding: .1rem .15rem;
}
</style>

