<template>
    <el-container>
        <el-header>
            <div class="header-content">
                <h1>计算机系统基础辅助教学系统</h1>
                <span>你好, {{ user?.account }}</span>
            </div>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <!-- Menu for navigation -->
                <el-menu default-active="home" router>
                    <el-menu-item index="home">主页</el-menu-item>
                    <el-menu-item v-if="user?.identity === 'admin'" index="grades"
                        >学生管理</el-menu-item
                    >
                    <el-menu-item v-if="user?.identity === 'admin'" index="publish"
                        >任务发布</el-menu-item
                    >
                    <el-menu-item v-if="user?.identity === 'admin'" index="generate"
                        >任务生成</el-menu-item
                    >
                    <el-menu-item index="files">文件中心</el-menu-item>
                    <el-menu-item index="posts">论坛</el-menu-item>
                </el-menu>
            </el-aside>
            <el-main><RouterView /></el-main>
        </el-container>
        <el-footer>
            <span>© 2024 Teaching Assistant System</span>
        </el-footer>
    </el-container>
</template>

<script lang="ts" setup>
    import { computed } from 'vue';
    import { useStore } from 'vuex';
    import { type User, type State } from '@/type/index';

    const store = useStore<State>();

    const user = computed(() => store.state.user as User | null);
</script>

<style lang="scss" scoped>
    .header-content {
        display: flex;
        justify-content: space-between;
    }
</style>
