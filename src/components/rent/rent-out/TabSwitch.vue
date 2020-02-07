<template>
   <div class="box-tab"> 
        <div class="cards"> 
            <div class="tab-card" v-for="(item,index) in tabdata1" :key="index"><img :src="item.img" alt=""></div> 
        </div> 
        <div class="tabbottom">
            <div class="tab-link" rel="external nofollow" @click="tabsSwitch(index)" v-bind:class="{active:tab.isActive}" v-for="(tab,index) in tabdata" :key="index">
                <img :src="tab.nav_img" alt="">
            </div>
        </div>
   </div> 
</template>

<script>
export default {
    data(){ 
        return{
            
            active:false,

            tabdata:[{ 
                nav_img:'../../../static/image/rent/home_page/endtrip.png', 
                isActive: true
            }, { 
                nav_img:'../../../static/image/rent/home_page/bookgame.png',
                isActive: false
            }, { 
                nav_img:'../../../static/image/rent/home_page/ysTV.png',
                isActive: false
            },
            {
                nav_img:'../../../static/image/rent/home_page/music.png',
                isActive:false
            }],
            tabdata1:[
                {
                    img:"../../../static/image/rent/home_page/1111.png"
                },
                {
                    img:"../../../static/image/rent/home_page/1112.png"
                },
                {
                    img:"../../../static/image/rent/home_page/1113.png"
                },
                {
                    img:"../../../static/image/rent/home_page/1114.png"
                }
            ],
        }
    }, 
    methods: { 
        tabsSwitch: function(tabIndex) { 
            var tabCardCollection = document.querySelectorAll(".tab-card");
            var len = tabCardCollection.length; 
            for(var i = 0; i < len; i++) { 
                tabCardCollection[i].style.display = "none"; 
                // this.tabdata[i].isActive = false; 
            } 
            // this.tabdata[tabIndex].isActive = true; 
            tabCardCollection[tabIndex].style.display = "block"; 
        } 
    }
}
</script>
<style lang="scss" scoped>
.box-tab{
    width:7.07rem;
}
.tab-card { 
    display: none; 
} 
.tab-card img{
    width:7.07rem;
    height: 3.05rem;
}
.cards div:nth-child(1){
    display: block;
}
.tabbottom{
    display: flex;
    justify-content: space-between;
}
.tab-link{
    width: 1.72rem;
    height: .77rem;
    display: flex;
    justify-content: center;
    align-items: center;
}
.tabbottom img{
    width: 1.31rem;
    height: .67rem;
}
</style>