<template>
    <div class="allinpay-wrap wrap" :class="defeat_call?'grey-bg':''">
        <Header :head_data="head_data"></Header>
        <div class="card-info" v-if="code_call">
            <div class="pay-tit">
                <img src="../../../static/img/pay/allinpay-log.png" alt="通联支付" />
                <div>通联支付快捷支付，仅首次支付需要验证以下信息</div>
            </div>
            <div class="pay-con">
                <div class="pay-item">
                    <div class="item-left">卡类型：</div>
                    <div class="item-right choose-card">
                        <div @click="chooseFn('credit')">
                            <img :src="choose?'../../../static/img/pay/noChoose.png':'../../../static/img/pay/choose.png'" alt="">
                            <span>信用卡</span>
                        </div>
                        <div @click="chooseFn('debit')">
                            <img :src="choose?'../../../static/img/pay/choose.png':'../../../static/img/pay/noChoose.png'" alt="">
                            <span>借记卡</span>
                        </div>
                    </div>
                </div>
                <div class="pay-item">
                    <div class="item-left id-card">身份证号：</div>
                    <div class="item-right">
                        <input type="text" class="big-input" placeholder="请输入您的身份证号" v-model="id_num" oninput="value=value.replace(/\s/g,'')">
                        <div class="hint">温馨提示：末尾是X，必须大写</div>
                    </div>
                </div>
                <div class="pay-item">
                    <div class="item-left">银行卡号：</div>
                    <div class="item-right">
                        <input type="number" class="big-input" placeholder="请输入您的银行卡号" v-model="id_num">
                    </div>
                </div>
                <div class="pay-item">
                    <div class="item-left">开户名：</div>
                    <div class="item-right">
                        <input type="text" class="big-input" placeholder="请输入开户名" v-model="id_num" oninput="value=value.replace(/\s/g,'')">
                    </div>
                </div>
                <div class="pay-item">
                    <div class="item-left">预留手机号：</div>
                    <div class="item-right">
                        <input type="number" class="big-input" placeholder="请输入银行预留手机号" v-model="id_num">
                    </div>
                </div>
                <div class="pay-item" v-show="!choose">
                    <div class="item-left">有效期：</div>
                    <div class="item-right">
                        <input type="number" class="small-input" v-model="id_num">
                        <span class="layer">月</span>
                        <input type="number" class="small-input" v-model="id_num">
                        <span class="layer">年</span>
                        <span class="show-legeng" @click="imgDate = !imgDate">图例</span>
                    </div>
                </div>
                <div class="pay-item" v-show="!choose">
                    <div class="item-left">CVV2：</div>
                    <div class="item-right">
                        <input type="number" class="center-input" placeholder="银行卡背面后三位数" v-model="id_num">
                        <span class="show-legeng" @click="imgCvv2 = !imgCvv2">图例</span>
                    </div>
                </div>
            </div>
            <div class="btn" @click="showCode = true">确认并前往支付</div>
            <div class="pop" v-if="imgCvv2 || imgDate" @click="imgCvv2?imgCvv2 = false:'';imgDate?imgDate = false:''">
                <img class="pop-img" src="../../../static/img/pay/cvv2.png" alt="安全校验码"  v-show="imgCvv2">
                <img class="pop-img" src="../../../static/img/pay/date.png" alt="有效时间月/年"  v-show="imgDate">
            </div>
            <div class="pop" v-show="showCode">
                <div class="code-box">
                    <div class="code-tit">
                        <div class="code-tit-top">通联支付</div>
                        <div class="code-tit-bot">工商银行</div>
                    </div>
                    <div class="code-con">
                        <div class="code-price">￥<span v-text="codePrice"></span></div>
                        <input type="number" v-model="code" placeholder="请输入验证码"><span class="code-get-btn" v-text="codeText" @click="getCode()"></span>
                        <div class="code-hint">验证码已发送至<span v-text="codePhone"></span>手机上</div>
                        <div class="btn-all code-enter-btn">确认</div>
                    </div>
                    <div class="code-bot">
                        <img src="../../../static/img/pay/close.png" alt="关闭" @click="showCode = false">
                    </div>
                </div>
            </div>
        </div>
        <div class="pay-call success_box" v-if="success_call">
            <img class="call-img" src="../../../static/img/pay/success.png" alt="支付成功">
            <div class="paid">
                已支付<span>￥<span v-text="success_paid"></span>元</span>
            </div>
            <div class="btn-all pay-enter-btn">返回首页</div>
            <div class="btn-all btn-out">查看订单</div>

        </div>
        <div class="pay-call defeat_box" v-if="defeat_call">
            <div class="cause-box">
                <img class="call-img" src="../../../static/img/pay/defeat.png" alt="支付失败">
                <div>支付失败</div>
                <div class="cause">失败原因：交易无效，无法完成，支付失败，您的银行卡余额不足</div>
            </div>
            <div class="btn-all pay-enter-btn">重新支付</div>
            <div class="btn-all btn-out">退出</div>
        </div>
        <div class="sele-card-wrap" v-if="add_call">
            <div class="pay-tit">
                <img src="../../../static/img/pay/allinpay-log.png" alt="通联支付" />
            </div>
            <div class="card-hint">请选择已绑定的银行卡</div>
            <div class="card-cell" v-for="(item,index) in card_info" :key="index">
                <div class="card-name" v-text="item.name"></div>
                <div class="card-type" v-if="item.type ==1">储蓄卡</div>
                <div class="card-type" v-else-if="item.type ==2">信用卡</div>
                <div class="card-num" v-text="item.num"></div>
                <img :src="item.issele?'../../../static/img/pay/seleCard.png':'../../../static/img/pay/noSeleCard.png'" :alt="item.issele?'已选':'未选'" @click="seleCard(index)">
            </div>
            <div class="add-card-btn" @click="addCard()">添加银行卡</div>
        </div>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
