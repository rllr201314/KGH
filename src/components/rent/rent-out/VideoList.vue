<template>
  <div class="wrap videolist">
      <Header v-bind:head_data="head_data"></Header>
      <div class="video-list-screen"></div>

      <div class="videolist-main">
          <div class="videolist-box" v-for="(item,index) in video_list_data" :key="index">
            <div class="videolist-box-left">
                <img :src="item.video_list_img" alt="">
            </div>
            <div class="videolist-box-in">
                <div>
                    <span>活</span>
                    <span>{{item.video_list_title}}</span>
                </div>
                <div>{{item.video_list_discount}}</div>
                <div>
                    <span>{{item.video_list_time}}</span>
                    <span>{{item.video_list_mortgage}}</span>
                </div>
                <div>
                    <span>¥{{item.video_list_price}}</span>
                    <span>最近出租{{item.video_list_frequency}}次</span>
                </div>
            </div>
            <div class="videolist-box-right">
                <div>{{item.video_list_state}}</div>
                <div>剩余{{12}}小时</div>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import Header from '@/components/home-page/Header'
export default {
    components:{
        Header
    },
    data(){
        return{
            head_data: {
                show_type: 3
            },

            video_list_data:[
                {
                    video_list_img:'../../../static/image/rent/videolist/bilibili.png',
                    video_list_title:'创世中文网会员',
                    video_list_discount:'最低价包夜、小说网会员、免验证',
                    video_list_time:'一小时起租',
                    video_list_mortgage:'免押金',
                    video_list_price:'1.2/时',
                    video_list_frequency:'954',
                    video_list_state:'已出租',
                    video_list_remaining_time:'12'
                },{
                    video_list_img:'../../../static/image/rent/videolist/tencent.png',
                    video_list_title:'创世中文网会员',
                    video_list_discount:'最低价包夜、小说网会员、免验证',
                    video_list_time:'一小时起租',
                    video_list_mortgage:'免押金',
                    video_list_price:'1.2/时',
                    video_list_frequency:'954',
                    video_list_state:'已出租',
                    video_list_remaining_time:'12'
                },
                {
                    video_list_img:'../../../static/image/rent/videolist/Youku.png',
                    video_list_title:'创世中文网会员',
                    video_list_discount:'最低价包夜、小说网会员、免验证',
                    video_list_time:'一小时起租',
                    video_list_mortgage:'免押金',
                    video_list_price:'1.2/时',
                    video_list_frequency:'954',
                    video_list_state:'已出租',
                    video_list_remaining_time:'12'
                }
            ]
        }
    }
}
</script>

<style scoped>
.videolist{
    line-height: .26rem;
    margin-top: .142rem;
}
span{
    font-family:PingFang SC;
}
.video-list-screen{
    height:.61rem;
    background: #ffffff;
    font-size: .18rem;
}

.videolist-main{
    margin-top: .2rem;
}
.videolist-box{
    background: #ffffff;
    display: flex;
    margin-top: .2rem;
    padding: .2rem .23rem;
    position: relative;
}
.videolist-box-left{
    width: 1.1rem;
    margin-right: .16rem;
}
.videolist-box-left img{
    width: 1.1rem;
    margin-top: .21rem;
}
.videolist-box-in div:nth-child(1){
    display: flex;
}
.videolist-box-in div:nth-child(1) span:nth-child(1){
    font-size: .24rem;
    font-weight: 500;
    color: #ffffff;
    width: .31rem;
    height: .31rem;
    background: #FF7800;
    border-radius: .05rem;
    display: inline-block;
    text-align: center;
    line-height: .31rem;
    margin-right: .14rem;
}
.videolist-box-in div:nth-child(1) span:nth-child(2){
    font-size: .26rem;
    font-weight: 500;
    color: #333333;
}
.videolist-box-in div:nth-child(2){
    font-size: .2rem;
    font-weight: 500;
    color: #999999;
    margin-top: .18rem;
}
.videolist-box-in div:nth-child(3){
    margin: .13rem 0 .15rem 0;
}
.videolist-box-in div:nth-child(3) span{
    font-size: .2rem;
    font-weight: 500;
    color: #666666;
    padding: 0 .1rem;
    display: inline-block;
    height: .35rem;
    line-height: .35rem;
    background: #DDDDDD;
    border-radius: .2rem;
}
.videolist-box-in div:nth-child(3) span:nth-child(1){
    margin-right: .1rem;
}
.videolist-box-in div:nth-child(4) span:nth-child(1){
    font-size: .3rem;
    font-weight: 500;
    color: #FFA303;
    margin-right: .28rem;
}
.videolist-box-in div:nth-child(4) span:nth-child(2){
    font-size: .2rem;
    font-weight: 500;
    color: #999999;
}

.videolist-box-right{
    border-radius: .15rem;
    position: absolute;
    right: .25rem;
    top: .55rem;
    box-shadow:1px 0px 7px 0px rgba(0, 0, 0, 0.29);
}
.videolist-box-right div{
    width: 1.5rem;
    height: .5rem;
    font-weight: bold;
    line-height: .5rem;
    text-align: center;
}
.videolist-box-right div:nth-child(1){
    background: #3699FF;
    border-top-left-radius: .15rem;
    border-top-right-radius: .15rem;
    font-size: .24rem;
    color: #ffffff;
}
.videolist-box-right div:nth-child(2){
    background: #ffffff;
    border-bottom-left-radius: .15rem;
    border-bottom-right-radius: .15rem;
    font-size: .18rem;
    color: #666666;
}

</style>