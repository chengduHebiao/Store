$(function() {
	var keyword = Request("p");
	searchBooks(keyword);
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

function searchBooks(keyword) {
	$
			.post(
					"BookAction_searchBook_JsonAction",
					{
						param : keyword
					},
					function(r) {
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