<template>
    <el-dialog v-model="state.forgetDialogVisible" title="找回密码" width="40%">
        <el-form
            ref="ruleFormRef"
            :model="forgetFormData"
            status-icon
            :rules="rules"
            :label-position="labelPosition"
        >
            <el-form-item label="输入学号" prop="account">
                <el-input v-model="forgetFormData.account" autocomplete="off" />
            </el-form-item>
            <el-form-item label="输入邮箱" prop="email">
                <el-input
                    v-model="forgetFormData.email"
                    type="email"
                    autocomplete="off"
                />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="state.forgetDialogVisible = false"
                    >取消</el-button
                >
                <el-button type="primary" @click="nextStep()"> 下一步 </el-button>
            </div>
        </template>
    </el-dialog>
    <!-- 修改密码 -->
    <el-dialog v-model="state.changeDialogVisible" title="修改密码" width="40%">
        <el-form
            ref="ruleFormRef"
            :model="forgetFormData"
            status-icon
            :rules="rules"
            :label-position="labelPosition"
        >
            <el-form-item label="输入新密码" prop="password">
                <el-input v-model="forgetFormData.password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="确认新密码" prop="repassword">
                <el-input
                    v-model="forgetFormData.repassword"
                    type="password"
                    autocomplete="off"
                />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="state.changeDialogVisible = false"
                    >取消</el-button
                >
                <el-button type="primary" @click="state.changeDialogVisible = false">
                    完成
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
    import { reactive, ref } from 'vue';
    import { type forgetData } from '@/type/login';

    const labelPosition = ref('top');

    const forgetFormData: forgetData = reactive({
        account: '',
        email: '',
        password: '',
        repassword: ''
    });

    const rules = ref({
        account: [
            {
                required: true,
                message: '请输入学号',
                trigger: 'blur'
            },
            {
                min: 10,
                max: 10,
                message: '学号的长度为10',
                trigger: 'blur'
            }
        ],
        email: [
            {
                required: true,
                message: '请输入邮箱',
                trigger: 'blur'
            },
            {
                type: 'email',
                message: '请输入正确邮箱',
                trigger: ['blur', 'change']
            }
        ],
        password: [
            {
                required: true,
                message: '请输入密码',
                trigger: 'blur'
            },
            {
                min: 3,
                max: 20,
                message: '密码的长度在3-20之间',
                trigger: 'blur'
            }
        ],
        repassword: [
            {
                required: true,
                message: '请确认密码',
                trigger: 'blur'
            },
            { validator: validateRepassword, trigger: 'blur' }
        ]
    });

    function validateRepassword(rule: any, value: string, callback: any) {
        if (value !== forgetFormData.password) {
            return callback(new Error('两次输入的密码不一致'));
        }
        callback();
    }
    function nextStep() {
        state.changeDialogVisible = true;
        state.forgetDialogVisible = false;
    }
    const state = reactive({
        forgetDialogVisible: false,
        changeDialogVisible: false
    });

    const open = () => {
        state.forgetDialogVisible = true;
    };

    defineExpose({ open });
</script>

<style lang="scss" scoped></style>
