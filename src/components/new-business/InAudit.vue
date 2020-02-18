<template>
    <!-- 审核中 -->
    <div class="wrap service-fulfillment">
        <Header v-bind:head_data="head_data"></Header>
        <div class="to-examine-main">
            <img :src="to_examine_img1" alt="">
            <div class="to-examine-box">
                <span v-text="audit_t"></span>
                <span v-text="audit_d"></span>
            </div>
            <img :src="to_examine_img2" alt="" @click="toHome">
        </div>
        <Loading v-show="showLoading"></Loading>
    </div>
</template>
<script>
import Header from '@/components/home-page/Header'
import Loading from '@/components/multi/Loading'
export default {
    name:"InAudit",
    components:{
        Header,
        Loading
    },
    data(){
        return{
            head_data:{
                //1搜索2分享3菜单
                show_type:2,
                right_icon:"",
                tit_text:'申请结果',
            },
            to_examine_img1:'../../../static/image/to-examine.png',
            to_examine_img2:'../../../static/image/return-button.png',
            audit_t:'',
            audit_d:'',
            showLoading:true,
            
        }
    },
    methods: {

        getData(){
            var that = this;
            that.$axios.post(`${that.baseURL}openStatus`).then((res) => {
                console.log(res);
                if(res.status == 200){
                    if(res.data.code == 200){
                        that.showLoading = false;
                        if(res.data.data.status == 1){
                            //审核中
                            that.audit_t = '申请审核中';
                            that.audit_d = '平台将于T+1日内完成资料审核,并将审核结果以短信形式通知您';
                        }else if(res.data.data.status == 2){
                            //拒绝，未通过审核或未申请
                            that.audit_t = '审核拒绝';
                            that.audit_d = '平台将于T+1日内完成资料审核,并将审核结果以短信形式通知您';
                        }else if(res.data.data.status == 3){
                            //审核已通过
                            that.$router.push({name:'MyShop'})
                        }
                    }
                }
            })
        },
        toHome(){
            this.$router.push({path:'/'})
        }

    },
    mounted(){
        this.getData();
    }

}
</script>

<style lang="scss" scoped>
.service-fulfillment{
    .to-examine-main{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img:nth-child(1){
            display: inline-block;
            width: 3.32rem;
            height:2.4rem;
            margin: 1.23rem 2.08rem .77rem 2.1rem;
        }
        .to-examine-box{
            width: 3.6rem;
            text-align: center;
            span{
                font-family:PingFang SC;
                display: inline-block;
            }
            span:nth-child(1){
                font-size: .34rem;
                line-height: .49rem;
                font-weight:bold;
                color: #333333;
                margin-bottom: .34rem;
            }
            span:nth-child(2){
                font-size: .24rem;
                line-height: .5rem;
                font-weight: 500;
                color: #666666;
            }
        }
        img:nth-child(3){
            width: 1.93rem;
            height: .56rem;
            margin-top: .58rem;
        }
    }
}

</style>