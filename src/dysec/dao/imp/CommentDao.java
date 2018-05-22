/**
 * @Project: Store
 * @Title: CommentDao.java
 * @Package dysec.dysec.dao.imp
 * @author ZhangPeng
 * @Copyright: 2015 www.dynastech.com Inc. All rights reserved.
 * @version V1.0
 */
package dysec.dao.imp;

import java.util.List;

import dysec.dao.ICommentDao;
import dysec.model.Comment;
import org.springframework.stereotype.Repository;


/**
 * 评论数据库操作层(dao)
 * @ClassName CommentDao
 * @Description 模块描述
 */
@Repository("commenDao")
public class CommentDao extends BaseDao<Comment> implements ICommentDao {

	/* (non-Javadoc)
	 * <p>Title: getCommentsByBid</p> 
	 * <p>Description: 方法描述</p> 
	 * @param bid
	 * @return
	 * @see dysec.dysec.dao.ICommentDao#getCommentsByBid(int)
	 */
	@Override
	public List<Comment> getCommentsByBid(int bid) {
		// TODO Auto-generated method stub
		String hql = "from Comment where bid = ?";
		Object[] param = {bid};
		
		return this.find(hql, param);
	}

	/* (non-Javadoc)
	 * <p>Title: getAllComments</p> 
	 * <p>Description: 方法描述</p> 
	 * @param page
	 * @param rows
	 * @param bid
	 * @return
	 * @see dysec.dysec.dao.ICommentDao#getAllComments(int, int, int)
	 */
	@Override
	public List<Comment> getAllComments(int page, int rows, int bid) {
		// TODO Auto-generated method stub
		String hql = "from Comment";
		Object[] param = {bid};
		if(0 >= bid) {
			return this.find(hql, page, rows);
		} else {
			hql = "from Comment where bid = ?";
			
			return this.find(hql, param, page, rows);
		}
	}

	/* (non-Javadoc)
	 * <p>Title: countAll</p> 
	 * <p>Description: 方法描述</p> 
	 * @param bids
	 * @return
	 * @see dysec.dysec.dao.ICommentDao#countAll(int)
	 */
	@Override
	public Long countAll(int bid) {
		// TODO Auto-generated method stub
		String hql = "select count(*) from Comment";
		Object[] param = {bid};
		if(0 >= bid) {
			return this.count(hql);
		} else {
			hql = "select count(*) from Comment where bid = ?";
			
			return this.count(hql, param);
		}
	}


}
