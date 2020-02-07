<template>
    <div class="allinpay-wrap wrap">
        <Header :head_data="head_data"></Header>
        <div class="pay-tit">
            <img src="../../../static/img/pay/allinpay-log.png" alt="通联支付" />
        </div>
        <div class="card-hint">请选择已绑定的银行卡</div>
        <div class="card-cell" v-for="(item,index) in card_info" :key="index" @click="seleCard(index)">
            <div class="card-name" v-text="item.bank_name"></div>
            <div class="card-type" v-if="item.card_type == '00'">储蓄卡</div>
            <div class="card-type" v-else-if="item.card_type == '02'">信用卡</div>
            <div class="card-num" v-text="item.bank_no"></div>
            <img :src="item.issele?'../../../static/img/pay/seleCard.png':'../../../static/img/pay/noSeleCard.png'" :alt="item.issele?'已选':'未选'">
        </div>
        <div class="add-card-btn" @click="addCard()">添加银行卡</div>
        <div class="btn" @click="addInfo()">确认并前往支付</div>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
export default {
    name: "AllinpaySelect",
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
                    if(that.card_info[i].issele){
                        that.bank_id = that.card_info[i].bank_id;
                        that.bank_name = that.card_info[i].bank_name;
                    }else{
                        that.bank_id = '';
                    }
                    continue;
                }
                that.card_info[i].issele = false;
            }
        },
        addCard(){
            this.$router.push({path:'/allinpay-addinfo',query:this.$route.query});
        },
        addInfo(){
            let that = this;
            if(that.bank_id){
                var info = JSON.parse(that.$route.query.p_method);
                info.request.bank_id = that.bank_id;
                info.bank_name = that.bank_name;//不在提交数据里,所以放在提交数据外
                info = JSON.stringify(info);
                sessionStorage.p_method = info;
                that.$router.push({name:'Pay',params:{info:info}});
            }else{
                mui.toast("请您选择银行卡", { duration: "short", type: "div" });
            }
        },
        getData(){
            var that = this;
            that.$axios.post(`${that.baseURL}sign_info`).then((res) => {
                if(res.status == 200){
                    if(res.data.code == 200){
                        for(var i in res.data.data){
                            res.data.data[i].issele = false;
                        }
                        that.card_info = res.data.data;
                    }
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    },
    mounted(){
        let that = this;
        let info = this.$route.query.p_method;
        if(info == sessionStorage.p_method){
            this.getData();
        }else{
            this.$router.go(-1);
        }
    },
    data() {
        return {
            head_data:{
                show_type:2,
                right_icon:'',
                tit_text:'银行卡',
            },
            card_info:[],
            bank_id:''
        };
    }
};
</script>
<style lang="scss" scoped>
.allinpay-wrap {
    background: #ffffff;
    padding-bottom: 1rem;
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
    .card-hint{
        color:#999999;font-size:.24rem;margin:0 0 .2rem .4rem;
    }
    .card-cell{
        background:#666666;width:6.86rem;height:2.24rem;border-radius:.1rem;color:#FFFFFF;margin:0 auto .3rem;
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
        width:6.85rem;height:.8rem;border-radius:.15rem;color:#22AFFE;font-size:.24rem;margin: 0 auto;text-align:center;line-height:.8rem;
        -webkit-box-shadow: 0 0 .15rem #999999;
        -moz-box-shadow:  0 0 .15rem #999999;
        box-shadow: 0 0 .15rem #999999;
    }
    .btn{
        width:7.17rem;
        height:1.17rem;
        font-size:.24rem;
        color:#F5F5F5;
        text-align:center;
        line-height: 1rem;
        margin: .2rem auto 0;background:url(../../../static/img/pay/code-btn-bg.png) no-repeat;background-size:7.17rem 1.17rem;
        
    }
}
</style>

