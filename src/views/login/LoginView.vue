<template>
    <div class="login-box">
        <h2 class="title">计算机系统基础</h2>
        <el-tabs v-model="activeName" stretch>
            <el-tab-pane label="登陆" name="login"></el-tab-pane>
            <el-tab-pane label="注册" name="register"></el-tab-pane>
            <el-form
                ref="ruleFormRef"
                :model="currentFormData"
                status-icon
                :rules="rules"
                label-width="80px"
            >
                <!-- 登陆表单 -->
                <el-form-item label="学号：" prop="account">
                    <el-input v-model="currentFormData.account" autocomplete="off" />
                </el-form-item>
                <el-form-item label="密码：" prop="password">
                    <el-input
                        v-model="currentFormData.password"
                        type="password"
                        autocomplete="off"
                    />
                </el-form-item>
                <el-form-item v-if="activeName === 'login'">
                    <el-button type="primary" class="login-btn" @click="submitForm()"
                        >登录
                    </el-button>
                    <div class="forget-btn" @click="openForgetPasswordDialog()">
                        忘记密码？
                    </div>
                </el-form-item>
                <!-- 注册表单 -->
                <el-form-item v-else label="确认密码" prop="repassword">
                    <el-input
                        v-model="currentFormData.repassword"
                        type="password"
                        autocomplete="off"
                    />
                </el-form-item>

                <el-form-item
                    v-if="activeName === 'register'"
                    label="选择身份"
                    prop="identity"
                >
                    <el-select
                        v-model="currentFormData.identity"
                        placeholder="选择身份"
                    >
                        <el-option label="学生" value="student" />
                        <el-option label="老师" value="admin" />
                    </el-select>
                </el-form-item>
                <el-form-item v-if="activeName === 'register'">
                    <el-button
                        type="primary"
                        class="register-btn"
                        @click="submitForm()"
                        >注册
                    </el-button>
                </el-form-item>
            </el-form>
        </el-tabs>
    </div>
    <forget-dialog ref="forget"></forget-dialog>
</template>

<script setup lang="ts">
    import { reactive, ref, computed } from 'vue';
    import { type FormData } from '@/type/login';
    import { ElMessage } from 'element-plus';

    import { loginService as login, registerService as register } from '@/api/login';
    import forgetDialog from './components/ForgetDialog.vue';
    import { useStore } from 'vuex';
    import { useRouter } from 'vue-router';
    import { type User, type State } from '@/type/index';

    const router = useRouter();
    const store = useStore();
    // 控制登陆和注册的切换
    const activeName = ref('login');

    const loginData: FormData = reactive({
        account: '',
        password: ''
    });
    const registerData: FormData = reactive({
        account: '',
        password: '',
        repassword: '',
        identity: ''
    });

    const currentFormData = computed(() => {
        return activeName.value === 'login' ? loginData : registerData;
    });

    const commonRules = {
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
        ]
    };
    const rules = computed(() => {
        if (activeName.value === 'login') {
            return commonRules;
        }
        return {
            ...commonRules,
            repassword: [
                {
                    required: true,
                    message: '请确认密码',
                    trigger: 'blur'
                },
                { validator: validateRepassword, trigger: 'blur' }
            ],
            identity: [
                {
                    required: true,
                    message: '身份必选'
                }
            ]
        };
    });
    function validateRepassword(rule: any, value: string, callback: any) {
        if (value !== currentFormData.value.password) {
            return callback(new Error('两次输入的密码不一致'));
        }
        callback();
    }
    async function submitForm() {
        const res =
            activeName.value === 'login'
                ? await login(currentFormData.value)
                : await register(currentFormData.value);
        console.log(res);
        const message = res.data.message;

        ElMessage({
            message,
            type:
                message === '登陆成功' || message === '账号注册成功，请重新登录'
                    ? 'success'
                    : 'error'
        });
        if (message === '账号注册成功，请重新登录') {
            activeName.value = 'login';
        } else if (message === '登陆成功' && res.data.results.identity === 'admin') {
            const userData = res.data.results;
            storeUser(userData);
            router.push('/home');
        } else {
            activeName.value = 'login';
            currentFormData.value.password = '';
        }
    }

    function storeUser(userData: any) {
        // 构造个人信息并存到全局store
        const userNeeded = {
            user_id: userData.id,
            account: userData.account,
            name: userData.name,
            identity: userData.identity
        };
        store.dispatch('login', userNeeded);
        localStorage.setItem('user', JSON.stringify(userNeeded));
    }

    // forget是忘记密码弹窗
    const forget = ref();
    function openForgetPasswordDialog() {
        forget.value.open();
    }
</script>

<style lang="scss" scoped>
    .login-box {
        width: 500px;
        margin: 200px auto;
        background: #ffffff;
        padding: 40px;
        border-radius: 5px;
        .title {
            text-align: center;
            margin-bottom: 10px;
        }
        .forget-btn {
            color: darkgray;
            padding-left: 30px;
            cursor: pointer;
        }
        .login-btn {
            width: 48%;
        }
        .register-btn {
            width: 80%;
        }
        .identify-select {
            width: 80%;
            margin-bottom: 20px;
            margin-left: 60px;
        }
    }
</style>
