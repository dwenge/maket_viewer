<template>
  <div class="overlay-menu">

    <div class="header">
      <button class="control back" v-if="projectHomeHandler" @click="projectHomeHandler">
        <span class="icon"><img src="../assets/svg/back-arrow.svg" alt=""></span>
        <span class="text">Главное меню</span>
      </button>

      <button class="control close" v-if="closeHandler" @click="closeHandler">
        <span class="text">Закрыть</span>
        <span class="icon"><img src="../assets/svg/close.svg" alt=""></span>
      </button>
    </div>

    <div class="body">
      <div class="body-inner">

        <div class="page-name">{{ page.name }}</div>
        <div class="variants">
          <div v-for="(variant, index) in page.variants" :key="variant.id"
               class="variant" :class="{active: index === variantIndex}"
               :style="{backgroundImage: 'url('+getType(variant.type_id).icon+')'}"
               @click="$router.push(variant.path)"
          >
            <div v-if="variant.status" class="circle-status" :class="variant.status"></div>
            <div v-if="variant.showed" class="showed-status" :class="{showed: variant.showed}"></div>
          </div>
        </div>
        <div class="variant-name">{{ getType(curVariant.type_id).name }} [{{ getType(curVariant.type_id).code }}]</div>

      </div>
    </div>

    <div class="footer"></div>

  </div>
</template>

<script>
export default {
  name: 'OverlayMenu',
  props: ['closeHandler', 'projectHomeHandler', 'page', 'variantIndex', 'types'],
  computed: {
    curVariant () {
      return this.page.variants[this.variantIndex]
    }
  },
  methods: {
    getType (typeId) {
      return this.types.filter(type => type.id === typeId).pop()
    }
  }
}
</script>

<style lang="scss" scoped>
.overlay-menu {
  position: fixed;
  height: 100vh;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(56, 56, 56, 0.7);

  display: flex;
  flex-direction: column;

  color: white;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.body {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.variants {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
}

.variant {
  position: relative;
  margin: 6px;
  width: 72px;
  height: 72px;
  background: center no-repeat rgba(0, 0, 0, 0.24);
  border-radius: 10px;
  cursor: pointer;

  &.active {
    background-color: #18A0FB;
  }

  .circle-status {
    width: 14px;
    height: 14px;
    border: 2px solid white;
    margin: -5px auto 0;
  }

  .showed-status {
    position: absolute;
    top: 100%;
    left: calc(50% - 6px);
    margin-top: 8px;
  }
}

.page-name {
  font-size: 36px;
  text-align: center;
}

.variant-name {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}

.control {
  background: transparent;
  border: 0;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  color: white;
  cursor: pointer;

  .icon {
    background: rgba(0, 0, 0, 0.24);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 72px;
    height: 72px;
  }

  .text {
    margin: 0 20px;
    font-weight: bold;
    font-size: 18px;
  }
}
</style>
