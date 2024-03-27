<script setup lang="ts">
    import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
    <RouterView />
</template>

<style lang="scss">
    * {
        padding: 0px;
        margin: 0px;
    }

    html,
    body,
    #app {
        width: 100%;
        height: 100%;
        display: flex;
    }
</style>
