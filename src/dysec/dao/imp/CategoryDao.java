package dysec.dao.imp;

import java.util.List;

import dysec.dao.ICategoryDao;
import dysec.model.Category;
import org.springframework.stereotype.Repository;


/**
 * 类别dao具体实现
 */
@Repository("categoryDao")
public class CategoryDao extends BaseDao<Category> implements ICategoryDao {

	public List<Category> getCategories(int page, int rows) {
		// TODO Auto-generated method stub
		String hql = "from Category";
		
		return this.find(hql, page, rows);
	}

	/* (non-Javadoc)
	 * <p>Title: getAllCategories</p> 
	 * <p>Description: 方法描述</p> 
	 * @return
	 * @see dysec.dysec.dao.ICategoryDao#getAllCategories()
	 */
	@Override
	public List<Category> getAllCategories() {
		// TODO Auto-generated method stub
		String hql = "from Category";
		
		return this.find(hql);
	}

}
