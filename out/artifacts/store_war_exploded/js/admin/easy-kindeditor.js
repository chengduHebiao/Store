KindEditor.ready(function(K) {
	var editor1 = K.create('textarea[name="content"]', {
		uploadJson :　'kindeditor/jsp/upload_json2.jsp',
		fileManagerJson : 'kindeditor/jsp/file_namager_json.jsp',
		allFileManager : true,
		afterBlur: function(){this.sync();}
	})
});