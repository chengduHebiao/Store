$(document).ready(function(){
	//alert(1);
});

function regist() {
	var idcode = $("#idCode").val();
	if(""==idcode || null==idcode) {
		alert("请输入验证码")
	} else {
		$.ajax({
			url : "RegistAction_regist_JsonAction",
			type : "post",
			data : $("#registform").serialize(),
			dataType : "json",
			success : function(r) {
				alert(r.msg);
			},
			error : function(r) {
				alert('出错了');
			}
		});
	}
}

function login() {
	var idcode = $("#idCode").val();
	if(!idCode) {
		alert("请输入验证码");
	} else {
		$.ajax({
			url : "LoginAction_login_JsonAction",
			type : "post",
			data : $("#loginForm").serialize(),
			dataType : "json",
			success : function(r) {
				if(1 == r.success) {
					window.location.href="/Store";
				} else {
					alert(r.msg);
				}
			},
			error : function(r) {
				alert("网络错误");
			}
		});
	}
}

function chkusername() {
	var username = $("#username").val();
	if("" == username) {
		$("#usernamewarning").css("color", "red");
		$("#usernamewarning").html("用户名不能为空");
	} else {
		$.ajax({
			url : "RegistAction_checkUsername_JsonAction",
			method : "post",
			data : {
				username : $("#username").val()
			},
			dataType : "json",
			success : function(data) {
				if(1 == data.success) {
					$("#usernamewarning").css("color", "green");
				} else {
					$("#usernamewarning").css("color", "red");
				}
				$("#usernamewarning").html(data.msg);
			},
			error : function() {
				alert("出错了");
			}
		});
	}
}

function chkemail() {
	var reg=/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
	var email = $("#email").val();
	if(reg.test(email)) {
		$("#emailwarning").css("color", "green");
		$("#emailwarning").html("填写正确");
	} else {
		$("#emailwarning").css("color", "red");
		$("#emailwarning").html("请输入正确的邮箱格式");
	}
}

function chkpwd() {
	var pwd1 = $("#password1").val();
	var pwd2 = $("#password2").val();
	if(""==pwd1) {
		$("#pwd").css("color", "red");
		$("#pwd").html("密码为空");
	} else {
		$("#pwd").css("color", "green");
		$("#pwd").html("填写正确");
		if(pwd1 != pwd2) {
			$("#passwordwarning").css("color", "red");
			$("#passwordwarning").html("两次密码不一致");
		} else {
			$("#passwordwarning").css("color", "green");
			$("#passwordwarning").html("填写正确");
		}
	}
	
}
