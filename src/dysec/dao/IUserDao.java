package dysec.dao;


import dysec.model.User;

/**
 * 用户dao接口
 */
public interface IUserDao extends IBaseDao<User> {
	/**
	 * 根据用户名查找用户
	 * @param username
	 * @return
	 */
	public User getUserByUsername(String username);
	
	/** 
	 * @Title: getUserByUid
	 * @Description: 方法描述
	 * @param uid
	 * @return
	 */
	public User getUserByUid(int uid);
}
