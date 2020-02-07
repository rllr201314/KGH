<template>
    <!-- 未支付 -->
    <div class="wrap">
        <Header v-bind:head_data="comData.head_data"></Header>
        <div class="unpaid-content">
            <div class="unpaid-cell" v-for="item in goodsData">
                <img class="badge" v-if="item.rent_method == 1" src="../../../../static/img/badge/product.png" alt="">
                <img class="badge" v-else-if="item.rent_method == 2" src="../../../../static/img/badge/rent-badge.png" alt="">
                <img class="badge" v-else-if="item.rent_method == 4" src="../../../../static/img/badge/cbg-badge.png" alt="">
                <img class="badge" v-else-if="item.rent_method == 5" src="../../../../static/img/badge/wz-badge.png" alt="">
                <div class="gameLog">
                    <img :src="item.game_logo" alt="">
                </div>
                <div class="orderInfo">
                    <div class="order-num">
                        <span>订单号</span>
                        <span v-text="item.order_sn"></span>
                    </div>
                    <div class="order-des" v-text="item.goods_title"></div>
                    <div class="price-status">
                        <span class="good-price" v-if="item.rent_method == 1 || item.rent_method == 4">￥<span v-text="item.goods_amount"></span></span>
                        <span class="good-price" v-if="item.rent_method == 2">￥<span v-text="item.order_amount"></span></span>
                        <span class="order-status dominant-bg">待支付</span>
                        <span class="history-time" v-text="item.create_time"></span>
                    </div>
                    <div class="last-time">
                        倒计时
                        <span class="time" v-text="item.minute"></span>
                        <span class="gray">分钟</span>
                        <span class="time" v-text="item.second"></span>
                        <span class="gray">秒</span>后订单将自动取消
                    </div>
                </div>
                <div class="order-operate">
                    <div class="left-operate">
                        <img src="../../../../static/img/my-center/contact_service.png" alt="">
                        <span @click="linkServer">联系客服</span>
                    </div>
                    <div class="right-operate">
                        <span class="cancel" @click="cancalOrder(item.order_id)" v-if="false">取消订单</span>
                        <span class="pay" @click="goPayFn(item.order_id,item.goods_amount,item.rent_method,item.is_relet)">前往支付</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- 遮罩 -->
        <div class="unpaidShare" v-show="showUnpaidShare"></div>

        <div class="unpaidBox" v-show="showUnpaidBox">
            <div class="unpaidBox-title">请选择您放弃交易的原因</div>
            <div class="unpaidBox-cell" v-for="item in stageOpera" @click="seleStage(item.key)">
                <img :src="item.issele?'../../../../static/img/order/okcheck.png':'../../../../static/img/order/nocheck.png'" alt=""> {{item.name}}
            </div>
        </div>
        <NoData v-if="showNoData"></NoData>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
