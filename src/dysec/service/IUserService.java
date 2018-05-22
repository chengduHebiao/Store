package dysec.service;


import dysec.model.User;

/**
 * 用户业务处理接口
 */
public interface IUserService {
	/***
	 * 检测用户名是否已经注册
	 * @param username
	 * @return
	 */
	public User getUserByUsername(String username);
	
	/***
	 * 注册 
	 */
	public boolean userRegist(User user);
	
	/** 
	 * @Title: getUserByUid
	 * @Description: 方法描述
	 * @param uid
	 * @return
	 */
	public User getUserByUid(int uid);
}
