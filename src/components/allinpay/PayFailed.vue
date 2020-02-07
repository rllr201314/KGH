<template>
    <div class="allinpay-wrap wrap grey-bg">
        <Header :head_data="head_data"></Header>
        <div class="pay-call defeat_box">
            <div class="cause-box">
                <img class="call-img" src="../../../static/img/pay/defeat.png" alt="支付失败">
                <div>支付失败</div>
                <div class="cause">失败原因：<span v-text="msg"></span></div>
            </div>
            <div class="pay-enter-btn" @click="goPath('again')">重新支付</div>
            <div class="btn-out" @click="goPath('out')">退出</div>
        </div>
        
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
export default {
    name: "AllinpayFailed",
    components: {
        Header
    },
    watch:{
    },
    mounted(){
        this.msg = this.$route.query.msg;
    },
    methods:{
        goPath(flag){
            if(flag == 'again'){
                this.$router.push({path:'/buy-unpaid'})
            }else if(flag == 'out'){
                this.$router.push({path:'/'});
            }
        }
    },
    beforeRouteLeave(to,form,next){
        sessionStorage.removeItem('info');
        sessionStorage.removeItem('p_method')
        next();
    },
    data() {
        return {
            head_data:{
                show_type:2,
                right_icon:'',
                tit_text:'支付',
                back:1,
            },
            msg:'',
        };
    },
};
</script>
<style lang="scss" scoped>
.allinpay-wrap {
    background: #ffffff;
    .pay-call{
        text-align: center;
        .call-img{
            width:2.14rem;
            height:1.61rem;
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
    .pay-enter-btn{
        width:5.41rem;height:1.04rem;line-height: .89rem;margin:0 auto;
        color:#FFFFFF;font-size:.24rem;background:url(../../../static/img/pay/code-btn-bg.png) no-repeat;background-size:5.41rem 1.04rem;border-radius: .02rem;margin-top:.7rem;
    }
    .btn-out{
        width:5.17rem;height:.75rem;color:#FE7649;line-height:.75rem;margin:.1rem auto 0;border:1px solid #FE7649;font-size:.24rem;border-radius: .15rem;
    }
   
}
.grey-bg{
    background:#F8F8F8;
}
</style>

