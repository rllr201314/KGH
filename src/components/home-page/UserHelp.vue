<template>
    <!-- 用户帮助 -->
    <div class="user-help">
        <div class="is-service" @click="toLink('authent')">
            <img src="../../../static/img/eye_ico.png" alt />
            <span>真假客服鉴定</span>
        </div>
        <div class="vertical"></div>
        <div class="consult" @click="toLink('service')">
            <img src="../../../static/img/dialog_ico.png" alt />
            <span>在线咨询</span>
        </div>
        <div class="vertical"></div>
        <div class="sell" @click="toLink('counter')" v-if="type == 1">
            <img src="../../../static/img/counter.png" alt />
            <span>分期计算器</span>
        </div>
        <div class="sell" @click="toLink('rent')" v-else-if="type == 2">
            <img src="../../../static/img/rent-icon.png" alt />
            <span>我要出租</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "UserHelp",
    data(){
        return{
            type:null,
        }
    },
    methods: {
        toLink(flag) {
            var that = this;
            if (flag == 'authent') {
                that.$router.push({ name: 'Authenticity' })
            } else if (flag == 'counter') {
                that.$router.push({ name: 'StageCounter' });
            } else if(flag == 'service'){
                that.$router.push({ name: 'Service' });
            } else if(flag == 'rent'){
                that.$router.push({name:'RentOutPage'})
            }
        }
    },
    mounted(){
       if(this.$route.name == 'HomePage'){
           this.type = 1;
       }else if(this.$route.name == 'RentHomePage'){
           this.type = 2;
        }
    }
}
</script>

<style scoped>
.user-help {
    height: 0.7rem;
    color: #666666;
    font-size: 0.24rem;
    display: flex;
    justify-content: space-around;
    margin-bottom: 0.2rem;
    background: #ffffff;
}
.user-help div {
    margin: auto 0;
}
.user-help div {
    display: flex;
    align-items: center;
}
.user-help div img{
    margin-right: 0.05rem;
}
.is-service img {
    width: 0.35rem;
    height: 0.22rem;
}
.vertical {
    width: 1px;
    height: 0.18rem;
    background: #b0b0b0;
    margin: auto 0;
}
.consult img {
    width: 0.28rem;
    height: 0.28rem;
}
.consult span {
    color: #666666;
}
.sell img {
    width: 0.26rem;
    height: 0.27rem;
}
</style>