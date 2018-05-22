/**
 * BBD Service Inc
 * All Rights Reserved @2018
 */

package dysec.webSocket;

import dysec.dao.imp.BaseDao;
import org.springframework.stereotype.Repository;

/**
 * @author Tony
 * @version UserDaoImpl.java, v0.1 18-4-28 下午3:24 Tony
 */
@Repository
public class UserDaoImpl extends BaseDao<Wuser> implements UserDao {

    @Override
    public Wuser getUserByUsername(String username) {
        String hql = "from Wuser where name = ?";
        Object[] param = {username};
        Wuser user =null;
        try{
            user = this.get(hql, param);
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return user;
    }
}
