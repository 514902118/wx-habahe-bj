Page({
  data: {},
  getPhoneNumber(e) {
    let self = this;
    wx.cloud.callFunction({
      name: 'getPhoneNumber',
      data: {
        weRunData: wx.cloud.CloudID(e.detail.cloudID),
      }
    }).then(res => {
      console.log('获取用户手机号-开始')
      let phoneNumber = res.result.phoneNumber
      self.getLocationChange(phoneNumber)
    }).catch(err => {
      console.error(err);
    });
  },
  getLocationChange(phoneNumber) {
    let self = this;
    wx.getLocation({
      type: 'wgs84',
      altitude:true,
      isHighAccuracy:true,
      highAccuracyExpireTime:3500,
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        console.log('经度',longitude)
        console.log('纬度',latitude)
        wx.showToast({
          title: '警情已发出',
          icon: 'success',
          duration: 2000
        })
        self.privateChange(latitude, longitude, phoneNumber)
      }
    })
  },
  //提交信息
  privateChange(latitude, longitude, phoneNumber) {
    console.log(phoneNumber)
    wx.cloud.callFunction({
      name: 'private',
      data: {
        longitude: latitude ,
        latitude: longitude,
        mobile: phoneNumber,
        areaCode:'654324000000' //哈巴河
      }
    }).then((res) => {
      this.makePhoneCallChange();
    })
  },
  makePhoneCallChange() {
    wx.makePhoneCall({
      phoneNumber: '0906-6622001' //仅为示例，并非真实的电话号码
    })
  },
})