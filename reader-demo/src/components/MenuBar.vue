<template>
  <div class="menu-bar">
    <!--菜单栏, 加入过渡动画-->
    <transition name="slide-up">
      <div :class="{'hide-box-shadow': isSettingShow || !isTitleAndMenuShow}" class="menu-wrapper"
           v-show="isTitleAndMenuShow">
        <!--菜单-->
        <div class="icon-wrapper">
          <span @click="showSetting(3)" class="icon-menu icon"></span>
        </div>
        <!--阅读进度条-->
        <div class="icon-wrapper">
          <span @click="showSetting(2)" class="icon-progress icon"></span>
        </div>
        <!--阅读背景-->
        <div class="icon-wrapper">
          <span @click="showSetting(1)" class="icon-bright icon"></span>
        </div>
        <!--字体-->
        <div class="icon-wrapper">
          <span @click="showSetting(0)" class="icon-A icon"></span>
        </div>
      </div>
    </transition>

    <transition name="slide-up">
      <div class="setting-wrapper" v-show="isSettingShow">
        <!-- 字体设置 -->
        <div class="setting-font-size" v-if="showTag === 0">
          <div class="preview" :style="{fontSize: fontSizeList[0].fontSize + 'px'}">A</div>

          <div class="select">
            <div :key="index" @click="setFontSize(item.fontSize)" class="select-wrapper"
                 v-for="(item, index) in fontSizeList">
              <div class="line"></div>

              <div class="point-wrapper">
                <div class="point" v-show="defaultFontSize === item.fontSize">
                  <div class="small-point"></div>
                </div>
              </div>

              <div class="line"></div>
            </div>
          </div>

          <div class="preview" :style="{fontSize: fontSizeList[fontSizeList.length - 1].fontSize + 'px'}">A</div>
        </div>

        <!-- 主题设置 -->
        <div class="setting-theme" v-else-if="showTag === 1">
          <div :key="index" @click="setTheme(index)" class="setting-theme-item"
               v-for="(item, index) in themeList">
            <div :class="{'no-border': item.style.body.background !== '#fff'}" :style="{background: item.style.body.background}"
                 class="preview"></div>
            <div :class="{'selected': index === defaultTheme}" class="text">{{ item.name }}</div>
          </div>
        </div>

        <!-- 进度条 -->
        <div class="setting-progress" v-else-if="showTag === 2">
          <div class="progress-wrapper">
            <input :disabled="!bookAvailable" :value="progress"
                   @change="onProgressChange($event.target.value)"
                   @input="onProgressInput($event.target.value)"
                   class="progress"
                   max="100"
                   min="0"
                   ref="progress"
                   step="1"
                   type="range"/>
            <div class="text-wrapper">
              <span>{{ bookAvailable ? progress + '%' : '加载中...' }}</span>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <content-view :bookAvailable="bookAvailable"
                  :isShowContent="isShowContent"
                  :navigation="navigation"
                  @jumpTo="jumpTo"
                  v-show="isShowContent"></content-view>

    <transition name="fade">
      <div @click="hideContent" class="content-mask" v-show="isShowContent"></div>
    </transition>
  </div>
</template>

<script>
import ContentView from './ContentView'

