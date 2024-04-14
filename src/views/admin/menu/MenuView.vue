<template>
    <el-container>
        <el-header>
            <div class="header-content">
                <h1>Teaching Assistant Dashboard</h1>
            </div>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <!-- Menu for navigation -->
                <el-menu default-active="home" router>
                    <el-menu-item index="home">Dashboard</el-menu-item>
                    <el-menu-item index="grades">Manage Grades</el-menu-item>
                    <el-menu-item index="publish">Publish Assignment</el-menu-item>
                    <el-menu-item index="generate">Generate Assignment</el-menu-item>
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
    import { ref } from 'vue';

    // const selectedMenu = ref('1');

    // Add your methods and data properties here
</script>

<style lang="scss" scoped></style>
