<template>
  <div v-if="variant" class="project-page">
    <img v-show="fileLoaded" :src="variant.file" alt="" @load="fileLoaded = true" :width="variant.width"
         :height="variant.height">
    <img v-if="!fileLoaded" src="http://placehold.it/1.jpg" alt="" :width="variant.width" :height="variant.height">
    <transition name="fade">
      <variant-notify v-if="notify && !menu" :page-name="page.name" :icon="type.icon" :type-name="type.code"
                      :variant-count="page.variants.length" :variant-index="variantIndex"/>
    </transition>

    <transition name="fade">
      <overlay-menu v-if="menu" :close-handler="toggleMenu" :project-home-handler="projectHome" :page="page"
                    :variant-index="variantIndex" :types="types"/>
    </transition>
  </div>
  <div v-else>Вариант не найден</div>
</template>

<script>
import { mapState } from 'vuex'
import VariantNotify from '@/components/VariantNotify'
import OverlayMenu from '@/components/OverlayMenu'

export default {
  name: 'ProjectPage',
  components: {
    OverlayMenu,
    VariantNotify
  },
  data () {
    return {
      ctrlPress: false,
      fileLoaded: false,
      notify: true,
      menu: false
    }
  },
  watch: {
    '$route.path' () {
      this.fileLoaded = false
      this.showNotify()
      window.scrollTo(0, 0)
    }
  },
  created () {
    if (!this.$store.project) {
      this.$store.dispatch('getProject', this.$route.params.project_code)
    }
    if (!this.$store.types) {
      this.$store.dispatch('getTypes')
    }

    this.showNotify()

    this.keyupHandler = e => {
      switch (e.key) {
        case 'Control':
          this.ctrlPress = false
          break
      }
    }

    this.keydownHander = e => {
      switch (e.key) {
        case 'Control':
          this.ctrlPress = true
          break

        case 'ArrowRight':
          if (this.ctrlPress) {
            this.nextPage()
          } else {
            this.nextVariant()
          }
          break
        case 'ArrowLeft':
          if (this.ctrlPress) {
            this.prevPage()
          } else {
            this.prevVariant()
          }
          break
        case ' ':
          e.preventDefault()
          this.toggleMenu()
          break
        case 'Escape':
          if (this.menu) {
            this.toggleMenu()
          } else {
            this.projectHome()
          }
          break
      }
    }
    window.addEventListener('keyup', this.keyupHandler)
    window.addEventListener('keydown', this.keydownHander)
  },
  beforeDestroy () {
    window.removeEventListener('keyup', this.keyupHandler)
    window.removeEventListener('keydown', this.keydownHander)
  },
  computed: {
    ...mapState(['project', 'types']),
    type () {
      return this.types.filter(type => type.code === this.$route.params.page_type).pop()
    },
    page () {
      return this.project.pages.filter(page => page.code === this.$route.params.page_code).pop()
    },
    pageIndex () {
      if (this.page) {
        return this.project.pages.findIndex(page => page.id === this.page.id)
      }
      return false
    },
    variant () {
      if (this.page) {
        return this.page.variants.filter(variant => variant.type_id === this.type.id).pop()
      }
      return false
    },
    variantIndex () {
      if (this.page) {
        return this.page.variants.findIndex(variant => variant.type_id === this.type.id)
      }
      return false
    }
  },
  methods: {
    nextPage () {
      if (this.project.pages.length - 1 > this.pageIndex) {
        this.$router.push(this.project.pages[this.pageIndex + 1].variants[0].path)
      }
    },
    prevPage () {
      if (this.pageIndex > 0) {
        this.$router.push(this.project.pages[this.pageIndex - 1].variants[0].path)
      }
    },
    nextVariant () {
      if (this.page.variants.length - 1 > this.variantIndex) {
        this.$router.push(this.page.variants[this.variantIndex + 1].path)
      }
    },
    prevVariant () {
      if (this.variantIndex > 0) {
        this.$router.push(this.page.variants[this.variantIndex - 1].path)
      }
    },
    showNotify () {
      this.notify = true
      clearTimeout(this._tmr)
      this._tmr = setTimeout(() => {
        this.notify = false
      }, 2000)
    },
    toggleMenu () {
      this.menu = !this.menu
    },
    projectHome () {
      this.$router.push(this.project.path)
    }
  }
}
</script>

<style lang="scss" scoped>
.project-page img {
  display: block;
  margin: 0 auto;
}
</style>
