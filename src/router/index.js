import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'


if (localStorage.getItem('token')) {
  store.commit('set_token', localStorage.getItem('token'))
  store.commit('set_hint');
}

if (localStorage.getItem('mobile')) {
  store.commit('set_mobile', localStorage.getItem('mobile'))
}
// if (sessionStorage.getItem('i')) {
//   store.commit('changeLogin', sessionStorage.getItem('i'))
// }

Vue.use(Router)


export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'HomePage',
      component: (resolve) => require(['@/components/HomePage'], resolve)
    },
    {
      path: '/index', //首页
      redirect: {
        name: 'HomePage'
      }
    },
    // 热门游戏
    {
      path: '/HotGame', 
      name: 'HotGame',
      component: (resolve) => require(['@/components/home-page/HotGame'], resolve)
    },
    // {
    //   path:'/pc_index',
    //   name:'Pc_index',
    //   component:(resolve) => require(['@/components/PcIndex'],resolve)
    // },
    {
      path: '/good-list/:opt', //商品列表
      name: 'GoodScreen',
      component: (resolve) => require(['@/components/goods/GoodScreen'], resolve),
      meta:{
        keepAlive:true,
        isBack:false,
      }
    },
    {
      path: '/details/:goods_id', //商品详情
      name: 'Details',
      component: (resolve) => require(['@/components/goods/Details'], resolve),
    },
    {
      path: '/place-order', //下单
      name: 'PlaceOrderPage',
      component: (resolve) => require(['@/components/buy/PlaceOrderPage'], resolve)
    },
    {
      path: '/pay/:info', //支付 -- 支付方式
      name: 'Pay',
      component: (resolve) => require(['@/components/buy/Pay'], resolve)
    },
    {
       path: '/allinpay-addinfo', //通联支付 -- 添加信息/银行卡
       name: 'AllinpayAddInfo',
       component: (resolve) => require(['@/components/allinpay/AddCard'], resolve)
    },
    {
      path: '/allinpay-select', //通联支付 -- 选择银行卡
      name: 'AllinpaySelect',
      component: (resolve) => require(['@/components/allinpay/SeleCard'], resolve)
    },
    {
      path: '/allinpay-success', //通联支付 -- 支付成功
      name: 'AllinpaySuccess',
      component: (resolve) => require(['@/components/allinpay/PaySuccess'], resolve)
    },
    {
      path: '/allinpay-failed', //通联支付 -- 支付失败
      name: 'AllinpayFailed',
      component: (resolve) => require(['@/components/allinpay/PayFailed'], resolve)
    },
    {
      path: '/arbitration', //仲裁
      name: 'Arbitration',
      component: (resolve) => require(['@/components/buy/Arbitration'], resolve)
    },
    {
      path: '/buy-status', //买家-交易状态
      name: 'BuyTakeDelivery',
      component: (resolve) => require(['@/components/buy/buyTakeDelivery'], resolve)
    },
    {
      path: '/sell-status', //卖家-交易状态
      name: 'SellTakeDelivery',
      component: (resolve) => require(['@/components/sell/SellTakeDelivery'], resolve)
    },
    {
      path: '/buy', //买选择游戏
      name: 'Buy',
      component: (resolve) => require(['@/components/multi/SellPage'], resolve),
    },
    {
      path: '/sell', //出售-选择游戏
      name: 'Sell',
      component: (resolve) => require(['@/components/multi/SellPage'], resolve),
    }, {
      path: '/sell-option', //出售-选择区服
      name: 'SellOption',
      component: (resolve) => require(['@/components/sell/SellOption'], resolve),
    }, {
      path: '/sell-info', //出售-商品信息
      name: 'SellInfo',
      component: (resolve) => require(['@/components/sell/SellInfo'], resolve),
    },


    // 个人中心
    {
      path: '/my-center',
      name: 'MyCenter',
      component: (resolve) => require(['@/components/my-center/MyCenter'], resolve), 
    }, {
      path: '/my-goods', //我的商品
      name: 'MyGoods',
      component: (resolve) => require(['@/components/my-center/plate/MyGoods'], resolve),
    }, {
      path: '/account-login', //手机号登陆
      name: 'AccountLogin',
      component: (resolve) => require(['@/components/login/AccountLogin'], resolve),
    }, {
      path: '/code-login', //验证码登陆
      name: 'CodeLogin',
      component: (resolve) => require(['@/components/login/CodeLogin'], resolve),
    }, {
      path: '/register', //注册
      name: 'Register',
      component: (resolve) => require(['@/components/login/Register'], resolve),
    }, {
      path: '/change-password', //修改密码
      name: 'ChangePassword',
      component: (resolve) => require(['@/components/login/ChangePassword'], resolve),
    }, {
      path: '/authenticity', //客服鉴定
      name: 'Authenticity',
      component: (resolve) => require(['@/components/tool/Authenticity'], resolve),
    }, {
      path: '/my-auction', //我的竞拍
      name: 'MyAuction',
      component: (resolve) => require(['@/components/my-center/plate/MyAuction'], resolve),
    },
    // 买家
    {
      path: '/buy-order', //买家订单
      name: 'BuyOrderAll',
      component: (resolve) => require(['@/components/my-center/buyer/BuyOrderAll'], resolve),
    }, {
      path: '/buy-unpaid', //未支付
      name: 'BuyUnpaidStatus',
      component: (resolve) => require(['@/components/my-center/buyer/BuyUnpaidStatus'], resolve),
    }, {
      path: '/buy-wait', //待收货
      name: 'BuyWaitReceiveStatus',
      component: (resolve) => require(['@/components/my-center/buyer/BuyWaitReceiveStatus'], resolve),
    }, {
      path: '/buy-trading', //交易中
      name: 'BuyTradingStatus',
      component: (resolve) => require(['@/components/my-center/buyer/BuyTradingStatus'], resolve),
    }, {
      path: '/buy-arbitration', //仲裁中
      name: 'BuyArbitrationStatus',
      component: (resolve) => require(['@/components/my-center/buyer/BuyArbitrationStatus'], resolve),
    }, {
      path: '/buy-fail', //交易失败
      name: 'BuyFailureDealStatus',
      component: (resolve) => require(['@/components/my-center/buyer/BuyFailureDealStatus'], resolve),
    }, {
      path: '/buy-trade', //交易成功
      name: 'BuyTradeSuccessStatus',
      component: (resolve) => require(['@/components/my-center/buyer/BuyTradeSuccessStatus'], resolve),
    },
    // 卖家
    {
      path: '/sell-order', //卖家订单
      name: 'SellOrderAll',
      component: (resolve) => require(['@/components/my-center/seller/SellOrderAll'], resolve),
    }, {
      path: '/sell-wait', //已发货
      name: 'SellWaitReceiveStatus',
      component: (resolve) => require(['@/components/my-center/seller/SellWaitReceiveStatus'], resolve),
    }, {
      path: '/sell-trading', //交易中
      name: 'SellTradingStatus',
      component: (resolve) => require(['@/components/my-center/seller/SellTradingStatus'], resolve),
    }, {
      path: '/sell-arbitration', //仲裁中
      name: 'SellArbitrationStatus',
      component: (resolve) => require(['@/components/my-center/seller/SellArbitrationStatus'], resolve),
    }, {
      path: '/sell-fail', //交易失败
      name: 'SellFailureDealStatus',
      component: (resolve) => require(['@/components/my-center/seller/SellFailureDealStatus'], resolve),
    }, {
      path: '/sell-trade', //交易成功
      name: 'SellTradeSuccessStatus',
      component: (resolve) => require(['@/components/my-center/seller/SellTradeSuccessStatus'], resolve),
    },
    // 资产管理
    {
      path: '/assets-manage', //资产管理
      name: 'AssetsManage',
      component: (resolve) => require(['@/components/my-center/assets-manage/AssetsManage'], resolve),
    }, {
      path: '/receipts', //收支明细
      name: 'ReceiptsAll',
      component: (resolve) => require(['@/components/my-center/assets-manage/ReceiptsAll'], resolve),
    }, {
      path: '/receipts-info', //收支明细详情
      name: 'ReceiptsInfo',
      component: (resolve) => require(['@/components/my-center/assets-manage/ReceiptsInfo'], resolve),
    }, {
      path: '/withdraw-deposit', //余额提现
      name: 'WithdrawDeposit',
      component: (resolve) => require(['@/components/my-center/assets-manage/WithdrawDeposit'], resolve),
    }, {
      path: '/card-manage', //银行卡管理
      name: 'CardManage',
      component: (resolve) => require(['@/components/my-center/assets-manage/CardManage'], resolve),
    }, {
      path: '/user-authentication',
      name: 'UserAuthentication',
      component: (resolve) => require(['@/components/my-center/assets-manage/UserAuthentication'], resolve),
    }, {
      path: '/Frost', //冻结资产明细
      name: 'Frost',
      component: (resolve) => require(['@/components/my-center/assets-manage/Frost'], resolve),
    }, {
      path: '/commission-manage', //佣金管理
      name: 'CommissionManage',
      component: (resolve) => require(['@/components/my-center/plate/CommissionManage'], resolve),
    },
    // 安全认证
    {
      path: '/safe-phone', //手机
      name: 'SafePhone',
      component: (resolve) => require(['@/components/my-center/safety/SafePhone'], resolve),
    }, {
      path: '/safe-card', //身份证
      name: 'SafeCard',
      component: (resolve) => require(['@/components/my-center/safety/SafeCard'], resolve),
    }, {
      path: '/safe-user', //人脸
      name: 'SafeUser',
      component: (resolve) => require(['@/components/my-center/safety/SafeUser'], resolve),
    }, {
      path: '/safe-success', //验证成功
      name: 'SafeSuccess',
      component: (resolve) => require(['@/components/my-center/safety/SafeSuccess'], resolve),
    },
    // 分期
    {
      path: '/installment/:order_info', //分期支付
      name: 'PayInstallment',
      component: (resolve) => require(['@/components/my-center/installment/PayInstallment'], resolve),
    }, {
      path: '/bill-installment', //分期账单
      name: 'BillInstallment',
      component: (resolve) => require(['@/components/my-center/installment/BillInstallment'], resolve),
    }, {
      path: '/voucher', //代金券
      name: 'Voucher',
      component: (resolve) => require(['@/components/my-center/plate/Voucher'], resolve),
    },
    {
      path: '/special-area/:type', //专区页
      name: 'SpecialArea',
      component: (resolve) => require(['@/components/action/SpecialArea'], resolve),
    }, {
      path: '/gold-goods', //梦幻金币号专区
      name: 'GoldGoods',
      component: (resolve) => require(['@/components/action/GoldGoods'], resolve),
    }, {
      path: '/goods-materials', //大话物资号专区
      name: 'GoodsMaterials',
      component: (resolve) => require(['@/components/action/GoodsMaterials'], resolve),
    },
    // 合同
    {
      path: '/pact', //合同
      name: 'Pact',
      component: (resolve) => require(['@/components/my-center/pact/Pact'], resolve),
    }, {
      path: '/signature', //待签名
      name: 'Signature',
      component: (resolve) => require(['@/components/my-center/pact/Signature'], resolve),
    }, {
      path: '/signed', //已签名
      name: 'Signed',
      component: (resolve) => require(['@/components/my-center/pact/Signed'], resolve),
    },
    // 记录
    {
      path: '/browse-record', //浏览记录
      name: 'BrowseRecord',
      component: (resolve) => require(['@/components/my-center/record/BrowseRecord'], resolve),
    }, {
      path: '/bargain-record', //议价记录
      name: 'BargainRecord',
      component: (resolve) => require(['@/components/my-center/record/BargainRecord'], resolve),
    }, {
      path: '/collect', //收藏
      name: 'Collect',
      component: (resolve) => require(['@/components/my-center/record/Collect'], resolve),
    },
    // 议价--收到的议价
    {
      path: '/message',
      name: 'MessageAll',
      component: (resolve) => require(['@/components/my-center/bargain-message/MessageAll'], resolve),
    }, {
      path: '/message-details',
      name: 'MessageDetails',
      component: (resolve) => require(['@/components/my-center/bargain-message/MessageDetails'], resolve),
    },
    // 电子保单
    {
      path: '/guarantee-slip',
      name: 'GuaranteeSlip',
      component: (resolve) => require(['@/components/after-sale/GuaranteeSlip'], resolve),
    },
    // 申请理赔
    {
      path: '/apply-settlement',
      name: 'ApplySettlement',
      component: (resolve) => require(['@/components/after-sale/ApplySettlement'], resolve),
    },
    // 消息预览
    {
      path: '/message-server',
      name: 'MessageAll_Server',
      component: (resolve) => require(['@/components/my-center/message/messageAll'], resolve),
    },
    // 消息详细
    {
      path: '/message-info',
      name: 'Message_Details',
      component: (resolve) => require(['@/components/my-center/message/message_details'], resolve),
    },
    // 公告列表
    {
      path: '/affiche-info',
      name: 'Affiche',
      component: (resolve) => require(['@/components/my-center/message/Affiche'], resolve),
    },
    // 公告详细
    {
      path: '/affiche/:article/:type',
      name: 'Affiche_Details',
      component: (resolve) => require(['@/components/my-center/message/Affiche_details'], resolve),
    },
    // 安全中心
    {
      path: '/safety-center',
      name: 'Safety_Center',
      component: (resolve) => require(['@/components/my-center/safety/SafetyCenter'], resolve),
    },
    // 设置安全密码
    {
      path: '/set-password',
      name: 'Set_Password',
      component: (resolve) => require(['@/components/my-center/safety/SetPassword'], resolve),
    },
    // 微信支付
    {
      path: '/wechat-pay',
      name: 'WechatPay',
      component: (resolve) => require(['@/components/buy/WechatPay'], resolve),
    },
    // 支付宝
    {
      path: '/ali-pay',
      name: 'AliPay',
      component: (resolve) => require(['@/components/buy/AliPay'], resolve),
    },
    // 抽奖
    {
      path: '/dial',
      name: 'Dial',
      component: (resolve) => require(['@/components/action/Dial'], resolve),
    },
    {//选择出租类型
      path:'/rent-out',
      name:'RentOutPage',
      component: (resolve) => require(['@/components/multi/SellPage'], resolve),
    },
    // 出租发布一
    {
      path:'/lease-option/:opt',
      name:'LeaseOption',
      component: (resolve) => require(['@/components/rent/rent-out/LeaseOption'],resolve)
    },
    // 出租发布二
    {
      path:'/lease-info/:flag/:upData',
      name:'LeaseInfo',
      component: (resolve) => require(['@/components/rent/rent-out/LeaseInfo'],resolve)
    },
    {//选择租号类型
      path:'/rent/:opt',
      name:'RentPage',
      component: (resolve) => require(['@/components/multi/SellPage'], resolve),
    },
    // 租号列表
    {
      path:'/rent-list/:opt',
      name:'RentSearch',
      component: (resolve) => require(['@/components/rent/rent-in/RentSearch'],resolve),
      meta:{
        keepAlive:true,
        isBack:false,
      }
    },
    // 租号详情
    {
      path:'/rent-details/:goods_id',
      name:'RentDetails',
      component: (resolve) => require(['@/components/rent/rent-in/RentDetails'],resolve)
    },
    // 租号下单
    {
      path:'/rent-orders',
      name:'RentPlaceOrder',
      component: (resolve) => require(['@/components/rent/rent-in/RentPlaceOrder'],resolve)
    },
    // 租号状态
    {
      path:'/rent-state',
      name:'RentState',
      component: (resolve) => require(['@/components/rent/rent-in/RentState'],resolve)
    },
    //藏宝阁
    {
      path:'/cbg-stage',
      name:"CbgStage",
      component:(resolve) => require(['@/components/cbg/CbgStage'],resolve)
    }, 
    {
      path:'/cbg-order',
      name:"CbgPlaceOrder",
      component:(resolve) => require(['@/components/cbg/CbgPlaceOrder'],resolve)
    },
    {
      path:'/cbg-state',
      name:"CbgState",
      component:(resolve) => require(['@/components/cbg/CbgState'],resolve)
    },
    // 人工认证
    // {
    //   path:'/safe-aritificial',
    //   name:'SafeAritificial',
    //   component:(resolve) => require(['@/components/my-center/safety/SafeAritificial'],resolve),
    // },
    // {//状态
    //   path:'/safe-state',
    //   name:'SafeState',
    //   component:(resolve) => require(['@/components/my-center/safety/SafeState'],resolve),
    // },
    //换绑
    {
      path:"/change-register/:bind_str",
      name:"ChangeRegister",
      component:(resolve) => require(['@/components/common/ChangeRegister'],resolve)
    },
    //分期计算器
    {
      path:"/stage-counter",
      name:"StageCounter",
      component:(resolve) => require(['@/components/tool/StageCounter'],resolve)
    },
    //客服
    {
      path:"/service",
      name:"Service",
      component:(resolve) => require(['@/components/service/Service'],resolve)
    },
    // 轻应用提醒
    {
      path:"/app-hint",
      name:"AppHint",
      component:(resolve) => require(['@/components/multi/AppHint'],resolve)
    },
    // 轻应用提醒
    {
      path:"/open-taobao",
      name:"OpenTaobao",
      component:(resolve) => require(['@/components/action/OpenTaobao'],resolve)
    },
    // 店铺-----------
    {
      path:"/shop-list",
      name:"ShopList",
      component:(resolve) => require(['@/components/shop/ShopList'],resolve),
    },
    {
      path:"/shop-details",
      name:"ShopDetails",
      component:(resolve) => require(['@/components/shop/ShopDetails'],resolve),
    },
    // 404页面
    {
      path: '*',
      component: (resolve) => require(['@/components/common/404'], resolve)
    },

    // 新业务开通
    {
      path:"/opening",
      name:"Opening",
      component:(resolve)=>require(['@/components/new-business/Opening'],resolve)
    },
    // 我的店铺
    {
      path:"/my-shop",
      name:"MyShop",
      component:(resolve)=>require(['@/components/new-business/MyShop'],resolve)
    },
    // 审核中
    {
      path:"/in-audit",
      name:"InAudit",
      component:(resolve)=>require(['@/components/new-business/InAudit'],resolve)
    },
    // 编辑店铺
    {
      path:"/editing-shop",
      name:"EditingShop",
      component:(resolve)=>require(['@/components/new-business/EditingShop'],resolve)
    },
    // 编辑商品
    {
      path:"/edited-goods",
      name:"EditedGoods",
      component:(resolve)=>require(['@/components/new-business/EditedGoods'],resolve)
    },
    // 商品管理
    {
      path:"/commodity-management",
      name:"CommodityManagement",
      component:(resolve)=>require(['@/components/new-business/CommodityManagement'],resolve)
    },
    // 查看订单
    {
      path:"/view-order",
      name:"ViewOrder",
      component:(resolve)=>require(['@/components/new-business/ViewOrder'],resolve)
    },
    // 上传
    {
      path:"/sc",
      name:"Sc",
      component:(resolve)=>require(['@/components/new-business/Sc'],resolve)
    },
    // 申请开店
    {
      path:"/shop-application",
      name:"ShopApplication",
      component:(resolve)=>require(['@/components/new-business/ShopApplication'],resolve)
    },
    // 租号首页
    {
      path:"/rent-home",
      name:"RentHomePage",
      component:(resolve)=>require(['@/components/rent/rent-out/RentHomePage'],resolve)
    },
    // 音乐列表
    {
      path:"/music-list",
      name:"MusicList",
      component:(resolve)=>require(['@/components/rent/rent-out/VideoList'],resolve)
    },
    // 影视列表
    {
      path:"/video-list",
      name:"VideoList",
      component:(resolve)=>require(['@/components/rent/rent-out/VideoList'],resolve)
    },
    // 代练首页
    {
      path:"/training-home",
      name:"TrainingHomePage",
      component:(resolve)=>require(['@/components/training-zone/TrainingHomePage'],resolve)
    },
    // 充值首页
    {
      path:"/recharge-home-page",
      name:"RechargeHomePage",
      component:(resolve)=>require(['@/components/recharge-area/RechargeHomePage'],resolve)
    },
    // 直充
    {
      path:"/direct-charge",
      name:"DirectCharge",
      component:(resolve)=>require(['@/components/recharge-area/DirectCharge'],resolve)
    },
    // 点卡详情
    {
      path:"/card-details",
      name:"CardDetails",
      component:(resolve)=>require(['@/components/recharge-area/CardDetails'],resolve)
    },
  ],
})