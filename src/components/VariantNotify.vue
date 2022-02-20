<template>
  <div class="variant-notify">
    <div class="page-name">{{ pageName }}</div>
    <img :src="icon" alt="">
    <div class="type-name">{{ typeName }}</div>
    <div class="type-code">{{ typeCode }}</div>
    <div class="dots">
      <div v-for="i in variantCount" :key="i" :class="{active:i-1===variantIndex}"></div>
    </div>
  </div>
</template>

<script>
// import { backdrop } from 'backdropjs'

export default {
  name: 'VariantNotify',
  props: ['pageName', 'icon', 'typeName', 'typeCode', 'variantCount', 'variantIndex'],
  mounted () {
    // backdrop(document.querySelector('.project-page img').outerHTML, document.querySelector('.variant-notify'), 35, 'yes')
  }
}
</script>

<style lang="scss">
.variant-notify {
  display: flex;
  flex-direction: column;
  width: 315px;
  background: rgba(56, 56, 56, 0.7);
  border-radius: 20px;
  padding: 40px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  align-items: center;
  position: fixed;
  bottom: 30px;
  left: calc(50% - 315px / 2);

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    border-radius: 20px;
  }
}

.dots {
  display: flex;
  margin-top: 15px;

  > div {
    width: 6px;
    height: 6px;
    margin: 0 7px;
    border-radius: 50%;
    background: white;
    opacity: .3;

    &.active {
      opacity: 1;
    }
  }
}
</style>
