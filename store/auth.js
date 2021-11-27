import axios from "axios";
const state = () => ({
    user: null,
});

const mutations = {
    // save user data to state
    setUser(state, data ) {
        state.user = JSON.parse(JSON.stringify(data))
    }
}

const getters = {
    /**
     * Check if the user is already logged in
     * @return `true` if logged in, otherwise `false`
    */
    isAuthenticated(state) {
        if (state.user !== null) return true;
        else 
            return false;
    },
};

const actions = {
    /**
     * Call the API to get logged in User details, or just save the user data.
     * @param data The data to be saved (when logging in), pass a `null` value if already logged in.
     * @param token The token of the already logged in user
    */
    async getUserData({commit}, {data = null, token = ''}) {
        console.log({data, token});

        if (data !== null) commit('setUser', data);
        else 
            await axios.get('http://127.0.0.1:8000/api/user/me', { headers: {'Authorization': `Bearer ${token}`}})
            .then((response) => commit('setUser', response.data.user))
            .catch((err) => console.log(err));
    },

    async logout({commit}, {mode = 1}) {
        const token = localStorage.getItem('jwt');
        localStorage.removeItem('jwt');
        localStorage.removeItem('question')
        localStorage.removeItem('date')
        commit('setUser', {data: null});
        await this.$axios.post('user/logout', { mode }, { headers: {'Authorization': `Bearer ${token}`}})
    },

}

export default {
    state,
    mutations,
    getters,
    actions
}