<template>
    <el-col v-bind="ytoSpan">
        <el-form-item :label="label" :prop="prop" :rules="validRules">
            <slot></slot>
        </el-form-item>
    </el-col>
</template>

<script>
import * as validate from '@/utils/validate.js';

export default {
  name: 'yto-form-item',
  props: {
    span: {
      default: 4
    },
    prop: {
      type: String
    },
    label: {
      type: String
    },
    rules: {
      type: String,
      default: ''
    }
  },
  watch: {
    span: {
      handler: function (val) {
        switch (val) {
          case 4:
            this.ytoSpan = { md: 12, lg: 8, xl: 6 }
            break;
          case 3:
            this.ytoSpan = { md: 12, lg: 8, xl: 8 }
            break;
          case 2:
            this.ytoSpan = { md: 24, lg: 12, xl: 12 }
            break;
          case 1:
            this.ytoSpan = { span: 24 }
            break;
          case 22:
            this.ytoSpan = { span: 12 }
            break;
          case 33:
            this.ytoSpan = { span: 8 }
            break;
        }
      },
      immediate: true
    },
    rules: {
      handler: function (val) {
        if (val) {
          let valArray = val.split(',')
          let validRules = valArray.map(item => {
            let flag = true
            if (item.indexOf('_') != -1) {
              item = item.substring(1)
              flag = false
            }
            if (validate[item]) {
              let rule = validate[item]
              rule.required = flag
              return rule
            } else {
              throw new Error(val + '不存在验证规则里！')
            }
          })
          this.validRules = validRules
          // console.log(JSON.stringify(validRules));
        }
      },
      immediate: true
    }
  },
  data () {
    return {
      ytoSpan: {},
      validRules: []
    }
  }
}
</script>

<style scoped>
</style>
