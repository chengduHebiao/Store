package dysec.dao;

import dysec.model.Book;

import java.util.List;


/**
 * 商品dao接口
 * @ClassName IBookDao
 * @Description 模块描述
 */
public interface IBookDao extends IBaseDao<Book> {
	
	public Integer saveBook(Book book);
	
	/**
	 * 根据类别查找商品
	 * @param page 页
	 * @param rows 每页显示列
	 * @param cid  类别
	 * @return
	 */
	public List<Book> getBooksByType(int page, int rows, int cid);
	
	/***
	 * 统计某类别商品总量
	 * @param type
	 * @return
	 */
	public Long countByType(int type);
	
	/** 
	 * @Title: getLatestBooks
	 * @Description: 获取最新上架商品
	 * @param page
	 * @param rows
	 * @return
	 */
	public List<Book> getLatestBooks(int page, int rows, int type);
	
	/** 
	 * @Title: getBestSelledBooks
	 * @Description: 获取销量最好的商品
	 * @param page
	 * @param rows
	 * @param type
	 * @return
	 */
	public List<Book> getBestSelledBooks(int page, int rows, int type);
	
	/** 
	 * @Title: getBookByPrice
	 * @Description: 方法描述
	 * @param page
	 * @param rows
	 * @param type
	 * @return
	 */
	public List<Book> getBookByPrice(int page, int rows, int type);
	
	/** 
	 * @Title: getBooksByClickTime
	 * @Description: 方法描述
	 * @param page
	 * @param rows
	 * @param type
	 * @return
	 */
	public List<Book> getBooksByClickTime(int page, int rows, int type);
	
	/** 
	 * @Title: getBooksByKeywords
	 * @Description: 方法描述
	 * @param keyword
	 * @return
	 */
	public List<Book> getBooksByKeywords(String keyword);
}
