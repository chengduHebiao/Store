package dysec.service.imp;

import java.util.List;

import javax.annotation.Resource;

import dysec.dao.IBookDao;
import dysec.model.Book;
import dysec.service.IBookService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * 商品操作业务处理实现
 */
@Service
@Transactional
public class BookService implements IBookService {
	@Resource
	private IBookDao bookDao;

	/*
	 * 保存或者更新一条商品信息
	 * @param book
	 * @return 
	 * @see dysec.dysec.service.IBookService#updateBook(dysec.dysec.model.Book)
	 */ 
	public boolean updateBook(Book book) {
		// TODO Auto-generated method stub
		return bookDao.saveOrUpdate(book);
	}

	/* 
	 * 根据商品id查找一条商品信息
	 * @param bid
	 * @return 
	 * @see dysec.dysec.service.IBookService#getBookById(int)
	 */ 
	public Book getBookById(int bid) {
		// TODO Auto-generated method stub
		return bookDao.get(Book.class, bid);
	}

	/* 
	 * 保存一条商品信息
	 * @param book
	 * @return 
	 * @see dysec.dysec.service.IBookService#saveBook(dysec.dysec.model.Book)
	 */ 
	public Integer saveBook(Book book) {
		// TODO Auto-generated method stub
		return bookDao.saveBook(book);
	}

	/* 
	 * 根据类别查找商品
	 * @param cid
	 * @param page
	 * @param rows
	 * @return 
	 * @see dysec.dysec.service.IBookService#getBooksByCid(int, java.lang.String, java.lang.String)
	 */ 
	public List<Book> getBooksByCid(int cid, String page, String rows) {
		// TODO Auto-generated method stub
		if(null == page) {
			page = "1";
		}
		if(null == rows) {
			rows = "10";
		}
		int p = Integer.parseInt("".equals(page)||"0".equals(page) ? "1" : page);
		int r = Integer.parseInt("".equals(rows)||"0".equals(rows) ? "1" : rows);
		
		return bookDao.getBooksByType(p, r, cid);
	}

	/* 
	 * 统计一个类别下的所有商品数量
	 * @param type
	 * @return 
	 * @see dysec.dysec.service.IBookService#countByType(int)
	 */ 
	public Long countByType(int type) {
		// TODO Auto-generated method stub
		return bookDao.countByType(type);
	}

	/* 删除一条商品信息
	 * @param book
	 * @return
	 * @see dysec.dysec.service.IBookService#removeBook(dysec.dysec.model.Book)
	 */
	@Override
	public boolean removeBook(Book book) {
		// TODO Auto-generated method stub
		return bookDao.delete(book);
	}

	/* 
	 * 查询最新上架商品信息
	 * @param page
	 * @param rows
	 * @param type
	 * @return
	 * @see dysec.dysec.service.IBookService#getLatestBooks(java.lang.String, java.lang.String, int)
	 */
	@Override
	public List<Book> getLatestBooks(String page, String rows, int type) {
		// TODO Auto-generated method stub
		if(null == page) {
			page = "1";
		}
		if(null == rows) {
			rows = "10";
		}
		int p = Integer.parseInt("".equals(page)||"0".equals(page) ? "1" : page);
		int r = Integer.parseInt("".equals(rows)||"0".equals(rows) ? "1" : rows);
		
		return bookDao.getLatestBooks(p, r, type);
	}

	/* 
	 * 获取销量最好的商品信息
	 * @param page
	 * @param rows
	 * @param type
	 * @return
	 * @see dysec.dysec.service.IBookService#getBestSelledBooks(java.lang.String, java.lang.String, int)
	 */
	@Override
	public List<Book> getBestSelledBooks(String page, String rows, int type) {
		// TODO Auto-generated method stub
		if(null == page) {
			page = "1";
		}
		if(null == rows) {
			rows = "10";
		}
		int p = Integer.parseInt("".equals(page)||"0".equals(page) ? "1" : page);
		int r = Integer.parseInt("".equals(rows)||"0".equals(rows) ? "1" : rows);
		
		return bookDao.getBestSelledBooks(p, r, type);
	}

	/* 
	 * 根据价格排序商品列表
	 * 
	 * @param page
	 * @param rows
	 * @param type
	 * @return
	 * @see dysec.dysec.service.IBookService#getBooksOrderedByPrice(java.lang.String, java.lang.String, int)
	 */
	@Override
	public List<Book> getBooksOrderedByPrice(String page, String rows, int type) {
		// TODO Auto-generated method stub
		if(null == page) {
			page = "1";
		}
		if(null == rows) {
			rows = "10";
		}
		int p = Integer.parseInt("".equals(page)||"0".equals(page) ? "1" : page);
		int r = Integer.parseInt("".equals(rows)||"0".equals(rows) ? "1" : rows);
		
		return bookDao.getBookByPrice(p, r, type);
	}

	/* 
	 * 根据商品点击率排序商品列表 
	 * @param page
	 * @param rows
	 * @param type
	 * @return
	 * @see dysec.dysec.service.IBookService#getBooksByClickTime(java.lang.String, java.lang.String, int)
	 */
	@Override
	public List<Book> getBooksByClickTime(String page, String rows, int type) {
		// TODO Auto-generated method stub
		if(null == page) {
			page = "1";
		}
		if(null == rows) {
			rows = "10";
		}
		int p = Integer.parseInt("".equals(page)||"0".equals(page) ? "1" : page);
		int r = Integer.parseInt("".equals(rows)||"0".equals(rows) ? "1" : rows);
		
		return bookDao.getBooksByClickTime(p, r, type);
	}

	/* 
	 * 根据关键字搜索商品列表
	 * @param keywords
	 * @return
	 * @see dysec.dysec.service.IBookService#getBooksByKeywords(java.lang.String)
	 */
	@Override
	public List<Book> getBooksByKeywords(String keywords) {
		// TODO Auto-generated method stub
		return bookDao.getBooksByKeywords(keywords);
	}
}
