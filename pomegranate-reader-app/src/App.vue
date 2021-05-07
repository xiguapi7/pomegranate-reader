<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// 添加rem, 自适应布局
document.addEventListener('DOMContentLoaded', () => {
  let fontSize = window.innerWidth / 10
  // 给fontSize设置一个最大值
  fontSize = fontSize > 50 ? 50 : fontSize
  // 在DOM渲染完成后拿到HTML根元素, 修改上面的fontSize
  const html = document.querySelector('html')
  html.style.fontSize = fontSize + 'px'
})

export default {
  name: 'App'
}
</script>

<style lang="scss">
@import 'assets/styles/global';

#app {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  background: #d7d7d7;
  overflow: hidden;
}
</style>
