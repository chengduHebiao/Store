package dysec.service.imp;

import java.util.List;

import javax.annotation.Resource;

import dysec.dao.IPostDao;
import dysec.model.Post;
import dysec.service.IPostService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * 文章业务处理实现
 */
@Service
@Transactional
public class PostService implements IPostService {

	@Resource
	private IPostDao postDao;

	public boolean addPost(Post post) {
		// TODO Auto-generated method stub
		return postDao.saveOrUpdate(post);
	}

	public List<Post> getPostsByType(int type, String page, String rows) {
		// TODO Auto-generated method stub
		if (null == page) {
			page = "1";
		}
		if (null == rows) {
			rows = "10";
		}
		int p = Integer.parseInt("".equals(page) || "0".equals(page) ? "1"
				: page);
		int r = Integer.parseInt("".equals(rows) || "0".equals(rows) ? "1"
				: rows);

		return postDao.getPostsByType(type, p, r);
	}

	public Post getPostById(int pid) {
		// TODO Auto-generated method stub
		return postDao.get(Post.class, pid);
	}

	public Long countByType(int type) {
		// TODO Auto-generated method stub
		return postDao.countByType(type);
	}

	public boolean removePost(Post post) {
		// TODO Auto-generated method stub
		return postDao.delete(post);
	}

}
