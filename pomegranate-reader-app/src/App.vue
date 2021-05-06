<template>
  <div id="app">
    <span class="text">ABCDEFG</span>
  </div>
</template>

<script>
// 添加rem, 自适应布局
/*document.addEventListener('DOMContentLoaded', () => {
  // 在DOM渲染完成后拿到HTML根元素, 修改上面的fontSize
  const html = document.querySelector('html')
  let fontSize = window.innerWidth / 10
  // 给fontSize设置一个最大值
  fontSize = fontSize > 50 ? 50 : fontSize
  html.style.fontStyle = fontSize + 'px'
})*/

import {mapGetters} from 'vuex'

export default {
  name: 'App',
  computed: {
    // 展开store下的getters
    ...mapGetters(['book'])
  },
  components: {},
  mounted() {
    this.$store.dispatch('setTest', 10).then(() => {
      console.log('then: ', this.book)
    })
  }
}
</script>

<style scoped lang="scss">
@import "assets/styles/global.scss";

.text {
  font-size: px2rem(20);
  color: orange;
}
</style>
