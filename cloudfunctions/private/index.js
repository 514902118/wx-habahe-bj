const cloud = require('wx-server-sdk')
cloud.init()
// 经度 longitude;
// 纬度 latitude;
exports.main = async (event, context) => {
    var rp = require('request-promise');
    var options = {
        method: 'POST',
        // uri: 'http://39.105.58.173:18081/petApi/weChat/report',
         uri: 'http://106.124.136.211:18081/petApi/weChat/report2',
        body: {
            longitude: event.longitude,
            latitude: event.latitude,
            mobile:event.mobile,
            areaCode:event.areaCode 
        },
        json: true 
    };
    
    return rp(options).then(function (parsedBody) {
        return parsedBody
        })
        .catch(function (err) {
            return err
        });
}