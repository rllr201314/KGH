<template>
    <img
        :hidden="is_line"
        @click="linkService"
        class="link-server"
        src="../../../static/image/link_server.png"
    />
</template>

<script>
export default {
    name: "LinkServer",
    props: ['is_line'],
    methods: {
        linkService() {
            this.$router.push({ name: 'Service' });
        }
    }
}
</script>

<style scoped>
.link-server {
    position: fixed;
    width: 0.8rem;
    height: 0.8rem;
    top: 32%;
    right:0;
    z-index: 2;
}
</style>
