$(function() {
	var bid = Request("bid");
	loadBookInfomation(bid);
	$.post("LoginAction_getLoginedUsername_JsonAction", {}, function(r){
		if(null != r.username && "" !=r.username) {		
			$("#header").html("欢迎<a>" + r.username + "</a>光临商城&nbsp;&nbsp;<a href='cart.html'>我的购物车</a>" );
		}
	}, 'json');
	$("#commitComment").attr("onclick", "addComment("+bid+")");
	$("#add2cart").attr("onclick", "add2cart("+bid+")");
})

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

function search() {
	var p = $("#keyword").val();
	window.open("searchl.html?p="+p);
}

function add2cart(bid){
	$.post("BookAction_addToCart_JsonAction", {bid:bid}, function(r){
		alert(r.msg);
		if(-1 == r.success) {
			window.location.href = "login.html";
		}
	}, "json");
}

function addComment(bid) {
	var detail = $("#detail").val();
	$.post("CommentAction_addComment_JsonAction", {bid:bid, detail:detail}, function(r){
		if(-1 == r.success) {
			alert(r.msg);
			window.location.href="login.html";
		} else {
			alert(r.msg);
			location.reload();
		}
	}, "json");
}

function loadBookInfomation(bid) {
	$
			.ajax({
				url : "BookAction_loadBookInformation_JsonAction",
				data : {
					bid : bid
				},
				dataType : "json",
				type : "post",
				success : function(r) {
					var i = 4;
					while (i--) {
						$("#slide_pics").append(
								"<li><img src='" + r.book.bookimage
										+ "' width='330' height='330' /></li>");
						$("#show_paging").append(
								"<li><img src='" + r.book.bookimage
										+ "' width='61' height='61'>");
					}
					$("#category").html(
							"[" + r.category + "]<a href='#' id='bookName'>");
					$("#bookName").text(r.book.bookname);
					$("#now_price").text("现价：￥" + r.book.nowprice);
					$("#pre_price").text("原价：￥" + r.book.preprice);
					$("#pulbisher").text("备注：" + r.book.publisher);
					$("#publishTime").text("发布时间：" + r.book.publishdate);
					$("#selled").text("已售：" + r.book.selled);
					$("#total").text("余量：" + (r.book.total - r.book.selled));
					$("#book_detail").html(r.book.detail);
					$("#comments-list").html("");
					$
							.each(
									r.comments,
									function(i, result) {
										$("#comments-list")
												.append(
														"<li>"
																+ result.comment
																+ "<br><span style='float:right; margin-left:8%'>"
																+ r.usernames[i]
																+ "发布于"
																+ result.commenttime
																+ "</span></li><br>");
									});
					$
							.each(
									r.latestBooks,
									function(i, result) {
										$("#latestBooks")
												.append(
														"<li><a href='content.html?bid="
																+ result.bid
																+ "'><img src='"
																+ result.bookimage
																+ "' width='206' height='110'></img></a><br><br><a style='margin-left:50px' class='case-right-name' href='content.html?bid="
																+ result.bid
																+ ">"
																+ result.bookname
																+ "</a><br><b style='margin-left: 50px' class='case-right-detail'>价格：￥"
																+ result.nowprice
																+ "</b></li>");
									});
					$
							.each(
									r.bestSelledBooks,
									function(i, result) {
										$("#selledbooks")
												.append(
														"<li><a href=''><img src='"
																+ result.bookimage
																+ "' width='150' height='100'/></a><b style='margin-top: 10px; display:block'><a href=''>"
																+ result.bookname
																+ "</a></b><span>价格：￥"
																+ result.nowprice
																+ "</span></li>");
									});
				},
				error : function(r) {
					alert("网络错误")
				}
			});
}