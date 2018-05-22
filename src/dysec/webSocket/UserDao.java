/**
 * BBD Service Inc
 * All Rights Reserved @2018
 */

package dysec.webSocket;

import dysec.dao.IBaseDao;

/**
 * @author Tony
 * @version UserDao.java, v0.1 18-4-28 下午3:23 Tony
 */
public interface UserDao  extends IBaseDao<Wuser> {
    /**
     * 根据用户名获取用户对象
     * @param username 用户名
     * @return 返回对象
     */
    Wuser getUserByUsername(String username);
}
