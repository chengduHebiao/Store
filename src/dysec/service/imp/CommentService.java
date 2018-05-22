/**
 * @Project: Store
 * @Title: CommentService.java
 * @Package dysec.dysec.service.imp
 * @author ZhangPeng
 * @date 2015-4-28 上午10:34:06
 * @Copyright: 2015 www.dynastech.com Inc. All rights reserved.
 * @version V1.0
 */
package dysec.service.imp;

import java.util.List;

import javax.annotation.Resource;

import dysec.dao.ICommentDao;
import dysec.model.Comment;
import dysec.service.ICommentService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * 评论业务处理层实现
 */
@Service
@Transactional
public class CommentService implements ICommentService {
	
	@Resource
	private ICommentDao commentDao;

	/* (non-Javadoc)
	 * <p>Title: addComment</p> 
	 * <p>Description: 方法描述</p> 
	 * @param comment
	 * @return
	 * @see dysec.dysec.service.ICommentService#addComment(dysec.dysec.model.Comment)
	 */
	@Override
	public boolean addOrUpdateComment(Comment comment) {
		// TODO Auto-generated method stub
		return commentDao.saveOrUpdate(comment);
	}

	/* (non-Javadoc)
	 * <p>Title: getCommentsByBid</p> 
	 * <p>Description: 方法描述</p> 
	 * @param bid
	 * @return
	 * @see dysec.dysec.service.ICommentService#getCommentsByBid(int)
	 */
	@Override
	public List<Comment> getCommentsByBid(int bid) {
		// TODO Auto-generated method stub
		return commentDao.getCommentsByBid(bid);
	}

	/* (non-Javadoc)
	 * <p>Title: getAllComments</p> 
	 * <p>Description: 方法描述</p> 
	 * @param page
	 * @param rows
	 * @param bid
	 * @return
	 * @see dysec.dysec.service.ICommentService#getAllComments(int, int, int)
	 */
	@Override
	public List<Comment> getAllComments(int page, int rows, int bid) {
		// TODO Auto-generated method stub
		if(0 >= page) {
			page = 1;
		}
		if(0 >= rows) {
			rows = 10;
		}
		
		return commentDao.getAllComments(page, rows, bid);
	}

	/* (non-Javadoc)
	 * <p>Title: removeComment</p> 
	 * <p>Description: 方法描述</p> 
	 * @param comment
	 * @return
	 * @see dysec.dysec.service.ICommentService#removeComment(dysec.dysec.model.Comment)
	 */
	@Override
	public boolean removeComment(Comment comment) {
		// TODO Auto-generated method stub
		return commentDao.delete(comment);
	}

	/* (non-Javadoc)
	 * <p>Title: countAll</p> 
	 * <p>Description: 方法描述</p> 
	 * @param bid
	 * @return
	 * @see dysec.dysec.service.ICommentService#countAll(int)
	 */
	@Override
	public Long countAll(int bid) {
		// TODO Auto-generated method stub
		return commentDao.countAll(bid);
	}

	/* (non-Javadoc)
	 * <p>Title: getCommentByCoid</p> 
	 * <p>Description: 方法描述</p> 
	 * @param coid
	 * @return
	 * @see dysec.dysec.service.ICommentService#getCommentByCoid(int)
	 */
	@Override
	public Comment getCommentByCoid(int coid) {
		// TODO Auto-generated method stub
		return commentDao.get(Comment.class, coid);
	}
}
