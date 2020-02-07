<template>
    <div class="top1">
        <div class="myPhoto">
            <div class="viewPhoto" @click="monidianji" >
                <input type="file" id="saveImage" >
                <img src="../../../static/image/vieworder/add.png" alt="">
                <img :src=imageSave alt="" id="portrait"  style="width: 1.33rem;height: 1.33rem;border-radius: 50%;z-index: 100"/>
            </div>
            <div>上传</div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
    	return{
    		imageSave:"",//图片路径
            uploadDate:"",//上传时间
            
            hide:false,
        }
    },
    methods:{
        //图片库模拟点击input file
        monidianji(){
            document.getElementById('saveImage').click();
        },
        //实时显示该图片在页面 预览
        yulan(){
<<<<<<< HEAD
            var that = this;
=======
>>>>>>> d36715b0293487ee06b781a3275677f46483d36f
            document.getElementById('saveImage').onchange = function () {
                var imgFile = this.files[0];
                var fr = new FileReader();
                fr.onload = function () {
<<<<<<< HEAD
                    // document.getElementById('portrait').src = fr.result;
                    that.imageSave = fr.result;
                    that.$emit('sendImage',that.imageSave)
=======
                    document.getElementById('portrait').src = fr.result;
>>>>>>> d36715b0293487ee06b781a3275677f46483d36f
                };
                fr.readAsDataURL(imgFile);
            }
        }
    },
    mounted(){
        this.yulan();//预览图片
        this.monidianji();
    },
    

}
</script>

<style lang="scss" scoped>
.top1{
    background: #fff;
    display: flex;
    justify-content: center;
    .myPhoto{
        width: 2rem;
        height: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .viewPhoto{
            border: 1px #999999FF dashed;
            width: 1.3rem;
            height: 1.3rem;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            #saveImage{
                display: none;
            }
            img:nth-child(2){
                width: .5rem;
                height: .5rem;
                position: absolute;
            }
            img:nth-child(3){
                opacity: 1;
            }
        }
        div:nth-child(2){
            width: .71rem;
            height: .3rem;
            font-size: .22rem;
            color: #ffffff;
            line-height: .3rem;
            text-align: center;
            background: #FFA303FF;
            margin-top: .2rem;
            border-radius: .04rem;
        }
    }
}
</style>
