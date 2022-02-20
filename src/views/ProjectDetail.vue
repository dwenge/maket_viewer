<template>
  <div v-if="project" class="project-detail container">

    <div class="project-detail-first-col">
      <div class="logo"><img src="../assets/svg/itj.svg" alt="itj"></div>

      <div class="project-detail-name">
        <div>Прооект</div>
        <h1>{{ project.name }}</h1>
      </div>

      <div class="project-filter">

        <!--        <div class="project-filter-section">
                  <div class="project-filter-section-name">Фильтр макетов</div>
                  <div class="project-filter-section-body">

                    <checkbox-control
                      icon="http://placehold.it/30.jpg"
                      text="Только новые и исправленные"
                    />

                    <checkbox-control
                      icon="../assets/svg/showed.svg"
                      text="Только не просмотренные"
                    />

                  </div>
                </div>-->

        <div class="project-filter-section">
          <div class="project-filter-section-name">Отображать макеты для:</div>
          <div class="project-filter-section-body">

            <checkbox-control
              v-for="type in projectTypes" :key="type.code"
              :icon="type.icon"
              :type="type.code"
              :text="type.name"
              v-model="filterTypes[type.id]"
            />

          </div>
        </div>

      </div>

    </div>

    <div class="project-detail-second-col">

      <search-control v-model="pageSearch"/>

      <div class="project-detail-page-list">

        <div class="project-detail-page-item" v-for="page in projectPages" :key="page.code">
          <page-list-item :name="page.name" :variants="page.variants" :types="projectTypes"/>
        </div>

      </div>

    </div>

  </div>
  <div v-else>Такой проект не найден</div>
</template>

<script>
import CheckboxControl from '@/components/controls/CheckboxControl'
import SearchControl from '@/components/controls/SearchControl'
import PageListItem from '@/components/PageListItem'
import { mapState } from 'vuex'

export default {
  name: 'ProjectDetail',
  data () {
    return {
      pageSearch: '',
      filterTypes: {}
    }
  },
  components: {
    PageListItem,
    SearchControl,
    CheckboxControl
  },
  created () {
    const projectCode = this.$route.params?.project_code
    this.$store.dispatch('getProject', projectCode)
    this.$store.dispatch('getTypes')
  },
  computed: {
    ...mapState(['project', 'types']),
    projectTypes () {
      const typeIds = new Set(this.project.pages.map(page => page.variants.map(variant => variant.type_id)).flat())
      return this.types.filter(type => typeIds.has(type.id))
    },

    projectPages () {
      let pages = JSON.parse(JSON.stringify(this.project.pages))

      if (this.pageSearch.length) {
        pages = pages.filter(page => page.name.toLowerCase().includes(this.pageSearch.toLowerCase()))
      }

      if (!Object.keys(this.filterTypes).length || !Object.values(this.filterTypes).filter(ft => ft).length) {
        return pages
      }

      return pages
        .map(page => {
          page.variants = page.variants.filter(variant => this.filterTypes[variant.type_id] === true)
          return page
        })
        .filter(page => page.variants.length)
    }
  }
}
</script>

<style lang="scss" scoped>

.project-detail {
  display: flex;
  padding-top: 40px;
  padding-bottom: 40px;

  &-name {
    > div {
      color: #A0A0A0;
      font-size: 16px;
      font-weight: bold;
    }

    > h1 {
      margin: 0 0 28px;
      font-size: 36px;
      font-weight: bold;
    }
  }

  &-first-col {
    max-width: 380px;

    .logo {
      margin-bottom: 28px;
    }
  }

  &-second-col {
    flex-grow: 1;
    padding-left: 100px;
  }
}

.project-filter {
  background: white;
  border-radius: 10px;
  padding: 20px;
  font-size: 14px;

  &-section + &-section {
    margin-top: 20px;
  }

  &-section-name {
    margin-bottom: 20px;
    font-size: 16px;
  }
}

.project-detail-page {
  &-list {
    margin-top: 30px;
  }

  &-item {
    margin-top: 10px;
  }
}
</style>
