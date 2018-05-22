package dysec.dao.imp;


import java.util.List;

import dysec.dao.IPostDao;
import dysec.model.Post;
import org.springframework.stereotype.Repository;


/**
 * 文章数据库操作层(postDao)
 */
@Repository("postDao")
public class PostDao extends BaseDao<Post> implements IPostDao {

	public List<Post> getPostsByType(int type, int page, int rows) {
		// TODO Auto-generated method stub
		String hql = "from Post where type = ?";
		Object[] param = {type};
		if(0 == type) {
			hql = "from Post";
			param = null;
		}
		
		return this.find(hql, param, page, rows);
	}

	public Long countByType(int type) {
		// TODO Auto-generated method stub
		String hql = "select count(*) from Post where type=?";
		Object[] param = {type};
		if(0 == type){
			hql = "select count(*) from Post";
			param = null;
		}
		
		return this.count(hql, param);
	}

}
