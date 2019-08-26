<template>
    <div class="YtoPage clearfix">
        <div class="ytoPageHeader">
            <span class="ytoTitle" v-if="Boolean(title)">{{title}}</span>
            <div class="ytoPageIcon" v-if="Boolean(showIcon)">
                <i style="cursor: pointer" @click="isShow=!isShow"
                   :class="{'el-icon-arrow-down':isShow,'el-icon-arrow-up':!isShow}"></i>
            </div>
        </div>
        <slot v-if="isShow"></slot>
        <div class="line"></div>
        <slot name="search"></slot>
        <slot name="body"></slot>
    </div>
</template>

<script>
export default {
  name: 'YtoPage',
  props: {
    title: {
      type: String,
      default: '搜索条件:'
    },
    showIcon: {
      type: String,
      default: 'true'
    }
  },
  data () {
    return {
      isShow: true
    }
  }
}
</script>

<style lang="scss" scoped>
.YtoPage {
  .ytoPageHeader {
    position: relative;
    margin-bottom: 5px;
    .ytoTitle {
      display: inline-block;
      height: 20px;
      line-height: 20px;
      font-size: 14px;
      color: #000000;
      font-weight: bold;
    }
    .ytoPageIcon {
      position: absolute;
      right: 5%;
      top: 2px;
    }
  }
  .line {
    height:2px;
    background:#DCDFE6;
    margin-bottom: 20px;
    margin-top: 4px;
  }
}
</style>
