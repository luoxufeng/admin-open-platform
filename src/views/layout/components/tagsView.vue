<template>
    <div class="tags-view-container" flex>
        <div flex-box="1" style="overflow:auto;position:relative; padding:0 10px;">
            <el-tabs class="tags-view-tabs" :value="current" type="card" @tab-click="handleClick" @edit="handleTabsEdit"
                     @contextmenu.native="handleContextmenu">
                <el-tab-pane v-for="(page, index) in opened" :key="index" :label="page.meta.title || '未命名'"
                             :name="page.name" :closable="page.name !== 'Home'"/>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  components: {
  },
  data () {
    return {
      contextmenuFlag: false,
      contentmenuX: 0,
      contentmenuY: 0,
      tagName: 'Home'
    }
  },
  computed: {
    ...mapState('ytoBase/page', ['opened', 'current'])
  },
  watch: {},
  mounted () {
  },
  methods: {
    ...mapActions('ytoBase/page', ['close']),
    handleClick (tag) {
      // 找到点击的页面在 tag 列表里是哪个
      const page = this.opened.find(page => page.name === tag.name)
      const { name, params, query } = page
      if (page) {
        this.$router.push({ name, params, query })
      }
    },
    handleTabsEdit (tagName, action) {
      if (action === 'remove') {
        this.close({
          tagName,
          vm: this
        })
      }
    },
    /**
     * @description 右键菜单功能点击
     */
    handleContextmenu (event) {
      let target = event.target
      let flag = false
      if (target.className.indexOf('el-tabs__item') > -1) flag = true
      else if (target.parentNode.className.indexOf('el-tabs__item') > -1) {
        target = target.parentNode
        flag = true
      }
      if (flag) {
        event.preventDefault()
        event.stopPropagation()
        this.contentmenuX = event.clientX
        this.contentmenuY = event.clientY
        this.tagName = target.getAttribute('aria-controls').slice(5)
        this.contextmenuFlag = true
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '@/styles/base.scss';

.tags-view-container {
  height: 40px;
  width: 100%;
  background: transparent;
  margin: 5px 0;
}

.tagsMenu-item {
  padding: 8px 20px 8px 15px;
  margin: 0;
  font-size: 14px;
  color: #606266;
  cursor: pointer;
  &:hover {
    background: #ecf5ff;
    color: #ed7625;
  }
}
</style>
<style rel="stylesheet/scss" lang="scss">
.tags-view-tabs {
  margin-top: 7px;
  &.el-tabs--card {
    > .el-tabs__header {
      border-bottom: none;
      margin: 0;
      .el-tabs__nav-next,
      .el-tabs__nav-prev {
        line-height: 26px;
      }
      .el-tabs__nav {
        border: none;
        border-radius: 0;
      }
      .el-tabs__item {
        &:first-child {
          border-left: 1px solid #e4e7ed;
        }
        border: 1px solid #e4e7ed;
        background-color: #fff;
        height: 26px;
        line-height: 26px;
        font-size: 12px;
        margin: 0 2px;
        &:hover {
          color: #ed7625;
        }
      }
      .el-tabs__item.is-active {
        &:before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 10px;
        }
        background-color: #fff;
        color: #ed7625;
        border: 1px solid #ed7625;
      }
    }
  }
}

.tagsMenu-right {
  margin-top: 7px;
  margin-right: 10px;
  .el-button--medium {
    padding: 5px 15px;
    border-radius: 0;
    height: 26px;
  }
}
</style>
