<template>
    <div class="screen-wrap">
        <div class="screen-title">
            <div class="screen-title-top">
                <div
                    class="title-top-cell"
                    v-for="(item,index) in screenTop"
                    :key="index"
                    @click="topScreen(item.flag,index)"
                    :class="item.ischeck?'switching':''"
                >
                    <span
                        :class="item.ischeck?'dominant-color':'black-color'"
                        v-text="item.tit_top_text"
                    ></span>
                    <img
                        class="title-top-img"
                        :src="item.ischeck?'../static/img/goodscreen/upempty.png':'../static/img/goodscreen/downempty.png'"
                        alt
                    />
                </div>
            </div>
            <div class="screen-title-bottom" v-if="show_extend">
                <div
                    class="title-bottom-cell"
                    v-for="(item,index) in operation_attribute"
                    :key="index"
                    @click="bottomScreen(item.attribute_id)"
                >
                    <span :class="item.ischeck?'dominant-color':'gray-color'" v-text="item.title"></span>
                    <img
                        class="title-bottom-img"
                        :src="item.ischeck?'../static/img/goodscreen/upsolid.png':'../static/img/goodscreen/downsolid.png'"
                        alt
                    />
                </div>
            </div>
        </div>
        <!-- 账号 -->
        <div
            class="account-type-box"
            :class="show_extend?'show_extend':'screen-box'"
            v-show="screenTop[0].ischeck"
        >
            <div
                class="account-type-strip"
                v-for="(item,index) in account_info"
                :key="index"
                :class="item.ischeck?'dominant-color':'black-color'"
                v-text="item.name"
                @click="seleAccount(item.value)"
            ></div>
        </div>
        <!-- 手机型号 -->
        <div
            class="phone-type-box"
            :class="show_extend?'show_extend':'screen-box'"
            v-show="screenTop[1].ischeck"
        >
            <div
                class="phone-type-strip"
                v-for="(item,index) in phone_info"
                :key="index"
                :class="item.ischeck?'dominant-color':'black-color'"
                v-text="item.alias"
                @click="selePhone(item.value)"
            ></div>
        </div>
        <!-- 服务器 -->
        <div
            class="server-type-box"
            :class="show_extend?'show_extend':'screen-box'"
            v-show="screenTop[2].ischeck"
        >
            <div class="sele-server">
                <div v-if="!showOperation" class="sele-server-box">
                    <div
                        v-for="(item,index) in seleOpe"
                        v-text="item"
                        :key="index"
                        @click="delOpe(index)"
                    ></div>
                </div>
                <div class="sele-null" v-else>请选择商品类型</div>
            </div>
            <!-- 平台 -->
            <div class="phone-type-box scroll-view" v-show="showOperation">
                <div
                    class="phone-type-strip"
                    v-for="(item,index) in operation_info"
                    :key="index"
                    :class="item.ischeck?'dominant-color':'black-color'"
                    v-text="item.platform_name"
                    @click="seleOperation(item.operation_id)"
                ></div>
            </div>
            <div v-show="!showOperation" class="server-operation">
                <!-- 区 -->
                <div class="server-operation-box" v-if="showArea">
                    <div
                        class="operation-type-strip"
                        v-for="(item,index) in area_info"
                        :key="index"
                        :class="item.ischeck?'red-border':'black-border'"
                        v-text="item.area_name"
                        @click="getArea(item.area_id)"
                    ></div>
                </div>
                <!-- 服 -->
                <div class="server-area-box" v-if="showArea">
                    <div class="area-type-search">
                        <input
                            type="text"
                            placeholder="搜索"
                            v-model="area_content"
                            @keyup.13="showKey()"
                            ref="input1"
                            @blur="outKey('s')"
                        />
                        <img class="search-area-ico" src="../../../static/img/search_ico.png" alt />
                    </div>
                    <div class="area-type-content">
                        <div
                            class="area-type-strip"
                            v-for="(item,index) in server_info"
                            :key="index"
                            :class="item.ischeck?'red-bg':'black-bg'"
                            v-text="item.server_name"
                            @click="seleServer(item.server_id,'server')"
                        ></div>
                    </div>
                    <!-- <div class="area-type-btn">确认</div> -->
                </div>
                <!-- 没区的时候只显示服 -->
                <div class="server-area-box" v-if="!showArea">
                    <div class="area-type-search">
                        <input
                            type="text"
                            placeholder="搜索"
                            v-model="area_content"
                            @keyup.13="showKey()"
                            ref="input1"
                            @blur="outKey('a')"
                        />
                        <img class="search-area-ico" src="../../../static/img/search_ico.png" alt />
                    </div>
                    <div class="area-type-content">
                        <div
                            class="area-type-strip"
                            v-for="(item,index) in server_info"
                            :key="index"
                            :class="item.ischeck?'red-bg':'black-bg'"
                            v-text="item.area_name"
                            @click="seleServer(item.area_id,'area')"
                        ></div>
                    </div>
                    <!-- <div class="area-type-btn">确认</div> -->
                </div>
            </div>
        </div>
        <!-- 筛选 -->
        <div
            class="screen-type-box"
            :class="show_extend?'show_extend':'screen-box'"
            v-show="screenTop[3].ischeck"
        >
            <div class="scorll-safari">
                <div class="screen-type-strip">
                    <div class="screen-strip-left input-price-left">价格范围</div>
                    <div class="screen-strip-right input-price-right right-margin">
                        <input class="downPrice" type="number" v-model="begin_price" />
                        <span>——</span>
                        <input class="upPrice" type="number" v-model="end_price" />元
                    </div>
                </div>
                <div class="screen-type-strip">
                    <div class="screen-strip-left sort-left-text">排序方式</div>
                    <div class="screen-strip-right right-margin">
                        <div class="screen-sort" @click="seleSort('down')">
                            <img
                                class="screen-sort-check"
                                :src="sortPrice.ischeck.downSort?sortPrice.sortSrc.sortPriceOk:sortPrice.sortSrc.sortPriceNo"
                                alt
                            />
                            <span>价格从高到低</span>
                            <img
                                class="screen-sort-ico"
                                src="../../../static/img/goodscreen/arrow_down.png"
                                alt
                            />
                        </div>
                        <div class="screen-sort" @click="seleSort('up')">
                            <img
                                class="screen-sort-check"
                                :src="sortPrice.ischeck.upSort?sortPrice.sortSrc.sortPriceOk:sortPrice.sortSrc.sortPriceNo"
                                alt
                            />
                            <span>价格从低到高</span>
                            <img
                                class="screen-sort-ico"
                                src="../../../static/img/goodscreen/arrow_up.png"
                                alt
                            />
                        </div>
                        <div class="screen-sort" @click="seleSort('more')">
                            <img
                                class="screen-sort-check"
                                :src="sortPrice.ischeck.moreSort?sortPrice.sortSrc.sortPriceOk:sortPrice.sortSrc.sortPriceNo"
                                alt
                            />
                            <span>收藏最多</span>
                        </div>
                    </div>
                </div>
                <div class="screen-type-strip">
                    <div class="screen-strip-left">账号绑定</div>
                    <div class="screen-strip-right">
                        <div
                            class="screen-strip-box"
                            v-for="(item,index) in screen_info.accountBind"
                            :key="index"
                            v-text="item.name"
                            :class="item.ischeck?'red-bg':'black-bg'"
                            @click="seleScreen('accountBind',item.value)"
                        ></div>
                    </div>
                </div>
                <div class="screen-type-strip" v-if="false">
                    <div class="screen-strip-left">视频状态</div>
                    <div class="screen-strip-right">
                        <div
                            class="screen-strip-box"
                            v-for="(item,index) in screen_info.videoStatus"
                            :key="index"
                            v-text="item.name"
                            :class="item.ischeck?'red-bg':'black-bg'"
                            @click="seleScreen('videoStatus',item.value)"
                        ></div>
                    </div>
                </div>
                <div class="screen-type-strip" v-if="false">
                    <div class="screen-strip-left">性别</div>
                    <div class="screen-strip-right">
                        <div
                            class="screen-strip-box"
                            v-for="(item,index) in screen_info.person_sex"
                            :key="index"
                            v-text="item.name"
                            :class="item.ischeck?'red-bg':'black-bg'"
                            @click="seleScreen('person_sex',item.value)"
                        ></div>
                    </div>
                </div>
                <div class="screen-type-strip" v-if="false">
                    <div class="screen-strip-left">门派</div>
                    <div class="screen-strip-right">
                        <div
                            class="screen-strip-box"
                            v-for="(item,index) in screen_info.faction"
                            :key="index"
                            v-text="item.faction_name"
                            :class="item.ischeck?'red-bg':'black-bg'"
                            @click="seleScreen('faction',item.faction_id)"
                        ></div>
                    </div>
                </div>
                <div class="screen-type-strip">
                    <div class="screen-strip-left">售价类型</div>
                    <div class="screen-strip-right">
                        <div
                            class="screen-strip-box"
                            v-for="(item,index) in screen_info.sellType"
                            :key="index"
                            v-text="item.name"
                            :class="item.ischeck?'red-bg':'black-bg'"
                            @click="seleScreen('sellType',item.value)"
                        ></div>
                    </div>
                </div>
                <div class="screen-type-strip">
                    <div class="screen-strip-left">是否可分期</div>
                    <div class="screen-strip-right">
                        <div
                            class="screen-strip-box"
                            v-for="(item,index) in screen_info.isStages"
                            :key="index"
                            v-text="item.name"
                            :class="item.ischeck?'red-bg':'black-bg'"
                            @click="seleScreen('isStages',item.value)"
                        ></div>
                    </div>
                </div>
                <div class="screen-type-strip">
                    <div class="screen-strip-left">保险情况</div>
                    <div class="screen-strip-right">
                        <div
                            class="screen-strip-box"
                            v-for="(item,index) in screen_info.isInsurance"
                            :key="index"
                            v-text="item.name"
                            :class="item.ischeck?'red-bg':'black-bg'"
                            @click="seleScreen('isInsurance',item.value)"
                        ></div>
                    </div>
                </div>
                <div class="screen-type-strip" v-if="screen_info.rent_package != ''">
                    <div class="screen-strip-left">分类等级</div>
                    <div class="screen-strip-right">
                        <div
                            class="screen-strip-box"
                            v-for="(item,index) in screen_info.rent_package"
                            :key="index"
                            v-text="item.name+item.alias"
                            :class="item.ischeck?'red-bg':'black-bg'"
                            @click="seleScreen('rent_package',item.value)"
                        ></div>
                    </div>
                </div>
                <div v-for="(item,index) in filtrate_extend" :key="index">
                    <div v-if="item.value_type == 3" class="screen-type-strip">
                        <div class="screen-strip-left" v-text="item.title"></div>
                        <div class="screen-strip-right input-price-right right-margin">
                            <input
                                class="screen-inp"
                                type="number"
                                v-model.trim="item.value[0]"
                                @input="seleFiltrateExtendFn(item.value_type,item.attribute_id,item.value)"
                            />
                            <span>~</span>
                            <input
                                class="screen-inp"
                                type="number"
                                v-model.trim="item.value[1]"
                                @input="seleFiltrateExtendFn(item.value_type,item.attribute_id,item.value)"
                            />
                        </div>
                    </div>
                    <div
                        v-if="item.value_type == 5 || item.value_type == 6"
                        class="screen-type-strip"
                    >
                        <div class="screen-strip-left" v-text="item.title"></div>
                        <div class="screen-strip-right">
                            <div
                                class="screen-strip-box"
                                v-for="(val,index) in item.option"
                                :key="index"
                                v-text="val.option_name"
                                :class="val.checked?'red-bg':'black-bg'"
                                @click="seleFiltrateExtendFn(item.value_type,val.attribute_id,val.option_value)"
                            ></div>
                        </div>
                    </div>
                </div>
                <div class="screen-type-bottom">
                    <div class="ok-screen-btn button" @click="okScreen">确认</div>
                    <div class="no-screen-btn" @click="cancleScreen">取消</div>
                </div>
            </div>
        </div>
        <!-- 自定义属性 -->
        <div
            class="bottom-screen-box"
            :class="show_extend?'show_extend':'screen-box'"
            v-show="extend_box"
        >
            <div v-if="show_attribute.value_type == 5">
                <div
                    class="screen-strip-box"
                    v-for="(item,index) in show_attribute.option"
                    v-text="item.option_name"
                    :key="index"
                    :class="item.checked?'red-bg':'black-bg'"
                    @click="selectExtentFn(item.option_value,item.attribute_id,show_attribute.value_type,show_attribute.is_checkbox)"
                ></div>
            </div>
            <div v-if="show_attribute.value_type == 6">
                <div
                    class="screen-strip-box"
                    v-for="(item,index) in show_attribute.option"
                    v-text="item.option_name"
                    :key="index"
                    :class="item.checked?'red-bg':'black-bg'"
                    @click="selectExtentFn(item.option_value,item.attribute_id,show_attribute.value_type,show_attribute.is_checkbox)"
                ></div>
            </div>
        </div>
        <!-- 遮罩 -->
        <div class="goodscreen-shade" v-show="shade" @click="hiddenScreenFun('flag')"></div>
    </div>
