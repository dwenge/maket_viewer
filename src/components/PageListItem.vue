<template>
  <div class="wrap">
    <div class="name">
      <span>{{ name }}</span>
      <span class="icon"></span>
    </div>

    <div class="variants" v-if="variants">

      <router-link :to="variant.path" class="variant" v-for="variant in variants" :key="variant.path">
        <div class="circle-status" :class="variant.status"></div>
        <img :src="getIconVariant(variant.type_id)" alt="">
        <div class="showed-status" :class="{'showed': variant.showed}"></div>
      </router-link>

    </div>
  </div>
</template>

<script>
export default {
  name: 'PageListItem',
  props: ['name', 'variants', 'types'],
  methods: {
    getIconVariant (typeId) {
      const type = this.types.filter(type => type.id === typeId).pop()
      return type.icon
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  border-radius: 10px;
  background: white;
}

.name {
  font-size: 16px;
  padding: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.icon {
  width: 18px;
  height: 22px;
  background: center no-repeat url(../assets/svg/arrow-right.svg);
  margin-left: 10px;
}

.variants {
  display: flex;
  justify-content: space-around;
}

.variant {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 10px;
  cursor: pointer;

  & + & {
    border-left: 1px solid #F3F3F3;
  }
}
</style>
