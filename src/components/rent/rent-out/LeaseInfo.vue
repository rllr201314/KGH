<template>
    <!-- 填写出售信息页 -->
    <div class="wrap">
        <Header v-bind:head_data="head_data"></Header>
        <div class="sellInfo-content">
            <div class="sellInfo-cell">
                <div class="sell-cell-top">
                    <img src="../../../../static/image/vertical.png" alt />
                    <span>商品资料</span>
                </div>
                <div class="sell-cell-content">
                    <div class="sell-strip">
                        <span class="sell-lefttext">商品标题</span>
                        <input
                            type="text"
                            placeholder="请输入商品标题(20字以内)"
                            v-model="requestData.goods_title"
                            maxlength="20"
                        />
                    </div>
                    <div v-for="(item,index) in extend_attribute" :key="index">
                        <div class="sell-strip" v-if="item.value_type == 1">
                            <span class="sell-lefttext" v-text="item.title"></span>
                            <input
                                type="text"
                                :value="item.value"
                                :placeholder="item.tip"
                                maxlength="20"
                                @input="extendFn(item.value_type,item.attribute_id)"
                            />
                        </div>
                        <div class="sell-strip" v-if="item.value_type == 2">
                            <span class="sell-des" v-text="item.title"></span>
                            <textarea
                                name="des"
                                :value="item.value"
                                id="arbdes"
                                cols="25"
                                rows="3"
                                :placeholder="item.tip"
                                maxlength="200"
                                @input="extendFn(item.value_type,item.attribute_id)"
                            ></textarea>
                        </div>
                        <div class="sell-strip" v-if="item.value_type == 3">
                            <span class="sell-lefttext" v-text="item.title"></span>
                            <input
                                type="text"
                                :value="item.value"
                                :placeholder="item.tip"
                                maxlength="20"
                                oninput="value=value.replace(/\D/g,'')"
                                @input="extendFn(item.value_type,item.attribute_id)"
                            />
                        </div>
                        <div class="sell-strip" v-if="item.value_type == 4">
                            <span class="sell-lefttext" v-text="item.title"></span>
                            <input
                                type="text"
                                :value="item.value"
                                :placeholder="item.tip"
                                maxlength="20"
                                @input="extendFn(item.value_type,item.attribute_id)"
                            />
                        </div>
                        <div class="sell-strip" v-if="item.value_type == 5">
                            <div class="sell-strip-title">
                                <span v-text="item.title"></span>
                                <span class="dominant-color">
                                    （
                                    <span v-text="item.tip"></span>）
                                </span>
                            </div>
                            <div class="strip-con flex-wrap">
                                <div
                                    :class="val.checked?'pitch-on':'con-option'"
                                    v-for="(val,ind) in item.option"
                                    :key="ind"
                                    v-text="val.option_name"
                                    @click="extendFn(item.value_type,item.attribute_id,val.option_value)"
                                ></div>
                            </div>
                        </div>
                        <div class="sell-strip" v-if="item.value_type == 6">
                            <div class="sell-strip-title">
                                <span v-text="item.title"></span>
                                <span class="dominant-color">
                                    （
                                    <span v-text="item.tip"></span>）
                                </span>
                            </div>
                            <div class="strip-con flex-wrap">
                                <div
                                    :class="val.checked?'pitch-on':'con-option'"
                                    v-for="(val,ind) in item.option"
                                    :key="ind"
                                    v-text="val.option_name"
                                    @click="extendFn(item.value_type,item.attribute_id,val.option_value)"
                                ></div>
                            </div>
                        </div>
                    </div>
                    <div class="sell-strip">
                        <span class="sell-des">商品描述</span>
                        <textarea
                            name="des"
                            id="arbdes"
                            cols="25"
                            rows="3"
                            placeholder="请对商品进行描述(200字以内)"
                            v-model="requestData.goods_description"
                            maxlength="200"
                        ></textarea>
                    </div>
                    <div class="sell-strip">
                        <div class="sell-strip-title">
                            <span>上传图片</span>
                            <span class="dominant-color">（单张图片不能超过10M,最多可上传9张图片）</span>
                        </div>
                        <div class="upimg-content">
                            <div class="img-cell" v-for="(item,index) in sellData.upimgAll.imgSrc">
                                <img :src="item" alt />
                                <div class="delImg" @click="delImg(index)">
                                    <img src="../../../../static/img/order/delete_img.png" alt />
                                </div>
                            </div>
                            <div class="upimg-cell">
                                <img src="../../../../static/img/order/add_img.png" alt />
                                <input
                                    type="file"
                                    id="upImg"
                                    accept="image/*"
                                    multiple
                                    @change="addImg"
                                />
                            </div>
                        </div>
                    </div>
                    <!-- <div class="sell-strip">
                        <span class="sell-video">视频看号外链</span>
                        <input type="url" placeholder="复制视频外链通用代码，推荐使用优酷" v-model="requestData.video_url">
                    </div>-->
                </div>
            </div>
            <!-- 账号信息 -->
            <div class="sellInfo-cell" v-if="showSell">
                <div class="sell-cell-top">
                    <img src="../../../../static/image/vertical.png" alt="">
                    <span>账号信息</span>
                </div>
                <div class="sell-cell-content">
                    <div class="sell-strip" @click="showPop('accountType')">
                        <span class="sell-lefttext">账号类型</span>
                        <div class="right-opt">
                            <span v-text="seleData.accountType"></span>
                            <img src="../../../../static/img/order/next.png" alt />
                        </div>
                    </div>
                    <div class="sell-strip account-bind">
                        <span class="sell-lefttext">账号绑定</span>
                        <div class="strip-radio-right">
                            <div
                                class="screen-sort"
                                v-for="item in sellData.seleSafeData.safe"
                                @click="seleSafe(item.value)"
                            >
                                <img
                                    class="screen-sort-check"
                                    :src="item.ischeck?'../../../static/img/goodscreen/okcheck.png':'../../../static/img/goodscreen/nocheck.png'"
                                    alt
                                />
                                <span v-text="item.name"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 价格设定 -->
            <div class="sellInfo-cell" v-if="showSell">
                <div class="sell-cell-top">
                    <img src="../../../../static/image/vertical.png" alt="">
                    <span>价格设定</span>
                </div>
                <div class="sell-cell-content">
                    <div class="sell-strip">
                        <span class="sell-lefttext">是否可议价</span>
                        <div class="strip-radio-right">
                            <div
                                class="opera"
                                v-for="item in sellData.sellType.sell"
                                @click="seleSell(item.value)"
                            >
                                <img
                                    :src="item.ischeck?'../../../static/img/order/okcheck.png':'../../../static/img/order/nocheck.png'"
                                    alt
                                />
                                <span v-text="item.name"></span>
                            </div>
                        </div>
                    </div>
                    <div class="sell-strip" v-show="requestData.sell_type == 2">
                        <span class="sell-lefttext">商品最高价</span>
                        <input
                            type="number"
                            placeholder="填写商品最高的出价"
                            v-model="requestData.goods_price"
                            oninput="if(value.length>7)value=value.slice(0,7)"
                        />
                    </div>
                    <div class="sell-strip" v-show="requestData.sell_type == 2">
                        <span class="sell-lefttext">商品最低价</span>
                        <input
                            type="number"
                            placeholder="填写可以接受最低的议价价格"
                            v-model="requestData.min_price"
                            oninput="if(value.length>7)value=value.slice(0,7)"
                        />
                    </div>
                    <div class="sell-strip" v-show="requestData.sell_type == 1">
                        <span class="sell-lefttext">商品售价</span>
                        <input
                            type="number"
                            placeholder="填写商品价格"
                            v-model="requestData.goods_price"
                            oninput="if(value.length>7)value=value.slice(0,7)"
                        />
                    </div>
                    <div class="sell-strip" v-if="safeOrCompact.showSafe">
                        <div>
                            <div class="sell-left">保险服务</div>
                            <div class="strip-radio-right">
                                <div class="opera" @click="seleOpera('safe')">
                                    <img
                                        :src="sellData.optSafe?'../../../../static/img/order/okcheck.png':'../../../../static/img/order/nocheck.png'"
                                        alt
                                    />
                                    <span>是</span>
                                </div>
                                <div
                                    class="opera"
                                    @click="seleOpera('nosafe')"
                                    v-if="safeOrCompact.showNoSafe"
                                >
                                    <img
                                        :src="sellData.optSafe?'../../../../static/img/order/nocheck.png':'../../../../static/img/order/okcheck.png'"
                                        alt
                                    />
                                    <span>否</span>
                                </div>
                            </div>
                        </div>
                        <div class="safe-hint">
                            <div class="sell-left">(保险费用为总价的{{safeOrCompact.parcent}}%)</div>
                            <div
                                class="strip-radio-right"
                                v-if="Number(safeOrCompact.maxPrice) > 0"
                            >保险费封顶￥{{safeOrCompact.maxPrice}}</div>
                            <div class="strip-radio-right"></div>
                        </div>
                    </div>
                    <div class="sell-strip" v-if="safeOrCompact.showCompact">
                        <div>
                            <div class="sell-left">合同服务</div>
                            <div class="strip-radio-right">
                                <div class="opera" @click="seleOpera('safe')">
                                    <img
                                        :src="sellData.optSafe?'../../../../static/img/order/okcheck.png':'../../../../static/img/order/nocheck.png'"
                                        alt
                                    />
                                    <span>是</span>
                                </div>
                                <div
                                    class="opera"
                                    @click="seleOpera('nosafe')"
                                    v-if="safeOrCompact.showNoCompact"
                                >
                                    <img
                                        :src="sellData.optSafe?'../../../../static/img/order/nocheck.png':'../../../../static/img/order/okcheck.png'"
                                        alt
                                    />
                                    <span>否</span>
                                </div>
                            </div>
                        </div>
                        <div class="safe-hint">
                            <div class="sell-left">(合同费用为总价的{{safeOrCompact.parcent}}%)</div>
                            <div
                                class="strip-radio-right"
                                v-if="Number(safeOrCompact.maxPrice) > 0"
                            >合同费封顶￥{{safeOrCompact.maxPrice}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 出租设定 -->
            <div class="sellInfo-cell">
                <div class="sell-cell-top">
                    <img src="../../../../static/image/vertical.png" alt="">
                    <span>出租设定</span>
                </div>
                <div class="sell-cell-content">
                    <div class="sell-strip" @click="showPop('rentType')">
                        <span class="sell-lefttext">出租方式</span>
                        <div class="right-opt">
                            <span v-text="seleData.rentType"></span>
                            <img src="../../../../static/img/order/next.png" alt />
                        </div>
                    </div>
                    <div class="sell-strip">
                        <span class="sell-lefttext">最短租期</span>
                        <input
                            class="rent-input"
                            type="number"
                            v-model="requestData.least_lease"
                            oninput="if(value.length>7)value=value.slice(0,7)"
                            onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
                        />
                        <span class="black-color">
                            <span v-text="seleData.rentType"></span>
                        </span>
                        <span class="dominant-color" v-show="seleData.rentType == '天'">(建议最短周期7天)</span>
                    </div>
                    <div class="sell-strip">
                        <span class="sell-lefttext">租金</span>
                        <input
                            class="rent-input"
                            type="number"
                            v-model="requestData.day_rent"
                            oninput="if(value.length>7)value=value.slice(0,7)"
                        />
                        <span class="black-color">
                            元/
                            <span v-text="seleData.rentType"></span>
                        </span>
                    </div>
                    <div class="sell-strip">
                        <span class="sell-lefttext">押金</span>
                        <input
                            class="rent-input"
                            type="number"
                            v-model="requestData.cash"
                            oninput="if(value.length>7)value=value.slice(0,7)"
                        />
                        <span class="black-color">元</span>
                    </div>
                </div>
            </div>
            <!-- 账号信息 -->
            <div class="sellInfo-cell">
                <div class="sell-cell-top">
                    <img src="../../../../static/image/vertical.png" alt="">
                    <span>帐号安全验证</span>
                </div>
                <div class="sell-cell-content">
                    <div class="sell-strip">
                        <span class="sell-video">游戏帐号</span>
                        <input type="text" placeholder="请输入游戏帐号" v-model="requestData.account" />
                    </div>
                    <div class="sell-strip">
                        <span class="sell-video">游戏密码</span>
                        <input type="password" placeholder="请输入游戏密码" v-model="requestData.password" />
                    </div>
                    <div class="sell-strip">
                        <span class="sell-video">联系人手机号</span>
                        <input
                            class="phone"
                            type="number"
                            placeholder="请输入手机号，客服将会与您联系"
                            v-model="requestData.mobile"
                        />
                    </div>
                    <div class="sell-strip wechat">
                        <span class="sell-video">微信账号</span>
                        <input type="text" placeholder="电话无法联系时，可以通过微信联系您" v-model="requestData.wx" />
                    </div>
                </div>
            </div>
            <div class="nextBtn" @click="addGoods">下一步</div>
        </div>
        <div v-show="showMenu_type" class="type-mu">
            <div class="pop-view-tit option-gray">请选择职业</div>
            <ul>
                <li
                    class="option-black"
                    v-for="item in sellData.faction"
                    @click="seleFaction(item.faction_id)"
                    v-text="item.faction_name"
                ></li>
            </ul>
            <div class="pop-view-con"></div>
            <div class="pop-view-bot" @click="hiddenFn">取消</div>
        </div>
        <!-- 弹出框 -->
        <!-- 角色性别 -->
        <div id="sheet-sex" class="mui-popover mui-popover-bottom mui-popover-action">
            <!-- 可选择菜单 -->
            <ul class="pop-view">
                <li class="pop-view-tit option-gray">
                    <div>请选择角色类别</div>
                </li>
                <!-- 商品类型 -->
                <li
                    class="option-black"
                    v-for="item in sellData.sex"
                    @click="seleType(item.value,'sex')"
                    v-text="item.name"
                ></li>
            </ul>
            <!-- 取消菜单 -->
            <ul class="pop-view">
                <li class="mui-table-view-cell option-black">
                    <a href="#sheet-sex">取消</a>
                </li>
            </ul>
        </div>
        <!-- 弹出框 -->
        <!-- 账号类型 -->
        <div id="sheet-accountType" class="mui-popover mui-popover-bottom mui-popover-action">
            <!-- 可选择菜单 -->
            <ul class="pop-view">
                <li class="pop-view-tit option-gray">
                    <div>请选择账号类型</div>
                </li>
                <!-- 商品类型 -->
                <li
                    class="option-black"
                    v-for="item in sellData.accountType"
                    @click="seleType(item.value,'accountType')"
                    v-text="item.name"
                ></li>
            </ul>
            <!-- 取消菜单 -->
            <ul class="pop-view">
                <li class="mui-table-view-cell option-black">
                    <a href="#sheet-accountType">取消</a>
                </li>
            </ul>
        </div>
        <!-- 出租方式 -->
        <div id="sheet-rentType" class="mui-popover mui-popover-bottom mui-popover-action">
            <!-- 可选择菜单 -->
            <ul class="pop-view">
                <li class="pop-view-tit option-gray">
                    <div>请选择出租方式</div>
                </li>
                <!-- 商品类型 -->
                <li
                    class="option-black"
                    v-for="item in sellData.rentWay"
                    @click="seleType(item.value,'rentType')"
                    v-text="item.name"
                ></li>
            </ul>
            <!-- 取消菜单 -->
            <ul class="pop-view">
                <li class="mui-table-view-cell option-black">
                    <a href="#sheet-accountType">取消</a>
                </li>
            </ul>
        </div>
        <div class="share" v-show="showMenu_type" @click="hiddenFn"></div>
        <Loading v-show="showLoading"></Loading>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
import Loading from "@/components/multi/Loading";
export default {
    name: "SellInfo",
    components: {
        Header,
        Loading
    },
    metaInfo: {
        title: '手游号出租_看个号',
        meta: [{
            name: 'keywords',
            content: '手游号,梦幻号出租寄租,大话号出租寄租'
        }, {
            name: 'description',
            content: '看个号(https://www.kangehao.com)是国内专业的手游交易平台，安全可靠专注手游的交易网站，提供手游账号交易、买号卖号交易的手游交易平台！'
        }]
    },
    data() {
        return {
            head_data: {
                show_type: 2,
                right_icon: 2,
                tit_text: '我要出租'
            },
            showSell: false,//是否是租售
            showMenu_type: false,
            showLoading: false,
            editOrpublish: null,
            seleData: {
                faction: "未选择",
                sex: "未选择",
                accountType: "未选择",
                rentType: '未选择'
            },
            forceCompact: false,//不强制
            jump_fore_compact: false,
            safeOrCompact: {
                //-------------------------------------------------------------------**********************************************
                showSafe: false, //显示保险
                showNoSafe: false, //显示可以选择
                showCompact: false, //显示保险
                showNoCompact: false, //显示可以选择
                parcent: "",
                isMax: false,
                maxPrice: ""
            },
            oldData: {},//编辑商品旧数据
            sellData: {
                seleTag: [], //选择的标签
                showTag: [], //确认选择的标签
                // 标签类
                tagType: [],
                // 标签内容
                tagContent: [],
                upimgAll: {
                    imgSrc: [],
                    imgData: {
                        accept: "image/jpeg, image/png, image/jpg"
                    }
                },
                // 是否购买保险
                optSafe: true,
                // 账号绑定
                seleSafeData: {
                    safe: []
                },
                accountType: [], //账号类型
                faction: [], //职业
                sex: [], //性别
                rentWay: [],
                sellType: {
                    sell: []
                }
            },
            category_id: '',
            upData: {},
            requestData: {
                category_id: "",
                operation_id: "",
                area_id: "",
                server_id: "",
                goods_title: "",
                goods_description: "",
                // role_level: "",
                // faction_id: "",
                // person_sex: "",
                // tag: "",
                account_type: "",
                account_bind: "",
                is_safe: "",
                is_compact: "",
                sell_type: "",
                goods_price: "",
                least_lease: 7,//租期
                day_rent: '',//租金
                cash: '',//押金
                rent_type: '',//出租方式


                min_price: "",
                account: "",
                password: "",
                mobile: "",
                wx: "",
                images: [],
                goods_id: null,
                extend_attribute: [],
            },
            extend_attribute: [],//自定义属性 值类型，1：文本字符型，2：多行文本字符型，3：数值型（整数），4：数值型（小数），5：单选，6：多选，7：日期型

        };
    },
    methods: {
        // 自定义属性方法--
        extendFn(type, attribute_id, option) {
            var that = this;
            switch (type) {
                case 1://文本字符型
                case 2://多行文本字符型
                case 3://数值型（整数）
                case 4://数值型（小数）
                    var event = window.event || arguments.callee.caller.arguments[0];
                    if (that.requestData.extend_attribute == '') {
                        that.requestData.extend_attribute.push({
                            attribute_id: attribute_id,
                            option_value: String(event.target.value),
                        })
                    } else {
                        let flag = true;//用来判断that.request.extend_attribute 是否有对应的attribute值
                        for (var x in that.requestData.extend_attribute) {
                            if (that.requestData.extend_attribute[x].attribute_id == attribute_id) {
                                flag = false;
                                if (event.target.value == "") {//值为空，移除id对应对象，用来提交时判断是否是必选/必填
                                    that.requestData.extend_attribute.splice(x, 1);
                                } else {
                                    that.requestData.extend_attribute[x].option_value = String(event.target.value);
                                }
                                break;
                            }
                        }
                        // 因为选择单选或多选后 更新that.extend_attribute 所以要赋值。
                        for (var j in that.extend_attribute) {
                            if (that.extend_attribute[j].attribute_id == attribute_id) {
                                that.extend_attribute[j].value = event.target.value
                            }
                        }
                        if (flag) {
                            that.requestData.extend_attribute.push({
                                attribute_id: attribute_id,
                                option_value: String(event.target.value)
                            })
                        }
                    }
                    break;
                case 5://单选
                    // debugger;
                    for (var i in that.extend_attribute) {
                        if (that.extend_attribute[i].attribute_id == attribute_id) {
                            for (var j in that.extend_attribute[i].option) {
                                if (that.extend_attribute[i].option[j].option_value == option) {
                                    that.extend_attribute[i].option[j].checked = !this.extend_attribute[i].option[j].checked;
                                    if (that.requestData.extend_attribute == '') {
                                        that.requestData.extend_attribute.push({
                                            attribute_id: attribute_id,
                                            option_value: String(option)
                                        })
                                    } else {
                                        let flag = true;//用来判断that.request.extend_attribute 是否有对应的attribute值
                                        for (var x in that.requestData.extend_attribute) {
                                            if (that.requestData.extend_attribute[x].attribute_id == attribute_id) {
                                                flag = false;
                                                if (that.extend_attribute[i].option[j].checked) {//判断是选中还是取消，选中或者重新选中-重新赋值，取消选中则移除id对应的对象
                                                    console.log('option', option);
                                                    that.requestData.extend_attribute[x].option_value = String(option);
                                                } else {
                                                    that.requestData.extend_attribute.splice(x, 1);
                                                }
                                                break;
                                            }
                                        }
                                        if (flag) {
                                            that.requestData.extend_attribute.push({
                                                attribute_id: attribute_id,
                                                option_value: String(option)
                                            })
                                        }
                                    }
                                    continue;
                                }
                                that.extend_attribute[i].option[j].checked = false;
                            }
                        }
                    }
                    break;
                case 6://多选
                    // debugger;
                    for (var i in that.extend_attribute) {
                        if (that.extend_attribute[i].attribute_id == attribute_id) {
                            for (var j in that.extend_attribute[i].option) {
                                if (that.extend_attribute[i].option[j].option_value == option) {
                                    that.extend_attribute[i].option[j].checked = !that.extend_attribute[i].option[j].checked;
                                    // debugger;
                                    if (that.requestData.extend_attribute == '') {
                                        that.requestData.extend_attribute.push({
                                            attribute_id: attribute_id,
                                            option_value: String(option)
                                        })
                                    } else {
                                        var flag = true;//用来判断that.request.extend_attribute 是否有对应的attribute值
                                        for (var x in that.requestData.extend_attribute) {
                                            if (that.requestData.extend_attribute[x].attribute_id == attribute_id) {
                                                flag = false;
                                                var extend_multi = that.requestData.extend_attribute[x].option_value.split(',');
                                                if (extend_multi.indexOf(String(option)) == -1) {
                                                    extend_multi.push(option);
                                                    that.requestData.extend_attribute[x].option_value = extend_multi.join(',');
                                                    break;
                                                } else {
                                                    extend_multi.splice(extend_multi.indexOf(String(option)), 1);
                                                    that.requestData.extend_attribute[x].option_value = extend_multi.join(',');
                                                    if (that.requestData.extend_attribute[x].option_value == "") {//多选属性 值为空，移除选择属性id对象
                                                        that.requestData.extend_attribute.splice(x, 1);
                                                    }
                                                    break;
                                                }
                                            }
                                        }
                                        if (flag) {
                                            that.requestData.extend_attribute.push({
                                                attribute_id: attribute_id,
                                                option_value: String(option)
                                            })
                                        }
                                    }

                                    break;
                                }
                            }
                        }
                    }
                    break;
                default:
                    break;
            }
            // console.log(that.requestData.extend_attribute);
        },
        // 添加图片
        addImg(event) {
            var that = this;
            var imgSrcArr = that.sellData.upimgAll.imgSrc;
            var imgLen = imgSrcArr.length;
            if (imgLen >= 9) {
                mui.toast("图片选择到达上限", { duration: "short", type: "div" });
            } else if (imgLen < 9) {
                var imgArr = [];
                var fileLen = event.target.files.length;
                var allLen = imgLen + fileLen;
                if (allLen > 9) {
                    var addImg = 9 - imgLen;
                    for (var i = 0; i < addImg; i++) {
                        imgArr.push(event.target.files[i]);
                    }
                    mui.toast("图片选择超过上限,只保存9张", { duration: "short", type: "div" });
                } else {
                    imgArr = event.target.files;
                }
                for (var i = 0; i < imgArr.length; i++) {
                    let type = imgArr[i].type; //文件的类型，判断是否是图片
                    let size = imgArr[i].size; //文件的大小，判断图片的大小
                    if (that.sellData.upimgAll.imgData.accept.indexOf(type) == -1) {
                        mui.toast("请选择我们支持的图片格式！", { duration: "short", type: "div" });
                        return false;
                    }
                    if (size > 10485760) {
                        mui.toast("请选择10M以内的图片！", { duration: "short", type: "div" });
                        return false;
                    }
                    var reader = new FileReader();
                    reader.readAsDataURL(imgArr[i]);

                    var fileName = imgArr[i].name;
                    reader.onload = function (e) {
                        // var imgMsg = {
                        //     name: fileName, //获取文件名
                        //     img_url: this.result //reader.readAsDataURL方法执行完后，base64数据储存在reader.result里
                        // };
                        imgSrcArr.push(this.result);
                    };
                }
            }
        },
        delImg(ind) {
            var that = this;
            var imgList = that.sellData.upimgAll.imgSrc;
            imgList.splice(ind, 1);
        },
        // 账号绑定
        seleSafe(flag) {
            var that = this;
            var safeArr = that.sellData.seleSafeData.safe;
            if (flag == "4") {
                for (var i in safeArr) {
                    if (flag == safeArr[i].value) {
                        safeArr[i].ischeck = true;
                        continue;
                    }
                    safeArr[i].ischeck = false;
                }
            } else {
                for (var i in safeArr) {
                    if (flag == safeArr[i].value) {
                        safeArr[i].ischeck = true;
                    }
                    if (safeArr[i].value == "4") {
                        safeArr[i].ischeck = false;
                    }
                }
            }
            // 是否强制购买合同
            var sense = [];
            for (var i in safeArr) {
                if (safeArr[i].ischeck == true) {
                    sense.push(safeArr[i].value);
                }
            }
            if (that.requestData.account_type != '') {
                // 网易手机账号
                if (that.requestData.account_type == 1) {
                    for (var i in sense) {
                        if (sense[i] == 1 || sense[i] == 2) {
                            that.safeOrCompact.showNoCompact = false;
                            that.sellData.optSafe = true;
                            break;
                        } else {
                            if (!that.jump_fore_compact) {
                                that.safeOrCompact.showNoCompact = true;
                            }
                        }
                    }
                } else if (that.requestData.account_type == 2) {
                    for (var i in sense) {
                        if (sense[i] == 1) {
                            that.safeOrCompact.showNoCompact = false;
                            that.sellData.optSafe = true;
                            break;
                        } else {
                            if (!that.jump_fore_compact) {
                                that.safeOrCompact.showNoCompact = true;
                            }
                        }
                    }
                }
            }
        },
        // 选择是否议价
        seleSell(flag) {
            var that = this;
            var sell = that.sellData.sellType.sell;
            for (var i in sell) {
                if (sell[i].value == flag) {
                    that.requestData.sell_type = sell[i].value; //赋值
                    sell[i].ischeck = true;
                    continue;
                }
                sell[i].ischeck = false;
            }
        },
        // 保险
        seleOpera(flag) {
            if (flag == "safe") {
                this.sellData.optSafe = true;
            } else if (flag == "nosafe") {
                this.sellData.optSafe = false;
            }
        },
        // 显示那个弹出框
        showPop(flag) {
            if (flag == 'faction') {
                this.showMenu_type = true;
            } else {
                mui("#sheet-" + flag).popover("toggle");
            }
        },
        hiddenFn() {
            this.showMenu_type = false;
        },

        //角色类别 -- 账号类型
        seleType(opt, flag) {
            var that = this;
            mui("#sheet-" + flag).popover("toggle");
            if (flag == "accountType") {
                //账号类型
                var accountType = that.sellData.accountType;
                for (var i in accountType) {
                    if (opt == accountType[i].value) {
                        that.requestData.account_type = accountType[i].value;
                        that.seleData.accountType = accountType[i].name;
                    }
                }
                // 是否强制购买合同
                var safe = this.sellData.seleSafeData.safe;
                var sense = [];
                for (var i in safe) {
                    if (safe[i].ischeck == true) {
                        sense.push(safe[i].value);
                    }
                }
                if (sense != '') {
                    // 网易手机账号
                    if (that.requestData.account_type == 1) {
                        for (var i in sense) {
                            if (sense[i] == 1 || sense[i] == 2) {
                                that.safeOrCompact.showNoCompact = false;
                                that.sellData.optSafe = true;
                                break;
                            } else {
                                if (!that.jump_fore_compact) {
                                    that.safeOrCompact.showNoCompact = true;
                                }
                            }
                        }
                    } else if (that.requestData.account_type == 2) {
                        for (var i in sense) {
                            if (sense[i] == 1) {
                                that.safeOrCompact.showNoCompact = false;
                                that.sellData.optSafe = true;
                                break;
                            } else {
                                if (!that.jump_fore_compact) {
                                    that.safeOrCompact.showNoCompact = true;
                                }
                            }
                        }
                    }
                }
            } else if (flag == "rentType") {
                //账号类型
                var rentWay = that.sellData.rentWay;
                for (var i in rentWay) {
                    if (opt == rentWay[i].value) {
                        that.requestData.rent_type = rentWay[i].value;
                        that.seleData.rentType = rentWay[i].name;
                    }
                }
            }
        },
        // 发布商品
        addGoods() {
            var that = this;
            if (!that.showLoading) {
                that.showLoading = true;
                var that_req = that.requestData;
                if (that_req.goods_title == "") {
                    mui.alert("请输入商品标题", "提示", "确认", "", "div");
                    that.showLoading = false;
                    return false;
                }

                if (that_req.goods_description == "") {
                    mui.alert("请输入商品描述", "提示", "确认", "", "div");
                    that.showLoading = false;
                    return false;
                } else if (that_req.goods_description.length > 200) {
                    mui.alert("商品描述最多可以输入200字", "提示", "确认", "", "div");
                    that.showLoading = false;
                    return false;
                }
                var upImg = that.sellData.upimgAll.imgSrc;
                if (upImg.length > 0) {
                    that_req.images = upImg;
                }
                // // 账号类型
                if (that.showSell) {
                    if (that_req.account_type == "") {
                        mui.alert("请选择账号类型", "提示", "确认", "", "div");
                        that.showLoading = false;
                        return false;
                    }
                    // 账号绑定
                    var safe = this.sellData.seleSafeData.safe;
                    var safe_flag = false;
                    var safe_str = "";
                    var sense = [];
                    for (var i in safe) {
                        if (safe[i].ischeck == true) {
                            sense.push(safe[i].value);
                            safe_flag = true;
                            safe_str += "," + safe[i].value;
                        }
                    }
                    if (safe_flag) {
                        that_req.account_bind = safe_str.substring(1);
                    } else {
                        mui.alert("请选择账号绑定", "提示", "确认", "", "div");
                        that.showLoading = false;
                        return false;
                    }
                }

                // 判断是否显示价格
                if (that.showSell) {
                    // 议价还是一口价 -- 价格
                    if (that_req.sell_type == 1) {
                        if (that_req.goods_price == "") {
                            mui.alert("请输入商品价格", "提示", "确认", "", "div");
                            that.showLoading = false;
                            return false;
                        }
                    } else if (that_req.sell_type == 2) {
                        if (that_req.goods_price == "") {
                            mui.alert("请输入可议价最高价格", "确认", "", "div");
                            that.showLoading = false;
                            return false;
                        } else if (that_req.min_price == "") {
                            mui.alert("请输入可议价最低价格", "提示", "确认", "", "div");
                            that.showLoading = false;
                            return false;
                        }
                    }
                }
                var forceBind = false;
                if (that.forceCompact) {
                    // 网易手机账号
                    if (that_req.account_type == 1) {
                        for (var i in sense) {
                            if (sense[i] == 1 || sense[i] == 2) {
                                forceBind = true;
                                break;
                            }
                        }
                    } else if (that_req.account_type == 2) {
                        for (var i in sense) {
                            if (sense[i] == 1) {
                                forceBind = true;
                                break;
                            }
                        }
                    }
                }
                // 合同还是保险
                var compact = that.safeOrCompact.showCompact;
                var noCompact = that.safeOrCompact.showNoCompact;
                var safe = that.safeOrCompact.showSafe;
                var noSafe = that.safeOrCompact.showNoSafe;
                if (compact) {
                    // console.log('合同')
                    that_req.is_compact = 1;
                    if (noCompact) {
                        // console.log('可选合同');
                        var isSell = that.sellData.optSafe;
                        if (!isSell) {
                            // console.log('不买合同');
                            that_req.is_compact = 2;
                        }
                    }
                    that_req.is_safe = 2;
                } else if (safe) {
                    // console.log('保险');
                    that_req.is_safe = 1;
                    if (noSafe) {
                        // console.log('可选保险');
                        var isSell = that.sellData.optSafe;
                        if (!isSell) {
                            // console.log('不买保险');
                            that_req.is_safe = 2;
                        }
                    }
                    that_req.is_compact = 2;
                }
                // 租售类型的话再判断是否强制选择合同
                if (that.showSell) {
                    if (forceBind && that_req.is_compact == 2) {
                        mui.alert("有绑账号请选择购买合同", "提示", "确认", "", "div");
                        that.showLoading = false;
                        return false;
                    }
                }
                // 判断有没有选择出租方式
                if (that_req.rent_type == "") {
                    mui.alert("请选择出租方式", "提示", "确认", "", "div");
                    that.showLoading = false;
                    return false;
                }
                // 出租最短租期
                if (that_req.least_lease == "") {
                    mui.alert("请输入最短租期", "提示", "确认", "", "div");
                    that.showLoading = false;
                    return false;
                }

                if (that_req.day_rent == "") {
                    mui.alert("请输入日租金", "提示", "确认", "", "div");
                    that.showLoading = false;
                    return false;
                }
                if (that_req.cash == "") {
                    // mui.alert("请输入押金", "提示", "确认", "", "div");
                    // that.showLoading = false;
                    // return false;
                    that_req.cash = 0;
                }

                // 账号
                if (that_req.account == "") {
                    mui.alert("请输入账号", "提示", "确认", "", "div");
                    that.showLoading = false;
                    return false;
                }
                // 密码
                if (that_req.password == "") {
                    mui.alert("请输入密码", "提示", "确认", "", "div");
                    that.showLoading = false;
                    return false;
                }
                // 手机
                if (that_req.mobile == "") {
                    mui.alert("请输入手机号", "提示", "确认", "", "div");
                    that.showLoading = false;
                    return false;
                } else {
                    var phoneReg = /^1[3-9][0-9]{9}$/g;
                    if (!that_req.mobile.match(phoneReg)) {
                        mui.alert("您输入的手机号不正确", "提示", "确定", "", "div");
                        that.showLoading = false;
                        return false;
                    }
                }
                // 微信
                if (that_req.wx == "") {
                    mui.alert("请输入微信账号", "提示", "确认", "", "div");
                    that.showLoading = false;
                    return false;
                } else {
                    var reg = /[\u4e00-\u9fa5]/g;
                    if (that_req.wx.match(reg)) {
                        mui.alert("请输入正确微信账号", "提示", "确认", "", "div");
                        that.showLoading = false;
                        return false;
                    }
                }

                var url = null;
                if (that.editOrpublish == 1) {
                    url = 'addGoods';
                } else if (that.editOrpublish == 2) {
                    url = 'editGoods';
                }
                var extend_arr = [];//存储已选属性的id,用来查找必选属性是否选择
                for (var i in that_req.extend_attribute) {
                    extend_arr.push(that_req.extend_attribute[i].attribute_id);
                }
                var required_arr = [];//存储必选属性的id,用来判断必选属性的值是否为空
                for (var i in that.extend_attribute) {
                    if (that.extend_attribute[i].is_required == 1) {
                        required_arr.push(that.extend_attribute[i].attribute_id);
                        if (extend_arr.indexOf(that.extend_attribute[i].attribute_id) == -1) {
                            mui.alert(that.extend_attribute[i].title + '为空', "提示", "确认", "", "div");
                            that.showLoading = false;
                            return false;
                        }
                    }
                }
                that.$axios.post(process.env.API_HOST + url, that_req).then(function (res) {
                    // console.log(res);
                    that.showLoading = false;
                    if (res.status == 200) {
                        if (res.data.code == 200) {
                            mui.alert(res.data.msg, '提示', '确认', function () {
                                that.$router.push({ name: 'MyCenter' });
                            }, 'div');
                        } else {
                            mui.alert(res.data.msg, '提示', '确认', '', 'div');
                        }
                    }
                })
                    .catch(function (err) {
                        console.log(err);
                    });
            }

        },
        // 判断合同还是保险
        judgeInfo(chargeInfo) {
            var that = this;
            var compact_rate = chargeInfo.compact_rate;

            var force_compact = chargeInfo.force_compact;
            var force_safe = chargeInfo.force_safe;
            var bind = chargeInfo.is_bind;
            var is_compact = chargeInfo.is_compact;
            var is_safe = chargeInfo.is_safe;
            var max_compact = chargeInfo.max_compact;
            var max_safe = chargeInfo.max_safe;
            var safe_rate = chargeInfo.safe_rate;
            if (bind == '1') {
                that.forceCompact = true;
            } else {
                that.forceCompact = false;
            }

            // 是否显示合同
            if (force_compact == 1) {
                that.safeOrCompact.showCompact = true;
                that.safeOrCompact.showNoCompact = false;
                that.jump_fore_compact = true;//必须购买合同
            } else if (force_compact == 2) {
                that.jump_fore_compact = false;//必须购买合同不强制
                if (is_compact == 1) {
                    that.safeOrCompact.showCompact = true;
                    that.safeOrCompact.showNoCompact = true;
                } else if (is_compact == 2) {
                    that.safeOrCompact.showCompact = false;
                    that.safeOrCompact.showNoCompact = false;
                }
            }
            if (that.safeOrCompact.showCompact == true) {
                that.safeOrCompact.parcent = parseInt(compact_rate * 100);
                that.safeOrCompact.isMax = true;
                that.safeOrCompact.maxPrice = max_compact;
            }

            // 是否显示保险
            if (force_safe == 1) {
                that.safeOrCompact.showSafe = true;
                that.safeOrCompact.showNoSafe = false;
            } else if (force_safe == 2) {
                if (is_safe == 1) {
                    that.safeOrCompact.showSafe = true;
                    that.safeOrCompact.showNoSafe = true;
                } else if (is_safe == 2) {
                    that.safeOrCompact.showSafe = false;
                    that.safeOrCompact.showNoSafe = false;
                }
            }
            if (that.safeOrCompact.showSafe == true) {
                that.safeOrCompact.parcent = parseInt(safe_rate * 100);
                that.safeOrCompact.isMax = true;
                that.safeOrCompact.maxPrice = max_safe;
            }
        },
        getConfig(opt, flag) {
            var that = this;
            // 请求选择参数
            // console.log(opt)
            that.$axios
                .post(process.env.API_HOST + "otherConfig", {
                    category_id: opt.category_id,
                    operation_id: opt.operation_id
                })
                .then(function (res) {
                    // console.log(res);
                    if (res.status == 200) {
                        if (res.data.code == 200) {
                            var data = res.data.data;
                            // 发布
                            if (flag == 1) {
                                var safe = data.account_bind;
                                for (var i in safe) {
                                    safe[i].ischeck = false;
                                }
                                that.sellData.seleSafeData.safe = safe;//账号绑定
                                var sellType = data.sell_type;
                                for (var i in sellType) {
                                    if (sellType[i].name == "一口价") {
                                        that.requestData.sell_type = sellType[i].value;
                                        sellType[i].ischeck = true;
                                        continue;
                                    }
                                    sellType[i].ischeck = false;
                                }
                                that.sellData.sellType.sell = sellType; //是否议价
                                that.sellData.sex = data.person_sex; //角色性别
                                that.sellData.faction = data.faction; //职业
                                that.sellData.accountType = data.account_type; //账号类型
                                var rent_type = data.rent_type;//出租方式
                                for (var i in rent_type) {
                                    if (rent_type[i].name == '天') {
                                        that.requestData.rent_type = rent_type[i].value;
                                        that.seleData.rentType = rent_type[i].name;
                                    }
                                }
                                that.sellData.rentWay = rent_type;
                                that.extend_attribute = data.extend_attribute;
                                // that.judgeInfo(data.chargeInfo);
                            } else if (flag == 2) {//编辑
                                var oldData = that.oldData;
                                //账号绑定
                                var safe = data.account_bind;
                                for (var i in safe) {
                                    safe[i].ischeck = false;
                                    for (var j in oldData.account_bind) {
                                        if (safe[i].value == oldData.account_bind[j]) {
                                            safe[i].ischeck = true;
                                            break;
                                        }
                                    }
                                }
                                that.sellData.seleSafeData.safe = safe;
                                //是否议价
                                var sellType = res.data.data.sell_type;
                                for (var i in sellType) {
                                    if (sellType[i].value == oldData.sell_type) {
                                        that.requestData.sell_type = sellType[i].value;
                                        sellType[i].ischeck = true;
                                        continue;
                                    }
                                    sellType[i].ischeck = false;
                                }
                                that.sellData.sellType.sell = sellType;
                                // 角色性别
                                for (var i in data.person_sex) {
                                    if (data.person_sex[i].value == oldData.person_sex) {
                                        that.requestData.person_sex = data.person_sex[i].value;
                                        that.seleData.sex = data.person_sex[i].name;
                                    }
                                }
                                // 职业
                                for (var i in data.faction) {
                                    if (data.faction[i].faction_id == oldData.faction_id) {
                                        that.requestData.faction_id = data.faction[i].faction_id;
                                        that.seleData.faction = data.faction[i].faction_name;
                                    }
                                }
                                // 账号类型
                                for (var i in data.account_type) {
                                    if (data.account_type[i].value == oldData.account_type) {
                                        that.requestData.account_type = data.account_type[i].value;
                                        that.seleData.accountType = data.account_type[i].name;
                                    }
                                }
                                // 图片
                                for (var i in oldData.images) {
                                    that.sellData.upimgAll.imgSrc.push(oldData.images[i].img_url);
                                }
                                that.sellData.sex = data.person_sex; //角色性别
                                that.sellData.faction = data.faction; //职业
                                that.sellData.accountType = data.account_type; //账号类型

                                var rent_type = data.rent_type;//出租方式
                                for (var i in rent_type) {
                                    if (rent_type[i].value == oldData.rent_type) {
                                        that.requestData.rent_type = rent_type[i].value;
                                        that.seleData.rentType = rent_type[i].name;
                                    }
                                }
                                that.sellData.rentWay = rent_type;

                                that.judgeInfo(data.chargeInfo);//判断合同还是保险
                            }
                        }
                    }
                })
                .catch(function (err) {
                    console.log(err);
                });
        },
        getRedact(goods_id) {
            var that = this;
            // console.log(that.$router);
            that.$axios.post(process.env.API_HOST + "getGoods", {
                goods_id: goods_id
            }).then((res) => {
                if (res.status == 200) {
                    if (res.data.code == 200) {
                        that.showLoading = false;
                        // console.log(res.data.data);
                        var data = res.data.data;
                        // 判断是不是租售
                        if (data.rent_method == 3) {
                            that.showSell = true;
                        } else {
                            that.showSell = false;
                        }
                        that.category_id = data.category_id;
                        var that_req = that.requestData;
                        // that_req.deal_type = data.deal_type; //商品类型
                        that_req.category_id = data.category_id;
                        that_req.operation_id = data.operation_id;
                        that_req.area_id = data.area_id;
                        if (data.server_id != "") {
                            that_req.server_id = data.server_id;
                        }
                        that_req.day_rent = data.day_rent;
                        that_req.cash = data.cash;
                        that_req.goods_price = parseInt(data.goods_price);
                        that_req.min_price = parseInt(data.min_price);
                        that_req.role_level = data.role_level;
                        that_req.goods_title = data.goods_title;
                        that_req.goods_description = data.goods_description;
                        that_req.mobile = data.mobile;
                        that_req.wx = data.wx;
                        that_req.video_url = data.video_url;
                        that_req.account = data.account;
                        that.oldData = data;//编辑商品旧数据
                        that.extend_attribute = data.extend_attribute;
                        that_req.extend_attribute = data.goods_attribute;

                        that.getConfig(that_req, 2);//请求选择参数
                    }
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        // 判断是不是JSON字符串
        isobjStr(str) {
            if (typeof str == "string") {
                try {
                    if (typeof JSON.parse(str) == "object") {
                        return true;
                    }
                } catch (e) {
                    return false;
                }
            } else {
                return false;
            }
        },
    },
    mounted() {
        var that = this;
        // 图片多选 判断手机类型
        if (getIos()) {
            $("#upImg").removeAttr("capture");
        }
        function getIos() {
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/iPhone\sOS/i) == "iphone os") {
                return true;
            } else {
                return false;
            }
        }
        var token = this.$store.state.token;
        if (token == undefined || token == "") {
            mui.alert(
                "请先登陆",
                "提示",
                "确认",
                function () {
                    that.$router.push({ name: "AccountLogin" });
                },
                "div"
            );
            return false;
        }
        var opt = that.$route.params;
        console.log(opt);
        // 判断有没有传参过来

        if (JSON.stringify(opt) == "{}") {
            that.$router.go(-1);
        } else {
            if (opt.flag == 1) {
                if (that.isobjStr(opt.upData)) {
                    var data = JSON.parse(opt.upData);
                    that.category_id = data.category_id;
                    that.requestData.category_id = data.category_id;
                    // that.requestData.deal_type = data.deal_type;
                    that.requestData.operation_id = data.operation_id;
                    that.requestData.area_id = data.area_id;
                    that.requestData.server_id = data.server_id;
                    that.requestData.rent_method = data.rent_id;
                    if (data.rent_id == 3) {
                        that.showSell = true;
                    } else {
                        that.showSell = false;
                    }
                    that.getConfig(data, opt.flag);//请求选择参数
                    that.head_data.tit_text = "我要出租";
                    that.editOrpublish = 1;
                } else {
                    that.$router.go(-1);
                }
            } else if (opt.flag == 2) {
                that.showLoading = true;
                that.getRedact(opt.upData);
                that.head_data.tit_text = "出租编辑";
                that.editOrpublish = 2;
                that.requestData.goods_id = opt.upData;
            } else {
                that.$router.go(-1);
            }
        }
    }
};
</script>
<style scoped>
.sellInfo-content {
    padding: 0.2rem;
}

.sellInfo-cell {
    background: #ffffff;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    margin-bottom: 0.2rem;
}

.sell-cell-top {
    line-height: 0.7rem;
    border-bottom: 1px solid #e5e5e5;
}

.sell-cell-top span {
    display: inline-block;
    color: #333333;
    font-size: 0.28rem;
}

.sell-cell-top img {
    width: 0.08rem;
    height: 0.25rem;
    margin-left: 0.17rem;
    vertical-align: middle;
    border-radius: 0.1rem;
}

.sell-cell-content {
    padding-left: 0.2rem;
}

.sell-strip {
    font-size: 0.26rem;
    color: #666666;
    border-bottom: 0.01rem solid #e5e5e5;
    padding-right: 0.2rem;
}

.sell-lefttext {
    width: 1.5rem;
    line-height: 0.9rem;
    display: inline-block;
}

.right-opt {
    width: 3rem;
    text-align: right;
    float: right;
    font-size: 0.24rem;
    color: #999999;
}

.right-opt img {
    width: 0.13rem;
    height: 0.24rem;
    vertical-align: middle;
    margin-left: 0.2rem;
    margin-top: -0.03rem;
}

.right-opt span {
    vertical-align: middle;
    display: inline-block;
    line-height: 0.9rem;
}

.sell-des {
    vertical-align: top;
    width: 1.3rem;
    margin: 0.25rem 0 0;
    display: inline-block;
}

#arbdes {
    border: none;
    width: 5.3rem;
    height: 1.5rem;
    padding: 0;
    font-size: 0.24rem;
    margin: 0.25rem 0 0.1rem;
    vertical-align: middle;
}

.sell-strip-title {
    margin: 0.2rem 0;
}

.sell-strip-content {
    padding: 0.15rem 0;
}

.red-color {
    /* color: #ff5e5e; */
}

.sell-strip-content div {
    line-height: 0.6rem;
    padding: 0 0.17rem;
    display: inline-block;
    border-radius: 0.06rem;
    -webkit-border-radius: 0.06rem;
    -moz-border-radius: 0.06rem;
    margin: 0 0.35rem 0.3rem 0;
}

.addTag {
    border: 1px solid #d2d2d2;
    color: #999999;
}

.seleTag {
    color: #FFA303;
    border: 1px solid #FFA303;
    /* border: 1px solid #ff855d;
    color: #fe7649; */
    background: #ffdbcf;
}

/* 上传图片 */
.upimg-content {
    padding: 0.2rem 0 0;
}

.img-cell {
    width: 1.5rem;
    height: 1.5rem;
    position: relative;
    display: inline-block;
    margin: 0 0.3rem 0.3rem 0;
}

.img-cell img {
    width: 1.5rem;
    height: 1.5rem;
}

.delImg {
    position: absolute;
    top: -0.1rem;
    right: -0.1rem;
    z-index: 1;
}

.delImg img {
    width: 0.32rem;
    height: 0.32rem;
}

.upimg-cell {
    vertical-align: top;
    text-align: center;
    width: 1.5rem;
    height: 1.5rem;
    position: relative;
    display: inline-block;
    margin: 0 0.3rem 0.3rem 0;
    padding: 0;
    overflow: hidden;
}

.upimg-cell img {
    width: 1.5rem;
    height: 1.5rem;
}

#upImg {
    width: 1.5rem;
    height: 1.5rem;
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 3;
    opacity: 0;
}

.sell-video {
    display: inline-block;
    line-height: 0.9rem;
    margin-right: 0.1rem;
}

/* 账号信息  账号绑定*/
.screen-sort {
    font-size: 0.26rem;
    color: #333333;
    display: inline-block;
    margin-right: 0.2rem;
}

.screen-sort span {
    vertical-align: middle;
}

.screen-sort-check {
    width: 0.28rem;
    height: 0.28rem;
    margin-right: 0.03rem;
    vertical-align: middle;
}

/* 购买保险 */
.sell-left {
    padding: 0.2rem 0;
    display: inline-block;
    vertical-align: middle;
}

/* 价格设定 是否可议价 */
/* 选项 */
.strip-radio-right {
    display: inline-block;
}

.opera {
    display: inline-block;
    margin-left: 0.7rem;
}

.opera img {
    width: 0.22rem;
    height: 0.22rem;
    vertical-align: middle;
}

.opera span {
    font-size: 0.26rem;
    color: #333333;
    vertical-align: middle;
}

/* 下一步 */
/* ==========input========= */
input {
    margin: 0;
    padding: 0.1rem;
    font-size: 0.26rem;
    border: none;
    width: 4.7rem;
    height: 0.6rem;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
}

input[type="number"] {
    -moz-appearance: textfield;
}

::-webkit-input-placeholder {
    color: #999999;
    font-size: 0.26rem;
}

:-moz-placeholder {
    color: #999999;
    font-size: 0.26rem;
}

::-moz-placeholder {
    color: #999999;
    font-size: 0.26rem;
}

:-ms-input-placeholder {
    color: #999999;
    font-size: 0.26rem;
}

.tag-wrap {
    position: fixed;
    top: 0.9rem;
    left: 0;
    right: 0;
    z-index: 9;
    max-width: 640px;
    margin: 0 auto;
}

.shade {
    position: fixed;
    top: 0.9rem;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 6;
    background: rgba(0, 0, 0, 0.3);
}

.sele-tag-wrap {
    background: #ffffff;
    padding: 0.4rem 0.2rem 0.26rem;
}

.sele-tit {
    color: #333333;
    font-size: 0.26rem;
}

.sele-con {
    height: 1.8rem;
    overflow-y: auto;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding-top: 0.2rem;
}

.sele-con div {
    margin: 0 0.4rem 0.2rem 0;
}

.pitch-on {
    height: 0.6rem;
    line-height: 0.6rem;
    font-size: 0.24rem;
    padding: 0 0.15rem;
    margin-right: 0.4rem;
    border-radius: 0.06rem;
}

/* ====服务器==== */
.server-type-box {
    background: #f3f3f3;
    height: 7rem;
    display: flex;
    justify-content: flex-start;
}

.server-operation-box {
    width: 23.7%;
    text-align: center;
    display: inline-block;
    vertical-align: top;
    overflow-y: auto;
}

.operation-type-strip {
    font-size: 0.26rem;
    color: #666666;
    line-height: 0.7rem;
}

.server-area-box {
    width: 75%;
    display: inline-block;
    background: #ffffff;
    vertical-align: top;
    padding-top: 0.3rem;
    height: 100%;
}

.red-border {
    color: #fe7649;
    background-image: url(../../../../static/img/goodscreen/vertical.png);
    background-repeat: no-repeat;
    background-size: 0.16rem 0.4rem;
    background-position: 0 70%;
}

.black-border {
    color: #666666;
}

/* 区服搜索 */
.area-type-search {
    position: relative;
    text-align: center;
    margin-bottom: 0.3rem;
}

.area-type-search input {
    width: 4.95rem;
    height: 0.6rem;
    font-size: 0.24rem;
    padding-left: 0.4rem;
    border: 1px solid #dcdcdc;
}

.search-area-ico {
    width: 0.19rem;
    height: 0.19rem;
    position: absolute;
    left: 0.45rem;
    top: 0.2rem;
}

/* 区服 */
.area-type-content {
    color: #666666;
    font-size: 0.24rem;
    padding-left: 0.3rem;
    height: 4.8rem;
    padding-bottom: 0.2rem;
    overflow-y: auto;
}

.area-type-strip {
    display: inline-block;
    padding: 0 0.15rem;
    line-height: 0.6rem;
    margin: 0 0.2rem 0.3rem 0;
    border: 1px solid #d2d2d2;
    -webkit-border-radius: 0.06rem;
    -moz-border-radius: 0.06rem;
    border-radius: 0.06rem;
}

.red-bg {
    /* color: #fe7649;
    border: 1px solid #ff855d;
    background-color: #ffdbcf;
    background-image: url(../../../../static/img/goodscreen/false_tag.png); */
    background-repeat: no-repeat;
    background-size: 0.3rem 0.25rem;
    background-position: right bottom;
}

.black-bg {
    border: 1px solid #d2d2d2;
    background: #ffffff;
}

.account-bind {
    display: flex;
    justify-content: flex-start;
    flex-wrap: nowrap;
}

.account-bind div {
    display: flex;
    justify-content: flex-start;
    flex-wrap: nowrap;
    align-items: center;
}

.pop-view {
    margin-top: 10px;
    background: #ffffff;
    text-align: center;
    list-style: none;
}

.pop-view li {
    line-height: 0.9rem;
    border-bottom: 1px solid #e5e5e5;
}

.pop-view a {
    padding: 0;
}

/* 弹出框 */
.option-gray {
    color: #666666;
    font-size: 0.28rem;
}

.option-black {
    color: #333333;
    font-size: 0.28rem;
    font-weight: 100;
}

.screen-type-bottom {
    text-align: center;
}

.ok-screen-btn {
    display: inline-block;
    width: 1.89rem;
    text-align: center;
    line-height: 0.6rem;
    height: 0.6rem;
    color: #ffffff;
    font-size: 0.26rem;
    -webkit-border-radius: 0.3rem;
    -moz-border-radius: 0.3rem;
    border-radius: 0.3rem;
    background: -webkit-linear-gradient(#fd915f, #fc534a);
    background: -o-linear-gradient(#fd915f, #fc534a);
    background: -moz-linear-gradient(#fd915f, #fc534a);
    background: linear-gradient(to right, #fd915f, #fc534a);
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #fd895c;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #fd895c;
    box-shadow: 0.06rem 0.05rem 0.09rem #fd895c;
    margin-right: 0.5rem;
}

.no-screen-btn {
    display: inline-block;
    width: 1.89rem;
    text-align: center;
    line-height: 0.6rem;
    height: 0.6rem;
    color: #ffffff;
    font-size: 0.26rem;
    -webkit-border-radius: 0.3rem;
    -moz-border-radius: 0.3rem;
    border-radius: 0.3rem;
    background: #c6c6c6;
}

.type-mu {
    min-height: 2rem;
    color: #333333;
    font-size: 0.28rem;
    background: #ffffff;
    text-align: center;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 50;
    max-width: 640px;
    margin: 0 auto;
}
.pop-view-tit,
.pop-view-bot {
    line-height: 0.9rem;
}
.pop-view-con {
    height: 0.2rem;
    background: rgba(0, 0, 0, 0.3);
}
.type-mu ul {
    border-top: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
    max-height: 4rem;
    overflow-y: scroll;
    list-style: none;
}
/* 弹出框 */
.option-gray {
    color: #666666;
    font-size: 0.28rem;
}
.option-black {
    font-weight: 100;
    line-height: 0.9rem;
    border-bottom: 1px solid #e5e5e5;
}
/* 遮罩 */
.share {
    background: rgba(0, 0, 0, 0.3);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 40;
}
.safe-hint {
    line-height: 0.2rem;
}
.rent-input {
    width: 0.8rem;
    border: 1px solid #d2d2d2;
    margin-right: 0.2rem;
    text-align: right;
}

/* 延伸属性 */
.flex-wrap {
    display: flex;
}
.strip-con {
    flex-wrap: wrap;
    /* padding:0 .2rem; */
}
.strip-con div {
    margin-bottom: 0.2rem;
}
.con-option {
    height: 0.6rem;
    line-height: 0.6rem;
    font-size: 0.24rem;
    padding: 0 0.15rem;
    margin-right: 0.4rem;
    -webkit-border-radius: 0.06rem;
    -moz-border-radius: 0.06rem;
    border-radius: 0.06rem;
    border: 1px solid #d2d2d2;
    background: #ffffff;
}


input[type="text"],input[type="number"], input[type="password"]{
    
    width: 70%;
}
.sell-strip .rent-input{
    width: 20%;
    padding: .25rem .1rem;
}
</style>
