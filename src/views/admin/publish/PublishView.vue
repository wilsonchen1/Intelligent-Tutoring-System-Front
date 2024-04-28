<template>
    <el-container>
        <el-main>
            <h2>历史试卷</h2>
            <el-table :data="papersHistory" style="width: 100%">
                <el-table-column prop="date" label="日期"></el-table-column>
                <el-table-column prop="points" label="知识点数量"></el-table-column>
                <el-table-column label="操作">
                    <template #default="{ row }">
                        <el-button size="small">查看详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-main></el-container
    >
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    const papersHistory = ref([]); // 假设这里你会从后端获取历史试卷列表
</script>

<style lang="scss" scoped></style>
