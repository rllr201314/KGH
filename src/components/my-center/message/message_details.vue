<template>
    <div class="wrap">
        <Header v-bind:head_data="head_data"></Header>
        <div class="details-con">
            <div class="con-title">
                <div v-text="info.title"></div>
                <div v-text="info.create_time"></div>
            </div>
            <div class="con-des" v-html="info.content"></div>
        </div>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
export default {
    name:'Message_Details',
    data(){
        return {
            head_data:{
                show_type:2,
                right_icon:2,
                tit_text:"系统消息",
            },
            info:{},
        }
    },
    components:{
        Header,
    },
    methods:{
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
        getData_message(msg_id){
            var that = this;
            that.$axios.post(process.env.API_HOST+"msgContent",{
                msg_id:msg_id
            }).then((res)=>{
                // console.log(res);
            }).catch((err)=>{
                console.log(err);
            })
        }
    },
    mounted(){
        var that = this;
        var sign = that.$route.query.sign;
        if(sessionStorage.getItem('sign') == sign && sign){
            if(that.isobjStr(sign)){
                that.info = JSON.parse(sign);
                that.getData_message(that.info.msg_id)
            }else{
                that.$router.go(-1);
            }
        }else{
            that.$router.go(-1);
        }
    }
}
</script>
<style scoped>
.details-con{
    background:#ffffff;
    padding:0 .3rem;
}
.con-title{
    text-align: center;
    padding:.4rem 0 .2rem;
    border-bottom:1px solid #E5E5E5;
}
.con-title :first-child{
    font-size:.3rem;
    font-weight: bold;
    color:#333333;
    line-height: .5rem;
}
.con-title :last-child{
    font-size:.24rem;
    color:#999999;
    line-height: .5rem;
}
.con-des{
    min-height:4rem;
    text-indent:.2rem;
    padding:.28rem 0;
    font-size:.26rem;
    color:#666666;
}
</style>
