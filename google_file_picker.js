
window.googlePicker = {
	developerKey: "xxxxxxxxxxxxxxxxxxx",
	appId: "123456789",
	apiUrl: "https://apis.google.com/js/api.js",
	scope: "https://www.googleapis.com/auth/drive.file",
	clientId: "xxxxxxxxxx.apps.googleusercontent.com",
	loginDomain: null, // "yoursite.com",
	apiLoaded: false,
	oauthToken: null,
	instance: null,
	init: function() {
		$.getScript(this.apiUrl, () => {
			gapi.load("auth", ()=>{ gapi.auth2.init({ client_id: this.clientId, scope: this.scope, hosted_domain: this.loginDomain }); });
			gapi.load("picker", ()=>{
				frappe.templates["upload"] = frappe.templates["upload"].replace("</button>",`</button> <button class="btn btn-primary btn-sm" onclick="googlePicker.show()">{%=__("Drive") %}</button><br/><br/>`);
				this.apiLoaded = true;
			});
		});
		if (window.parent) window.parent.googlePicker = this;
	},
	getInstance: function() {
		if (!this.instance) {
			var view = new google.picker.DocsView();
			//view.setMimeTypes("image/png,image/jpeg,image/jpg");
			view.setMode(google.picker.DocsViewMode.LIST);
			view.setIncludeFolders(true);
			//view.setSelectFolderEnabled(true);
			//view.setEnableDrives(true);
			this.instance = new google.picker.PickerBuilder()
				//.enableFeature(google.picker.Feature.NAV_HIDDEN)
				//.enableFeature(google.picker.Feature.SUPPORT_DRIVES)
				.setAppId(this.appId)
				.setOAuthToken(this.oauthToken)
				.addView(view)
				.addView(new google.picker.DocsUploadView())
				.setDeveloperKey(this.developerKey)
				.setCallback(this.pickerCallback)
				.build();
		}
		return this.instance;
	},
	pickerCallback: (data) => {
		if (data.action == google.picker.Action.PICKED) {
			var file_url = $.find('[name="file_url"]:visible');
			if (file_url && file_url[0]) file_url[0].value = data.docs[0].url;
		}
	},
	show: function() {
		if (!this.apiLoaded) return;
		if (!this.oauthToken) {
			var isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
			if (isSignedIn)
				this.oauthToken = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
			else {
				gapi.auth2.getAuthInstance().signIn().then(()=> { this.show(); });
				return;
			}
		}
		this.getInstance().setVisible(true);
		$(".picker-dialog")[0].style.zIndex=2000;
	}
};

$().ready(()=> {
	googlePicker.init();
});