export default {
  components: {
    ContentView
  },
  props: {
    isTitleAndMenuShow: {
      type: Boolean,
      default: false
    },
    fontSizeList: {
      type: Array
    },
    defaultFontSize: {
      type: Number
    },
    themeList: {
      type: Array
    },
    defaultTheme: {
      type: Number
    },
    bookAvailable: {
      type: Boolean
    },
    navigation: {
      type: Object
    }
  },
  data () {
    return {
      isSettingShow: false,
      showTag: 0,
      progress: 0,
      isShowContent: false
    }
  },
  methods: {
    showSetting (tag) {
      this.showTag = tag
      if (this.showTag === 3) {
        this.isSettingShow = false
        this.isShowContent = true
      } else {
        this.isSettingShow = true
      }
    },
    hideSetting () {
      this.isSettingShow = false
    },
    setFontSize (fontSize) {
      this.$emit('setFontSize', fontSize)
    },
    setTheme (index) {
      this.$emit('setTheme', index)
    },
    // 拖动进度条时触发事件
    onProgressInput (progress) {
      this.progress = progress
      this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`
    },
    // 进度条松开后触发的事件, 根据进度条数值跳转到指定位置
    onProgressChange (progress) {
      this.$emit('onProgressChange', progress)
    },
    // 隐藏目录
    hideContent () {
      this.isShowContent = false
    },
    jumpTo (target) {
      this.$emit('jumpTo', target)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/global";

.menu-bar {
  .menu-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 101;
    display: flex;
    width: 100%;
    height: px2rem(48);
    background: white;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);

    &.hide-box-shadow {
      box-shadow: none;
    }

    .icon-wrapper {
      flex: 1;
      @include center;

      .icon-progress {
        font-size: px2rem(26);
      }

      .icon-bright {
        font-size: px2rem(24);
      }
    }
  }

  .setting-wrapper {
    position: absolute;
    bottom: px2rem(48);
    left: 0;
    width: 100%;
    z-index: 101;
    height: px2rem(60);
    background: white;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);

    .setting-font-size {
      display: flex;
      height: 100%;

      .preview {
        flex: 0 0 px2rem(40);
        @include center;
      }

      .select {
        display: flex;
        flex: 1;

        .select-wrapper {
          display: flex;
          align-items: center;
          flex: 1;

          &:first-child {
            .line {
              &:first-child {
                border-top: none;
              }
            }
          }

          &:last-child {
            .line {
              &:last-child {
                border-top: none;
              }
            }
          }

          .line {
            flex: 1;
            height: 0;
            border-top: px2rem(1) solid #ccc;
          }

          .point-wrapper {
            position: relative;
            flex: 0 0 0;
            width: 0;
            height: px2rem(7);
            border-left: px2rem(1) solid #ccc;

            .point {
              position: absolute;
              top: px2rem(-7);
              left: px2rem(-10);
              width: px2rem(20);
              height: px2rem(20);
              border-radius: 50%;
              background: white;
              border: px2rem(1) solid #ccc;
              box-shadow: 0 px2rem(4) px2rem(4) rgba(0, 0, 0, .15);
              @include center;

              .small-point {
                width: px2rem(5);
                height: px2rem(5);
                background: black;
                border-radius: 50%;
              }
            }
          }
        }
      }
    }

    .setting-theme {
      display: flex;
      height: 100%;

      .setting-theme-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: px2rem(5);
        box-sizing: border-box;

        .preview {
          flex: 1;
          border: px2rem(1) solid #ccc;
          box-sizing: border-box;

          &.no-border {
            border: none;
          }
        }

        .text {
          flex: 0 0 px2rem(20);
          font-size: px2rem(14);
          color: #ccc;
          @include center;

          &.selected {
            color: #333;
          }
        }
      }
    }

    .setting-progress {
      position: relative;
      width: 100%;
      height: 100%;

      .progress-wrapper {
        width: 100%;
        height: 100%;
        @include center;
        padding: 0 px2rem(30);
        box-sizing: border-box;

        .progress {
          width: 100%;
          -webkit-appearance: none;
          height: px2rem(2);
          background: -webkit-linear-gradient(#999, #999) no-repeat, #ddd;
          background-size: 0 100%;

          &:focus {
            outline: none;
          }

          &::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: px2rem(20);
            width: px2rem(20);
            border-radius: 50%;
            background: white;
            box-shadow: 0 4px 4px 0 rgba(0, 0, 0, .15);
            border: px2rem(1) solid #ddd;
          }
        }
      }

      .text-wrapper {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        color: #333;
        font-size: px2rem(12);
        text-align: center;
      }
    }
  }

  .content-mask {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 101;
    display: flex;
    width: 100%;
    height: 100%;
    background: rgba(51, 51, 51, .8);
  }
}
</style>
