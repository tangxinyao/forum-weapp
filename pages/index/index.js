//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    searchData: null,
    areaIndex: 0,
    categoryIndex: 0,
    sortIndex: 0,

    areaList: ['故城县', '纽约', '伦敦', '东京'],
    categoryList: ['全部分类', '交友', '招聘'],
    sortList: ['默认排序', '时间', '热度'],
    navList: [{ title: 'title1', img: '', url: '../post/start/start' },
      { title: 'title2', img: '', url: '../post/start/start' },
      { title: 'title3', img: '', url: '../post/start/start' },
      { title: 'title4', img: '', url: '../post/start/start' },
      { title: 'title5', img: '', url: '../post/start/start' },
      { title: 'title6', img: '', url: '../post/start/start' },
      { title: 'title7', img: '', url: '../post/start/start' },
      { title: 'title8', img: '', url: '../post/start/start' }
    ]
  },
  onLoad: function () {
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse) {
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },

  handleViewTap: () => {
    console.log('yes');
  },

  handleInput: function (e) {
    this.setData({ searchData: e.detail.value })
  },

  handleAreaChange: function (e) {
    this.setData({
      areaIndex: e.detail.value
    })
  },

  handleCategoryChange: function (e) {
    this.setData({
      categoryIndex: e.detail.value
    })
  },

  handleSortChange: function (e) {
    this.setData({
      sortIndex: e.detail.value
    })
  },

  getUserInfo: e => {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
