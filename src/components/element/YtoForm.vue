<template>
    <el-form ref="form" v-bind="$attrs" v-on="$listeners" :label-width="labelWidth" :label-position="labelPosition">
        <el-row>
            <slot></slot>
        </el-row>
    </el-form>
</template>

<script>
export default {
  name: 'yto-form',
  create () {
    this.formId = '2222'
  },
  props: {
    labelWidth: {
      type: String,
      default: '100px'
    },
    labelPosition: {
      type: String,
      default: 'right'
    },
    span: {
      default: 4
    }
  },
  watch: {
    span: {
      handler: function (val) {
        switch (val) {
          case 4:
            this.ytoSpan = { md: 12, lg: 6, xl: 6 }
            break;
          case 3:
            this.ytoSpan = { md: 12, lg: 8, xl: 8 }
            break;
          case 2:
            this.ytoSpan = { md: 24, lg: 12, xl: 12 }
            break;
          case 1:
            this.ytoSpan = {}
            break;
        }
      },
      immediate: true
    }
  },
  data () {
    return {
      ytoSpan: {}
    }
  }
}
</script>

<style scoped>
</style>
