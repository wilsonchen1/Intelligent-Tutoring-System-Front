<template>
    <el-container>
        <el-main>
            <el-table :data="userList" stripe max-height="600" style="width: 100%">
                <el-table-column prop="account" label="学号"></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="test_1" label="测试1"></el-table-column>
                <el-table-column prop="test_2" label="测试2"></el-table-column>
                <el-table-column prop="test_3" label="测试3"></el-table-column>
                <el-table-column
                    prop="test_final"
                    label="期末考试"
                ></el-table-column>
                <el-table-column label="操作">
                    <template #default="{ row }">
                        <el-button size="small" @click="editRow(row)"
                            >编辑</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
        </el-main>
    </el-container>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import instance from '@/http/index';

    const userList = ref([]);

    async function getUserList() {
        try {
            const res = await instance({
                method: 'GET',
                url: 'api/getUsers'
            });
            userList.value = res.data.results;
        } catch (error) {
            console.error('获取用户列表失败:', error);
        }
    }

    function editRow(row) {
        console.log('编辑行:', row);
        // 这里可以根据需要实现编辑逻辑，例如显示一个表单对话框以编辑选定的行
    }

    onMounted(() => {
        getUserList();
    });
</script>

<style lang="scss" scoped>
    /* 这里可以添加一些样式 */
</style>