import NoData from "@/components/multi/NoData";
export default {
    name: "BuyUnpaidStatus",
    components: {
        Header,
        NoData
    },
    data() {
        return {
            comData: {
                head_data: {
                    show_type:2,
                    tit_text:'待支付订单',
                    right_icon:2,
                }
            },
            showUnpaidBox: false, //分期选项显示
            showUnpaidShare: false, //遮罩
            goodsData: [],
            showNoData:false,
            stageOpera: [
                {
                    issele: true,
                    name: "商品与描述不符",
                    key: 1
                },
                {
                    issele: false,
                    name: "反悔不想买了%",
                    key: 2
                },
                {
                    issele: false,
                    name: "卖家不想卖了",
                    key: 3
                },
                {
                    issele: false,
                    name: "其他原因",
                    key: 4
                }
            ]
        };
    },
    methods: {
        linkServer(){
            this.$router.push({ name: 'Service' });
        },
        // 选择
        seleStage(opera) {
            var stageOpera = this.stageOpera;
            for (var i in stageOpera) {
                if (stageOpera[i].key == opera) {
                    stageOpera[i].issele = true;
                    continue;
                }
                stageOpera[i].issele = false;
            }
            this.showUnpaidBox = false; //隐藏分期首付选项
            this.showUnpaidShare = false; //隐藏遮罩
        },
        cancalOrder(opt) {
            this.showUnpaidBox = true;
            this.showUnpaidShare = true;
        },
        goPayFn(order_id,price,flag,status){
            let that = this;
            if(flag == 1 || flag == 5){//成品号或者物资号
                var all = {}
                all.order_id = order_id;
                all.pay_type = 2;//成品号未支付
                var order_info = JSON.stringify(all);
                sessionStorage.info = order_info;//改
                that.$router.push({name:'Pay',params:{info:order_info}})
            }else if(flag == 2){
                var pay_info = {};
                pay_info.order_id = order_id;
                if(status == 1){//续租未支付
                    pay_info.pay_type = 7;//续租未支付下单 ****
                }else if(status == 2){//租号未支付
                    pay_info.pay_type = 5;//租号未支付下单****
                }
                pay_info = JSON.stringify(pay_info)
                sessionStorage.info = pay_info;//改
                that.$router.push({name:'Pay',params:{info:pay_info}})
            }else if(flag == 4){
                this.$router.push({name:'CbgPlaceOrder',query:{order_id:order_id}})
            }
        },
        initTime(time){
            var mm = Math.floor((time / 60) % 60);
            var ss =  Math.floor(time %　60);
            return [mm,ss];
        },
        getData() {
            var that = this;
            that.$axios
                .post(process.env.API_HOST+"buyerTrade")
                .then(res => {
                    // console.log(res);
                    if (res.status == 200) {
                        if (res.data.code == 200) {
                            if(res.data.data == ''){
                                that.showNoData = true;
                            }else{
                                that.showNoData = false;
                                var data = res.data.data;
                                data.map((obj,index)=>{
                                    this.$set(
                                        obj,'minute',that.initTime(obj.lock_time)[0]
                                    )
                                    this.$set(
                                        obj,'second',that.initTime(obj.lock_time)[1]
                                    )
                                })
                                that.goodsData = data;
                                for(var i in that.goodsData){
                                    (function(i){
                                        var timer = setInterval(function(){
                                        that.goodsData[i].second -= 1;
                                            if(that.goodsData[i].second<=0){ 
                                                that.goodsData[i].minute-=1; 
                                                that.goodsData[i].second=60; 
                                                if(that.goodsData[i].minute<0){ 
                                                    that.goodsData[i].second = 0;
                                                    that.goodsData[i].minute = 0;
                                                    clearInterval(timer);
                                                } 
                                            }
                                        },1000) 
                                    })(i)
                                }   
                            }
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
        that.getData();
    }
};
</script>
<style scoped>
.unpaid-content {
    padding: 0.2rem;
}
.unpaid-cell {
    /* padding-left:.2rem; */
    background: #ffffff;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    margin-bottom: 0.2rem;
    padding: 0 0.2rem;
    position: relative;
}
.badge{
    width:1.03rem;
    height:1rem;
    position: absolute;
    top:0;
    right:0;
}
.gameLog {
    display: inline-block;
    vertical-align: middle;
    margin: 0 0.2rem;
}
.gameLog img {
    width: 0.8rem;
    height: 0.8rem;
}
.orderInfo {
    display: inline-block;
    vertical-align: middle;
    width: 5.3rem;
    padding: 0.3rem 0;
}
.orderInfo span {
    display: inline-block;
}
.order-num {
    color: #666666;
    font-size: 0.26rem;
    margin-bottom: 0.1rem;
}

.order-des {
    width: 4rem;
    font-size: 0.26rem;
    color: #333333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 0.1rem;
}
.price-status {
    margin-bottom: 0.2rem;
    position: relative;
}
.history-time {
    font-size:.24rem;
    color: #999999;
    position: absolute;
    top: 0;
    right: 0;
}
.good-price {
    color: #ff5e5e;
    font-size: 0.28rem;
    margin-right: 0.1rem;
}
.order-status {
    font-size: 0.2rem;
    padding: 0.01rem 0.05rem;
    color: #ffffff;
    line-height: 0.3rem;
    text-align: center;
    vertical-align: middle;
}
.last-time {
    font-size: 0.24rem;
    color: #666666;
}
.time {
    width: 0.4rem;
    height: 0.4rem;
    color: #333333;
    text-align: center;
    line-height: 0.4rem;
    border: 1px solid #aaaaaa;
    font-size: 0.26rem;
    -webkit-border-radius: 0.04rem;
    -moz-border-radius: 0.04rem;
    border-radius: 0.04rem;
    margin: 0 0.1rem;
}
.gray {
    color: #959595;
}
.order-operate {
    border-top: 0.01rem solid #e5e5e5;
    line-height: 0.8rem;
}
.order-operate div {
    display: inline-block;
}
.left-operate {
    font-size: 0.24rem;
    color: #666666;
}
.left-operate img {
    width: 0.25rem;
    height: 0.27rem;
    vertical-align: middle;
}
.left-operate span {
    vertical-align: middle;
}
.right-operate {
    font-size: 0.22rem;
    color: #ffffff;
    float: right;
}
.cancel,
.pay {
    width: 1.1rem;
    line-height: 0.44rem;
    text-align: center;
    display: inline-block;
    -webkit-border-radius: 0.04rem;
    -moz-border-radius: 0.04rem;
    border-radius: 0.04rem;
}
.cancel {
    background: #c6c6c6;
    margin-right: 0.2rem;
}
.pay {
    background: #FFA303;
}

.unpaidBox {
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
    top: 30%;
}
.unpaidBox-title {
    line-height: 0.9rem;
    padding-left: 0.2rem;
}
.unpaidBox-cell {
    line-height: 0.9rem;
    border-top: 0.01rem solid #e5e5e5;
}
.unpaidBox-cell img {
    width: 0.22rem;
    height: 0.22rem;
    margin-left: 0.16rem;
}
.unpaidShare {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 8;
}
</style>
