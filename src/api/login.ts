import instance from '@/http/index';
import { type FormData } from '@/type/login';

// 注册接口
export const registerService = (data: FormData) => {
    const {
        account,
        password,
        identity
    } = data;
    return instance({
        url: '/api/register',
        method: 'POST',
        data: {
            account,
            password,
            identity
        }
    })
}
// 登陆
export const loginService = (data: FormData) => {
    const {
        account,
        password
    } = data;
    return instance({
        url: '/api/login',
        method: 'POST',
        data: {
            account,
            password
        }
    })
}