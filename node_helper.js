/* Magic Mirror
 * Module: ping
 *
 * By Christopher Fenner https://github.com/CFenner
 * MIT Licensed.
 */
var NodeHelper = require('node_helper');
var request = require('request');

module.exports = NodeHelper.create({
  start: function () {
    console.log(this.name + ' helper started ...');
    this.lastConnection = 'never';
    this.lastStatus = '';
    this.lastStatusChange = 'never';
  },
  socketNotificationReceived: function(notification, payload) {
    //console.log(notification);
    if (notification === 'PING_REQUEST') {
      var that = this;
      request({
          url: 'http://www.google.com',
          method: 'GET'
        }, function(error, response, body) {
          var status = !error && response.statusCode == 200?"OK":"ERROR";
          if (status == "OK") {
            that.lastConnection = new Date();
          }
          if(that.lastStatus != status){
            that.lastStatusChange = new Date();
          }
          that.lastStatus = status
          that.sendSocketNotification('PING_RESPONSE', {
            status: that.lastStatus,
            lastConnection: that.lastConnection,
            lastStatusChange: that.lastStatusChange
          });
        }
      );
    }
  }
});
