# ERPNext-GFPicker

This script adds a "Drive" button in the file attachment dialog of ERPNext. The button allows you to select a file from your drive and copies its URL to be stored in ERPNext. It is tested for ERPNext 10.1.76, Frappe 10.1.68.

<img src="https://raw.githubusercontent.com/osmansen/ERPNext-GFPicker/master/googleFilePicker.png">

<i>Before using this script, please note that I am not an ERPNext expert. My experience is limited with a couple days of development effort. I am practically a newbee. The integration code was adapted from the <a href="https://developers.google.com/drive/api/v3/picker" target="_blank">Google File Picker API example</a></i>

You can use this script in two ways:

<h2>As a Custom Script</h2>
<p>
You can add the script as a <a href="https://erpnext.com/docs/user/manual/en/customize-erpnext/custom-scripts" target="_blank">Custom Script</a> for a document type in ERPNext. Then this feature will be available only after you view a document of that type.
</p>

<h2>As a Global Script</h2>
<p>
You can add the script into your ERPNext installation. This requires access to the ERPNext filesystem but the feature becomes available in the entire ERPNext application.

To do so;
* Copy the google_file_picker.js file into sites/assets/js/ folder.
* Change the app_include_js setting in app/erpnext/erpnext/hooks.py as follows:
</p>
<p>
<code>
app_include_js = ["assets/js/erpnext.min.js","assets/js/google_file_picker.js"]
</code>
</p>
<p>
Then you need to run the following command in the frappe-bench folder:
</p>
<p>
<code>
  bench clear-cache
</code>
</p>
<h2>A final note</h2>
<p>
ERPNext already supports <a href="https://frappe.io/docs/user/en/guides/deployment/how-to-enable-social-logins" target="_blank">Google authentication</a>. You need to set it up before using this script but you need to add the drive APIs into the scope as follows while doing it:
</p><p><pre>
<code>
email	
profile	
openid	
../auth/drive	
../auth/drive.file
</code>
</pre>
</p>
<p>
Adding drive authorizations in the scope will authorize use of Google Drive at the moment the user signs in with Google Login.
</p>
<hr>

Enjoy!
