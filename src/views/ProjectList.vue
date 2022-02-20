<template>
  <div class="project-list">
    <ul>
      <li v-for="project in projects" :key="project.code">
        <router-link :to="project.path">{{ project.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ProjectList',
  created () {
    this.$store.dispatch('getProjects')
  },
  computed: {
    ...mapState(['projects'])
  }
}
</script>
