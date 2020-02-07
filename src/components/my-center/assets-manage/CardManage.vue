<template>
    <!-- 银行卡管理 -->
    <div class="wrap">
        <Header v-bind:head_data="head_data"></Header>
        <div class="cardmanage-content">
            <div class="add-card" v-if="pageType==1">
                <img src="../../../../static/img/assets-manage/bank_card.png" alt @click="addCard" />
                <div>您还未绑定任何银行卡，请先完成绑定</div>
            </div>
            <div class="manange-card" v-else-if="pageType==2">
                <div class="manange-top">
                    <img src="../../../../static/image/vertical.png" alt="">
                    <span>请选择默认账户</span>
                </div>
                <div class="manange-content">
                    <div
                        class="manange-strip"
                        v-for="(item,index) in cardData"
                        @click="seleBank(item.account_id)"
                        :key="index"
                    >
                        <img
                            class="bank-ico"
                            :src="item.withdraw_method == 1?'../../../../static/img/assets-manage/yl.png':'../../../../static/img/assets-manage/zfb.png'"
                            alt
                        />
                        <div class="bank-info" v-if="item.withdraw_method == 1">
                            <div class="bank-name" v-text="item.open_bank"></div>
                            <div class="bank-num">
                                银行卡：
                                <span v-text="item.account"></span>
                            </div>
                        </div>
                        <div class="bank-info" v-else-if="item.withdraw_method == 2">
                            <div class="bank-name" v-text="item.name"></div>
                            <div class="bank-num">
                                账户：
                                <span v-text="item.account"></span>
                            </div>
                        </div>
                        <img
                            v-show="item.is_default == 1"
                            class="ok-ico"
                            src="../../../../static/img/assets-manage/ok_ico.png"
                            alt
                        />
                    </div>
                </div>
            </div>
        </div>
        <Loading v-if="showLoading"></Loading>
    </div>
</template>
<script>
import Header from '@/components/home-page/Header';
import Loading from "@/components/multi/Loading";
export default {
    name: 'CardManage',
    components: {
        Header,
        Loading
    },
    data() {
        return {
            head_data: {
                show_type: 2,
                tit_text: '选择银行卡',
                right_icon: 2,
                identify: null,
            },
            showLoading: false,
            pageType: 1,//控制页面是添加银行卡还是选择银行卡----
            cardData: []
        }
    },
    mounted() {
        var that = this;
        if (that.$route.query.type) {
            if (that.$route.query.type == 1) {
                that.pageType = 2;
            } else {
                that.$router.go(-1);
            }
        } else {
            that.$router.go(-1);
        }
        that.head_data.identify = that.$route.query.identify;
        if (this.pageType == 1) {
            this.head_data.right_icon = '';
        } else {
            this.head_data.right_icon = 3;
            this.head_data.tit_text = "账户管理";
            that.getData();
        }
    },
    methods: {
        addCard() {
            this.$router.push({ name: 'UserAuthentication', query: { type: this.$route.query.identify } });
        },
        // 选择默认账户
        seleBank(opt) {
            var that = this;
            var cardData = that.cardData;
            that.showLoading = true;
            that.$axios.post(process.env.API_HOST + "defaultAccount", {
                account_id: opt,
            }).then((res) => {
                // console.log(res);
                if (res.status == 200) {
                    if (res.data.code == 200) {
                        var cardData = that.cardData;
                        for (var i in cardData) {
                            if (opt == cardData[i].account_id) {
                                cardData[i].is_default = 1;
                                continue;
                            }
                            cardData[i].is_default = 2;
                        }
                    }
                    that.showLoading = false;
                    mui.toast(res.data.msg, { duration: "short", type: "div" });
                    that.$router.go(-1);
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        getData() {
            var that = this;
            that.$axios.post(process.env.API_HOST + "accountInfo ").then((res) => {
                // console.log(res);
                if (res.status == 200) {
                    if (res.data.code == 200) {
                        that.cardData = res.data.data;
                    }
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    }
}
</script>
<style scoped>
.cardmanage-content {
    font-size: 0.26rem;
    color: #333333;
    padding: 0.2rem;
}
.add-card {
    text-align: center;
}
.add-card img {
    width: 1.57rem;
    height: 1.26rem;
    margin: 3rem 0 0.7rem;
}

.manange-card {
    background: #ffffff;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
}
.manange-top {
    line-height: 0.7rem;
    border-bottom: 0.01rem solid #e5e5e5;
}
.manange-top span {
    display: inline-block;
    color: #333333;
    font-size: 0.28rem;
}
.manange-top img {
    width: 0.13rem;
    height: 0.29rem;
    margin-left: 0.17rem;
    vertical-align: middle;
}
.manange-content {
    padding-left: 0.2rem;
}
.manange-strip {
    padding: 0.2rem 0;
    border-bottom: 0.01rem solid #e5e5e5;
    position: relative;
}
.bank-ico {
    width: 0.58rem;
    height: 0.58rem;
    vertical-align: middle;
    margin-right: 0.2rem;
}
.bank-info {
    display: inline-block;
    vertical-align: middle;
    line-height: 0.4rem;
    font-size: 0.26rem;
}
.bank-name {
    color: #333333;
}
.bank-num {
    color: #666666;
}
.ok-ico {
    width: 0.28rem;
    height: 0.2rem;
    position: absolute;
    right: 0.2rem;
    top: calc(50% - 0.1rem);
}
</style>
