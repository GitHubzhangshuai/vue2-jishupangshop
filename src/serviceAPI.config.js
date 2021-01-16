const BASEURL = 'http://localhost:2233/'
const LOCALURL = 'http://localhost:3000/'
const URL = {
  // getShoppingMallInfo: BASEURL + 'index',
  getShoppingMallInfo: LOCALURL + 'goods/mock',
  getGoodsInfo: BASEURL + 'getGoodsInfo',
  registerUser: LOCALURL + 'user/register',
  loginUser: LOCALURL + 'user/login',
  getDetailGoodsInfo: LOCALURL + 'goods/getDetailGoodsInfo', // //得到商品详细数据
  getCategoryList: LOCALURL + 'goods/getCategoryList', // 得到大类信息
  getCategorySubList: LOCALURL + 'goods/getCategorySubList', // 得到小类信息
  getGoodsListByCategorySubID: LOCALURL + 'goods/getGoodsListByCategorySubID' // 得到小类商品信息

}

module.exports = URL
