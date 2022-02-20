import Vue from 'vue'
import Vuex from 'vuex'

import data from '@/store/data.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // project: {},
    // types: [],
    // projects: []
  },
  mutations: {
    setProjects (state, payload) {
      state.projects = payload
    },
    setProject (state, payload) {
      state.project = payload
    },
    setTypes (state, payload) {
      state.types = payload
    }
  },
  actions: {
    async getProjects ({ commit }) {
      commit('setProjects', data.projects)
    },
    async getProject ({ commit }, code) {
      const project = data.projects.filter(proj => proj.code === code).pop()
      if (project) {
        project.pages = data.pages.filter(page => page.project_id === project?.id)
        commit('setProject', project)
      }
    },
    async getTypes ({ commit }) {
      commit('setTypes', data.types)
    }
  },
  modules: {}
})
