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

<style lang="scss" scoped>
    .el-container {
        font-family: 'Nunito', sans-serif;
    }
    .header-content h1 {
        margin: 0;
        font-weight: 700;
    }

    .el-header {
        background-color: #34495e; /* 与标题颜色协调 */
        color: #ffffff;
        line-height: 60px; /* 增加行高以垂直居中标题 */
        padding: 0 20px; /* 添加一些内边距 */
    }

    .el-aside {
        background-color: #2c3e50;
    }

    .el-menu {
        background-color: #2c3e50;
        border-right: none; /* 移除不必要的边框 */
    }

    .el-menu-item {
        color: #b4c0d4; /* 亮灰色的菜单项 */
    }

    .el-menu-item:focus,
    .el-menu-item:hover {
        background-color: #1a242f; /* 暗色调悬停效果 */
        color: #ffffff; /* 白色文字 */
    }
    .el-footer {
        background-color: #34495e; /* 页脚背景色 */
        color: #ffffff; /* 页脚文字颜色 */
        line-height: 60px; /* 页脚高度 */
        text-align: center; /* 文字居中 */
    }
    .el-main {
        background-color: #ecf0f1; /* 浅灰色背景，提高阅读体验 */
        padding: 20px; /* 添加一些内边距 */
    }
</style>
