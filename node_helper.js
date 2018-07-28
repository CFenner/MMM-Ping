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
    this.lastConnection = new Date(); //We consider a success at start-up
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
    //Log the reboot on pm2 out log, here : /home/pi/.pm2/logs
    if (notification === 'LOG_REBOOT') {
		console.log("RPI reboot requested at : " + payload + " GMT, after too long time without successfull PING");
    }
    
  }
});
