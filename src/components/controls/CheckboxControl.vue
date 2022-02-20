<template>
  <label>
    <input type="checkbox" @input="handleInput">
    <span>
      <img v-if="icon" :src="icon" alt="">
      <span v-if="type">{{ type }}</span>
      <span v-if="text" class="text">{{ text }}</span>
    </span>
  </label>
</template>

<script>
export default {
  name: 'CheckboxControl',
  props: ['icon', 'type', 'text'],
  methods: {
    handleInput (e) {
      this.$emit('input', e.target.checked)
    }
  }
}
</script>

<style lang="scss" scoped>
label {
  display: block;
  line-height: 1;
  margin: 10px 0;
  cursor: pointer;

  input {
    display: none
  }

  > span {
    display: flex;
    position: relative;
    padding-left: 40px;
    min-height: 30px;
    color: #838383;

    &:before,
    &:after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 30px;
      height: 30px;
    }

    &:before {
      border-radius: 6px;
      border: 1px solid #D3D3D3;
    }

    &:after {
      background: center no-repeat url('../../assets/svg/check.svg');
      opacity: 0;
      transition: opacity 250ms;
    }

    > span {
      padding: 8px 0 0 10px;
    }
  }

  input:checked + span:after {
    opacity: 1;
  }
}

.text {
  color: #000;
}
</style>
