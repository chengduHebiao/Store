$(function(){
	initdg();
})

function initdg() {
	$("#commentdg").datagrid({
		title : "评价列表",
		width : "auto",
		iconCls : "icon-ok",
		pageSize : 20,
		pageList : [ 15, 20, 25, 30 ],
		nowrap : true,
		method : "post",
		collapsible : true,
		frozenColumns : [ [ {
			field : 'ck',
			checkbox : true
		} ] ],
		url : "CommentAction_getAllComment_JsonAction",
		loadMsg : "数据加载中...",
		sortName : "coid",
		sortOrder : "asc",
		pagination : true,
		remoteSort : false,
		rownumbers : true,
		columns : [ [ 
              {
            	field:'coid',
  	    		title:'编号',
  	    		align:'center',
  	    		width:'5%',
  	    		sortable:true
              },
              {
            	field:'book',
  	    		title:'图商品名称',
  	    		align:'center',
  	    		width:'12%',
  	    		sortable:true
              },
              {
              	field:'comment',
  	    		title:'评论内容',
  	    		align:'center',
  	    		width:'35%' 
              },
              {
            	  field:'commenttime',
            	  title:'评论时间',
            	  align:'center',
            	  width:'15%',
            	  sortable: true
              },
              {
            	  field:'username',
            	  title:'评论用户',
            	  align:'center',
            	  width:'12%',
            	  sortable: true
              }
         ] ]
	});
}

function removeComment() {
	var rows = $("#commentdg").datagrid("getSelections");
	if(rows.length) {
		$.messager.confirm("Confirm", "确定删除？", function(r){
			if(r) {
				var ids = new Array();
				for (var i = 0; i < rows.length; i++) {
					ids[i] = rows[i].coid;
				};
				$.post("CommentAction_removeComments_JsonAction", {param:JSON.stringify(ids)}, function(r){
					alert(r.msg);
					if(1 == r.success) {
						$("#commentdg").datagrid("reload");
					}
				}, "json");
			}
		});
	}
}

