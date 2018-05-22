package dysec.dao.imp;


import dysec.dao.IUserDao;
import dysec.model.User;
import org.springframework.stereotype.Repository;


/**
 * 用户数据库操作层(Dao)
 */
@Repository("userDao")
public class UserDao extends BaseDao<User> implements IUserDao {

	public User getUserByUsername(String username) {
		// TODO Auto-generated method stub
		String hql = "from User where username = ?";
		Object[] param = {username};
		
		return this.get(hql, param);
	}

	/* (non-Javadoc)
	 * <p>Title: getUserByUid</p> 
	 * <p>Description: 方法描述</p> 
	 * @param uid
	 * @return
	 * @see dysec.dysec.dao.IUserDao#getUserByUid(int)
	 */
	@Override
	public User getUserByUid(int uid) {
		// TODO Auto-generated method stub
		String hql = "from User where uid = ?";
		Object[] param = {uid};
        User user =null;
		try{
             user = this.get(hql, param);
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return user;
	}
	
}
