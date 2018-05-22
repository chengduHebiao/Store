package dysec.service.imp;

import javax.annotation.Resource;

import dysec.dao.IUserDao;
import dysec.model.User;
import dysec.service.IUserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * 用户业务逻辑处理的具体实现
 */
@Service
@Transactional
public class UserServiceImp implements IUserService {
	@Resource
	private IUserDao userDao;

	public User getUserByUsername(String username) {
		// TODO Auto-generated method stub
		return userDao.getUserByUsername(username);
	}

	public boolean userRegist(User user) {
		// TODO Auto-generated method stub
		return userDao.saveOrUpdate(user);
	}

	/* (non-Javadoc)
	 * <p>Title: getUserByUid</p> 
	 * <p>Description: 方法描述</p> 
	 * @param uid
	 * @return
	 * @see dysec.dysec.service.IUserService#getUserByUid(int)
	 */
	@Override
	public User getUserByUid(int uid) {
		// TODO Auto-generated method stub
		return userDao.getUserByUid(uid);
	}
	
}
