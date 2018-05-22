package dysec.dao.imp;

import dysec.dao.IBookDao;
import dysec.model.Book;
import org.springframework.stereotype.Repository;

import java.io.UnsupportedEncodingException;
import java.util.List;

/**
 * 商品数据库操作层(dao层)
 * 
 */
@Repository("bookDao")
public class BookDao extends BaseDao<Book> implements IBookDao {
	/**
	 * 保存并返回bid
	 * @param book
	 * @return
	 */
	public Integer saveBook(Book book){
		return (Integer) this.sessionFactory.getCurrentSession().save(book);
	}

	public List<Book> getBooksByType(int page, int rows, int cid) {
		// TODO Auto-generated method stub
		String hql = "";
		Object[] param = {cid};
		if(0==cid || cid<0) {
			hql = "from Book";
			param = null;
		} else {
			hql = "from Book where cid = ?";
		}
		
		return this.find(hql, param, page, rows);
	}

	public Long countByType(int type) {
		// TODO Auto-generated method stub
		String hql = "select count(*) from Book where cid = ?";
		Object[] param = {type};
		if(0==type || type<0) {
			hql = "select count(*) from Book";
			param = null;
		}
		
		return this.count(hql, param);
	}
	
	public List<Book> getLatestBooks(int cid) {
		String hql = "";
		Object[] param = {cid};
		if(0==cid || cid<0) {
			hql = "from Book";
			param = null;
		} else {
			hql = "from Book where cid = ?";
		}
		
		return this.find(hql, param);
	}

	/* (non-Javadoc)
	 * <p>Title: getLatestBooks</p> 
	 * <p>Description: 方法描述</p> 
	 * @param page
	 * @param rows
	 * @param type
	 * @return
	 * @see dysec.dysec.dao.IBookDao#getLatestBooks(int, int, int)
	 */
	@Override
	public List<Book> getLatestBooks(int page, int rows, int type) {
		// TODO Auto-generated method stub
		String hql = "from Book order by bid desc";
		Object[] param = {type};
		if(0 != type) {
			hql = "from Book where cid = ? order by bid desc";
			return this.find(hql, param, page, rows);
		} else {
			return this.find(hql, page, rows);
		}
	}

	/* (non-Javadoc)
	 * <p>Title: getBestSelledBooks</p> 
	 * <p>Description: 方法描述</p> 
	 * @param page
	 * @param rows
	 * @param type
	 * @return
	 * @see dysec.dysec.dao.IBookDao#getBestSelledBooks(int, int, int)
	 */
	@Override
	public List<Book> getBestSelledBooks(int page, int rows, int type) {
		// TODO Auto-generated method stub
		String hql = "from Book order by selled desc";
		Object[] param = {type};
		if(0 != type) {
			hql = "from Book where cid = ? order by selled desc";
			return this.find(hql, param, page, rows);
		} else {
			return this.find(hql, page, rows);
		}
	}

	/* (non-Javadoc)
	 * <p>Title: getBookByPrice</p> 
	 * <p>Description: 方法描述</p> 
	 * @param page
	 * @param rows
	 * @param type
	 * @return
	 * @see dysec.dysec.dao.IBookDao#getBookByPrice(int, int, int)
	 */
	@Override
	public List<Book> getBookByPrice(int page, int rows, int type) {
		// TODO Auto-generated method stub
		String hql = "from Book order by nowprice desc";
		Object[] param = {type};
		if(0 != type) {
			hql = "from Book where cid = ? order by nowprice desc";
			return this.find(hql, param, page, rows);
		} else {
			return this.find(hql, page, rows);
		}
	}

	/* (non-Javadoc)
	 * <p>Title: getBooksByClickTime</p> 
	 * <p>Description: 方法描述</p> 
	 * @param page
	 * @param rows
	 * @param type
	 * @return
	 * @see dysec.dysec.dao.IBookDao#getBooksByClickTime(int, int, int)
	 */
	@Override
	public List<Book> getBooksByClickTime(int page, int rows, int type) {
		// TODO Auto-generated method stub
		String hql = "from Book order by clicktime desc";
		Object[] param = {type};
		if(0 != type) {
			hql = "from Book where cid = ? order by clicktime desc";
			return this.find(hql, param, page, rows);
		} else {
			return this.find(hql, page, rows);
		}
	}

	/* 
	 * 根据关键字搜索商品列表
	 * @param keyword
	 * @return
	 * @see dysec.dysec.dao.IBookDao#getBooksByKeywords(java.lang.String)
	 */
	@Override
	public List<Book> getBooksByKeywords(String keyword) {
		// TODO Auto-generated method stub
		try {
			keyword = java.net.URLDecoder.decode(keyword,   "utf-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		String hql = "from Book where bookname like '%"+keyword+"%'";
		
		return this.find(hql);
	}
}
