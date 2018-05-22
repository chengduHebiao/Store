/**
 * @Project: Store
 * @Title: LoginAction.java
 * @Package dysec.dysec.action
 */
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
 * 登录控制器
 * @ClassName LoginAction
 * @Description 模块描述
 */
public class LoginAction extends ActionSupport {
	
	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 6492335710858947037L;


	/** 
	 * 注入用户service
	 */
	@Resource
	private IUserService userService;
	
	//用户名
	private String username;
	//密码
	private String password;
	//验证码
	private String idCode;
	private Map<String, Object> map;
	
	/** 
	 * 登录操作，首先验证验证码，验证码通过再验证用户名和密码
	 *
	 * @return [参数说明]
	 * @see [类、类#方法、类#成员]
	 * 
	 */
	public String login() {
		map = new HashMap<String, Object>();
		int success = -1;
		String msg = "";
		Map session = ActionContext.getContext().getSession();
		//验证验证码
		if(null == idCode || !idCode.equalsIgnoreCase((String) session.get("idCode"))) {
			msg = "验证码错误";
		} else {
			//验证用户名和密码
			User user = userService.getUserByUsername(username);
			if(null == user) {
				msg = "用户名或者密码错误";
			} else {
				MD5 md5 = new MD5();
				//将密码加密后与数据库中存的加密密码进行对比
				if(user.getPassword().equals(md5.getMD5ofStr(password))) {
					user.setLogtime(user.getLogtime()+1);
					user.setLasttime(new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(new Date()));
					userService.userRegist(user);
					session.put("uid", user.getUid());
					session.put("username", user.getUsername());
					success = 1;
				} else {
					msg = "用户名或者密码错误";
				}
			}
		}
		map.put("success", success);
		map.put("msg", msg);
		
		return SUCCESS;
	}
	
	/** 
	 * 获取用户信息
	 *
	 * @return [参数说明]
	 * @see [类、类#方法、类#成员]
	 * 
	 */
	public String getUserInformation() {
		map = new HashMap<>();
		Map session = ActionContext.getContext().getSession();
		//查询当前登录用户的信息
		User user = userService.getUserByUid((int)session.get("uid"));
		//隐藏掉密码
		user.setPassword("*");
		
		map.put("user", user);
		
		return SUCCESS;
	}
	
	/** 
	 * 获取当前登录用户的名称
	 *
	 * @return [参数说明]
	 * @see [类、类#方法、类#成员]
	 * 
	 */
	public String getLoginedUsername() {
		map = new HashMap<String, Object>();
		Map session = ActionContext.getContext().getSession();
		
		map.put("username", session.get("username"));
		
		return SUCCESS;
	}
	
	/**
	 * @return username
	 */
	public String getUsername() {
		return username;
	}
	/**
	 * @param username 要设置的 username
	 */
	public void setUsername(String username) {
		this.username = username;
	}
	/**
	 * @return password
	 */
	public String getPassword() {
		return password;
	}
	/**
	 * @param password 要设置的 password
	 */
	public void setPassword(String password) {
		this.password = password;
	}
	/**
	 * @return idCode
	 */
	public String getIdCode() {
		return idCode;
	}
	/**
	 * @param idCode 要设置的 idCode
	 */
	public void setIdCode(String idCode) {
		this.idCode = idCode;
	}
	/**
	 * @return map
	 */
	public Map<String, Object> getMap() {
		return map;
	}
	/**
	 * @param map 要设置的 map
	 */
	public void setMap(Map<String, Object> map) {
		this.map = map;
	}
}
