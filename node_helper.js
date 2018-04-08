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
    this.lastStatus = null;
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
          that.connected = !error && response.statusCode == 200;
          if (that.connected) {
            that.lastConnection = new Date();
          }
          if(that.lastStatus != that.connected){
            that.lastStatus = that.connected
            that.lastStatusChange = new Date();
          }
          that.sendSocketNotification('PING_RESPONSE', {
            connected: that.connected,
            lastStatusChange: that.lastStatusChange
          });
        }
      );
    }
  }
});
