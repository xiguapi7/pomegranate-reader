<template>
  <div class="ebook">
    <!--标题栏-->
    <TitleBar :isTitleAndMenuShow="isTitleAndMenuShow"></TitleBar>
    <!--主体部分-->
    <div class="read-wrapper">
      <!--Epub对象挂载的DOM-->
      <div id="read"></div>
      <!--浮层-->
      <div class="mask">
        <!--左半浮层, 点击上一页-->
        <div class="left" @click="prePage"></div>
        <!--中间浮层, 点击切换菜单栏和标题栏的状态-->
        <div class="center" @click="toggleTitleAndMenu"></div>
        <!--右半浮层, 点击下一页-->
        <div class="right" @click="nextPage"></div>
      </div>
    </div>
    <!--菜单栏-->
    <MenuBar :isTitleAndMenuShow="isTitleAndMenuShow"
             :fontSizeList="fontSizeList"
             :defaultFontSize="defaultFontSize"
             @setFontSize="setFontSize"
             ref="menuBar"></MenuBar>
  </div>
</template>

<script>
import Epub from 'epubjs'
import TitleBar from '@/components/TitleBar'
import MenuBar from '@/components/MenuBar'

const DOWNLOAD_URL = '/static/epub/2021_Book_AJourneyOfEmbeddedAndCyber-Phy.epub'
global.ePub = Epub
export default {
  name: 'EBook',
  components: {
    TitleBar,
    MenuBar
  },
  data () {
    return {
      isTitleAndMenuShow: false,
      fontSizeList: [
        {fontSize: 12},
        {fontSize: 14},
        {fontSize: 16},
        {fontSize: 18},
        {fontSize: 20},
        {fontSize: 22},
        {fontSize: 24}
      ],
      defaultFontSize: 14
    }
  },
  methods: {
    // 电子书的解析和渲染
    showEpub () {
      // 生成Book
      this.book = new Epub(DOWNLOAD_URL)

      // 生成Rendition, 通过Book对象的renderTo方法
      this.rendition = this.book.renderTo('read', {
        width: window.innerWidth,
        height: window.innerHeight
      })

      // 通过Rendition.display方法渲染电子书
      this.rendition.display()

      // 获取Theme对象
      this.themes = this.rendition.themes

      // 默认字体大小
      this.themes.fontSize(this.defaultFontSize)
    },

    // 翻页函数，上一页函数
    prePage () {
      if (this.rendition) {
        // 调用Rendition对象的prev函数回到上一页
        this.rendition.prev()
      }
    },

    // 翻页函数，下一页
    nextPage () {
      if (this.rendition) {
        // 调用Rendition对象的next函数翻到下一页
        this.rendition.next()
      }
    },

    // 切换标题栏和菜单栏
    toggleTitleAndMenu () {
      // 对状态进行翻转
      this.isTitleAndMenuShow = !this.isTitleAndMenuShow

      if (!this.isTitleAndMenuShow) {
        this.$refs.menuBar.hideSetting()
      }
    },

    // 切换字体大小
    setFontSize (fontSize) {
      this.defaultFontSize = fontSize

      if (this.themes) {
        this.themes.fontSize(fontSize + 'px')
      }
    }
  },
  mounted () {
    // 在mounted钩子中显示EPub对象
    this.showEpub()
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/global";

.ebook {
  position: relative;
  .read-wrapper {
    .mask {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100;
      display: flex;
      width: 100%;
      height: 100%;
      .left {
        flex: 0 0 px2rem(100);
      }
      .center {
        flex: 1;
      }
      .right {
        flex: 0 0 px2rem(100);
      }
    }
  }

}

</style>
