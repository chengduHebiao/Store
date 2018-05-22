package dysec.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 用户实体
 */
@Entity
@Table(name="user")
public class User {
	/**
	 * id
	 */
	@Id
	@Column(name="uid")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int uid;
	
	/**
	 * 用户名
	 */
	@Column(name="username")
	private String username;
	
	/**
	 * 密码
	 */
	@Column(name="password")
	private String password;
	
	/**
	 * 生日
	 */
	@Column(name="birthday")
	private String birthday;
	
	/**
	 * 注册时间
	 */
	@Column(name="regtime")
	private String regtime;
	
	/**
	 * 性别
	 */
	@Column(name="sex")
	private String sex;
	
	/**
	 * 登陆次数
	 */
	@Column(name="logtime")
	private int logtime;
	
	/**
	 * 上次登陆时间
	 */
	@Column(name="lasttime")
	private String lasttime;
	
	/**
	 * 角色
	 */
	@Column(name="role")
	private int role;
	
	/**
	 * 头像
	 */
	@Column(name="headimage")
	private String headimage;
	
	/**
	 * 邮箱地址
	 */
	@Column(name="email")
	private String email;
	
	/**
	 * 状态
	 */
	@Column(name="status")
	private int status;

	public int getUid() {
		return uid;
	}

	public void setUid(int uid) {
		this.uid = uid;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getBirthday() {
		return birthday;
	}

	public void setBirthday(String birthday) {
		this.birthday = birthday;
	}

	public String getRegtime() {
		return regtime;
	}

	public void setRegtime(String regtime) {
		this.regtime = regtime;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public int getLogtime() {
		return logtime;
	}

	public void setLogtime(int logtime) {
		this.logtime = logtime;
	}

	public String getLasttime() {
		return lasttime;
	}

	public void setLasttime(String lasttime) {
		this.lasttime = lasttime;
	}

	public int getRole() {
		return role;
	}

	public void setRole(int role) {
		this.role = role;
	}

	public String getHeadimage() {
		return headimage;
	}

	public void setHeadimage(String headimage) {
		this.headimage = headimage;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}
	
}
