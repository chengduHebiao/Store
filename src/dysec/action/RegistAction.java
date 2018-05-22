package dysec.action;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import dysec.model.User;
import dysec.service.IUserService;
import dysec.util.MD5;


/**
 * 注册功能控制器
 * 
 */
public class RegistAction extends ActionSupport {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/** 
	 * 注入用户service
	 */
	@Resource
	private IUserService userService;
	
	//用户名
	private String username;
	//邮箱
	private String email;
	//密码
	private String password1;
	//确认密码
	private String password2;
	//验证码
	private String idCode;
	
	private Map<String, Object> map;
	
	/** 
	 * 用户注册,首先检查验证码，验证码正确后在进行注册操作
	 * @return [参数说明]
	 * @see [类、类#方法、类#成员]
	 * 
	 */
	public String regist() {
		map = new HashMap<String, Object>();
		User user = new User();
		int success = -1;
		String msg = "";
		Map session = ActionContext.getContext().getSession();
		//检查验证码是否通过
		if(null == idCode || !idCode.equalsIgnoreCase((String) session.get("idCode"))) {
			msg = "验证码错误";
		} else {
			//检查密和用户名是否为空
			if(null == password1 || null == password2) {
				msg = "密码为空";
			} else {
				if(null == username) {
					msg = "用户名为空";
					//检查用户名是否已经被注册
				} else if(userService.getUserByUsername(username)!=null) {
					msg = "用户名不可用";
				} else {
					user.setEmail(email);
					user.setRegtime(new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(new Date()));
					user.setPassword(MD5.getMD5Str(password1));
					user.setRole(1);
					user.setUsername(username);
					user.setStatus(0);
					if(userService.userRegist(user)) {
						msg = "注册成功";
						success = 1;
					} else {
						msg = "出错了";
					}
				}
			}
		}
		map.put("success", success);
		map.put("msg", msg);
		
		return SUCCESS;
	}
	
	/** 
	 * 检查用户名是否已经被注册,用于注册时ajax验证
	 *
	 * @return [参数说明]
	 * @see [类、类#方法、类#成员]
	 * 
	 */
	public String checkUsername() {
		map = new HashMap<String, Object>();
		String msg = "";
		int success = -1;
		if(null == username || "".equals(username)) {
			msg = "用户名为空";
		} else {
			User user = userService.getUserByUsername(username);
			if(null == user) {
				msg = "恭喜你，该用户名可以注册";
				success = 1;
			} else {
				msg = "此用户名已经存在";
			}
		}
		map.put("msg", msg);
		map.put("success", success);
		
		return SUCCESS;
	}
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword1() {
		return password1;
	}
	public void setPassword1(String password1) {
		this.password1 = password1;
	}
	public String getPassword2() {
		return password2;
	}
	public void setPassword2(String password2) {
		this.password2 = password2;
	}
	public String getIdCode() {
		return idCode;
	}
	public void setIdCode(String idCode) {
		this.idCode = idCode;
	}

	public void setMap(Map<String, Object> map) {
		this.map = map;
	}

	public Map<String, Object> getMap() {
		return map;
	}
}
