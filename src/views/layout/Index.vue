<template>
  <el-container>
    <el-header class="yto-header">
      <navBar></navBar>
    </el-header>

    <el-container style="height: calc(100vh - 50px)">
      <sideBar></sideBar>
      <el-container>
        <el-header class="yto-header">
          <tagsView></tagsView>
        </el-header>

        <el-scrollbar style="height: calc(100vh - 100px);" class="yto-scrollbar" wrapClass="yto-x-auto">
          <el-main class="router-main">
            <transition :name="transitionActive ? 'fade-transverse' : ''">
              <keep-alive :include="keepAlive">
                <router-view/>
              </keep-alive>
            </transition>
          </el-main>
        </el-scrollbar>
      </el-container>
    </el-container>

    <div class="navBtn">
      <i class="el-icon-menu" @click="isCollapse"></i>
    </div>
  </el-container>
</template>

<script>
import { mapState } from 'vuex'
import sideBar from './components/sideBar'
import navBar from './components/navBar'
import tagsView from './components/tagsView'

export default {
  components: {
    sideBar,
    navBar,
    tagsView
  },
  computed: {
    ...mapState('ytoBase', {
      keepAlive: state => state.page.keepAlive,
      transitionActive: state => state.transition.active
    })
  },
  methods: {
    isCollapse () {
      this.$store.dispatch('ytoBase/sidebar/asideCollapseToggle')
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import '@/styles/base.scss';

.yto-header {
  height: 50px !important;
  padding: 0;
}

.router-main {
  padding: 0 12px;
  & > div {
    min-height: calc(100vh - 125px);
    padding: 12px 20px 10px;
    background: $white;
  }
}

.navBtn {
  position: fixed;
  bottom: 20px;
  left: 10px;
  z-index: 999;
  > i {
    cursor: pointer;
    color: $white;
  }
}
</style>
