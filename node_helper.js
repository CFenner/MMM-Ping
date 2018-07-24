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
    this.lastConnection = 0; //in 1970, long time ago without a valid ping on google... did google exist ? ;-)
	//so after a first RPI reboot without successfull ping, the reboot delay will be "config.updateInterval" and not "config.rebootDelay"
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