</template>
<script>
export default {
    name: "Screen",
    props: ['param'],
    data() {
        return {
            // 提交的数据
            miniRefresh: null,
            showNoData: false,
            begin_price: "",
            end_price: "",
            is_video: "",
            sell_type: "",
            is_stage: "",
            is_safe: "",
            role_level: "",
            sort_price: "",
            sort_collection: "", person_sex: "", faction_id: "",
            area_content: '',//区服搜索内容

            // 筛选---之上
            screenTop: [{ flag: "account", tit_top_text: "成品号", tit_top_src: "./static/img/goodscreen/downempty.png", ischeck: false },
            { flag: "phone", tit_top_text: "苹果", tit_top_src: "./static/img/goodscreen/downempty.png", ischeck: false },
            { flag: "server", tit_top_text: "服务器", tit_top_src: "./static/img/goodscreen/downempty.png", ischeck: false },
            { flag: "screen", tit_top_text: "筛选", tit_top_src: "./static/img/goodscreen/downempty.png", ischeck: false }],
            // 账号类型
            account_info: [],
            // 手机系统
            phone_info: [],
            // 显示平台
            showOperation: true,
            showArea: true,
            lastClient_id: "", //保存上一次点击的手机系统
            seleOpe: [],
            seleAreaText: { id: "", name: "" }, //记录点击那个区
            // 平台
            operation_info: [],
            // 区
            area_info: [],
            // 服
            server_all: [], //全部的服务器
            server_info: [],
            old_server: [],
            // 筛选条件// 单选----选择价格排序
            sortPrice: {
                sortSrc: {
                    sortPriceOk: "../static/img/goodscreen/okcheck.png",
                    sortPriceNo: "../static/img/goodscreen/nocheck.png"
                },
                ischeck: {
                    downSort: false,
                    upSort: false,
                    moreSort: false
                }
            },
            screen_info: {
                // 单选----账号绑定
                accountBind: [],
                // 视频状态
                videoStatus: [
                    {
                        name: "有视频",
                        ischeck: false,
                        value: 1
                    },
                    {
                        name: "无视频",
                        ischeck: false,
                        value: 2
                    }
                ],
                faction: [],
                person_sex: [],
                // 售价类型
                sellType: [],
                // 是否分期
                isStages: [
                    {
                        name: "可分期",
                        ischeck: false,
                        value: 1
                    },
                    {
                        name: "不可分期",
                        ischeck: false,
                        value: 2
                    }
                ],
                // 保险情况
                isInsurance: [
                    {
                        name: "有保险",
                        ischeck: false,
                        value: 1
                    },
                    {
                        name: "无保险",
                        ischeck: false,
                        value: 2
                    }
                ],
                // 等级
                levelType: [],
                rent_package: [],//租号类型
            },
            extend_attribute: [],//所有的属性
            operation_attribute: [],// 可操作的属性 is_menu == 1 最多显示三个
            show_attribute: {},//可选择的属性 弹出框
            hide_attribute: [],//所有可选择的属性 all
            extend_box: false,//筛选属性弹框
            shade: false,//遮罩
            show_extend: '',//显示自定义菜单
            filtrate_extend: [],
            flag_operation_attribute: [],//存储operation_attribute 用来恢复默认
        }
    },

    methods: {
        showKey() {
            this.$refs.input1.blur();
        },
        outKey(flag) {
            var that = this;
            if (flag == 'a') {//没有服务器
                var text = that.area_content;
                if (text == "") {
                    that.server_info = JSON.parse(JSON.stringify(that.old_server));
                } else {
                    var server_info = that.old_server;
                    var obj = [];
                    for (var i in server_info) {
                        if (server_info[i].area_name.indexOf(text) != -1) {
                            obj.push(server_info[i]);
                        }
                    }
                    if (obj != []) {
                        that.server_info = obj;
                    }
                }
            } else if (flag == 's') {
                var text = that.area_content;
                if (text == "") {
                    that.server_info = JSON.parse(JSON.stringify(that.old_server));
                } else {
                    var server_info = that.old_server;
                    var obj = [];
                    for (var i in server_info) {
                        if (server_info[i].server_name.indexOf(text) != -1) {
                            obj.push(server_info[i]);
                        }
                    }
                    if (obj != []) {
                        that.server_info = obj;
                    }
                }
            }
        },
        // 确认筛选
        okScreen() {
            var that = this;
            var that_r = that.request;
            that_r.begin_price = that.begin_price;
            that_r.end_price = that.end_price; //价格范围
            that_r.sort_price = that.sort_price; //价格排序
            that_r.sort_collection = that.sort_collection;
            var safe = that.screen_info.accountBind; //账号绑定
            var safe_flag = false;
            var safe_str = "";
            for (var i in safe) {
                if (safe[i].ischeck == true) {
                    safe_flag = true;
                    safe_str += "," + safe[i].value;
                }
            }
            if (safe_flag) {
                that_r.is_bind = safe_str.substring(1);
            } else {
                that_r.is_bind = "";
            }
            that_r.is_video = that.is_video;
            that_r.sell_type = that.sell_type;
            that_r.is_stage = that.is_stage;
            that_r.is_safe = that.is_safe;
            that_r.role_level = that.role_level;
            that_r.person_sex = that.person_sex;
            that_r.faction_id = that.faction_id;
            that_r.rent_package = that.is_rentPackage;
            that_r.page = 1;
            $('#minirefresh').scrollTop(0);
            that.$emit('getData', that_r, that.show_extend);
            that.hiddenScreenFun(); //隐藏筛选
        },
        cancleScreen() {
            var that = this;
            var that_r = that.request;
            that_r.is_stage = null;
            that_r.is_safe = null;
            that_r.rent_package = null;
            that_r.is_compact = null;
            that_r.sell_type = null;
            that_r.is_bind = null;
            that_r.role_level = null;
            that_r.begin_price = null;
            that_r.end_price = null;
            that_r.sort_price = null;
            that_r.sort_collection = null;
            that_r.is_video = null;
            that.request.person_sex = null;
            that.request.faction_id = null;
            that.is_stage = null;
            that.is_safe = null;
            that.is_rentPackage = null;
            that.is_compact = null;
            that.sell_type = null;
            that.is_bind = null;
            that.role_level = null;
            that.begin_price = null;
            that.end_price = null;
            that.sort_price = null;
            that.sort_collection = null;
            that.is_video = null;
            that.person_sex = null;
            that.faction_id = null;
            var sortArr = that.sortPrice.ischeck;
            sortArr.moreSort = false;
            sortArr.upSort = false;
            sortArr.downSort = false;


            for (var i in that.screen_info) {
                for (var j in that.screen_info[i]) {
                    that.screen_info[i][j].ischeck = false;
                }
            }
            for (var i in that.filtrate_extend) {
                if (that.filtrate_extend[i].value_type == 5 || that.filtrate_extend[i].value_type == 6) {
                    for (var j in that.filtrate_extend[i].option) {
                        that.filtrate_extend[i].option[j].checked = false;
                    }
                }
                if (that.filtrate_extend[i].value_type == 3) {
                    that.filtrate_extend[i].value = ['', ''];
                }
            }
            var extend_arr = that.request.extend_attribute;
            for (var i = 0, type = true; i < extend_arr.length; type ? i++ : i) {
                if (extend_arr[i].flag == "screen") {
                    extend_arr.splice(i, 1);
                    type = false;
                } else {
                    type = true;
                }
            }
            // console.log(that.filtrate_extend);
            // console.log(that.request.extend_attribute);
            that_r.page = 1;
            $('#minirefresh').scrollTop(0);
            that.$emit('getData', that_r, that.show_extend);
            that.hiddenScreenFun(); //隐藏筛选
        },
        // 上一栏选项
        topScreen(flag, index) {
            var that = this;
            var top = this.screenTop;
            for (var i in top) {
                if (flag == top[i].flag) {
                    top[i].ischeck = !top[i].ischeck;
                    if (top[i].ischeck) {
                        that.shade = true;
                    } else {
                        that.shade = false;
                    }
                    continue;
                }
                top[i].ischeck = false;
            }
            if (that.show_extend) {//判断有没有多选属性
                var bottom = this.operation_attribute;
                for (var i in bottom) {
                    bottom[i].ischeck = false;
                }
                that.extend_box = false;
            }
            if (that.param.rent_status == 2 && that.$parent.showRentPackage) {
                that.$parent.showRentPackageFn(false)
            }
        },
        // 下一栏刷新
        bottomScreen(id) {
            var that = this;
            var top = that.screenTop;
            for (var i in top) {
                top[i].ischeck = false;
            }
            var operation = that.operation_attribute;
            var hide = that.hide_attribute;
            for (var i in operation) {
                if (operation[i].attribute_id == id) {
                    operation[i].ischeck = !operation[i].ischeck;
                    if (operation[i].ischeck) {//点击的这个属性的值为true显示弹框，匹配对应的值
                        that.extend_box = true;
                        that.shade = true;
                        for (var i in hide) {
                            if (hide[i].attribute_id == id) {
                                that.show_attribute = hide[i]
                            }
                        }
                    } else {
                        that.extend_box = false;
                        that.shade = false;
                        that.show_attribute = {};
                    }
                    continue;
                }
                operation[i].ischeck = false;
            }
            if (that.param.rent_status == 2 && that.$parent.showRentPackage) {
                that.$parent.showRentPackageFn(false)
            }
        },
        // 隐藏---遮罩+筛选框
        hiddenScreenFun(flag) {
            var that = this;
            var screentop = that.screenTop;
            for (var i in screentop) {
                screentop[i].ischeck = false;
            }
            if (that.show_extend) {//判断有没有多选属性
                var bottom = this.operation_attribute;
                for (var i in bottom) {
                    bottom[i].ischeck = false;
                }
                that.extend_box = false;
            }
            that.shade = false;
            if (flag) {
                that.okScreen();//传参是为了不让重复调用
            }
        },
        // 下栏筛选方法
        selectExtentFn(value, id, type, checkbox) {
            console.log(checkbox)
            var that = this;
            var option = that.show_attribute.option;
            var all_extend = that.request.extend_attribute;
            if (type == 6 || (checkbox == 1 && type == 5)) {
                for (var i in option) {
                    if (option[i].option_value == value) {
                        option[i].checked = !option[i].checked;
                        if (option[i].checked) {
                            that.changeText(true, id, option[i].option_name);//筛选属性的名称改为值得名称；
                            if (all_extend == '') {
                                all_extend.push({
                                    attribute_id: id,
                                    option_value: String(value)
                                })
                            } else {
                                var flag = true;
                                for (var x in all_extend) {
                                    if (all_extend[x].attribute_id == id) {
                                        flag = false;
                                        var arr = all_extend[x].option_value.split(',');
                                        arr.push(value);
                                        all_extend[x].option_value = arr.join(',');
                                    }
                                }
                                if (flag) {
                                    all_extend.push({
                                        attribute_id: id,
                                        option_value: String(value)
                                    })
                                }
                            }
                        } else {
                            that.changeText(false, id);//变成默认值；
                            for (var x in all_extend) {
                                if (all_extend[x].attribute_id == id) {
                                    var arr = all_extend[x].option_value.split(',');
                                    arr.splice(arr.indexOf(String(value)), 1);
                                    all_extend[x].option_value = arr.join(',');
                                    if (all_extend[x].option_value == '') {
                                        all_extend.splice(x, 1)
                                    }
                                }
                            }
                        }
                        break;
                    }
                }
            } else if (type == 5 && checkbox != 1) {
                for (var i in option) {
                    if (option[i].option_value == value) {
                        option[i].checked = !option[i].checked;
                        if (option[i].checked) {
                            that.changeText(true, id, option[i].option_name);
                            if (all_extend == '') {
                                all_extend.push({
                                    attribute_id: id,
                                    option_value: String(value)
                                })
                            } else {
                                var flag = true;
                                for (var x in all_extend) {
                                    if (all_extend[x].attribute_id == id) {
                                        flag = false;
                                        all_extend[x].option_value = String(value);
                                    }
                                }
                                if (flag) {
                                    all_extend.push({
                                        attribute_id: id,
                                        option_value: String(value)
                                    })
                                }
                            }
                        } else {
                            that.changeText(false, id);//变成默认值；
                            for (var x in all_extend) {
                                if (all_extend[x].attribute_id == id) {
                                    all_extend.splice(x, 1)
                                }
                            }
                        }
                        continue;
                    }
                    option[i].checked = false;
                }
            }
            that.$emit('getData', that.request, that.show_extend);
            that.hiddenScreenFun(); //隐藏筛选
        },
        // 改变自定义筛选栏字体
        changeText(flag, id, text) {
            var that = this;
            // debugger;
            var operation = that.operation_attribute;
            if (flag) {
                for (var i in operation) {
                    if (operation[i].attribute_id == id) {
                        operation[i].title = text;
                        break;
                    }
                }
            } else {
                for (var i in operation) {
                    if (operation[i].attribute_id == id) {
                        operation[i].title = that.flag_operation_attribute[i].title;
                        break;
                    }
                }
            }
        },
        // 筛选框自定义属性筛选
        seleFiltrateExtendFn(type, id, value) {
            var that = this;
            var arr = that.filtrate_extend;
            var all_extend = that.request.extend_attribute;
            if (type == 3) {
                var val = value.join(',');
                if (all_extend == "") {
                    all_extend.push({
                        attribute_id: id,
                        option_value: val,
                        flag: 'screen'
                    })
                } else {
                    var flag = true;
                    for (var x in all_extend) {
                        if (all_extend[x].attribute_id == id) {
                            flag = false;
                            all_extend[x].option_value = val;
                        }
                    }
                    if (flag) {
                        all_extend.push({
                            attribute_id: id,
                            option_value: val,
                            flag: 'screen'
                        })
                    }
                }
            } else if (type == 5) {
                for (var i in arr) {
                    if (arr[i].attribute_id == id) {
                        for (var j in arr[i].option) {
                            if (arr[i].option[j].option_value == value) {
                                arr[i].option[j].checked = !arr[i].option[j].checked;
                                if (arr[i].option[j].checked) {
                                    if (all_extend == '') {
                                        all_extend.push({
                                            attribute_id: id,
                                            option_value: String(value),
                                            flag: 'screen'
                                        })
                                    } else {
                                        var flag = true;
                                        for (var x in all_extend) {
                                            if (all_extend[x].attribute_id == id) {
                                                flag = false;
                                                all_extend[x].option_value = String(value);
                                            }
                                        }
                                        if (flag) {
                                            all_extend.push({
                                                attribute_id: id,
                                                option_value: String(value),
                                                flag: 'screen'
                                            })
                                        }
                                    }
                                } else {
                                    for (var x in all_extend) {
                                        if (all_extend[x].attribute_id == id) {
                                            all_extend.splice(x, 1)
                                        }
                                    }
                                }
                                continue;
                            }
                            arr[i].option[j].checked = false;
                        }
                        break;
                    }
                }
            } else if (type == 6) {
                for (var i in arr) {
                    if (arr[i].attribute_id == id) {
                        for (var j in arr[i].option) {
                            if (arr[i].option[j].option_value == value) {
                                arr[i].option[j].checked = !arr[i].option[j].checked;
                                if (arr[i].option[j].checked) {
                                    if (all_extend == '') {
                                        all_extend.push({
                                            attribute_id: id,
                                            option_value: String(value),
                                            flag: 'screen'
                                        })
                                    } else {
                                        var flag = true;
                                        for (var x in all_extend) {
                                            if (all_extend[x].attribute_id == id) {
                                                flag = false;
                                                var arr = all_extend[x].option_value.split(',');
                                                arr.push(value);
                                                all_extend[x].option_value = arr.join(',');
                                            }
                                        }
                                        if (flag) {
                                            all_extend.push({
                                                attribute_id: id,
                                                option_value: String(value),
                                                flag: 'screen'
                                            })
                                        }
                                    }
                                } else {
                                    for (var x in all_extend) {
                                        if (all_extend[x].attribute_id == id) {
                                            var arr = all_extend[x].option_value.split(',');
                                            arr.splice(arr.indexOf(String(value)), 1);
                                            all_extend[x].option_value = arr.join(',');
                                            if (all_extend[x].option_value == '') {
                                                all_extend.splice(x, 1)
                                            }
                                        }
                                    }
                                }
                                break;
                            }
                        }
                        break;
                    }
                }
            }
            // console.log(that.request.extend_attribute)
        },
        // 选择账号类型
        seleAccount(value) {
            var that = this;
            var accountAll = that.account_info;
            var text = that.screenTop[0];
            for (var i in accountAll) {
                if (accountAll[i].value == value) {
                    accountAll[i].ischeck = true;
                    text.tit_top_text = accountAll[i].name;
                    continue;
                }
                accountAll[i].ischeck = false;
            }
            that.request.deal_type = value;
            that.request.page = 1;
            that.$emit('getData', that.request, that.show_extend);
            that.hiddenScreenFun(); //隐藏筛选
        },
        // 选择手机系统
        selePhone(value) {
            var that = this;
            // debugger;
            if (that.lastClient_id != value) {
                var phoneAll = that.phone_info;
                var text = that.screenTop[1];
                for (var i in phoneAll) {
                    if (value == phoneAll[i].value) {
                        phoneAll[i].ischeck = true;
                        text.tit_top_text = phoneAll[i].alias;
                        continue;
                    }
                    phoneAll[i].ischeck = false;
                }
                that.lastClient_id = value;
                that.getOperation(value);

                that.request.operation_id = "";
                that.request.area_id = "";
                that.request.server_id = "";
                that.request.client_id = value;
                that.request.page = 1;
                $('#minirefresh').scrollTop(0);
                that.$emit('getData', that.request, that.show_extend);
            }
            that.hiddenScreenFun(); //隐藏筛选
        },
        // 选择服务器--平台
        seleOperation(operation_id) {
            var that = this;
            var seleOpe = that.seleOpe;
            var operationAll = that.operation_info;
            for (var i in operationAll) {
                if (operationAll[i].operation_id == operation_id) {
                    operationAll[i].ischeck = true;
                    seleOpe[0] = operationAll[i].platform_name;
                    that.showOperation = false;
                    continue;
                }
                operationAll[i].ischeck = false;
            }
            that.getServer(operation_id);

            that.request.operation_id = operation_id;
            that.request.page = 1;
            that.$emit('getData', that.request, that.show_extend);
        },
        // 选择服务器
        seleServer(opt, flag) {
            var that = this;
            that.request.page = 1;
            if (flag == "area") {
                var areaAll = that.server_info;
                for (var i in areaAll) {
                    if (opt == areaAll[i].area_id) {
                        areaAll[i].ischeck = true;
                        that.seleOpe[1] = areaAll[i].area_name;
                        continue;
                    }
                    areaAll[i].ischeck = false;
                }
                that.request.area_id = opt;
                that.$emit('getData', that.request, that.show_extend);

            } else if (flag == "server") {
                var areaAll = that.server_info;
                for (var i in areaAll) {
                    if (opt == areaAll[i].server_id) {
                        areaAll[i].ischeck = true;
                        that.seleOpe[1] = that.seleAreaText.name;
                        that.seleOpe[2] = areaAll[i].server_name;
                        continue;
                    }
                    areaAll[i].ischeck = false;
                }
                that.request.area_id = that.seleAreaText.id;
                that.request.server_id = opt;
                that.$emit('getData', that.request, that.show_extend);
            }
            that.hiddenScreenFun(); //隐藏筛选
        },
        // 删除选择的区服
        delOpe(ind) {
            var that = this;
            that.request.page = 1;
            $('#minirefresh').scrollTop(0);
            if (ind == "0") {
                that.seleOpe = [];
                that.showOperation = true;
                that.request.operation_id = "";
                that.request.area_id = "";
                that.request.server_id = "";
                that.$emit('getData', that.request, that.show_extend);
            }
            if (ind == "1") {
                if (that.showArea) {
                    that.seleOpe.splice(1, 2);
                    for (var i in that.server_info) {
                        that.server_info[i].ischeck = false;
                    }
                    that.request.area_id = "";
                    that.request.server_id = "";
                    that.$emit('getData', that.request, that.show_extend);
                } else {
                    that.seleOpe.splice(1, 1);
                    for (var i in that.server_info) {
                        that.server_info[i].ischeck = false;
                    }
                    that.request.area_id = "";
                    that.$emit('getData', that.request, that.show_extend);
                }
            } else if (ind == "2") {
                that.seleOpe.splice(2, 1);
                for (var i in that.server_info) {
                    that.server_info[i].ischeck = false;
                }
                that.request.server_id = "";
                that.$emit('getData', that.request, that.show_extend);
            }
        },
        // 获取区服
        getServer(operation_id) {
            var that = this;
            that.$axios
                .post(process.env.API_HOST + "areaServer", {
                    operation_id: operation_id
                })
                .then(function (res) {
                    if (res.data.data.server_info == "") {
                        that.showArea = false;
                        that.old_server = res.data.data.area_info;
                        that.server_info = res.data.data.area_info;
                        for (var i in that.server_info) {
                            that.server_info[i].ischeck = false;
                        }

                    } else {
                        that.showArea = true;
                        for (var i in res.data.data.area_info) {
                            if (i == 0) {
                                res.data.data.area_info[i].ischeck = true;
                                continue;
                            }
                            res.data.data.area_info[i].ischeck = false;
                        }
                        for (var i in res.data.data.server_info) {
                            res.data.data.server_info[i].ischeck = false;
                        }
                        that.area_info = res.data.data.area_info;
                        that.server_all = res.data.data.server_info;
                        that.old_server = res.data.data.server_info;
                        that.getArea(that.area_info[0].area_id);
                    }
                })
                .catch(function (err) {
                    console.log(err);
                });
        },
        // 获取服务器
        getArea(area_id) {
            var that = this;
            var all = that.server_all;
            var info = (that.server_info = []);
            for (var i in all) {
                if (area_id == all[i].area_id) {
                    all[i].ischeck = false;
                    info.push(all[i]);
                }
            }
            var areaAll = that.area_info;
            for (var i in areaAll) {
                if (areaAll[i].area_id == area_id) {
                    that.seleAreaText.name = areaAll[i].area_name;
                    that.seleAreaText.id = areaAll[i].area_id;
                    areaAll[i].ischeck = true;
                    continue;
                }
                areaAll[i].ischeck = false;
            }
        },
        // 筛选--排序
        seleSort(flag) {
            var that = this;
            var sortArr = that.sortPrice.ischeck;
            if (flag == "down") {
                sortArr.moreSort = false;
                sortArr.upSort = false;
                sortArr.downSort = !sortArr.downSort;
                if (sortArr.downSort) {
                    that.sort_collection = "";
                    that.sort_price = "1";
                } else {
                    that.sort_collection = "";
                    that.sort_price = "";
                }
            } else if (flag == "up") {
                sortArr.downSort = false;
                sortArr.moreSort = false;
                sortArr.upSort = !sortArr.upSort;
                if (sortArr.upSort) {
                    that.sort_collection = "";
                    that.sort_price = "2";
                } else {
                    that.sort_collection = "";
                    that.sort_price = "";
                }
            } else if (flag == "more") {
                sortArr.downSort = false;
                sortArr.upSort = false;
                sortArr.moreSort = !sortArr.moreSort;
                if (sortArr.moreSort) {
                    that.sort_price = "";
                    that.sort_collection = "1";
                } else {
                    that.sort_collection = "";
                    that.sort_price = "";
                }
            }
        },
        // 筛选--类型
        seleScreen(flag, seleTag) {
            var that = this;
            // 账号绑定
            if (flag == "accountBind") {
                var accountBindAll = that.screen_info.accountBind;
                if (seleTag == "4") {
                    for (var i in accountBindAll) {
                        if (seleTag == accountBindAll[i].value) {
                            accountBindAll[i].ischeck = !accountBindAll[i].ischeck;
                            continue;
                        }
                        accountBindAll[i].ischeck = false;
                    }
                } else {
                    for (var i in accountBindAll) {
                        if (seleTag == accountBindAll[i].value) {
                            accountBindAll[i].ischeck = !accountBindAll[i].ischeck;
                        }
                        if (accountBindAll[i].value == "4") {
                            accountBindAll[i].ischeck = false;
                        }
                    }
                }
            } else if (flag == "videoStatus") {//视频绑定
                that.is_video = that.setScreen(seletag, that.screen_info.videoStatus);
            } else if (flag == "person_sex") {//性别
                that.person_sex = that.setScreen(seleTag, that.screen_info.person_sex);
            } else if (flag == 'faction') {//门派option_id
                that.faction_id = that.setScreen(seleTag, that.screen_info.faction, 'faction_id');
            } else if (flag == "sellType") {//售价类型
                that.sell_type = that.setScreen(seleTag, that.screen_info.sellType);
            } else if (flag == "isStages") {//是否分期
                that.is_stage = that.setScreen(seleTag, that.screen_info.isStages);
            } else if (flag == "isInsurance") {//保险情况
                that.is_safe = that.setScreen(seleTag, that.screen_info.isInsurance);
            } else if (flag == "rent_package") {
                that.is_rentPackage = that.setScreen(seleTag, that.screen_info.rent_package);
            }
        },
        setScreen(seleTag, data, val = 'value') {
            var result = null;
            for (var i in data) {
                if (seleTag == data[i][val]) {
                    data[i].ischeck = !data[i].ischeck;
                    if (data[i].ischeck) {
                        result = seleTag;
                    } else {
                        result = "";
                    }
                    continue;
                }
                data[i].ischeck = false;
            }
            return result;
        },
        // 配置
        getConfig(category_id, request) {
            var that = this;
            that.request = request;
            that.$axios
                .post(process.env.API_HOST + "searchConfig", {
                    category_id: category_id
                })
                .then(function (res) {
                    // console.log(res);
                    if (res.status == 200) {
                        if (res.data.code == 200) {
                            var deal_type = res.data.data.deal_type;
                            // 租号
                            if (that.param.rent_status == 2) {
                                deal_type = [{
                                    name: "租号",
                                    value: 2,
                                    ischeck: true,
                                }];
                                that.request.deal_type = 2;
                            } else {//成品号
                                for (var i in deal_type) {
                                    deal_type[i].ischeck = false;
                                    if (deal_type[i].name == "成品号") {
                                        deal_type[i].ischeck = true;
                                        that.request.deal_type = deal_type[i].value;
                                    }
                                }
                            }
                            that.account_info = deal_type;
                            var client_idAll = res.data.data.client_id;
                            client_idAll.unshift({ name: "all", alias: "全部", value: -1, status: 1 });
                            for (var i in client_idAll) {
                                if (client_idAll[i].alias == "全部") {
                                    that.screenTop[1].tit_top_text = client_idAll[i].alias;
                                    that.lastClient_id = "";//上一次保存的手机系统选项
                                    client_idAll[i].ischeck = true;
                                    that.getOperation(client_idAll[i].value); //调用获取平台接口
                                    that.request.client_id = client_idAll[i].value;
                                    continue;
                                }
                                client_idAll[i].ischeck = false;
                            }
                            that.phone_info = client_idAll;
                            that.screen_info.accountBind = that.setConfig(res.data.data.account_bind_all);
                            that.screen_info.person_sex = that.setConfig(res.data.data.person_sex);
                            that.screen_info.faction = that.setConfig(res.data.data.faction);
                            that.screen_info.sellType = that.setConfig(res.data.data.sell_type);
                            that.screen_info.levelType = that.setConfig(res.data.data.role_level);
                            if (that.param.rent_status == 2) {
                                that.screen_info.rent_package = that.setConfig(res.data.data.rent_package);
                            }
                            that.extend_attribute = [], that.hide_attribute = [], that.operation_attribute = [], that.filtrate_extend = [];
                            if (res.data.data.extend_attribute != '') {
                                that.extend_attribute = res.data.data.extend_attribute;
                                for (var i in that.extend_attribute) {
                                    if ((that.extend_attribute[i].is_menu == 1 && that.extend_attribute[i].option != '') && that.operation_attribute.length < 3) {//下栏筛选值
                                        var operation_obj = {}, hide_obj = {};
                                        operation_obj.attribute_id = that.extend_attribute[i].attribute_id;
                                        operation_obj.title = that.extend_attribute[i].title;
                                        operation_obj.ischeck = false;
                                        hide_obj.attribute_id = that.extend_attribute[i].attribute_id;//属性id
                                        hide_obj.option = that.extend_attribute[i].option;//属性选项
                                        hide_obj.value_type = that.extend_attribute[i].value_type;//属性类型
                                        hide_obj.is_checkbox = that.extend_attribute[i].is_checkbox;//属性类型
                                        that.operation_attribute.push(operation_obj);
                                        that.hide_attribute.push(hide_obj);
                                    } else if ((that.extend_attribute[i].value_type == 5 && that.extend_attribute[i].option != '') || (that.extend_attribute[i].value_type == 6 && that.extend_attribute[i].option != "")) {//筛选页显示属性 现只判断多选和单选 
                                        that.filtrate_extend.push(that.extend_attribute[i]);
                                    } else if (that.extend_attribute[i].value_type == 3) {// 3 是数值类型
                                        that.extend_attribute[i].value = ['', ''];
                                        that.filtrate_extend.push(that.extend_attribute[i]);
                                    }
                                }
                                that.flag_operation_attribute = JSON.parse(JSON.stringify(that.operation_attribute));
                                if (that.operation_attribute != '') {
                                    that.show_extend = true;
                                } else {
                                    that.show_extend = false;
                                }
                            } else {
                                that.show_extend = false;
                            }
                            // 调用商品列表接口
                            that.request.page = 1;
                            that.$emit('getData', that.request, that.show_extend);
                        }
                    }
                })
                .catch(function (err) {
                    console.log(err);
                });
        },
        setConfig(data) {
            for (var i in data) {
                data[i].ischeck = false;
            }
            return data;
        },
        // 获取区服
        getOperation(client_id) {
            var that = this;
            that.$axios
                .post(process.env.API_HOST + "operation", {
                    client_id: client_id,
                    category_id: that.request.category_id
                })
                .then(function (res) {
                    // console.log(res);
                    if (res.status == 200) {
                        if (res.data.code == 200) {
                            var platform = res.data.data; //平台
                            for (var i in platform) {
                                platform[i].ischeck = false;
                            }
                            that.operation_info = platform;
                            that.seleOpe = [];
                            that.showOperation = true;
                        }
                    }
                })
                .catch(function (err) {
                    console.log(err);
                });
        },
    },
    mounted() {
        var that = this;
        if (that.param.rent_status == 1) {
            that.screenTop[0].tit_top_text = "成品号"
        } else {
            that.screenTop[0].tit_top_text = "租号"
        }
    },



};
</script>
<style scoped>
.screen-wrap {
    position: fixed;
    top: 0.88rem;
    left: 0;
    right: 0;
    z-index: 20;
}
/* 筛选 */
.screen-title {
    background: #ffffff;
    margin-bottom: 0.2rem;
    z-index: 66;
    max-width: 640px;
    margin: 0 auto;
}
.screen-title-top,
.screen-title-bottom {
    display: flex;
    justify-content: space-around;
}
.screen-title-top {
    font-size: 0.28rem;
    height: 0.8rem;
    line-height: 0.8rem;
    border-bottom: 0.01rem solid #e5e5e5;
    background: #f8f8f8;
}
.screen-title-bottom {
    font-size: 0.24rem;
    height: 0.7rem;
    box-shadow: 0.01rem 0.04rem 0.06rem #c9c8c8;
}
.title-top-cell {
    padding: 0 0.1rem 0 0.15rem;
}
.title-top-cell img {
    width: 0.2rem;
    height: 0.11rem;
    margin-left: 0.14rem;
    vertical-align: middle;
}
.title-top-cell span {
    vertical-align: middle;
}
.title-bottom-cell {
    width: 2rem;
    height: 0.5rem;
    text-align: center;
    margin: auto 0;
}
.title-bottom-cell img {
    width: 0.2rem;
    height: 0.1rem;
    margin: auto 0 auto 0.14rem;
    vertical-align: middle;
}
.title-bottom-cell span {
    display: inline-block;
    line-height: 0.5rem;
    vertical-align: middle;
}

