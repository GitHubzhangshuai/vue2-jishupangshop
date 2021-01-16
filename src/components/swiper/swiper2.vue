<template>
  <div >
      <swiper class="swiper" :options="swiperOption">
        <swiper-slide class="text">
            <div class="centent">
               一大堆文章.........
            </div>
        </swiper-slide>

      </swiper>
  </div>
</template>

<script>
import 'swiper/swiper-bundle.css'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
export default {
  data () {
    return {
      swiperOption: {
        direction: 'vertical', // 'vertical'设置竖排显示
        slidesPerView: 'auto', // 'auto' 设置同屏显示的数量，默认为1，这里使用auto是随意的意思。
        freeMode: true, // true 默认为false，普通模式：slide滑动时只滑动一格，并自动贴合wrapper，设置为true则变为free模式，slide会根据惯性滑动可能不止一格且不会贴合。
        mousewheel: true // true 开启鼠标滚轮控制Swiper切换。可设置鼠标选项，或true使用默认值。
      }
    }
  },
  components: {Swiper, SwiperSlide}
}
</script>

<style scoped>
  .swiper{
      height: 300px;
      overflow: hidden;
  }
  .text{
      font-size: 18px !important;
      text-align: left;
      padding:30px;
      height: auto;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;

  }
</style>
