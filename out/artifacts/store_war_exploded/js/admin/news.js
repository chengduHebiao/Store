$(document).ready(function(){
	// alert(1);
	listpost();
});

var editor1

KindEditor.ready(function(K) {
	
	editor1 = K.create('textarea[name="content"]', {
		uploadJson :　'kindeditor/jsp/upload_json2.jsp',
		fileManagerJson : 'kindeditor/jsp/file_namager_json.jsp',
		allFileManager : true,
		afterBlur: function(){this.sync();}
	})
});

function showdlg(){
	var row = $("#postsdg").datagrid("getSelected");
	$("#postdialog").dialog("open").dialog("setTitle", "信息");
	if(row){
		$("#postform").form("load", row);
		// $("#content").html(row.content);
		editor1.html(row.content);
	} else {
		$("#postform").form("clear");
		// $("#content").val("");
		editor1.html("");
	}
}

function listpost(){
	$("#postsdg").datagrid({
		title:"信息列表",
		width: "auto",
		iconCls: "icon-ok",
		pageSize: 20,
		pageList: [15,20,25,30],
		nowrap: true,
		method : "post",
		collapsible : true,
		frozenColumns: [[
             { field: 'ck', checkbox: true }
        ]],
		url: "PostAction_listPosts_JsonAction",
		queryParams : {
			type : $("#post_type").val()
		},
		loadMsg:"数据加载中...",
		sortName: "pid",
		sortOrder: "asc",
		pagination : true,
		remoteSort: false,
	    rownumbers : true,
	    columns:[[ 
	    	{
	    		field:'pid',
	    		title:'编号',
	    		align:'center',
	    		width:'5%',
	    		sortable:true
	    	},
	    	{
	    		field:'title',
	    		title:'标题',
	    		align:'center',
	    		width:'10%'
	    	},
	    	{
	    		field:'content',
	    		title:'内容',
	    		align:'center',
	    		width:'45%'
	    	},
	    	{
	    		field:'type',
	    		title:'类型',
	    		align:'center',
	    		width:'10%',
	    		sortable:true,
	    		formatter : function(value, row, index) {
	    			if(1 == row.type) {
	    				return "商品资讯";
	    			} else {
	    				return "降价通知";
	    			}
	    		}
	    	},
	    	{
	    		field:'clicktime',
	    		title:'点击量',
	    		align:'center',
	    		width:'10%',
	    		sortable:true
	    	},
	    	{
	    		field:'publishtime',
	    		title:'发布时间',
	    		align:'center',
	    		width:'15%',
	    		sortable:true
	    	}
	    ]]
	});
}

function publish(){
	var title = $("#title").val();
	var content = $("#content").val();
	if(""==title){
		$("#title").focus();
		$("#titlewarning").css("color", "red");
		$("#titlewarning").text("标题不能为空");
	} else if(""==content) {
		alert("内容不能为空");
	} else {
		$.ajax({
			url: "PostAction_publishPost_JsonAction",
			method : "post",
			data : $("#postform").serialize(),
			dataType : "json",
			success : function(r) {
				alert(r.msg);
				if(1 == r.success) {
					$("#postdialog").dialog("close");
					$("#postsdg").datagrid("reload");
				}
			},
			error : function() {
				alert("网络出错了");
			}
		});
	}
}

function removeposts(){
	var rows = $("#postsdg").datagrid("getSelections");
	if(rows.length) {
		var ids = new Array();
		for (var i = 0; i < rows.length; i++) {
			ids[i] = rows[i].pid;
		};
		var str = "确定删除这"+rows.length+"条记录吗？";
		$.messager.confirm("Confirm", str, function(r){
			if(r) {
				$.post('PostAction_removePosts_JsonAction', {param: JSON.stringify(ids)}, function(r){
					alert(r.msg);
					if(1 == r.success){
						$("#postsdg").datagrid("relaod");
					}
				}, 'json');
			}
		});
		
	} else {
		alert("请选择要操作的行");
	}
}