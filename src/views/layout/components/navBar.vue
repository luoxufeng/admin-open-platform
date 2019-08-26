<template>
    <div class="flex-box">

        <div class="nav-left">
          <div class="icon"></div>
          <div class="title">开放平台</div>
        </div>

        <div class="nav-right">
            <div class="nav-login">
                <img src="@/assets/img/noLogin.png" class="navImg" alt="">
                <el-dropdown @command="handleCommand" trigger="click">
                    <span class="el-dropdown-link" style="font-size: 14px;cursor: pointer">
                        {{displayName}}<i class="el-icon--right el-icon-arrow-down"> </i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="a">
                            <i class="el-icon-setting el-icon--left" style="margin-right: 10px"></i> 设置
                        </el-dropdown-item>
                        <el-dropdown-item command="b">
                            <i class="el-icon-message" style="margin-right: 10px"> </i>消息通知
                        </el-dropdown-item>
                        <el-dropdown-item command="c">
                            <icon name="signOut" width="14" height="14"></icon>
                            <i style="margin-right: 10px"> </i>退出
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>

</template>

<script>
import { removeStore, getStore } from '@/utils/localStorage'
import urlConfig from '@/utils/urlConfig'
export default {
  name: 'navBar',
  data () {
    return {
    }
  },
  computed: {
    // ...mapGetters(['displayName']),
    displayName () {
      return this.$store.state.ytoBase.sidebar.userInfor.displayName || '圆通用户'
    },
    badAmount () {
      return this.$store.state.ytoBase.sidebar.badAmount
    },
    goodAmount () {
      return this.$store.state.ytoBase.sidebar.goodAmount
    }
  },
  mounted () {
    // this.getAmount();
  },
  create () {
    console.log(getStore('user'))
    if (getStore('user')) {
      this.user = getStore('user')
    }
  },
  methods: {
    logout () {
      removeStore('user')
      sessionStorage.clear()
      localStorage.clear()
      window.location.href = urlConfig.logoutUrl // 生产环境
    },
    handleCommand (command) {
      if (command === 'c') {
        this.logout()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
.module_system {
  cursor: pointer;
  border: none;
  img {
    margin-left: -5px;
    margin-right: 5px;
    vertical-align: middle;
    width: 40px;
    height: 40px;
  }
}

.flex-box {
  position: relative;
  height: 50px;
  line-height: 50px;
  background-color: #fff;
  border-bottom: 1px solid rgba(228, 231, 237, 1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  .nav-left {
    padding-left: 10px;
    // flex-direction: row;
    display: flex;
    .icon {
      width: 40px;
      height: 40px;
      align-self: center;
      background: rgba(204, 204, 204, 1);
      border-radius: 100%;
    }
    .title {
      color: #303133;
      font-size: 14px;
      margin-left: 10px;
    }
  }
  .nav-right {
    float: right;
    > div {
      height: 50px;
      line-height: 50px;
      float: right;
      display: flex;
      align-items: center;
      font-size: 12px;
    }
    .nav-box {
      margin-right: 50px;
    }
    .nav-login {
      margin-right: 20px;
    }
    .navImg {
      cursor: pointer;
      width: 22px;
      height: 22px;
      padding-right: 5px;
      vertical-align: middle;
    }
  }
  .el-dropdown-menu__item {
    line-height: 58px !important;
  }
}
</style>
