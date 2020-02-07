<template>
    <!-- 收入明细列表 -->
    <div class="receiptAll-wrap wrap">
        <Header v-bind:head_data="comData.head_data"></Header>
        <div class="seleTitle">
            <div :class="showBox == 1?'switching':'black-title'" @click="seleTitle('all')">全部</div>
            <div :class="showBox == 2?'switching':'black-title'" @click="seleTitle('come')">支出</div>
            <div :class="showBox == 3?'switching':'black-title'" @click="seleTitle('enter')">收入</div>
        </div>
        <div class="receiptAll-content">
            <div id="minirefresh" class="minirefresh-wrap list-wrap" v-if="showBox == 1">
                <div class="minirefresh-scroll list-box">
                    <ul class="list">
                        <div class="receiptAll-strip" v-for="item in cellData" @click="receiptDetail(item)">
                            <div class="receiptAll-des" v-text="item.title"></div>
                            <div class="receiptAll-time" v-text="item.create_time"></div>
                            <div class="receiptAll-price green-color" v-if="item.flag == 1">+<span v-text="item.money"></span></div>
                            <div class="receiptAll-price red-color" v-if="item.flag == 2">-<span v-text="item.money"></span></div>
                        </div>
                    </ul>
                </div>
            </div>
            <div id="minirefresh" class="minirefresh-wrap list-wrap" v-if="showBox == 2">
                <div class="minirefresh-scroll list-box">
                    <ul class="list">
                        <div class="receiptAll-strip" v-for="item in cellData" @click="receiptDetail(item)">
                            <div class="receiptAll-des" v-text="item.title"></div>
                            <div class="receiptAll-time" v-text="item.create_time"></div>
                            <div class="receiptAll-price red-color" v-if="item.flag == 2">-<span v-text="item.money"></span></div>
                        </div>
                    </ul>
                </div>
            </div>
            <div id="minirefresh" class="minirefresh-wrap list-wrap" v-if="showBox == 3">
                <div class="minirefresh-scroll list-box">
                    <ul class="list">
                        <div class="receiptAll-strip" v-for="item in cellData" @click="receiptDetail(item)">
                            <div class="receiptAll-des" v-text="item.title"></div>
                            <div class="receiptAll-time" v-text="item.create_time"></div>
                            <div class="receiptAll-price green-color" v-if="item.flag == 1">+<span v-text="item.money"></span></div>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
        <NoData v-if="showNoData"></NoData>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
import NoData from "@/components/multi/NoData";
export default {
    name: "ReceiptsAll",
    components: {
        Header,
        NoData
    },
    data() {
        return {
            comData: {
                head_data: {
                    show_type: 2,
                    tit_text: '收支明细',
                    right_icon: 2,
                    showBack: false,
                    showLogo: 2, //显示头部title文字
                    showShare: 3, //1搜索2分享3菜单
                    showBg: true, //是否显示背景
                }
            },
            showNoData:false,
            showBox:1,//全部 2支出 3收入
            cellData: [],
            num:1,
            pages:'',
        };
    },
    methods: {
        seleTitle(opt) {
            if (opt == "all") {
                this.showBox = 1;
                this.getData(1,'refresh');
            } else if (opt == "come") {
                this.showBox = 2;
                this.getData(2,'refresh');
            } else if (opt == "enter") {
                this.showBox = 3;
                this.getData(3,'refresh');
            }
        },
        receiptDetail(data){
            var info = JSON.stringify(data);
            this.$router.push({name:'ReceiptsInfo',query:{info:info}})
        },
        refresh() {
            var that = this;
            that.miniRefresh = new MiniRefresh({
                container: "#minirefresh",
                down: {
                    isAuto: false,
                    bounceTime: 500,
                    callback: () => {
                        that.getData(that.showBox, "refresh");
                    }
                },
                up: {
                    isAuto: false,
                    loadFull: {
                        isEnable: false
                    },
                    isShowUpLoading: true,
                    callback: () => {
                        that.num++;
                        if(that.num <= that.pages){
                            that.getData(that.showBox, "push");
                        }else{
                            that.miniRefresh.endUpLoading(true);
                        }
                    }
                }
            });
        },
        getData(opt,select){
            var that = this;
            that.showNoData = false;
            var flag = "";
            var page = 1;
            if(opt == 2){
                flag = 2;
            }else if(opt == 3){
                flag = 1;
            }
            if(select == "push"){
                page = this.num;
            }
            that.$axios.post(process.env.API_HOST+"billInfo",{
                flag:flag,
                page:page,
            }).then((res)=>{
                // console.log(res);
                if(res.status == 200){
                    if(res.data.code == 200){
                        var data = res.data.data.data;
                        if(select == 'refresh'){
                            if(data == ""){
                                that.miniRefresh.endDownLoading();
                                that.showNoData = true;
                                that.cellData = "";
                            }else{
                                that.showNoData = false;
                                that.miniRefresh.endDownLoading();
                                that.cellData = data;
                                that.num = res.data.data.current_page;
                                that.pages = res.data.data.last_page;
                            }
                        }else if(select == 'push'){
                            if(data == ""){
                                that.miniRefresh.endUpLoading(true);
                            }else{
                                that.miniRefresh.endUpLoading();
                                for(var i in data){
                                    that.cellData.push(data[i]);
                                }
                            }
                        }
                    }
                }
            }).catch((err)=>{
                console.log(err)
            })
        }
    },
    mounted(){
        this.refresh();
        this.getData(1,'refresh');
    }
};
</script>
<style scoped>
.minirefresh-scroll{
    background:none;
}
.receiptAll-wrap {
    padding:0;
}
.seleTitle {
    max-width:640px;
    margin:0 auto;
    display: flex;
    text-align: center;
    line-height: 0.8rem;
    font-size: 0.26rem;
    background: #ffffff;position: fixed;
    left: 0;
    right: 0;
    top: .88rem;
    z-index:10;
}
.seleTitle div {
    width: 100%;
}
/* .red-title {
    color: #ff7e4a;
    border-bottom: 0.05rem solid #ff7e4a;
} */

.receiptAll-strip {
    border-bottom: 0.01rem solid #e5e5e5;
    position: relative;
    padding: 0.2rem 0;
}
.receiptAll-price {
    font-size: 0.26rem;
    line-height: 1.1rem;
    position: absolute;
    top: 0.2rem;
    right: 0.2rem;
}
.black-color {
    color: #333333;
}
.green-color {
    color: #45c773;
    background: none;
}
.red-color{
    color:#FF5E5E;
    background: none;
}

.receiptAll-des {
    font-size: 0.26rem;
    color: #333333;
}
.receiptAll-time {
    font-size: 0.24rem;
    color: #999999;
}

.receiptAll-content {
    /* padding: 0.2rem; */
    max-width:640px;
    height:100vh;
    margin:0 auto;
    position: relative;
}

.list-wrap {
    padding: 0 0.2rem;
    top: 2rem;
}
.list-box{
    background: #f6f8fe;
}
.list {
    background: #ffffff;
    padding-left: 0.2rem;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    padding-left: 0.2rem;
}
</style>
