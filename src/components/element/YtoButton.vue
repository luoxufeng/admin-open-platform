<template>
  <div class="box">
    <el-button class="cancel" plain size="small" @click="cancel">{{cancelText}}</el-button>
    <el-button class="sure" type="primary" size="small" @click="add">{{saveText}}</el-button>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'YtoButton',
  inject: ['elForm'],
  props: {
    cancelText: {
      type: String,
      default: '取消'
    },
    saveText: {
      type: String,
      default: '保存'
    }
  },
  methods: {
    cancel () {
      this.restParentForm()
      this.$emit('cancelFn')
    },
    add () {
      if (this.elForm) {
        this.elForm.validate((valid) => {
          if (valid) {
            this.$emit('addFn')
          } else {
            this.hint('请重新校验')
            return false
          }
        })
      } else {
        this.$emit('addFn')
      }
    },
    restParentForm () {
      if (this.elForm) {
        this.elForm.resetFields()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  margin: 10px 0 0 0 ;
  text-align: center;
  .sure {
  margin-left: 14px;
}
}
</style>
