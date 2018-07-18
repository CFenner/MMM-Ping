/* global Module */
/* Magic Mirror
 * Module: ping
 *
 * By Christopher Fenner https://github.com/CFenner
 * MIT Licensed.
 */
 
//UserPresence Management (PIR sensor)
var UserPresence = true; //true by default, so no impact for user without a PIR sensor
 
Module.register('ping', {
  defaults: {
    animationSpeed: 1,
    updateInterval: 10,
    showAlways: false, 
    showAbsoluteTime: false,
    AbsoluteTimeFormat: 'dd - HH:mm:ss'
  },
  payload: {},
  start: function() {
      Log.info('Starting module: ' + this.name);
      
      var ModulePingHidden = false; //by default it is displayed. Note : this.hidden has strange behaviour, so not used here
	  var IntervalID = 0; //Definition of the IntervalID to be able to stop and start is again
      
      //this.update(); removed because the new fonction "resume" bellow will also request a first update at start-up
      
  	  // refresh every x minutes and intervalD defined
  	  this.IntervalID = setInterval(
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
  
  
	suspend: function() {
		this.ModulePingHidden = true; 
		Log.log("Fct suspend - ModuleHidden = " + this.ModulePingHidden);
		this.GestionUpdateInterval(); //request of the function that manage all situation
	},
	
	resume: function() {
		this.ModulePingHidden = false;
		Log.log("Fct resume - ModuleHidden = " + this.ModulePingHidden);
		this.GestionUpdateInterval();	
	},

	notificationReceived: function(notification, payload) {
		if (notification === "USER_PRESENCE") { // notification send by module MMM-PIR-Sensor. See its README
			Log.log("Fct notificationReceived USER_PRESENCE - payload = " + payload);
			UserPresence = payload;
			this.GestionUpdateInterval();
		}
	},

	GestionUpdateInterval: function() {
		if (UserPresence === true && this.ModulePingHidden === false){ //both User present and module displayed
			Log.log(this.name + " est revenu et user present ! On update");

			// update now
			this.update();
			
			//if no IntervalID defined, we set one again. his is to avoid several setInterval simultaneously
			if (this.IntervalID === 0){
				this.IntervalID = setInterval(
					this.update.bind(this),
					this.config.updateInterval * 60 * 1000);
			}
		}else{ //sinon (UserPresence = false OU ModuleHidden = true)
			Log.log("Personne regarde : on stop l'update ! ID : " + this.IntervalID);
			clearInterval(this.IntervalID); // on arrete l'intervalle d'update en cours
			this.IntervalID=0; //on reset la variable
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
