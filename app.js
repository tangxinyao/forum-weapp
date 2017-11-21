//app.js
App({
  onLaunch: async function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    try {
      const setting = await this.requestSetting();
      if (!setting.authSetting['scope.userInfo']) {
        await requestAuth('scope.userInfo');
      }
      const code = await this.requestCode();
      const userInfo = await this.requestUserInfo();
      if (code) {
        await this.transportUserInfo(code, userInfo.encryptedData, userInfo.iv, userInfo.userInfo);
      }
    } catch (err) {
      console.log(err);
    }
  },
  requestSetting: function () {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: (res) => {
          resolve(res);
        },
        fail: (res) => {
          reject(res);
        }
      })
    });
  },
  requestAuth: function (scope) {
    return new Promise((resolve, reject) => {
      wx.authorize({
        scope,
        success: (res) => {
          resolve(res);
        },
        fail: (res) => {
          reject(res);
        }
      })
    });
  },
  requestCode: function () {
    return new Promise((resolve, reject) => {
      wx.login({
        success: (res) => {
          resolve(res.code);
        },
        fail: (res) => {
          reject(res);
        }
      });
    });
  },
  requestUserInfo: function () {
    return new Promise((resolve, reject) => {
      wx.getUserInfo({
        success: res => {
          resolve(res);
        },
        fail: res => {
          reject(res);
        }
      });
    });
  },
  transportUserInfo: function (code, encryptedData, iv, userInfo) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `http://${this.globalData.hostname}:${this.globalData.port}/sessions`,
        data: { code, encryptedData, iv, userInfo },
        success: (res) => {
          resolve(res);
        },
        fail: (res) => {
          reject(res);
        }
      });
    });
  },
  globalData: {
    hostname: 'localhost',
    port: '3000',
    userInfo: null
  }
})