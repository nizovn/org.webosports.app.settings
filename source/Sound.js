
enyo.kind({
	name: "Sound",
	kind: "enyo.Control",
	layoutkind: "enyo.FittableColumnsLayout",
	published: {},
	events: {}, 
	palm: false,
	audio: false, 
	keys: false,
	vibrate: false,
	system: false,
	systemVolume: 0,
	ringerVolume: 0,
	
	components: [
		{kind: "onyx.Toolbar", layoutKind: "FittableColumnsLayout", classes: "onyx-toolbar", style: "height: 32px;", components: [
			{content: "Audio"},
			{fit: true},
			{name: "audioToggle", kind: "onyx.ToggleButton", onChange: "toggleButtonChanged", showing: "true"}
		]},
		{name: "audioPanels", layoutKind: "FittableRowsLayout", fit: true, draggable: false, showing: false, components: [
			{kind: "enyo.FittableRows", classes: "content-wrapper", components: [
				{name: "AudioList", kind: "onyx.Groupbox", layoutKind: "FittableRowsLayout", classes: "content-aligner", fit: true, components: [
					{kind: "onyx.GroupboxHeader", content: "Audio Settings"},
					{classes: "group-item", components: [
						{name: "volume", content: "Volume ", class: "group-item"},
						{name: "volumeSlider", kind: "onyx.Slider", value: "20", onChanging: "volumeChange"}
					]},
					{classes: "group-item", components: [
						{kind: "enyo.FittableColumns", components: [
							{name: "keys", content: "Keyboard Clicks"},
							{fit: true, onchange: "create"},
							{name: "keyClicksToggle",kind: "onyx.ToggleButton", onChange: "keyClicks"}
						]}
					]},
					{classes: "group-item", components: [
						{kind: "enyo.FittableColumns", components: [
							{name: "vibrate", content: "Vibrate"},
							{fit: true},
							{name: "vibrateToggle", kind: "onyx.ToggleButton", style: "float: right;", onChange: "vib"}
						]}
					]},
					{classes: "group-item", components: [
						{kind: "enyo.FittableColumns", components: [
							{content: "System Sounds "},
							{fit: true},
							{name: "systemSoundToggle", kind: "onyx.ToggleButton", onChange: "systemSounds"}
						]}
					]},
					{classes: "group-item", components: [
						{name: "ringer", content: "Ringer Volume ", class: "group-item"},
						{name:"ringerSlider", kind: "onyx.Slider", value: "20", onChanging: "ringerVolumeChange"}
					]},
				]}
			]}
		]},
		{name: "audioDisabled", layoutKind: "FittableRowsLayout", style: "padding: 35px 10% 35px 10%;", showing: false, components: [
			{style: "padding-bottom: 10px;", components: [
					{content: "Audio is disabled", style: "display: inline;"}
			]}
		]},
		{name: "ErrorPopup", kind: "onyx.Popup", classes: "error-popup", modal: true, style: "padding: 10px;", components: [
			{name: "ErrorMessage", content: "", style: "display: inline;"}
		]}
	],
	//Handlers
	create: function() {
		this.inherited(arguments);
		console.log ("Sound: created");
	
		// initialization code goes here
        if (!window.PalmSystem) {
			// if we're outside the webOS system add some entries for easier testing
			this.audio = true;
			this.keys = true;
			this.vibrate = true;
			this.system = true;
			this.ringerVolume = 65;
			this.systemVolume = 45;
            
        }
        this.manage();
    },
    manage: function (inSender, inEvent){						// get every thing set up
		this.log("sender:", inSender, ", event:", inEvent);
		this.audio = this.getAudioStatus();
		// setup the pannel
		if (this.audio === true){
			this.$.audioDisabled.setShowing(false);
			this.$.audioPanels.setShowing(true);
		}else{
			this.$.audioDisabled.setShowing(true);
			this.$.audioPanels.setShowing(false);
		}   
		
		// set up the buttons
	
		if (this.audio === true){
			this.$.audioToggle.setValue(true);
		}else{
			this.$.audioToggle.setValue(false);
		}
		
		if (this.keys === true){
			this.$.keyClicksToggle.setValue(true);
		}else{
			this.$.keyClicksToggle.setValue(false);
		}
		
		if (this.vibrate === true){
			console.log ("vibe   ");
			this.$.vibrateToggle.setValue(true);
		}else{
			this.$.vibrateToggle.setValue(false);
		}
		
		if (this.system === true){
			this.$.systemSoundToggle.setValue(true);
		}else{
			this.$.systemSoundToggle.setValue(false);
		}
		
		/* set slider to */
		this.$.volumeSlider.setValue(this.systemVolume);
		this.$.ringerSlider.setValue(this.ringerVolume);
		
    },
	deactivateAudio: function (inSender, inEvent) {
		this.log("sender:", inSender, ", event:", inEvent);
        this.$.audioDisabled.show();
    },
    
	//Action Functions
	//Utility Functions
	
	//Service Callbacks
	toggleButtonChanged: function(inSender, inEvent) {
		this.log("sender:", inSender, ", event:", inEvent.value);
		// TO DO - Auto-generated code
		if (inEvent.value === false){
			this.deactivateAudio();
			this.$.audioPanels.setShowing(false);
			
			// turn off audio system wide here
		}
		
		if (inEvent.value === true){
			this.$.audioDisabled.setShowing(false);
			this.$.audioPanels.setShowing(true);
			
			// turn on audio system wide  here
		}
	},				// system wide mute
	getAudioStatus: function(inSender, inEvent){
		this.log("sender:", inSender, ", event:", inEvent);
		
		return(true);	// for testing
		// return(get audio status here ===  true/false  );
	},			// get audio satus here  is audio true/false
	keyClicks: function(inSender, inEvent) {
		this.log("sender:", inSender, ", event:", inEvent);
		// TO DO - Auto-generated code
		console.log("key  value  true/false", inEvent.value);
		this.keys = inEvent.value;
	},				// set key clicks true/false here
	vib: function(inSender, inEvent) {
		this.log("sender:", inSender, ", event:", inEvent);
		// TO DO - Auto-generated code
		console.log("vibatre value  true/false", inEvent.value);
		this.vibrate = inEvent.value;
	},						// set vibrate true/false here
	systemSounds: function(inSender, inEvent) {
		this.log("sender:", inSender, ", event:", inEvent);
		// TO DO - Auto-generated code
		console.log("system value true/false", inEvent.value);
		this.system = inEvent.value;
	},			// set system sounds true/false here
	volumeChange: function(inSender, inEvent) {
		this.log("sender:", inSender, ", event:", inEvent);
		// TO DO - Auto-generated code
		console.log("system volume  value ", inEvent.value);
		this.systemVolume = inEvent.value;
	},			// set system volume here
	ringerVolumeChange: function(inSender, inEvent) {
		this.log("sender:", inSender, ", event:", inEvent);
		// TO DO - Auto-generated code
		console.log("ringer volume value ", inEvent.value);
		this.ringerVolume = inEvent.value;
	},		// set ringer volume here
});