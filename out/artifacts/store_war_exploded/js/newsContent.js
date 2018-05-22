$(function(){
	var pid = Request("pid");
	loadNews(pid);
	getBestSelledBooks();
	$.post("LoginAction_getLoginedUsername_JsonAction", {}, function(r){
		if(null != r.username && "" !=r.username) {		
			$("#header").html("欢迎<a>" + r.username + "</a>光临商城&nbsp;&nbsp;<a href='cart.html'>我的购物车</a>" );
		}
	}, 'json');
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

function loadNews(pid) {
	$.post("PostAction_loadPost_JsonAction", {pid:pid}, function(r){
		if(r.msg) {
			alert(r.msg);
		} else {
			$("#title").text(r.post.title);
			$("#time").html("发布时间："+r.post.publishtime+"&nbsp;&nbsp;&nbsp;&nbsp;点击量："+r.post.clicktime);
			$("#news_content").html(r.post.content);
		}
	}, "json");
}