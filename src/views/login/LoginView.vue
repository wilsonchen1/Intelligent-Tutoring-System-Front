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
                    <div class="forget-btn" @click="openForgetDialog()">
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

    import { useRouter } from 'vue-router';

    const router = useRouter();
    // 控制登陆和注册的切换
    const activeName = ref('login');

    const loginData: FormData = reactive({
        account: '',
        password: ''
    });
    const registerData: FormData = reactive({
        account: '',
        password: '',
        repassword: ''
    });

    const currentFormData = computed(() => {
        return activeName.value === 'login' ? loginData : registerData;
    });

    const rules = computed(() => {
        return activeName.value === 'login'
            ? {
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
                          max: 10,
                          message: '密码的长度在3-10之间',
                          trigger: 'blur'
                      }
                  ]
              }
            : {
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
                          max: 10,
                          message: '密码的长度在3-10之间',
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
        showMessage(res.data.message);
    }
    function showMessage(message: string) {
        if (message === '账号注册成功') {
            ElMessage({
                message: '账号注册成功，请重新登录',
                type: 'success'
            });
            activeName.value = 'login';
        } else if (message === '登陆成功') {
            ElMessage({
                message: '登陆成功！',
                type: 'success'
            });
            router.push('/home');
        } else if (
            message === '账号存在' ||
            message === '密码错误' ||
            message === '账号失效' ||
            message === '账号未注册'
        ) {
            ElMessage.error(message);
        }
    }

    // forget是忘记密码弹窗
    const forget = ref();
    function openForgetDialog() {
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
        }
        .login-btn {
            width: 48%;
        }
        .register-btn {
            width: 80%;
        }
    }
</style>
