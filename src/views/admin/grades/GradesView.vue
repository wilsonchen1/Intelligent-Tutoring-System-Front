<template>
    <el-container>
        <el-main>
            <el-table :data="userList" stripe max-height="600" style="width: 100%">
                <el-table-column prop="account" label="学号"></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <!-- 将原本的单纯显示转变为可编辑的输入框 -->
                <el-table-column prop="test_1" label="测试1">
                    <template #default="{ row }">
                        <el-input
                            v-if="row.editing"
                            v-model="row.test_1"
                            size="small"
                        ></el-input>
                        <span v-else>{{ row.test_1 }}</span>
                    </template>
                </el-table-column>
                <!-- 重复为其他成绩字段 -->
                <el-table-column prop="test_2" label="测试2">
                    <template #default="{ row }">
                        <el-input
                            v-if="row.editing"
                            v-model="row.test_2"
                            size="small"
                        ></el-input>
                        <span v-else>{{ row.test_2 }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="test_3" label="测试3">
                    <template #default="{ row }">
                        <el-input
                            v-if="row.editing"
                            v-model="row.test_3"
                            size="small"
                        ></el-input>
                        <span v-else>{{ row.test_3 }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="test_final" label="期末考试">
                    <template #default="{ row }">
                        <el-input
                            v-if="row.editing"
                            v-model="row.test_final"
                            size="small"
                        ></el-input>
                        <span v-else>{{ row.test_final }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="{ row }">
                        <el-button size="small" @click="toggleEditing(row)">{{
                            row.editing ? '保存' : '编辑'
                        }}</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>
    </el-container>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import instance from '@/http/index';
    import { ElMessage } from 'element-plus';

    const userList = ref([]);

    async function getUserList() {
        try {
            const res = await instance({
                method: 'GET',
                url: 'api/getUsers'
            });
            userList.value = res.data.results.map((user: any) => ({
                ...user,
                editing: false
            }));
        } catch (error) {
            console.error('获取用户列表失败:', error);
        }
    }

    function toggleEditing(row: any) {
        if (row.editing) {
            saveChanges(row); // 如果处于编辑状态，则保存修改
        } else {
            row.editing = true; // 否则，进入编辑状态
        }
    }

    function saveChanges(row: any) {
        instance({
            method: 'PATCH',
            url: 'api/updateGrades',
            data: {
                account: row.account,
                grades: {
                    test_1: row.test_1,
                    test_2: row.test_2,
                    test_3: row.test_3,
                    test_final: row.test_final
                }
            }
        })
            .then((response) => {
                console.log('更新成功:', response);
                ElMessage.success('更新成功');
                row.editing = false; // 保存成功后，退出编辑状态
                getUserList(); // 重新加载用户列表以显示更新后的数据
            })
            .catch((error) => {
                console.error('更新失败:', error);
            });
    }

    onMounted(() => {
        getUserList();
    });
</script>

<style lang="scss" scoped>
    /* 这里可以添加一些样式 */
</style>
