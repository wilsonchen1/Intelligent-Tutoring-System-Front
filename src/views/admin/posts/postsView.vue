<template>
    <div class="scroll-container">
        <el-card
            class="box-card"
            v-for="post in posts"
            :key="post.id"
            style="margin-bottom: 20px"
        >
            <div slot="header" class="post-title">
                <div>
                    <h3>{{ post.title }}</h3>
                    <span class="author">发布者：{{ post.author }}</span>
                </div>
                <el-button type="primary" @click="toggleReply(post.id)"
                    >回复</el-button
                >
            </div>
            <div class="post-content">{{ post.content }}</div>
            <el-collapse v-model="activeNames">
                <el-collapse-item
                    :title="'回复 (' + post.replies.length + '条)'"
                    :name="`post-${post.id}`"
                    :key="`collapse-${post.id}`"
                >
                    <div class="reply-input" v-show="replyVisible[post.id]">
                        <el-input
                            type="textarea"
                            v-model="replyContent[post.id]"
                            placeholder="输入回复内容..."
                            class="reply-textarea"
                        ></el-input>
                        <el-button
                            type="primary"
                            @click="submitReply(post.id)"
                            :loading="replyLoading[post.id]"
                            class="reply-button"
                            >发送</el-button
                        >
                    </div>
                    <div
                        v-for="(reply, index) in post.replies"
                        :key="reply.id"
                        class="reply"
                    >
                        <p>{{ reply.content }}</p>
                        <p class="reply-info">
                            {{ reply.replier }} - {{ reply.create_time }}
                        </p>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </el-card>
    </div>
</template>
<script lang="ts" setup>
    import { ref, onMounted, reactive } from 'vue';
    import {
        ElCard,
        ElButton,
        ElCollapse,
        ElCollapseItem,
        ElInput,
        ElMessage
    } from 'element-plus';
    import instance from '@/http/index';
    import { type Post } from '@/type/posts';

    const posts = ref<Post[]>([]);
    const activeNames = ref<string[]>([]); // 使用字符串数组
    // 定义replyVisible的类型
    interface ReplyVisibility {
        [key: number]: boolean;
    }

    const replyVisible = reactive<ReplyVisibility>({});
    const replyContent = reactive<{ [key: number]: string }>({});
    const replyLoading = reactive<{ [key: number]: boolean }>({});
    const getPosts = async () => {
        const res = await instance({
            method: 'GET',
            url: '/api/listPosts'
        });
        posts.value = res.data.posts;
        posts.value.forEach((post) => {
            replyVisible[post.id] = false;
            replyContent[post.id] = '';
            replyLoading[post.id] = false;
            activeNames.value.push(`post-${post.id}`); // 默认展开所有帖子的回复
        });
    };

    const toggleReply = (postId: number) => {
        replyVisible[postId] = !replyVisible[postId];
    };

    const submitReply = async (postId: number) => {
        if (!replyContent[postId]) {
            alert('回复内容不能为空！');
            return;
        }
        console.log(replyContent, 'replyContent');
        replyLoading[postId] = true;
        // Submit reply logic here
        const res = await instance({
            method: 'POST',
            url: 'api/createReply',
            data: {
                post_id: postId,
                // 之后user_id换成从全局获取
                user_id: 7,
                content: replyContent[postId]
            }
        });
        ElMessage.success({ message: res.data.message });
        getPosts();
        replyLoading[postId] = false;
    };

    onMounted(getPosts);
</script>
<style lang="scss" scoped>
    .scroll-container {
        max-height: 79vh; /* 限制容器最大高度 */
        overflow-y: auto; /* 当内容超出时显示滚动条 */
    }
    .box-card {
        transition: 0.3s;
        .post-title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            h3 {
                font-weight: bold; /* 加粗标题 */
                margin-bottom: 0;
            }
            .author {
                font-size: 0.85em; /* 调整发布者信息的字体大小 */
                color: #666;
            }
        }
        .post-content {
            min-height: 100px;
            max-height: 150px;
            overflow-y: auto; /* 内容超过时可滚动 */
            padding: 10px 0; /* 增加上下内边距 */
            border-top: 1px solid #ebeef5; /* 顶部分隔线 */
        }
        .reply-input {
            display: flex;
            margin-top: 10px;
        }
        .reply-textarea {
            flex: 1;
            margin-right: 10px;
        }
        .reply-button {
            min-width: 80px; /* 设置按钮最小宽度 */
        }
        .reply {
            border-bottom: 1px solid #ebeef5;
            margin-bottom: 10px;
            padding-bottom: 10px;
        }
        .reply-info {
            font-size: 12px;
            color: #8492a6;
        }
    }
</style>
