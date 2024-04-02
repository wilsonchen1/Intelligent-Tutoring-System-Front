<template>
    <el-container>
        <el-main>
            <el-table v-loading="fileListLoading" :data="files" style="width: 100%">
                <el-table-column prop="name" label="File Name"></el-table-column>
                <el-table-column label="Actions" width="280">
                    <template #default="{ row }">
                        <el-button size="small" @click="downloadFile(row)"
                            >下载</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>

            <el-button @click="showUploadDialog = true" style="margin-top: 20px"
                >上传文件</el-button
            >

            <el-dialog v-model="showUploadDialog" title="文件上传">
                <el-upload drag multiple :http-request="submitUpload">
                    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                    <div>拖拽文件或 <em>点击上传</em></div>
                </el-upload>
            </el-dialog>
        </el-main>
    </el-container>
</template>

<script setup lang="ts">
    import { ElMessage } from 'element-plus';
    import { UploadFilled } from '@element-plus/icons-vue';
    import { ref, onMounted } from 'vue';
    import instance from '@/http/index';

    const files = ref([]);
    const fileListLoading = ref(true);

    const showUploadDialog = ref(false);

    // 初始化列表
    onMounted(() => {
        fetchFiles();
    });

    async function fetchFiles() {
        try {
            const response = await instance({
                url: 'api/getFiles',
                method: 'GET'
            });
            files.value = response.data.data;
            fileListLoading.value = false;
        } catch (error) {
            console.error('Error fetching files:', error);
        }
    }

    const submitUpload = async (options: any) => {
        // 关闭弹窗并展示上传中消息，列表变为加载状态
        showUploadDialog.value = false;
        fileListLoading.value = true;
        ElMessage({ message: '上传中...', duration: 0, type: 'info' });

        const uploadUrl = 'api/upload';
        const { file } = options;
        const formData = new FormData();
        formData.append('file', file, encodeURIComponent(file.name));
        try {
            const res = await instance({
                url: uploadUrl,
                method: 'POST',
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' },
                // 大文件防超时
                timeout: 1800000
            });
            ElMessage.closeAll('info');
            ElMessage.success(res.data.message);
            fetchFiles();
        } catch (error) {
            ElMessage.error('文件上传失败');
            console.error('上传错误:', error);
        }
    };

    function downloadFile(file: { name: string; url: string }) {
        window.location.href = `${file.url}`;
    }
</script>

<style lang="scss">
    .dialog-footer {
        display: flex;
        justify-content: flex-end;
    }
    /* 按钮基础颜色 */
    .el-button {
        background-color: #34495e;
        border-color: #34495e;
        color: #ffffff;

        /* 鼠标悬停效果 */
        &:hover,
        &:focus {
            background-color: darken(#34495e, 10%);
            border-color: darken(#34495e, 10%);
        }

        /* 激活/选中效果 */
        &:active {
            background-color: darken(#34495e, 20%);
            border-color: darken(#34495e, 20%);
        }
    }

    /* 主题色按钮 */
    .el-button--primary {
        background-color: #34495e;
        border-color: #34495e;

        &:hover,
        &:focus {
            background-color: darken(#34495e, 10%);
            border-color: darken(#34495e, 10%);
        }

        &:active {
            background-color: darken(#34495e, 20%);
            border-color: darken(#34495e, 20%);
        }
    }
</style>
