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
    showAlways: false,
	  showText: true
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
    return [
      'ping.css'
    ];
  },
	getScripts: function() {
		return ["moment.js"];
	},
	getTranslations: function() {
		return {
			en: "i18n/en.json",
			es: "i18n/es.json",
			de: "i18n/de.json",
			fr: "i18n/fr.json"
		};
	},
  getDom: function() {
    var wrapper = document.createElement("div");
    if(this.config.showAlways || !this.payload.connected){
			var element;
      
			element = document.createElement('span');
			element.className = 'status ' + (!this.payload.connected?'dis':'') + 'connected';
			wrapper.append(element);
			
      if(this.showText){
        element = document.createElement("span");
        element.innerHTML = this.payload.connected
          ?this.translate("CONNECTED")
          :this.translate("DISCONNECTED");
        element.className = "bright small";
        wrapper.appendChild(element);
      }
      
			element = document.createElement("div");
      element.className = "xsmall";
      element.innerHTML = moment(this.payload.lastStatusChange).fromNow();
      wrapper.appendChild(element);
    }
    return wrapper;
  }
});
