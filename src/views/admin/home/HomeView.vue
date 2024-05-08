<template>
    <div class="personal-center">
        <!-- 个人基本信息 -->
        <el-card class="section">
            <h2 slot="header">个人基本信息</h2>
            <div class="info">
                <p>用户名：{{ userInfo.username }}</p>
                <p>邮箱：{{ userInfo.email }}</p>
                <p>手机号：{{ userInfo.phone }}</p>
                <el-button type="primary" @click="editUserInfo">修改信息</el-button>
            </div>
        </el-card>

        <!-- 私信和消息通知列表 -->
        <el-card class="section">
            <h2 slot="header">私信和消息通知</h2>
            <div class="messages">
                <el-collapse v-model="activeNames">
                    <el-collapse-item
                        v-for="message in messages"
                        :key="message.id"
                        :title="message.time"
                    >
                        {{ message.content }}
                    </el-collapse-item>
                </el-collapse>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { ElButton, ElCard, ElCollapse, ElCollapseItem } from 'element-plus';

    // 模拟用户信息
    const userInfo = ref({
        username: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890'
    });

    // 模拟私信和消息通知列表
    const messages = ref([
        { id: 1, content: '这是一条私信内容', time: '2024-05-15 10:00' },
        { id: 2, content: '这是一条通知内容', time: '2024-05-14 15:30' },
        { id: 3, content: '这是一条消息内容', time: '2024-05-13 08:45' }
    ]);

    // 响应式属性，用于控制展开的消息
    const activeNames = ref([]);

    // 编辑用户信息的方法
    const editUserInfo = () => {
        // 实现编辑用户信息的逻辑，例如弹出修改信息的表单对话框
        console.log('点击了修改信息按钮');
    };
</script>

<style lang="scss" scoped>
    .personal-center {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
    }

    .section {
        margin-bottom: 30px;
    }

    .info {
        padding: 20px;
        border-radius: 5px;
        background-color: #f9f9f9;
    }

    .messages {
        padding: 20px;
        border-radius: 5px;
        background-color: #f9f9f9;
    }
</style>