/* 遮罩 */
.goodscreen-shade {
    position: fixed;
    left: 0;
    top: 2.5rem;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 4;
    margin: 0 auto;
    max-width: 640px;
}

/* 筛选弹出框 -- 公共样式 */
.screen-box {
    background: #ffffff;
    border-top: 0.01rem solid #e5e5e5;
    background: #ffffff;
    position: fixed;
    left: 0;
    top: 1.68rem;
    right: 0;
    z-index: 6;
    max-width: 640px;
    margin: 0 auto;
}
.show_extend {
    background: #ffffff;
    border-top: 0.01rem solid #e5e5e5;
    background: #ffffff;
    position: fixed;
    left: 0;
    top: 2.38rem;
    right: 0;
    z-index: 6;
    max-width: 640px;
    margin: 0 auto;
}
/* =========================== */
/* 账号类型 */
.account-type-box {
    font-size: 0.26rem;
    padding-left: 0.3rem;
}
.account-type-box .account-type-strip:nth-last-child(1) {
    border: 0;
}
.account-type-strip {
    line-height: 0.9rem;
    border-bottom: 0.01rem solid #e5e5e5;
}
.sele-border {
    border-bottom: 0.05rem solid #ff5d54;
}
.black-color {
    color: #333333;
}
/* .red-color {
    color: #fe7649;
} */
.gray-color {
    color: #666666;
}
/* 手机系统 */
.phone-type-box {
    font-size: 0.26rem;
    padding-left: 0.3rem;
}
.phone-type-box .phone-type-strip:nth-last-child(1) {
    border: 0;
}
.phone-type-strip {
    line-height: 0.9rem;
    border-bottom: 1px solid #e5e5e5;
}
/* ====服务器==== */
.server-type-box {
}
.sele-server {
    height: 0.9rem;
    background: #f3f3f3;
}
.sele-null {
    background: #ffffff;
    font-size: 0.28rem;
    color: #bcbcbc;
    text-align: center;
    line-height: 0.9rem;
    border-bottom: 1px solid #e5e5e5;
}
.scroll-view {
    max-height: 3.5rem;
    overflow-y: auto;
}
.sele-server-box {
    padding: 0 0.2rem;
    height: 0.9rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.sele-server-box div {
    height: 0.6rem;
    line-height: 0.6rem;
    font-size: 0.24rem;
    padding: 0 0.17rem;
    
    color: #FFA303; 
    border: 1px solid #FFA303;
    background-color: #ffdbcf;
    background-image: url(../../../static/image/false_tag.png);

    background-repeat: no-repeat;
    background-size: 0.3rem 0.25rem;
    background-position: right bottom;
    margin-right: 0.4rem;
}
.server-operation {
    display: flex;
    justify-content: flex-start;
}
.server-operation-box {
    width: 25%;
    text-align: center;
    display: inline-block;
    vertical-align: top;
    height: 6rem;
    overflow-y: auto;
}
.operation-type-strip {
    font-size: 0.26rem;
    color: #666666;
    line-height: 0.7rem;
}
.server-area-box {
    width: 100%;
    display: inline-block;
    background: #ffffff;
    vertical-align: top;
    padding-top: 0.3rem;
}
.red-border {
    color: #fe7649;
    background-image: url(../../../static/img/goodscreen/vertical.png);
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
    width: 4.95rem;
    height: 0.6rem;
    margin: 0 auto 0.2rem;
}
.area-type-search input {
    width: 4.95rem;
    height: 0.6rem;
    font-size: 0.24rem;
    margin: 0;
    padding: 0 0.3rem;
}
.search-area-ico {
    width: 0.19rem;
    height: 0.19rem;
    position: absolute;
    left: 0.1rem;
    top: 0.2rem;
}
/* 区服 */
.area-type-content {
    color: #666666;
    font-size: 0.24rem;
    padding-left: 0.3rem;
    height: 5rem;
    overflow-y: auto;
}
.area-type-strip {
    display: inline-block;
    padding: 0 0.15rem;
    line-height: 0.6rem;
    margin: 0 0.2rem 0.3rem 0;
    border: 0.01rem solid #d2d2d2;
    -webkit-border-radius: 0.06rem;
    -moz-border-radius: 0.06rem;
    border-radius: 0.06rem;
}
.red-bg {
    /* color: #fe7649;
    border: 1px solid #ff855d;
    background-color: #ffdbcf;
    background-image: url(../../../static/img/goodscreen/false_tag.png); */
    background-repeat: no-repeat;
    background-size: 0.3rem 0.25rem;
    background-position: right bottom;
}
.black-bg {
    border: 1px solid #d2d2d2;
    background: #ffffff;
}
/* ============================ 筛选 ======================== */
.screen-type-box {
    padding: 0.3rem 0;
    bottom: 0;
    overflow-y: auto;
}
.scorll-safari {
    /* min-height:100vh; */
    /* overflow-y: auto; */
}
.screen-type-strip {
    display: flex;
    justify-content: flex-start;
}
.screen-strip-left {
    display: inline-block;
    width: 22.7%;
    font-size: 0.26rem;
    color: #666666;
    padding-left: 0.2rem;
    vertical-align: top;
}
.screen-strip-right {
    display: inline-block;
    width: 76%;
    vertical-align: top;
}
.screen-strip-right input::-webkit-outer-spin-button,
.raise-price input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
}
input[type="number"] {
    -moz-appearance: textfield;
}
/* 价格输入 */
.input-price-left {
    line-height: 0.6rem;
}
.input-price-right {
    font-size: 0.26rem;
    color: #333333;
}
.input-price-right input {
    width: 1.4rem;
    height: 0.6rem;
    margin: 0 0.14rem 0 0;
    font-size: 0.26rem;
    padding: 0.1rem;
}
.input-price-right span {
    margin-right: 0.14rem;
}
/* 价格排序 */
.sort-left-text {
    padding-top: 0.1rem;
}
.screen-sort {
    font-size: 0.26rem;
    color: #333333;
    display: inline-block;
    margin-right: 0.3rem;
}
.screen-sort span {
    vertical-align: middle;
}
.screen-sort-check {
    width: 0.28rem;
    height: 0.28rem;
    margin-right: 0.13rem;
    vertical-align: middle;
}
.screen-sort-ico {
    width: 0.12rem;
    height: 0.25rem;
    vertical-align: middle;
}
/* 筛选类型 */
.screen-strip-box {
    display: inline-block;
    line-height: 0.6rem;
    font-size: 0.24rem;
    padding: 0 0.15rem;
    margin-right: 0.35rem;
    -webkit-border-radius: 0.06rem;
    -moz-border-radius: 0.06rem;
    border-radius: 0.06rem;
    color: #666666;
    margin-bottom: 0.3rem;
}
.screen-strip-box-level {
    display: inline-block;
    line-height: 0.6rem;
    font-size: 0.24rem;
    padding: 0 0.08rem;
    margin-right: 0.25rem;
    -webkit-border-radius: 0.06rem;
    -moz-border-radius: 0.06rem;
    border-radius: 0.06rem;
    color: #666666;
    margin-bottom: 0.3rem;
}
.right-margin {
    margin-bottom: 0.3rem;
}
/* 筛选确认 */
.screen-type-bottom {
    text-align: center;
    margin-bottom: 0.2rem;
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
    /* background: -webkit-linear-gradient(#fd915f, #fc534a);
    background: -o-linear-gradient(#fd915f, #fc534a);
    background: -moz-linear-gradient(#fd915f, #fc534a);
    background: linear-gradient(to right, #fd915f, #fc534a); */
    /* -webkit-box-shadow: 3px 3px 6px #fd895c;
    -moz-box-shadow: 3px 3px 6px #fd895c;
    box-shadow: 3px 3px 6px #fd895c; */
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
    margin-left: 0.5rem;
}

/* 筛选下栏------ */
.bottom-screen-box {
    padding: 0.3rem 0.2rem 0;
}
.bottom-screen-box div {
    margin-bottom: 0.3rem;
}
</style>
