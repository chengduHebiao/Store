package dysec.service.imp;

import java.util.List;

import javax.annotation.Resource;

import dysec.dao.ICategoryDao;
import dysec.model.Category;
import dysec.service.ICategoryService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * 商品类别业务处理实现
 */
@Service
@Transactional
public class CategoryService implements ICategoryService {
	@Resource
	private ICategoryDao categoryDao;

	public boolean addOrUpdateCategory(Category category) {
		// TODO Auto-generated method stub
		return categoryDao.saveOrUpdate(category);
	}

	public Long count() {
		// TODO Auto-generated method stub
		return categoryDao.count("select count(*) from Category");
	}

	public List<Category> getCategories(String page, String rows) {
		// TODO Auto-generated method stub
		if(null == page) {
			page = "1";
		}
		if(null == rows) {
			rows = "10";
		}
		int p = Integer.parseInt("".equals(page)||"0".equals(page) ? "1" : page);
		int r = Integer.parseInt("".equals(rows)||"0".equals(rows) ? "1" : rows);
		
		return categoryDao.getCategories(p, r);
	}

	public Category getCategory(int cid) {
		// TODO Auto-generated method stub
		return categoryDao.get(Category.class, cid);
	}

	/* (non-Javadoc)
	 * <p>Title: removeCategoty</p> 
	 * <p>Description: 方法描述</p> 
	 * @param category
	 * @return
	 * @see dysec.dysec.service.ICategoryService#removeCategoty(dysec.dysec.model.Category)
	 */
	@Override
	public boolean removeCategoty(Category category) {
		// TODO Auto-generated method stub
		return categoryDao.delete(category);
	}

	/* (non-Javadoc)
	 * <p>Title: getAllCategories</p> 
	 * <p>Description: 方法描述</p> 
	 * @return
	 * @see dysec.dysec.service.ICategoryService#getAllCategories()
	 */
	@Override
	public List<Category> getAllCategories() {
		// TODO Auto-generated method stub
		return categoryDao.getAllCategories();
	}
}
