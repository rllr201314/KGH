var deviceWidth = document.documentElement.clientWidth;
if (deviceWidth > 640) deviceWidth = 640;
document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';

export default {
  linkServer() {
    window.open("https://web.jiaxincloud.com/gray/mobile.html?&thirdJson={}&bg=FD8159&dialogLogo=0&dialogType=1&dialogMode=1&lang=cn&blinkTitle=1&orgName=mglhodd3enu2mg&appName=kgh431&appChannel=20003&quoteUrl=https://web.jiaxincloud.com&pageTitle=看个号客服&pageUrl=https://web.jiaxincloud.com/onekey.html?id=mglhodd3enu2mg&appName=kgh431&appChannel=20003&alone=1&jump=true&jump=true");
  }
}