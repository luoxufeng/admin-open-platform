<template>
    <div class="box">
        <i href="#" @click="handle(scope.$index, scope.row)" class="handle">
            <icon  class="icon" :name="name" width="20" height="20"></icon>
        </i>
    </div>
</template>

<script>
export default {
  name: 'yto-svg',
  props: ['name', 'scope'],
  methods: {
    handle (index, val) {
      console.log('handle')
      this.$emit('handle', index, val)
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  height: 20px;
  line-height: 20px;
  .handle {
    display: inline-block;
    padding: 0 5px;
  }
}
.icon {
  color: #824c96;
  &:hover {
    color: #926aa3;
    background-color: #926aa333;
  }
  &:active {
    color: #480968;
    background-color: #48096833;
  }
}
</style>
