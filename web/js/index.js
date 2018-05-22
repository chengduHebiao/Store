
$(function(){
	initnews();
	initCategories();
	initBooks();
	$.post("LoginAction_getLoginedUsername_JsonAction", {}, function(r){
		if(null != r.username && "" !=r.username) {		
			$("#header").html("欢迎<a>" + r.username + "</a>光临商城&nbsp;&nbsp;<a href='index/cart.html'>我的购物车</a>" );
		}
	}, 'json');

})

function initnews(){
    $.post("CourseAction_getCourseList_JsonAction",{},function (r) {

        console.log(1)
    },'json');
	$.post("PostAction_listPosts_JsonAction", {type:1, rows: 8}, function(r){
		$.each(r.rows, function(i, result){
			$("#post1").append("<li><a href=''><img src='images/tiny2.png' /></a><a href='index/newsContent.html?pid="+result.pid+"'><span>"+result.title+"</span></a></li>");
		})
	}, 'json');

	$.post("PostAction_listPosts_JsonAction", {type:2, rows: 8}, function(r){
		$.each(r.rows, function(i, result){
			$("#post2").append("<li><a href=''><img src='images/tiny2.png' /></a><a href='index/newsContent.html?pid="+result.pid+"'><span>"+result.title+"</span></a></li>");
		})
	}, 'json');
}

function search() {
	var p = $("#keyword").val();
	window.open("index/searchl.html?p="+p);
}

function initCategories() {
	$.post("CategoryAction_getCategories_JsonAction", {}, function(r){
		$.each(r.rows, function(i, result){
			$("#nav").append("<li><a href='index/listBooksByType.html?cid="+result.cid+"'>" + result.cname + "</a></li>");
			if(i != r.total-1) {
				$("#nav").append("<li class='divider-vertical'></li>");
			}
		});
	});
}

function initBooks() {
	$.post("BookAction_getIndexBooks_JsonAction", {}, function(r){
		$.each(r.bestSelledBooks, function(i, result){
			$("#sellbooks").append("<li><a href='index/content.html?bid="+result.bid+"'><img src='"+result.bookimage.replace("../", "")+"' width='138' height='95'/></a><span class='pre-price'>原价："+result.preprice+"</span><span>现价：<font style='color: red; weight:bold'>"+result.nowprice+"</font></span><span>销量：<font style='color: red; weight:bold'>"+result.selled+"</font>余量：<font style='color: red; weight:bold'>"+(result.total-result.selled)+"</font></span></li>");
		});
		$.each(r.latestBooks, function(i, result){
			$("#newbooks").append("<li><a href='index/content.html?bid="+result.bid+"'><img src='"+result.bookimage.replace("../", "")+"' width='138' height='95'/></a><span class='pre-price'>原价："+result.preprice+"</span><span>现价：<font style='color: red; weight:bold'>"+result.nowprice+"</font></span><span></li>");
		});
	});
}