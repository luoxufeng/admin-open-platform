<template>
  <el-aside
    :width="isCollapse ? '50px':'220px'"
    :style="{'transition': loadMenu ? 'width 0.3s': 'none' }"
    class="yto-aside"
  >
    <el-scrollbar class="customElscrollbar">
      <el-menu
        :default-active='$route.path'
        class="el-menu-vertical-demo"
        :style="{'width': isCollapse? '50px':'220px'}"
        v-if="loadMenu"
        :collapse="isCollapse"
        router
        text-color="#fff"
        active-text-color="#ED7625"
      >
        <el-menu-item index="/home" key="/home" @click="selectedIconIndex=-1">
          <icon name="home" width="18" height="18" style="margin-right: 10px;margin-left: 1px;"></icon>
          <span slot="title" >首页</span>
        </el-menu-item>
        <!-- 静态菜单 str -->
        <!-- <template v-if="menus.length == 0" v-for="(item,index1) in routes">
          <el-submenu :index="item.path" v-show="item.children && !item.noCollapse" :key="index1">
            <template slot="title">
              <icon
                :name="item.meta.icon"
                width="18"
                height="18"
                style="margin-right: 10px;margin-left: 1px;"
              ></icon>
              <span slot="title">{{item.meta.title}}</span>
            </template>
            <template v-for="(child,index2) in item.children">
              <el-submenu :index="child.path" v-if="child.children" :key="index2">
                <template slot="title" class="child_title">
                  <span slot="title">{{child.meta.title}}</span>
                </template>
                <el-menu-item
                  v-if="!sun.hidden"
                  v-for="sun in child.children"
                  :index="sun.path"
                  :key="sun.path"
                >{{sun.meta.title}}</el-menu-item>
              </el-submenu>
              <el-menu-item :index="child.path" v-else :key="child.path">{{child.meta.title}}</el-menu-item>
            </template>
          </el-submenu>
        </template> -->
        <!-- 静态菜单 end -->
        <!-- 动态菜单 str -->
        <template v-if="menus.length !== 0" v-for="(item,index) in menus">
          <el-submenu
          :index="item.permissionValue"
          v-show="item.children"
          :key="item.permissionValue">
            <template slot="title">
              <icon
                :class="{isSelectedIcon: index === selectedIconIndex}"
                :name="
                item.name == '运维部门配置'?'formulaSetting':'' ||
                item.name == '业务类型配置'?'logManagement':''
                "
                width="18"
                height="18"
                style="margin-right: 10px;margin-left: 1px;"
              ></icon>
              <span slot="title" >{{item.name}}</span>
            </template>
            <template v-for="child in item.children">
              <el-submenu
              v-if="child.children"
              :index="child.relationUrl"
              :key="child.permissionValue">
                <template slot="title" class="child_title">
                  <span slot="title" >{{child.name}}</span>
                </template>
                <el-menu-item
                  v-for="sun in child.children"
                  :index="sun.relationUrl"
                  :key="sun.permissionValue"
                >{{sun.name}}</el-menu-item>
              </el-submenu>
              <el-menu-item
                v-else @click="selectedIconIndex=index"
                :index="child.relationUrl"
                :key="child.permissionValue"
              >{{child.name}}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <!-- 动态菜单 end -->
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script>
import { mapState } from 'vuex'
export default {
  components: {},
  name: 'sidebar',
  data () {
    return {
      loadMenu: false,
      selectedIconIndex: -1
    }
  },
  mounted () {
    setTimeout(() => {
      this.loadMenu = true
    }, 0)
  },
  computed: {
    menus () {
      console.log('menus===============', this.$store.state.ytoBase.sidebar.menus)
      return this.$store.state.ytoBase.sidebar.menus
    },
    ...mapState('ytoBase', {
      isCollapse: state => state.sidebar.isCollapse
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
.submenuIShow {
  display: none;
}

.yto-aside {
  transition: width 0.3s;
  overflow: hidden;
  background: linear-gradient(
    240deg,
    rgba(130, 76, 150, 1) 0%,
    rgba(67, 52, 102, 1) 100%
  );
  .el-menu {
    border-right: none;
  }
  .el-scrollbar__wrap {
    overflow: hidden auto;
  }
}

.el-menu-vertical-demo {
  .el-scrollbar__bar.is-horizontal {
    display: none;
  }
  > .el-submenu > .el-submenu__title {
    padding-left: 12px !important;
  }
  > .el-submenu .el-submenu__title i {
    color: #fff;
  }
  > .el-menu-item {
    padding-left: 12px !important;
    .el-tooltip {
      padding-left: 12px !important;
    }

    .customElscrollbar {
      width: 100%;
      height: calc(100vh - 100px);
      .el-scrollbar__wrap {
        overflow-x: hidden;
      }
    }
  }
}
.customElscrollbar {
  width: 100%;
  height: calc(100vh - 100px);
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}
.isSelectedIcon {
  color: #ed7625;
}
</style>
