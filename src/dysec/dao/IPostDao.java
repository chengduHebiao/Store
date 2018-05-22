package dysec.dao;

import dysec.model.Post;

import java.util.List;


/**
 * 文章dao接口
 */
public interface IPostDao extends IBaseDao<Post> {
	/**
	 * 查询某类型的文章
	 * @param type
	 * @param page
	 * @param rows
	 * @return
	 */
	public List<Post> getPostsByType(int type, int page, int rows);
	
	/** 
	 * 根据类别统计文章数量
	 * 
	 */
	public Long countByType(int type);
}
