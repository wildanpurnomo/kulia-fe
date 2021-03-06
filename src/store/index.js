import Vue from 'vue'
import Vuex from 'vuex'
import { auth } from './auth.store'
import { content } from './content.store'
import { story } from './story.store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    content,
    story
  } 
})
