$(function(){
	initdg();
})

function initdg() {
	$("#categorydg").datagrid({
		title: "分类列表",
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
		url: "../CategoryAction_getCategories_JsonAction",
		loadMsg:"数据加载中...",
		sortName: "cid",
		sortOrder: "asc",
		pagination : true,
		remoteSort: false,
	    rownumbers : true,
	    columns:[[ 
	    	{
	    		field:'cid',
	    		title:'编号',
	    		align:'center',
	    		sortable:true
	    	},
	    	{
	    		field:'cname',
	    		title:'分类名称',
	    		align:'center',
	    		width:'8%'
	    	},
	    	{
	    		field:'description',
	    		title:'描述',
	    		align:'center',
	    		width:'25%'
	    	}
	    ]]
	});
}

function showdlg() {
	$("#catForm").form("clear");
	$("#categorydlg").dialog("open").dialog("setTitle", "分类信息");
}

function showEditdlg() {
	var row = $("#categorydg").datagrid("getSelected");
	if(row) {
		$("#categorydlg").dialog("open").dialog("setTitle", "分类信息");
		$("#catForm").form("load", row);
	} else {
		alert("请选择需要操作的行");
	}
}

function addOrUpdateCategory() {
	if($("#catFor").form("validate")) {
		var param = $("#catForm").serialize();
//alert(param);
		$.ajax({
			url : "CategoryAction_addOrUpdateCategory_JsonAction",
			type : "post",
			data : param,
			dataType : 'json',
			success : function(r) {
				alert(r.msg);
				if(1 == r.success) {
					$("#categorydg").datagrid("reload");
					$("#categorydlg").dialog("close");
				}
			},
			error : function(r) {
				alert("网络错误");
			}
		});
	} else {
		alert("请确定必要信息填写正确");
	}
}

function removeCategories() {
	var rows = $("#categorydg").datagrid("getSelections");
	if(rows.length) {
		var ids = new Array();
		for (var i = 0; i < rows.length; i++) {
			ids[i] = rows[i].cid;
		};
		var str = "确定删除这"+rows.length+"条记录吗？";
		$.messager.confirm("Confirm", str, function(r){
			if(r) {
				$.post('CategoryAction_removeCategory_JsonAction', {param: JSON.stringify(ids)}, function(r){
					if(1 == r.success) {
						alert("删除成功！");
						$("#categorydg").datagrid("reload");
					} else if(-1 == r.success) {
						alert("出错了");
					}
				}, 'json');
			}
		});
	} else {
		alert("请选择需要操作的行");
	}
}