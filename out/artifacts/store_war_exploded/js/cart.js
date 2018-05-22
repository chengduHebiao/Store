$(function(){
	showCart();
	getBestSelledBooks();
	$.post("LoginAction_getLoginedUsername_JsonAction", {}, function(r){
		if(null != r.username && "" !=r.username) {		
			$("#header").html("欢迎<a>" + r.username + "</a>光临商城&nbsp;&nbsp;<a href='cart.html'>我的购物车</a>" );
		}
	}, 'json');
	$.post("LoginAction_getUserInformation_JsonAction",{},function(r){
		$("#userName").text(r.user.username);
		$("#time").text("上次登录时间："+r.user.lasttime);
	}, "json");
})

function getBestSelledBooks() {
	$.ajax({
		url : "BookAction_getBestSelledBooks_JsonAction",
		data : {},
		dataType : "json",
		type　: "post",
		success : function(r){
			$.each(r.books, function(index, result){
				$("#bestSelled").append("<li><a href='content.html?bid="+result.bid+"'><img src='"+result.bookimage+"' width='180' height='90'></img></a><br><br><a href='content.html?bid="+result.bid+"' class='case-right-name'>"+result.bookname+"</a><br><b class='case-right-detail'><font class='pre-price'>原价："+result.preprice+"</font><br>现价：<font style='color: red; weight:bold'>"+result.nowprice+"</font></b></li>");
			});
		},
		errot : function(r) {
			alert("网络错误");
		}
	});
}

function removeFromCart(bid) {
	$.post("BookAction_removeFromCart_JsonAction", {bid:bid}, function(r){
		alert(r.msg);
		if(1 == r.success) {
			showCart();
		}
	}, "json");
}

function commitCart() {
	$.post("BookAction_commitCart_JsonAction", {}, function(r){
		alert(r.msg);
	}, "json");
}

function showCart() {
	$
			.post(
					"BookAction_showCart_JsonAction",
					{},
					function(r) {
						if (r.msg) {
							alert(r.msg);
							window.location = "login.html";
						} else {
							$("#carts").text("");
							$
									.each(
											r.books,
											function(index, result) {
												$("#carts")
														.append(
																"<li><div class='news-list-show'><img src='"
																		+ result.bookimage
																		+ "' width='280' height='126'></img><br><span style='text-align: center;' class='news-list-word'>价格：￥"
																		+ result.nowprice
																		+ "<br>&nbsp;数量：1</span><br><a onclick='removeFromCart("+result.bid+")' href='javascript:void(0)'>删除</a></div></li>");
											});
						}
					}, "json");
}