export default {
    name: "Allinpay",
    components: {
        Header
    },
    watch:{
    },
    methods:{
        // 选择银行卡页面
        seleCard(index){
            var that = this;
            for(let i=0;i<that.card_info.length;i++){
                if(i == index){
                    that.card_info[i].issele = !that.card_info[i].issele;
                    continue;
                }
                that.card_info[i].issele = false;
            }
        },
        addCard(){
            this.code_call = true;this.add_call = false;
        },
        getCode(){
            var that = this;
            if(that.isGetCode){
                that.codeText = 60;
                that.isGetCode = false;
                var time = setInterval(function() {
                    that.codeText--;
                    if (that.codeText <= 0) {
                        clearInterval(time);
                        that.isGetCode = true;
                        that.codeText = "获取验证码";
                    }
                }, 1000);
            }
        },
        chooseFn(flag){
            if(flag == 'credit'){
                this.choose = false;
            }else{
                this.choose = true;
            }
        }
    },
    data() {
        return {
            head_data: {
                show_type:2,
                right_icon:2,
                tit_text:"支付",
                showBack: false, //显示后退按钮
                showLogo: 2, //不显示头部log
                showShare: "", //1搜索2分享
                showBg: true, //是否显示背景
                goBack: ""
            },
            code_call:false,
            success_call:false,
            defeat_call:false,
            add_call:true,
            choose:false,
            id_num:'',
            imgCvv2:false,imgDate:false,
            showCode:false,
            codePrice:'2000',
            code:'',//验证码
            isGetCode:true,
            codeText:'获取验证码',//获取验证码按钮文字显示
            codePhone:'15615616511',
            success_paid:20000,//成功支付
            card_info:[
                {name:'建设银行',type:1,num:'615048980491213156',issele:false,},
                {name:'建设银行',type:1,num:'615048980491213156',issele:false,},
                {name:'建设银行',type:1,num:'615048980491213156',issele:false,},
            ],
        };
    }
};
</script>
<style lang="scss" scoped>
.allinpay-wrap {
    background: #ffffff;
    position: relative;
    .pay-tit {
        text-align: center;
        font-size: 0.24rem;
        color: #999999;
        font-style: italic;
        img {
            width: 2.94rem;
            height: 1.22rem;
        }
    }
    .pay-con{
        margin-top:.43rem;
        .pay-item{
            margin-bottom:.3rem;
            .item-left{
                margin-right:.48rem;
                font-size:.3rem;
                color:#333333;
                width:2.13rem;
                text-align:right;
            }
            .item-left,.item-right{
                display: inline-block;
                vertical-align: middle;
            }
            .item-right{
                .big-input{
                    width:4.13rem;
                    height: .6rem;
                }
                .center-input{
                    width:2.44rem;
                    height: .6rem;
                }
                .small-input{
                    width:.92rem;
                    height: .6rem;
                }
                .hint{
                    color:#ADADAD;
                    font-size:.2rem;
                    margin-top:.1rem;
                }
                .layer{
                    margin: 0 .25rem 0 .19rem;
                    color:#444444;
                    font-size:.2rem;
                }
                .show-legeng{
                    margin-left:.35rem;
                    color:#06B8C8;
                    font-size: .22rem;
                }
            }
            .choose-card{
                div{
                    display:inline-block;
                }
                img{
                    width:.35rem;
                    height:.35rem;
                    vertical-align: middle;
                }
                span{
                    font-size:.29rem;
                    vertical-align: middle;
                    display: inline-block;
                    margin: 0 .46rem 0 .12rem; 
                }
            }
            .id-card{
                margin-top:-.5rem;
            }

        }
    }
    .btn{
        width:5.18rem;
        // height:.67rem;
        font-size:.32rem;
        color:#F5F5F5;
        text-align:center;
        line-height: .67rem;
        margin: .5rem auto 0;
        background: url(../../../static/img/pay/btn.png) no-repeat;
        background-size:  5.18rem .67rem;
        
    }
    .pop{
        position: absolute;
        top:0;bottom:0;left:0;right:0;
        background:rgba(0,0,0,.7);
        z-index:2;
        .pop-img{
            width:4.2rem;
            height:2.6rem;
            position:absolute;
            top:calc(50% - 1.3rem);
            left:calc(50% - 2.1rem);
        }
    }
    .code-box{
        width:6.54rem;
        position: absolute;
        left:calc(50% - 3.27rem);
        // font-size:0;
        top:2rem;
        .code-tit{
            width:100%;
            height:1.45rem;
            color:#FFFFFF;
            text-align:center;
            border-top-left-radius: .05rem;
            border-top-right-radius: .05rem;
            background:url(../../../static/img/pay/code-tit-bg.png);
            background-size:6.54rem 1.45rem;
            .code-tit-top{
                font-size: .4rem;
                line-height: .8rem;
            }
            .code-tit-bot{
                font-size:.32rem;
            }
        }
        .code-con{
            background:#FFFFFF;
            padding-bottom:.7rem;
            border-bottom-left-radius: .05rem;
            border-bottom-right-radius: .05rem;
            .code-price{
                color:#FF3735;
                font-size:.26rem;
                text-align: center;
                padding:.56rem 0 .41rem;
                span{
                    font-size:.64rem;
                }
            }
            input{
                width:3.77rem;
                height:.89rem;
                margin: 0 .16rem 0 .3rem;
                vertical-align: middle;
            }
            .code-get-btn{
                width:2rem;line-height: .89rem;
                font-size:.32rem;
                text-align:center;
                display:inline-block;
                background:#ff4e3a;
                color:#FFFFFF;
                vertical-align: middle;
                border-radius: .02rem;
            }
            .code-hint{
                padding-left:.3rem;font-size:.24rem;color:#5E5E5E;line-height: .6rem;
            }
            .code-enter-btn{
                color:#FFFFFF;font-size:.32rem;background:url(../../../static/img/pay/code-btn-bg.png) no-repeat;background-size:5.22rem .89rem;border-radius: .02rem;margin-top:.8rem;
            }
        }
        .code-bot{
            margin-top:.6rem;
            text-align: center;
            img{
                width:.55rem;height:.55rem;
            }
        }
    }
    .pay-call{
        text-align: center;
        .call-img{
            width:2.14rem;
            height:1.61rem;
        }
    }
    .success_box{
        .call-img{
            margin-top:.7rem;
        }
        .paid{
            margin-top:.4rem;
            font-size:.36rem;
            span{
                color:#FF3939;
            }
        }
    }
    .defeat_box{
        .call-img{
            margin:.3rem 0;
        }
        .cause-box{
            width:6.28rem;
            background:#ffffff;
            border-radius:.1rem;margin: .55rem auto 0;
            font-size:.3rem;color:#444444;
            padding-bottom:.68rem;
        }
        .cause{
            width:3.85rem;margin:.45rem auto 0;font-size:.24rem;
        }
    }
    .btn-all{
        width:5.22rem;height:.89rem;text-align:center;line-height:.89rem;margin:0 auto;

    }
    .pay-enter-btn{
        color:#FFFFFF;font-size:.36rem;background:url(../../../static/img/pay/code-btn-bg.png) no-repeat;background-size:5.22rem .89rem;border-radius: .02rem;margin-top:.7rem;
    }
    .btn-out{
        margin-top:.3rem;border:1px solid #ff4e3a;font-size:.36rem;
    }
    .card-hint{
        color:#999999;font-size:.24rem;margin:0 0 .2rem .4rem;
    }
    .card-cell{
        background:#666666;width:6.86rem;height:2.24rem;border-radius:.1rem;color:#FFFFFF;margin:0 0 .3rem .4rem;
        padding:.4rem 0 0 1rem;
        -webkit-box-shadow: 0 0 .12rem #4C7ACD;
        -moz-box-shadow:  0 0 .12rem #4C7ACD;
        box-shadow: 0 0 .12rem #4C7ACD;
        position:relative;
        img{
            width:.33rem;height:.33rem;position:absolute;top:.9rem;right:.66rem;
        }
        .card-name{
            font-size:.28rem;
        }
        .card-type{
            font-size:.18rem;
        }
        .card-num{
            font-size:.36rem;margin-top:.3rem;
        }
    }
    .add-card-btn{
        width:6.86rem;height:.98rem;border-radius:.1rem;color:#22AFFE;font-size:.3rem;margin-left:.4rem;text-align:center;line-height:.98rem;
        -webkit-box-shadow: 0 0 .15rem #999999;
        -moz-box-shadow:  0 0 .15rem #999999;
        box-shadow: 0 0 .15rem #999999;
    }
}
.grey-bg{
    background:#F8F8F8;
}
input{
    margin:0;
    font-size:.2rem;
    padding: 0 .1rem;
}
input::placeholder{
    color:#AAAAAA;
    font-size:.2rem;
}
</style>

