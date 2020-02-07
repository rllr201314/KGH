<template>
    <div class="xa">
        <el-select v-model="value" placeholder="订单状态" size="mini">
            <el-option 
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
        
    </div>
</template>

<script>
export default {
    name:"DropDownList",
    data() {
      return {
        options: [{
          value: '选项1',
          label: '未付款'
        },
        {
          value: '选项2',
          label: '已付款'
        }],
        value: ''
      }
    }
  }
</script>

<style lang="scss">
#app{
    background: none;
}
.el-select{
    width: 1.4rem;
}
.el-select .el-input__inner{
    margin-bottom: 0;
    padding: none;
    color: #d2d2d2;
}
select, textarea, input[type='text'], input[type='search'], input[type='password'], input[type='datetime'], input[type='datetime-local'], input[type='date'], input[type='month'], input[type='time'], input[type='week'], input[type='number'], input[type='email'], input[type='url'], input[type='tel'], input[type='color']{
    height: .3rem;
    line-height: .3rem;
    width: 100%;
}
.el-select .el-input.is-focus .el-input__inner{
    border-color: #d2d2d2;
}
.el-select .el-input__inner:focus{
    border-color: #d2d2d2;
}
.el-input.is-active .el-input__inner, .el-input__inner:focus{
    border-color: #d2d2d2;
}
.el-select-dropdown__item.selected{
    color:#999999;
}
.el-select-dropdown__item{
    height: .4rem;
    line-height: .4rem;
    padding: 0;
}
.el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
    background: #ffffff;
}
.el-select-dropdown__item{
    color: #d2d2d2;
    text-align: center;
}
.el-popper[x-placement^=bottom]{
    margin-top: .03rem;
}

.el-popper[x-placement^=bottom] .popper__arrow{
    display: none;
}
.el-icon-arrow-up:before{
    // content:none;
}
.el-select-dropdown__list{
    padding: 0 .1rem;;
}
</style>