<template>
  <div class="ebook">
    <ebook-title></ebook-title>
    <ebook-reader></ebook-reader>
    <ebook-menu></ebook-menu>
  </div>
</template>

<script>
import EbookReader from '../../components/ebook/EbookReader'
import EbookTitle from '../../components/ebook/EbookTitle'
import EbookMenu from '../../components/ebook/EbookMenu'

export default {
  name: "Index",
  data() {
    return {}
  },
  components: {
    EbookReader,
    EbookTitle,
    EbookMenu
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import '../../assets/styles/global';
</style>
