const cookieparser = process.server ? require('cookieparser') : undefined
export const state = () => {
    return {
        user: null
    }
}

export const mutations = {
    setUser(state, user) {
        state.user = user;
    }
}

export const actions = {
    nuxtServerInit({ commit }, { req }) {
        let user = null;
        if (req.headers.cookie) {
            const cookies = cookieparser.parse(req.headers.cookie);
            try {
                user = JSON.parse(cookies.user);
                commit('setUser', user);
            } catch {

            }
        }
    }
}