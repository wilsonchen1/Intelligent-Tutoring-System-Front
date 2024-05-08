<template>
    <el-container>
        <el-header>
            <h1>二进制炸弹</h1>
        </el-header>
        <el-main>
            <el-input
                type="textarea"
                v-model="output"
                :rows="12"
                placeholder="Output will be displayed here..."
                readonly
            ></el-input>
            <el-input
                v-model="userInput"
                placeholder="Enter your input..."
                @keyup.enter="sendInput"
                clearable
            ></el-input>
            <el-button type="primary" @click="sendInput">Send</el-button>
        </el-main>
    </el-container>
</template>

<script lang="ts" setup>
    import { ref, onMounted, onUnmounted } from 'vue';

    const output = ref('');
    const userInput = ref('');
    let websocket: WebSocket | null = null;

    const connectWebSocket = () => {
        websocket = new WebSocket('ws://localhost:8080');

        websocket.onopen = () => {
            console.log('WebSocket connected');
            output.value += 'Connection established.\n';
        };

        websocket.onmessage = (event) => {
            console.log('Message received:', event.data);
            output.value += event.data + '\n';
        };

        websocket.onerror = (error) => {
            console.error('WebSocket Error:', error);
            output.value += 'WebSocket error.\n';
        };

        websocket.onclose = () => {
            console.log('WebSocket closed');
            output.value += 'Connection closed.\n';
            websocket = null;
        };
    };

    const sendInput = () => {
        if (websocket && userInput.value.trim() !== '') {
            websocket.send(userInput.value);
            userInput.value = ''; // Clear input after sending
        }
    };

    onMounted(() => {
        connectWebSocket();
    });

    onUnmounted(() => {
        if (websocket) {
            websocket.close();
        }
    });
</script>

<style lang="scss" scoped>
    .el-input,
    .el-button {
        margin-top: 20px;
    }
</style>
