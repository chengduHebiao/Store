package dysec.service;

import dysec.model.Book;

import java.util.List;


/**
 * 商品操作业务处理层接口
 * @ClassName IBookService
 * @Description 模块描述
 */
public interface IBookService {
	/**
	 * 添加商品
	 * @param book
	 * @return
	 */
	public boolean updateBook(Book book);
	
	/**
	 * 根据Id查找Book
	 * @param bid
	 * @return
	 */
	public Book getBookById(int bid);
	
	/**
	 * 保存商品并返回bid
	 * @param book
	 * @return
	 */
	public Integer saveBook(Book book);
	
	/***
	 * 根据类别查找商品
	 * @param cid 类型
	 * @param page 页
	 * @param rows 每页显示数
	 * @return
	 */
	public List<Book> getBooksByCid(int cid, String page, String rows);
	
	/***
	 * 根据类型统计商品总量
	 * @param type
	 * @return
	 */
	public Long countByType(int type);
	
	/**
	 * 
	 * @Title: removeBook
	 * @Description: 删除商品
	 *
	 * @param book
	 * @return
	 */
	public boolean removeBook(Book book);
	
	/** 
	 * @Title: getLatestBooks
	 * @Description: 方法描述
	 *
	 * @param page
	 * @param rows
	 * @param type
	 * @return
	 */
	public List<Book> getLatestBooks(String page, String rows, int type);
	
	/** 
	 * @Title: getBestSelledBooks
	 * @Description: 方法描述
	 *
	 * @param page
	 * @param rows
	 * @param type
	 * @return
	 */
	public List<Book> getBestSelledBooks(String page, String rows, int type);
	
	/** 
	 * @Title: getBooksOrderedByPrice
	 * @Description: 方法描述
	 *
	 * @param page
	 * @param rows
	 * @param type
	 * @return
	 */
	public List<Book> getBooksOrderedByPrice(String page, String rows, int type);
	
	/** 
	 * @Title: getBooksByClickTime
	 * @Description: 方法描述
	 *
	 * @param page
	 * @param rows
	 * @param type
	 * @return
	 */
	public List<Book> getBooksByClickTime(String page, String rows, int type);
	
	/** 
	 * @Title: getBooksByKeywords
	 * @Description: 方法描述
	 *
	 * @param keywords
	 * @return
	 */
	public List<Book> getBooksByKeywords(String keywords);
}
