import Vuex from 'vuex'
import mutations from './mutations'
import storage from '../utils/storage'

const state = {
    userInfo: "" || storage.getItem("userInfo")
}

const store = new Vuex.Store({
    state,
    mutations
})

export default store