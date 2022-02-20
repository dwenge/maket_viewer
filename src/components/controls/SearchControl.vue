<template>
  <div class="search-control">
    <input type="search" placeholder="Поиск страницы" @input="handleInput">
    <div class="btn"></div>
  </div>
</template>

<script>
export default {
  name: 'SearchControl',
  methods: {
    handleInput (e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.search-control {
  position: relative;

  input {
    display: block;
    width: 100%;
    padding: 18px 60px 18px 20px;
    border: 0;
    border-radius: 10px;
  }

  .btn {
    position: absolute;
    right: 0;
    top: 0;
    width: 60px;
    height: 60px;
    background: center no-repeat url('../../assets/svg/search.svg');
  }
}
</style>
