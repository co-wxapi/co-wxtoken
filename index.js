'use strict';
var WxBase = require('co-wxbase');
var debug = require('debug')('co-token');

class TokenApi extends WxBase {
  constructor(config) {
    super(config);
    this.apis = {
      getAccessToken: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${this.appId}&secret=${this.appSecret}`
    }
  }

  *getAccessToken(){
    var token = yield this.jsonRequest(this.apis.getAccessToken, 'GET');
    return token;
  }

  *getServerIps(access_token){
    var url = `https://api.weixin.qq.com/cgi-bin/getcallbackip?access_token=${access_token}`
    var result = yield this.jsonRequest(url, 'GET');
    return result;
  }
}

module.exports = function(config){
  var tokenApi = new TokenApi(config);
  return tokenApi;
}
