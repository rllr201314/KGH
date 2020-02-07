<template>
    <div class="footer">
        <!-- <div>
            <span>看个号7*24小时为您提供安全快捷的服务</span>
            <span class="about" @click="linkCompany">关于我们</span>
        </div>
        <div>陕ICP备19006831号-1</div>
        <div><img src="../../../static/img/footer/beian.png" alt=""><span>陕公网安备61011102000141号</span></div>
        <div>增值电信业务经营许可证：浙B2-20180197</div>
        <div class="copy"><a href="http://company.kangehao.com/" target="_blank">西安看个号网络科技有限公司@2018-2028</a></div>
        <div>kangehao.com版权所有</div>
        <div class="footer-link">
            <a href="http://www.epicc.com.cn/?cmpid=2seb2pzBT00002" target="_blank">
                <img src="../../../static/img/footer/ic_link_picc.png" alt="中国人民保险" />
            </a>
            <a href="https://www.yunhetong.com/" target="_blank">
                <img src="../../../static/img/footer/ic_link_yht.png" alt="云合同" />
            </a>
            <a id="_pingansec_bottomimagesmall_shiming" target="_blank" href="http://si.trustutn.org/info?sn=539190624038281768367&certType=1">
                <img src="//v.trustutn.org/images/cert/realname_small_img.png" alt="认证联盟" />
            </a>
        </div>
        <div class="footer-link">
            <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=61011102000141" target="_blank">
                <img src="../../../static/img/footer/ic_link_wjb.png" alt="网警备案" />
            </a>
            <a href="http://webscan.360.cn/index/checkwebsite?url=www.kangehao.com" target="_blank">
                <img src="../../../static/img/footer/ic_link_360.png" alt="360可信网站" />
            </a>
            <a href="http://www.zjwhsc.com/zjwh/QR_Place_Info.aspx?Place_Guid=be5fce830e1b4e7e9e77253f9ac545af" target="_blank">
                <img src="../../../static/img/footer/ic_link_www.png" alt="文网文" />
            </a>
        </div>-->

        <div class="nav">
            <span class="line">关于看个号</span>
            <span class="vertical"></span>
            <span class="line">友情链接</span>
            <span class="vertical"></span>
            <span class="line">意见反馈</span>
        </div>
        <div>看个号7*24小时为您提供安全快捷的服务</div>
        <div>陕ICP备19006831号-1</div>
        <div>西安看个号网络科技有限公司@2018-2028</div>
        <div>kangehao.com版权所有</div>
    </div>
</template>

<script>
export default {
    name: "Footer",
    methods: {
        linkCompany() {
            window.open("http://company.kangehao.com/")
        }
    }
}
</script>

<style lang="scss" >
.footer {
    padding: 0.25rem 0 0.05rem;
    background: #535353;
    text-align: center;
}
.footer div {
    color: #cccccc;
    font-size: 0.22rem;
    margin-bottom: 0.2rem;
    line-height: 0.25rem;
}
.footer img {
    width: 0.3rem;
    height: 0.3rem;
    vertical-align: middle;
    margin-right: 0.1rem;
}
.footer div span {
    vertical-align: bottom;
}

.footer-link {
    width: 100%;
}
.footer-link a {
    width: 30%;
}

.footer-link img {
    width: 20%;
    height: 0.5rem;
}

.copy a {
    color: #cccccc;
}

.copy a:hover {
    color: #cccccc;
    text-decoration: underline;
}
.about {
    color: #2f9cf5;
    margin-left: 0.2rem;
    text-decoration: underline;
}
.about:hover {
    cursor: pointer;
}

.nav {
    margin-bottom: 0.25rem;
    span {
        display: inline-block;
    }
    .vertical {
        width: 1px;
        height: 0.18rem;
        background: #b0b0b0;
        margin: auto 0.4rem;
    }
    .line {
        padding: 0 0.15rem;
        border-bottom: 1px solid #b0b0b0;
    }
}

.footer div {
    color: #cccccc;
    font-size: 0.22rem;
    line-height: 0.4rem;
}
</style>
