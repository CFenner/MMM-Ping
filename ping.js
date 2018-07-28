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
    updateInterval: 10, //min
    showAlways: false, 
    showAbsoluteTime: false,
    AbsoluteTimeFormat: 'dd - HH:mm:ss',
	rebootIfNoPing: false, // should we ask the RPI to reboot if no ping during some delay ?
	rebootDelay: 20 //if no PING for more than x min, request the RPI to reboot
  },
  payload: {},
  start: function() {
      Log.info('Starting module: ' + this.name);
      
      this.update();

	  setInterval(
  			this.update.bind(this),
  			this.config.updateInterval * 60 * 1000);
  },
  update: function() {
      this.sendSocketNotification('PING_REQUEST');
  },
  socketNotificationReceived: function(notification, payload) {
      if (notification === 'PING_RESPONSE') {
          Log.info('received ' + notification);
          if(payload){  
            this.payload = payload;
			
				if(this.payload.status === "ERROR" && this.config.rebootIfNoPing){

					var actualErrorDelay = moment(new Date()) - moment(this.payload.lastConnection);

					Log.log("No PING for : " + actualErrorDelay / 1000 + "sec. Max acceptable delay set at : " + this.config.rebootDelay*60 +" s");
					
					if(actualErrorDelay >= this.config.rebootDelay*60*1000){
						//Log.log("Reboot asked !");
						
						//request (to node_helper) the reboot to be logged in pm2 out log
    			        this.sendSocketNotification('LOG_REBOOT', new Date());

						//request reboot and reboot to Remote-Control module
						this.sendNotification('REMOTE_ACTION', {action: 'REBOOT'});
					}
				}
			
			
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
			es: "i18n/es.json",
			de: "i18n/de.json",
			fr: "i18n/fr.json"
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
      if(this.config.showAbsoluteTime){
		  span = document.createElement("div");
		  span.className = "xsmall light";
		  span.innerHTML = moment(this.payload.lastConnection).format(this.config.AbsoluteTimeFormat);
		  wrapper.appendChild(span);
	  }
    }
    return wrapper;
  }
});
