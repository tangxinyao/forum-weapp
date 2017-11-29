//app.js
App({
  onLaunch: function () {
    this.requestAuth(() => {
      this.requestLoginInfo((codeInfo, userInfo) => {
        this.transportLoginInfo(codeInfo, userInfo, (token) => {
          console.log(token);
        }, this.handleError);
      }, this.handleError);
    }, this.handleError);
  },
  /**
   * @param {callback} next - no arg
   * @param {callback} err - one arg
   */
  requestAuth: function (next, err) {
    wx.getSetting({
      success: (setting) => {
        if (!setting.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success: () => {
              next();
            },
            fail: (errRes) => {
              err(errRes);
            }
          });
        } else {
          next();
        }
      },
      fail: (res) => {
        err(res);
      }
    });
  },
  /**
   * @param {callback} next - two args, codeInfo & userInfo
   * @param {callback} err - one arg
   */
  requestLoginInfo: function (next, err) {
    wx.login({
      success: (codeInfo) => {
        wx.getUserInfo({
          success: (userInfo) => {
            next(codeInfo, userInfo);
          },
          fail: (errRes) => {
            err(errRes);
          }
        });
      },
      fail: (errRes) => {
        err(errRes);
      }
    });
  },
  /**
   * @param {Obejct} codeInfo
   * @param {Object} userInfo
   * @param {callback} next - one arg, token
   * @param {callback} err - one arg
   */
  transportLoginInfo: function (codeInfo, userInfo, next, err) {
    wx.request({
      url: `http://${this.globalData.hostname}:${this.globalData.port}/token`,
      data: {
        code: codeInfo.code,
        encryptedData: userInfo.encryptedData,
        iv: userInfo.iv
      },
      success: (response) => {
        next(response.data);
      },
      fail: (errRes) => {
        err(errRes);
      }
    });
  },
  handleError: function (err) {
    console.log(err);
  },
  globalData: {
    hostname: 'localhost',
    port: '3000',
    userInfo: null
  }
})