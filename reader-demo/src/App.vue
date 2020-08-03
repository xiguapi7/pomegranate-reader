<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}

// 添加对页面字体的缩放支持
document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html')
  // 最高支持50px
  let fontSize = window.innerWidth / 10
  fontSize = fontSize > 50 ? 50 : fontSize
  html.style.fontSize = fontSize + 'px'
})
</script>

<style>

</style>
