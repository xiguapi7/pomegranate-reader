<template>
  <div class="menu-bar">
    <!--菜单栏, 加入过渡动画-->
    <transition name="slide-up">
      <div v-show="isTitleAndMenuShow" class="menu-wrapper" :class="{'hide-box-shadow': isSettingShow || !isTitleAndMenuShow}">
        <!--菜单-->
        <div class="icon-wrapper">
          <span class="icon-menu icon"></span>
        </div>
        <!--阅读进度条-->
        <div class="icon-wrapper">
          <span class="icon-progress icon"></span>
        </div>
        <!--阅读背景-->
        <div class="icon-wrapper">
          <span class="icon-bright icon"></span>
        </div>
        <!--字体-->
        <div class="icon-wrapper">
          <span class="icon-A icon" @click="showSetting"></span>
        </div>
      </div>
    </transition>

    <transition name="slide-up">
      <div class="setting-wrapper" v-show="isSettingShow">
        <!-- 字体设置 -->
        <div class="setting-font-size">
          <div class="preview" :style="{fontSize: fontSizeList[0].fontSize + 'px'}">A</div>

          <div class="select">
            <div class="select-wrapper" v-for="(item, index) in fontSizeList" :key="index" @click="setFontSize(item.fontSize)">
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
      </div>
    </transition>
  </div>
</template>

<script>
export default {
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
    }
  },
  data () {
    return {
      isSettingShow: false
    }
  },
  methods: {
    showSetting () {
      this.isSettingShow = true
    },
    hideSetting () {
      this.isSettingShow = false
    },
    setFontSize (fontSize) {
      this.$emit('setFontSize', fontSize)
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
  }
}
</style>
