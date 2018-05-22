/**
 * @Project: Store
 * @Title: ICommentDao.java
 * @Package dysec.dysec.dao
 * @author ZhangPeng
 * @date 2015-4-28 上午9:52:33
 * @Copyright: 2015 www.dynastech.com Inc. All rights reserved.
 * @version V1.0
 */
package dysec.dao;

import dysec.model.Comment;

import java.util.List;


/**
 * 评论dao接口
 * @ClassName ICommentDao
 * @Description 模块描述
 */
public interface ICommentDao extends IBaseDao<Comment> {
	/** 
	 * @Title: getCommentsByBid
	 * @Description: 方法描述
	 * @param bid
	 * @return
	 */
	public List<Comment> getCommentsByBid(int bid);
	
	/** 
	 * @Title: getAllComments
	 * @Description: 方法描述
	 * @param page
	 * @param rows
	 * @param bid
	 * @return
	 */
	public List<Comment> getAllComments(int page, int rows, int bid);
	
	/** 
	 * @Title: countAll
	 * @Description: 方法描述
	 * @param bid
	 * @return
	 */
	public Long countAll(int bid);
}
