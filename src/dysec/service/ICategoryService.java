package dysec.service;


import dysec.model.Category;

import java.util.List;

/**
 * 商品类别业务处理层接口
 */
public interface ICategoryService {
	/**
	 * 添加或者跟新类别
	 * @param category
	 * @return
	 */
	public boolean addOrUpdateCategory(Category category);
	
	/**
	 * 根据id查询分类
	 * @param cid
	 * @return
	 */
	public Category getCategory(int cid);
	
	/**
	 * 统计类别总数
	 * @return
	 */
	public Long count();
	
	/**
	 * 查询所有分类
	 * @param page
	 * @param rows
	 * @return
	 */
	public List<Category> getCategories(String page, String rows);
	
	/** 
	 * @Title: removeCategoty
	 * @Description: 删除分类
	 * @param category
	 * @return
	 */
	public boolean removeCategoty(Category category);
	
	/** 
	 * @Title: getAllCategories
	 * @Description: 获取所有分类
	 * @author ZhangPeng
	 * @return
	 */
	public List<Category> getAllCategories();
}
