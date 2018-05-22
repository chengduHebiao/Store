$(function(){
	$('#picture').fileupload({
		url : "../BookAction_uploadBookImage_JsonAction?bid="+$("#bid").val(),
		dataType : 'json',
		add : function(e, data) {
			data.submit();

		},
		done : function(e, result) {
			$("#myPicture").attr("src", result.result.filepath);
			$("#bid").val(result.result.bid);
			$("#bookimage").val(result.result.filepath);
		}
	});
	initdg();
	//发起ajax请求加载分类信息
	$.post("CategoryAction_getAllCategory_JsonAction", {}, function(r){
		$.each(r.categories, function(i, category){
			$("#book_category").append("<option value=" + category.cid + ">" + category.cname + "</option>");
			$("#cid").append("<option value=" + category.cid + ">" + category.cname + "</option>");
		});
	}, 'json');
})

//初始化datagrid，加载数据
function initdg(){
	$("#bookdg").datagrid({
		title:"商品列表",
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
		url: "../BookAction_getBooks_JsonAction",
		queryParams : {
			cid : $("#book_category").val()
		},
		loadMsg:"数据加载中...",
		sortName: "bid",
		sortOrder: "asc",
		pagination : true,
		remoteSort: false,
	    rownumbers : true,
	    columns:[[ 
	    	{
	    		field:'bid',
	    		title:'编号',
	    		align:'center',
	    		width:'5%',
	    		sortable:true
	    	},
	    	{
	    		field:'bookname',
	    		title:'商品名',
	    		align:'center',
	    		width:'10%'
	    	},
	    	{
	    		field:'publisher',
	    		title:'备注',
	    		align:'center',
	    		width:'12%'
	    	},
	    	{
	    		field:'publishdate',
	    		title:'发布日期',
	    		align:'center',
	    		width:'12%'
	    	},
	    	{
	    		field:'cid',
	    		title:'类别',
	    		align:'center',
	    		width:'8%',
	    		formatter : function(index, row, value) {
	    			var result = "";
	    			switch(row.cid) {
	    				case 10:
	    					result = "动漫";
	    					break;
	    				case 11:
	    					result = "小说";
	    					break;
    					case 12:
    						result = "教辅";
    						break;
    					case 13:
    						result = "青春文学";
    						break;
    					case 14:
    						result = "人文科学";
    						break;
    					case 15:
    						result = "科技";
    						break;
    					case 16:
    						result = "经管";
    						break;
    					case 17:
    						result = "政治军事";
    						break;
    					case 18:
    						result = "生活";
    						break;
    					case 19:
    						result = "历史";
    						break;
    					default :
    						result = "其他";
	    			}
	    			return result;
	    		}
	    	},
	    	{
	    		field:'preprice',
	    		title:'原价',
	    		align:'center',
	    		width:'10%'
	    	},
	    	{
	    		field:'nowprice',
	    		title:'现价',
	    		align:'center',
	    		width:'10%'
	    	},
	    	{
	    		field:'clicktime',
	    		title:'点击量',
	    		align:'center',
	    		width:'10%'
	    	}
	    ]]
	});
}

function showdlg() {
	$("#bookdlg").dialog("open").dialog("setTitle", "商品信息");
}

function showEditdlg() {
	var row = $("#bookdg").datagrid("getSelected");
	if(row) {
		$("#bookdlg").dialog("open");
		$("#postform").form("load", row);
		$("#myPicture").attr("src", row.bookimage);
	} else {
		alert("请选择需要操作的行");
	}
}

//添加或者更新商品数据
function addOrUpdateBook() {
	var param = $("#postform").serialize();
	if($("#postform").form("validate")) {
		$.post("BookAction_addBook_JsonAction", param, function(r){
			alert(r.msg);
			if(1 == r.success){
				$("#bookdlg").dialog("close");
				$("#postform").form("clear");
				$("#bookdg").datagrid("reload");
			}
		},'json');
	} else {
		alert("请注意填写必须信息");
	}
}

//删除数据
function removeBooks() {
	var rows = $("#bookdg").datagrid("getSelections");
	if(rows.length) {
		var ids = new Array();
		for (var i = 0; i < rows.length; i++) {
			ids[i] = rows[i].bid;
		};
		var str = "确定删除这"+rows.length+"条记录吗？";
		$.messager.confirm("Confirm", str, function(r){
			if(r) {
				$.post('BookAction_removeBook_JsonAction', {param: JSON.stringify(ids)}, function(r){
					if(1 == r.success) {
						alert("删除成功！");
						$("#bookdg").datagrid("reload");
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