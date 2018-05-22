$(function() {
	var cid = Request("cid");
	getBooks(cid, 1, 10, -1);
	$.post("LoginAction_getLoginedUsername_JsonAction", {}, function(r){
		if(null != r.username && "" !=r.username) {		
			$("#header").html("欢迎<a>" + r.username + "</a>光临商城&nbsp;&nbsp;<a href='cart.html'>我的购物车</a>" );
		}
	}, 'json');
	$("#moren").attr("onclick", "getBooks(" + cid + ",1,20,-1)");
	$("#renqi").attr("onclick", "getBooks(" + cid + ",1,20,1)");
	$("#xiaoliang").attr("onclick", "getBooks(" + cid + ",1,20,2)");
	$("#jiage").attr("onclick", "getBooks(" + cid + ",1,20,3)");
    initTable();
})

function search() {
	var p = $("#keyword").val();
	window.open("searchl.html?p="+p);
}

function Request(strName) {
	var strHref = window.document.location.href;
	var intPos = strHref.indexOf("?");
	var strRight = strHref.substr(intPos + 1);

	var arrTmp = strRight.split("&");
	for ( var i = 0; i < arrTmp.length; i++) {
		var arrTemp = arrTmp[i].split("=");

		if (arrTemp[0].toUpperCase() == strName.toUpperCase())
			return arrTemp[1];
	}
	return "";
}

function getBooks(cid, page, rows, sortType) {
	$
			.post(
					"BookAction_listBooksByType_JsonAction",
					{
						page : page,
						rows : rows,
						cid : cid,
						sortType : sortType
					},
					function(r) {
						$("#category").text(r.category);
						$("#sellbooks").html("");
						$
								.each(
										r.books,
										function(index, result) {
											$("#sellbooks")
													.append(
															"<li><a href='content.html?bid="
																	+ result.bid
																	+ "'><img src='"
																	+ result.bookimage
																	+ "' width='138' height='95'></img></a><span class='pre-price'>原价："
																	+ result.preprice
																	+ "</span><span>现价：<font style='color:red;weight:bold'>"
																	+ result.nowprice
																	+ "</font></span><span>销量：<fontstyle='color:red;weight:bold'>"
																	+ result.selled
																	+ "</font>余量：<font style='color:red;weight:bold'>"
																	+ (result.total - result.selled)
																	+ "</font></span></li>");
										});
					}, 'json');
}

function initTable(){
    $("#Crousetable").datagrid({
        title:"课程列表",
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
        url: "CourseAction_getCourseList_JsonAction",
        queryParams : {
           // cid : $("#book_category").val()
        },
        loadMsg:"数据加载中...",
       // sortName: "id",
        sortOrder: "asc",
        pagination : true,
        remoteSort: false,
        rownumbers : true,
        columns:[[
            {
                field:'id',
                title:'编号',
                align:'center',
                width:'25%',
                sortable:true
            },
            {
                field:'name',
                title:'课程名',
                align:'center',
                width:'25%'
            },
            {
                field:'teacherId',
                title:'所属教师',
                align:'center',
                width:'25%'
            },
            {
                field:'priod',
                title:'课程周期',
                align:'center',
                width:'25%'
            }
        ]]
    });
}