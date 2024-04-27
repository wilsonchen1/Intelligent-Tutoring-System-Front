<template>
    <div class="post-form">
        <el-form @submit.native.prevent="submitPost">
            <el-form-item label="标题">
                <el-input v-model="post.title" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="内容">
                <el-input
                    type="textarea"
                    v-model="post.content"
                    placeholder="请输入内容"
                    rows="4"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">发布帖子</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script setup lang="ts">
    import { ref } from 'vue';
    import { ElForm, ElFormItem, ElInput, ElButton, ElMessage } from 'element-plus';
    import { type PostData } from '@/type/posts';
    import instance from '@/http/index';
    import type { User } from '@/type';
    const props = defineProps({
        user: Object as () => User
    });
    // 注册事件
    const emit = defineEmits(['post-created']);

    const post = ref<PostData>({ userId: '', title: '', content: '' });

    const submitPost = async () => {
        console.log('Submitting:', post.value);
        // 这里可以添加发帖到服务器的逻辑
        const res = await instance({
            method: 'post',
            url: 'api/createPost',
            data: {
                user_id: props.user?.user_id,
                title: post.value.title,
                content: post.value.content
            }
        });
        if (res.data.message && res.data.message === '帖子创建成功') {
            // 清空表单
            post.value.title = '';
            post.value.content = '';
            // 发射一个自定义事件，通知父组件
            emit('post-created'); // 'post-created' 是自定义事件名称
            ElMessage.success({ message: res.data.message });
        } else {
            ElMessage.error({ message: res.data.message });
        }
    };
</script>
<style lang="scss" scoped>
    .post-form {
        padding: 20px;
        background: #fff;
        border-radius: 5px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

        .el-form-item {
            margin-bottom: 20px;
        }
    }
</style>
