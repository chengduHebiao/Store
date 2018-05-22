package dysec.dao;

import dysec.model.Category;

import java.util.List;


/**
 * 类别dao接口
 */
public interface ICategoryDao extends IBaseDao<Category> {
	/**
	 * 查找所有类别
	 * @param page
	 * @param rows
	 * @return
	 */
	public List<Category> getCategories(int page, int rows);
	
	/** 
	 * @Title: getAllCategories
	 * @Description: 查找所有分类信息
	 * @return
	 */
	public List<Category> getAllCategories();
}
