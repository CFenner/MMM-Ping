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
  },
  socketNotificationReceived: function(notification, payload) {
    //console.log(notification);
    if (notification === 'PING_REQUEST') {
      var that = this;
      request({
          url: 'http://www.google.com',
          method: 'GET'
        }, function(error, response, body) {
          if (!error && response.statusCode == 200) {
            that.lastConnection = new Date();
          }
          that.sendSocketNotification('PING_RESPONSE', {
              status: !error && response.statusCode == 200?"OK":"ERROR",
              lastConnection: that.lastConnection
          });
        }
      );
    }
  }
});
