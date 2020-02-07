<template>
  <div class="box1">
    <el-select
    @click="btn"
    v-model="value10"
    multiple
    allow-create
    default-first-option
    placeholder="请选择文章标签">
    <el-option
      v-for="item in options5"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
    
      
  </el-select>
  </div>
</template>

<script>
export default {
    data() {
      return {
        options5: [{
          value: '成品号',
          label: '成品号'
        }, {
          value: '租号',
          label: '租号'
        }, {
          value: '充值',
          label: '充值'
        }, {
          value: '金币号',
          label: '金币号'
        }, {
          value: '买号',
          label: '买号'
        }],
        value10: [],
        img:'../../../static/image/delete.png'

      }
    },
    methods:{
      btn(){

      }
    }
}
</script>

<style lang="scss">
.box1{
  background: #ffffff;
  // height: 15.3rem;
}
.el-select .el-input__inner{
    margin-bottom: 0;
}
.el-select-dropdown__list{
  display: flex;
  flex-direction: row
}

.el-select-dropdown.is-multiple .el-select-dropdown__item.selected::after{
  content:none;
}
.el-popper .popper__arrow::after{
  content:none;
}

.el-tag.el-tag--info{
  color: #FFA303;
  border-color:#FFA303;
  background-color:#ffffff;
}

.el-tag.el-tag--info .el-tag__close{
  color: #FFA303;
}
.el-select .el-tag__close.el-icon-close{
  background: #ffffff;
  border: 1px solid #FFA303;
}
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected.hover{
  background: #ffffff;
  border: 1px solid #FFA303;
}
.el-select-dropdown__item{
  color: #666666;
  font-size: .18rem;
  height: .35rem;
  line-height: .35rem;
  border: 1px solid #666666;
  border-radius: .5rem;
  position: relative;
  margin-right: .1rem;
  padding: 0 .2rem;
}
.el-select-dropdown__item.selected{
  border: 1px solid #FFA303;
  border-radius: .5rem;
  font-weight: 100;
}
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected,.el-select-dropdown__item.selected{
  color: #FFA303;
}
.el-select .el-input.is-focus .el-input__inner{
  border-color: #d2d2d2;
}
.el-popper[x-placement^=bottom] .popper__arrow{
  top: -15rem;
}
.el-select-dropdown{
  border-color: #ffffff;
  -webkit-box-shadow:0 0 0 0;
  box-shadow:0 0 0 0;
  
}
.el-popper[x-placement^=bottom]{
  margin-top: .1rem;
}
.el-input.is-active .el-input__inner, .el-input__inner:focus,.el-select .el-input__inner:focus{
  border-color: #d2d2d2;
}
</style>