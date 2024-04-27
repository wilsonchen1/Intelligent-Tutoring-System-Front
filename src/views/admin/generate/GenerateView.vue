<template>
    <el-container>
        <el-main>
            <div class="header-wrapper">
                <h2>知识点选择</h2>
                <el-select
                    v-model="selectedChapterId"
                    placeholder="请选择章节"
                    style="max-width: 400px"
                >
                    <el-option
                        v-for="chapter in chapters"
                        :key="chapter.chapterId"
                        :label="`第${chapter.chapterId}章  ` + chapter.chapterName"
                        :value="chapter.chapterId"
                    ></el-option>
                </el-select>
                <el-button @click="generatePaper">生成试卷</el-button>
            </div>
            <!-- 知识点表格 -->
            <el-table
                :data="selectedKnowledgePoints"
                @select="handleSelection"
                style="width: 100%"
            >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column
                    prop="label"
                    label="知识点小节"
                    width="125"
                ></el-table-column>
                <el-table-column prop="name" label="知识点名称"></el-table-column>
            </el-table>
        </el-main>
    </el-container>
</template>

<script lang="ts" setup>
    import { ref, onMounted, computed } from 'vue';
    import instance from '@/http/index';
    import { type Chapters, type KnowledgePoint } from '@/type/generate';
    import { ElMessage } from 'element-plus';
    const chapters = ref<Chapters>([]);
    const selectedChapterId = ref(null);
    const pointsToGenerate = ref<KnowledgePoint[]>([]);
    const taskContent = ref(null);

    // 计算属性：根据选中的章节ID过滤对应的知识点
    const selectedKnowledgePoints = computed(() => {
        const chapter = chapters.value.find(
            (ch) => ch.chapterId === selectedChapterId.value
        );
        return chapter ? chapter.knowledgePoints : [];
    });
    // 获取章节及知识点
    const getChapters = async () => {
        try {
            const res = await instance({
                method: 'get',
                url: 'api/getChapters'
            });
            chapters.value = res.data.results.map((chapterData: any) => ({
                chapterId: chapterData.chapter_id.toString(), // 假设后端返回的chapter_id是数字
                chapterName: chapterData.chapter_name,
                knowledgePoints: chapterData.knowledgePoints.map((kp: any) => ({
                    id: kp.knowledge_point_id.toString(), // 假设后端返回的knowledge_point_id是数字
                    name: kp.knowledge_point_name,
                    label: kp.knowledge_point_label
                }))
            }));
            console.log(chapters.value);
        } catch (err) {
            console.error('获取章节及知识点列表失败:', err);
        }
    };
    const handleSelection = (val: KnowledgePoint[], row: any) => {
        // 判断当前行是否被选中
        console.log(val, row);

        const isSelected = val.some((item) => item.id === row.id);
        console.log(isSelected, 'isSelected');
        if (isSelected) {
            // 如果当前行被选中，则添加到pointsToGenerate中，同时避免重复添加
            const exists = pointsToGenerate.value.find((item) => item.id === row.id);
            if (!exists) {
                pointsToGenerate.value.push(row);
            }
        } else {
            // 如果当前行被取消选中，则从pointsToGenerate中移除
            const index = pointsToGenerate.value.findIndex(
                (item) => item.id === row.id
            );
            if (index !== -1) {
                pointsToGenerate.value.splice(index, 1);
            }
        }
    };

    // 用户点击“生成试卷”按钮时的处理函数
    const generatePaper = async () => {
        // 实现生成试卷的逻辑
        const postData = pointsToGenerate.value.map((item) => {
            return item.name;
        });
        // .join(',');
        console.log(postData, 'postData');

        try {
            const res = await instance({
                method: 'POST',
                url: 'api/generatePaper',
                data: { knowledgePoints: postData }
            });
            ElMessage({
                message: res.data.message,
                duration: 0,
                showClose: true,
                type: 'info'
            });
            // 用返回的任务id进行轮训
            pollTaskStatus(res.data.taskId);
        } catch (error) {
            console.log(error);
        }
    };
    const pollTaskStatus = (taskId: string) => {
        const intervalId = setInterval(async () => {
            try {
                const res = await instance({
                    method: 'POST',
                    url: 'api/getTaskStatus',
                    data: {
                        taskId
                    }
                });
                if (res.data.status === 'complete') {
                    clearInterval(intervalId); // 停止轮询
                    // 生成的试卷内容
                    taskContent.value = res.data.data;
                    ElMessage.closeAll('info');
                    ElMessage({
                        type: 'success',
                        showClose: true,
                        message: '生成成功，请到试卷模块查看'
                    });
                } else if (res.data.status === 'error') {
                    clearInterval(intervalId); // 停止轮询
                    console.log(res.data.message, 'error');
                } else {
                    console.log('任务正在处理中...');
                }
            } catch (error) {
                console.log(error);
            }
        }, 15000);
    };

    onMounted(() => {
        getChapters();
    });
</script>

<style lang="scss" scoped>
    .header-wrapper {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        .el-select {
            margin-right: 20px;
        }
    }
    .header-wrapper h2 {
        padding-right: 16px; /* 为了不让按钮紧贴在标题后 */
    }
</style>
