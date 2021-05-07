<template>
  <div class="ebook-reader">
    <div id="read">

    </div>
  </div>
</template>

<script>
import {ebookMixin} from '../../utils/mixin'
import Epub from 'epubjs'

export default {
  name: "EbookReader",
  data() {
    return {}
  },
  mixins: [ebookMixin],
  methods: {
    // 初始化EPUB页面
    initEpub() {
      const url = `http://10.10.10.10:9000/epub/${this.filename}.epub`
      // console.log(`EBookReader init epub url: `, url)
      // 根据URL生成Book对象
      this.book = new Epub(url)

      // 将Book对象存储到vuex
      this.setCurrentBook(this.book)

      // 生成Rendition, 通过Book对象的renderTo方法
      this.rendition = this.book.renderTo('read', {
        width: innerWidth,
        height: innerHeight,
        methods: 'default'
      })

      // 通过Rendition.display方法渲染电子书
      this.rendition.display()

      // EPUB渲染是<iframe>, 调用Rendition.on方法添加触摸事件
      this.rendition.on('touchstart', event => {
        this.touchStartX = event.changedTouches[0].clientX
        this.touchStartTime = event.timeStamp
      })

      this.rendition.on('touchend', event => {
        // 滑动偏移量
        const offsetX = event.changedTouches[0].clientX - this.touchStartX
        // 滑动时间差
        const timeStamp = event.timeStamp - this.touchStartTime
        // console.log(offsetX, timeStamp)

        // 滑动时间不能超过500ms
        if (timeStamp < 500 && offsetX > 40) {
          // 上一页
          this.prevPage()
        } else if (timeStamp < 500 && offsetX < -40) {
          // 下一页
          this.nextPage()
        } else {
          // 显示标题栏和菜单栏
          this.toggleTitleAndMenu()
        }

        // 禁用事件默认行为和事件传播
        // event.preventDefault()
        event.stopPropagation()
      })
    },
    // 上一页
    prevPage() {
      if (this.rendition) {
        this.rendition.prev()
        this.hiddenTitleAndMenu()
      }
    },
    // 下一页
    nextPage() {
      if (this.rendition) {
        this.rendition.next()
        this.hiddenTitleAndMenu()
      }
    },
    // 显示标签栏和菜单栏
    toggleTitleAndMenu() {
      // this.$store.dispatch('setMenuVisible', !this.menuVisible)
      if (this.menuVisible) {
        this.setSettingVisible(-1)
      }
      this.setMenuVisible(!this.menuVisible)
    },
    hiddenTitleAndMenu() {
      // this.$store.dispatch('setMenuVisible', false)
      this.setMenuVisible(false)
      this.setSettingVisible(-1)
    }
  },
  mounted() {
    // this.$store.dispatch('setFilename', this.$route.params.filename.split('|').join('/'))
    this.setFilename(this.$route.params.filename.split('|').join('/'))
    this.setFilename(this.$route.params.filename.split('|').join('/'))
        .then(() => {
          this.initEpub()
        })
        .catch((err) => {
          console.log(`初始化EbookReader组件失败, 错误: ${err}`)
        })
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import '../../assets/styles/global';

.ebook-reader {
  touch-action: none;
}

#read {
  touch-action: none;
}
</style>
