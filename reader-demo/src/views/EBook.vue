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
             :bookAvailable="bookAvailable"
             :defaultTheme="defaultTheme"
             :navigation="navigation"
             :themeList="themeList"
             @jumpTo="jumpTo"
             @onProgressChange="onProgressChange"
             @setTheme="setTheme"
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
      // 标题栏和菜单栏是否出现
      isTitleAndMenuShow: false,
      // 字号列表
      fontSizeList: [
        {fontSize: 12},
        {fontSize: 14},
        {fontSize: 16},
        {fontSize: 18},
        {fontSize: 20},
        {fontSize: 22},
        {fontSize: 24}
      ],
      // 默认字号
      defaultFontSize: 14,
      // 主题数组
      themeList: [
        {
          name: 'default',
          style: {
            body: {
              'color': '#000',
              'background': '#fff'
            }
          }
        },
        {
          name: 'eye',
          style: {
            body: {
              'color': '#000',
              'background': '#cee'
            }
          }
        },
        {
          name: 'night',
          style: {
            body: {
              'color': '#fff',
              'background': '#000'
            }
          }
        },
        {
          name: 'gold',
          style: {
            body: {
              'color': '#000',
              'background': 'rgb(241, 236, 226)'
            }
          }
        }
      ],
      // 默认主题序号
      defaultTheme: 0,
      // 图书是否处于可用状态
      bookAvailable: false
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

      // 注册主题: this.themes.register(name, style)
      this.registerThemes()

      // 切换主题:this.themes.select(name)
      this.setTheme(this.defaultTheme)

      // 通过epubjs的钩子函数生成Location对象，获取Location对象
      this.book.ready.then(() => {
        this.navigation = this.book.navigation

        return this.book.locations.generate()
      }).then(result => {
        console.log(`result: ${result}`)
        this.locations = this.book.locations
        this.bookAvailable = true
      })
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
    },

    // 注册主题
    registerThemes () {
      this.themeList.forEach(theme => {
        this.themes.register(theme.name, theme.style)
      })
    },

    // 设置主题
    setTheme (index) {
      this.themes.select(this.themeList[index].name)
      this.defaultTheme = index
      console.log(this.themes)
    },

    // 进度更改
    onProgressChange (progress) {
      const percentage = progress / 100
      const location = percentage > 0 ? this.locations.cfiFromPercentage(percentage) : 0
      this.rendition.display(location)
    },

    // 根据链接跳转到指定位置
    jumpTo (href) {
      this.rendition.display(href)
      this.hideTitleAndMenu()
    },

    hideTitleAndMenu () {
      // 隐藏标题栏和菜单栏
      this.isTitleAndMenuShow = false
      // 隐藏弹出的设置栏
      this.$refs.menuBar.hideSetting()
      // 隐藏目录
      this.$refs.menuBar.hideContent()
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
