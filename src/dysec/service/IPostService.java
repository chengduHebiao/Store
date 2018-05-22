package dysec.service;

import dysec.model.Post;

import java.util.List;


/**
 * 文章业务处理层
 */
public interface IPostService {
	/**
	 * 发布信息
	 * @param post
	 * @return
	 */
	public boolean addPost(Post post);
	
	/***
	 * 更具类型查找文章
	 * @param type
	 * @param page
	 * @param rows
	 * @return
	 */
	public List<Post> getPostsByType(int type, String page, String rows);
	
	/***
	 * 根据Id查找某条信息
	 * @param pid
	 * @return
	 */
	public Post getPostById(int pid);
	
	/**
	 * 查询某类型总数
	 * @param type
	 * @return
	 */
	public Long countByType(int type);
	
	/**
	 * 删除一条记录
	 * @param post
	 * @return
	 */
	public boolean removePost(Post post);
}
