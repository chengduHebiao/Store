/**
 * @Project: Store
 * @Title: ICommenService.java
 * @Package dysec.dysec.service
 */
package dysec.service;

import dysec.model.Comment;

import java.util.List;


/**
 * 评论业务处理接口
 * @ClassName ICommenService
 * @Description 模块描述
 */
public interface ICommentService {
	
	/** 
	 * @Title: getCommentByCoid
	 * @Description: 方法描述
	 * @param coid
	 * @return
	 */
	public Comment getCommentByCoid(int coid);
	/** 
	 * @Title: addOrUpdateComment
	 * @Description: 方法描述
	 * @author ZhangPeng
	 * @param comment
	 * @return
	 */
	public boolean addOrUpdateComment(Comment comment);
	
	/** 
	 * @Title: getCommentsByBid
	 * @Description: 方法描述
	 * @author ZhangPeng
	 * @param bid
	 * @return
	 */
	public List<Comment> getCommentsByBid(int bid);
	
	/** 
	 * @Title: getAllComments
	 * @Description: 方法描述
	 * @author ZhangPeng
	 * @param page
	 * @param rows
	 * @param bid
	 * @return
	 */
	public List<Comment> getAllComments(int page, int rows, int bid);
	
	/** 
	 * @Title: removeComment
	 * @Description: 方法描述
	 * @author ZhangPeng
	 * @param comment
	 * @return
	 */
	public boolean removeComment(Comment comment);
	
	/** 
	 * @Title: countAll
	 * @Description: 方法描述
	 * @author ZhangPeng
	 * @param bid
	 * @return
	 */
	public Long countAll(int bid);
}
