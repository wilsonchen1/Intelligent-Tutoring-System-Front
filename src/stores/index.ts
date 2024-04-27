// store/index.ts
import { createStore } from 'vuex';
import { type User, type State } from '../type/index';  // 确保路径正确

export default createStore({
    state: (): State => ({
        user: JSON.parse(localStorage.getItem('user') as string)
    }),

    mutations: {
        setUser(state: State, user: User | null) {
            state.user = user;
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
            } else {
                localStorage.removeItem('user');
            }
        }
    },

    actions: {
        login({ commit }, user: User) {
            commit('setUser', user);
        },
        logout({ commit }) {
            commit('setUser', null);
        }
    }
});
