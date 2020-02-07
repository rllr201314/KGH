

window.onload=function(){
    sizeWidth()
}
window.onresize=function(){
    sizeWidth()
}
function sizeWidth() {
  // 获取当前屏幕的宽度
  var screenWidth = document.querySelector('html').offsetWidth;
  // 基础值
  var baseSz = 100;

  // 设计稿的宽度
  var pageWidth = 750;

  // 套用公式
  if (screenWidth > 640) screenWidth = 640;
  var fZ = baseSz * screenWidth / pageWidth;
  // 直接给元素赋值
  document.querySelector("html").style.fontSize = fZ + "px";
}
