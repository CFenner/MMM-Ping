/* global Module */
/* Magic Mirror
 * Module: ping
 *
 * By Christopher Fenner https://github.com/CFenner
 * MIT Licensed.
 */
Module.register('ping', {
  defaults: {
    animationSpeed: 1,
    updateInterval: 10,
    showAlways: false
  },
  payload: {},
  start: function() {
      Log.info('Starting module: ' + this.name);
      this.update();
  		// refresh every x minutes
  		setInterval(
  			this.update.bind(this),
  			this.config.updateInterval * 60 * 1000);
  },
  update: function() {
      this.sendSocketNotification('PING_REQUEST');
  },
  socketNotificationReceived: function(notification, payload) {
      if (notification === 'PING_RESPONSE') {
          Log.info('received' + notification);
          if(payload){
            this.payload = payload;
            this.updateDom(this.config.animationSpeed * 1000);
          }
      }
  },
  getStyles: function() {
      return [];
  },
	getScripts: function() {
		return ["moment.js"];
	},
	getTranslations: function() {
		return {
        en: "i18n/en.json",
        de: "i18n/de.json"
    };
	},
  getDom: function() {
    var wrapper = document.createElement("div");
    if(this.config.showAlways || this.payload.status === "ERROR"){
      var span = document.createElement("div");
      span.innerHTML = this.translate("LAST_ACTIVE_CONNECTION");
      span.className = "small";
      wrapper.appendChild(span);
      span = document.createElement("div");
      span.className = "bright";
      span.innerHTML = moment(this.payload.lastConnection).fromNow();
      wrapper.appendChild(span);
    }
    return wrapper;
  }
});
