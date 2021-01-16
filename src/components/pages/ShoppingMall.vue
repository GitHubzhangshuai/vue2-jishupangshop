<template>
  <div>
        <!--search bar layout-->
        <div class="search-bar">
            <van-row gutter="5">
                <van-col span="3"><img :src="locationIcon" width="80%" class="location-icon" /></van-col>
                <van-col span="16">
                    <input type="text" class="search-input"/>
                </van-col>
                <van-col span="5"><van-button size="mini" type="primary">查找</van-button></van-col>
            </van-row>
        </div>
        <!--swipwer area-->
        <div class="swiper-area">
            <van-swipe :autoplay="5000000">
                <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index" @click="goGoodsInfo(banner.goodsId)">
                    <img v-lazy="banner.image"/><!--这里去掉了width="100%"-->
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="type-bar">
            <div v-for="(cate,index) in category" :key="index" @click="goCategoryInfo(index)">
                    <img v-lazy="cate.image"/><!--这里去掉了width="90%"-->
                    <span>{{cate.mallCategoryName}}</span>
            </div>
        </div>
        <!--AD banner area-->
        <div class="ad-banner">
            <img v-lazy="adBanner.PICTURE_ADDRESS" width="100%">
        </div>
        <!--Recommend goods area-->
        <div class="recommend-area">
            <div class="recommend-title">
                商品推荐
            </div>
            <div class="recommend-body">
                <!--swiper-->
                <swiper :options="swiperOption">
                    <swiper-slide v-for=" (item ,index) in recommendGoods" :key="index">
                        <div class="recommend-item" @click="goGoodsInfo(item.goodsId)">

                                <img :src="item.image" width="80%" />
                                <div>{{item.goodsName}}</div>
                                <div>￥{{item.price}} (￥{{item.mallPrice}})</div>

                        </div>
                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
            </div>
        </div>
        <!--floor one-three area-->
        <floorComponent :floorData="floor1" :floorTitle="floorName.floor1"></floorComponent>
        <floorComponent :floorData="floor2" :floorTitle="floorName.floor2"></floorComponent>
        <floorComponent :floorData="floor3" :floorTitle="floorName.floor3"></floorComponent>
        <!--Hot Area-->
        <div class="hot-area">
            <div class="hot-title">热卖商品</div>
            <div class="hot-goods">
                <van-list>
                    <van-row gutter="20">
                        <van-col span="12" v-for="(item,index) in hotGoods" :key="index" @click="goGoodsInfo(item.goodsId)">
                            <goods-info :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goods-info>
                        </van-col>
                    </van-row>
                </van-list>
            </div>
        </div>
        <swiperDefault></swiperDefault>
        <Swiper2></Swiper2>
  </div>
</template>

<script>
import axios from 'axios'
import SwiperDefault from '@/components/swiper/swiperDefault'
import Swiper2 from '@/components/swiper/swiper2'
import FloorComponent from '@/components/component/floorComponent'
import GoodsInfo from '@/components/component/goodsInfoComponent'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
import {toMoney} from '@/filter/moneyFilter.js'
import url from '@/serviceAPI.config.js'

export default {
  components: {Swiper, Swiper2, SwiperSlide, SwiperDefault, FloorComponent, GoodsInfo},
  filters: {
    moneyFilter (money) {
      return toMoney(money)
    }
  },
  data () {
    return {
      locationIcon: require('@/assets/images/icon-location.png'),
      //   bannerPicArray: [
      //     {imageUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2375612437,116816261&fm=26&gp=0.jpg'},
      //     {imageUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1514759085,3962310232&fm=26&gp=0.jpg'},
      //     {imageUrl: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3084070968,997503008&fm=26&gp=0.jpg'}
      //   ],
      bannerPicArray: [], // 轮播图片
      category: [], // 商品类别标签栏
      adBanner: '', // 广告图片
      recommendGoods: [], // 推荐商品
      floor1: [], // 楼层1的数据
      floor2: [], // 楼层1的数据
      floor3: [], // 楼层1的数据
      floorName: {}, // 楼层名称
      hotGoods: [], // 热卖商品
      swiperOption: {
        slidesPerView: 3
        // pagination: {
        //   el: '.swiper-pagination'
        // }
      }
    }
  },
  created () {
    axios({
      url: url.getShoppingMallInfo,
      method: 'get'
    })
      .then(response => {
        console.log(response)
        if (response.status === 200) {
          this.category = response.data.data.category // 商品分类栏
          this.adBanner = response.data.data.advertesPicture // 获得广告图片
          this.bannerPicArray = response.data.data.slides // 轮播图片
          this.recommendGoods = response.data.data.recommend // 推荐商品
          this.floor1 = response.data.data.floor1 // 楼层1数据
          this.floor2 = response.data.data.floor2 // 楼层2数据
          this.floor3 = response.data.data.floor3 // 楼层3数据
          this.floorName = response.data.data.floorName // 楼层名称
          this.hotGoods = response.data.data.hotGoods // 热卖商品
        }
      })
      .catch((error) => {
        console.log(error)
      })
  },
  methods: {
    goCategoryInfo (id) {
      this.$router.push({path: '/CategoryList', query: {CategoryId: id}})
    },
    goGoodsInfo (id) {
      this.$router.push({path: '/Goods', query: {goodsId: id}})
    }
  }
}
</script>
<style scoped>
  .search-bar{
      height: 2.2rem;
      background-color: #e5017d;
      line-height:2.2rem;

  }
  .search-input{
      width:100%;
      height: 1.3rem;
      border-top:0px;
      border-left:0px;
      border-right:0px;
      border-bottom: 1px solid 1px !important ;
      background-color: #e5017d;
      color:#fff;
  }
  .location-icon{
      padding-top: .2rem;
      padding-left: .3rem;
  }
  .swiper-area{
      width:20rem;
      clear:both;
  }
  .swiper-area img{
      height: 9rem;
  }
.type-bar{
      background-color: #fff;
      margin:0 .3rem .3rem .3rem;
      border-radius: .3rem;
      font-size:14px;
      display: flex;
      flex-direction:row;
      flex-wrap:nowrap;
  }
  .type-bar img{
      width: 3rem;
  }
  .type-bar div{
      padding: .3rem;
      font-size: 12px;
      text-align: center;
  }
   .recommend-area{
       background-color: #fff;
       margin-top: .3rem;
  }
  .recommend-title{
      border-bottom:1px solid #eee;
      font-size:14px;
      padding:.2rem;
      color:#e5017d;
  }
    .recommend-body{
       border-bottom: 1px solid #eee;
   }

  .recommend-item{
      width:99%;
      border-right: 1px solid #eee;
      font-size: 12px;
      text-align: center;
  }
  .hot-area{
      text-align: center;
      font-size:14px;
      height: 1.8rem;
      line-height:1.8rem;
  }
.hot-goods{
    height: 130rem;
    overflow: hidden;
    background-color: #fff;

}
</style>
