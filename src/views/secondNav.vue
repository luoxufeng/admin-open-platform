<template>
  <keep-alive :include="keepAlive">
    <router-view />
  </keep-alive>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'secondNav',
  data () {
    return {}
  },
  computed: {
    ...mapState('ytoBase', {
      keepAlive: state => state.page.keepAlive
    })
  },
  methods: {}
}
</script>
