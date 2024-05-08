<template>
    <el-container class="experiment-list">
        <el-main>
            <h1 class="title">实验列表</h1>
            <div class="list-container">
                <el-card
                    v-for="(experiment, index) in experiments"
                    :key="index"
                    class="experiment-item"
                    @click.native="goToExperiment(experiment)"
                    shadow="hover"
                >
                    <h2>{{ experiment.name }}</h2>
                </el-card>
            </div>
        </el-main>
        <RouterView></RouterView>
    </el-container>
</template>

<script lang="ts" setup>
    import { useRouter } from 'vue-router';

    const experiments = [
        { name: '二进制炸弹', path: '/texts/bomb-game' },
        { name: '实验2', path: '/experiment2' },
        { name: '实验3', path: '/experiment3' },
        { name: '实验4', path: '/experiment4' }
    ];

    const router = useRouter();

    function goToExperiment(experiment: { path: string }) {
        router.push(experiment.path);
    }
</script>
<style lang="scss" scoped>
    .experiment-list {
        display: flex;
        justify-content: center;
        padding: 20px;
    }

    .title {
        text-align: center;
        margin-bottom: 20px;
        color: #2c3e50;
    }

    .list-container {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        justify-content: center;
    }

    .experiment-item {
        cursor: pointer;
        width: 300px; /* 定义卡片宽度 */
        transition: transform 0.3s;
    }

    .experiment-item:hover {
        transform: translateY(-5px); /* 悬停时上移效果 */
    }
</style>
