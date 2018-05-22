package dysec.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.opensymphony.xwork2.ActionSupport;
import dysec.model.Category;
import dysec.service.ICategoryService;


/**
 * 分类管理控制器
 * 
 */
public class CategoryAction extends ActionSupport {

	/**
	 */
	private static final long serialVersionUID = -2659351219946527867L;
	
	//分页页码
	private String page;
	//总条数
	private String rows;
	//分类id
	private int cid;
	//分类名称
	private String cname;
	//分类描述
	private String description;
	//参数
	private String param;
	
	/** 
	 * 注入分类管理service
	 */
	@Resource
	private ICategoryService categoryService;
	
	private Map<String, Object> map;
	
	/** 
	 * 获取所有分类的列表
	 *
	 * @return [参数说明]
	 * @see [类、类#方法、类#成员]
	 * 
	 */
	public String getCategories() {
		map = new HashMap<String, Object>();
		//调用service查询所有分类列表
		List<Category> list = categoryService.getCategories(page, rows);
		
		//封装成easyui需要的数据格式并统一转化为json返回前端
		map.put("rows", list);
		map.put("total", null == categoryService.count() ? 0 : categoryService.count());
		
		return SUCCESS;
	}
	
	/** 
	 * 添加或更新一条分类信息
	 *
	 * @return [参数说明]
	 * @see [类、类#方法、类#成员]
	 * 
	 */
	public String addOrUpdateCategory() {
		map = new HashMap<String, Object>();
		int success = -1;
		String msg = "";
		Category category;
		//检查是否有分类id，没有就新添加，有就更新
		if(0==cid || cid<0) {
			category = new Category();
		} else {
			category = categoryService.getCategory(cid);
		}
		category.setCname(cname);
		category.setDescription(description);
		if(categoryService.addOrUpdateCategory(category)){
			msg = "成功";
			success = 1;
		}
		map.put("success", success);
		map.put("msg", msg);
		
		return SUCCESS;
	}
	
	/** 
	 * 删除分类信息
	 *
	 * @return [参数说明]
	 * @see [类、类#方法、类#成员]
	 * 
	 */
	public String removeCategory() {
		map = new HashMap<String, Object>();
		String msg = "";
		int success = -1;
		String[] ids;
		if(null==param || "".equals(param)) {
			msg = "参数错误";
		} else {
			//解析前端传入的所有分类id
			ids = param.replace("[", "").replace("]", "").split(",");
			for (int i = 0; i < ids.length; i++) {
				int removeId = 0;
				try {
					removeId = Integer.parseInt(ids[i]);
				} catch (Exception e) {
					msg = "参数错误";
					success = -1;
				}
				//删除
				categoryService.removeCategoty(categoryService.getCategory(removeId));
				success = 1;
				msg = "共" + ids.length + "删除成功";
			}
		}
		map.put("success", success);
		map.put("msg", msg);
		
		return SUCCESS;
	}
	
	/** 
	 * 获取所有分类的列表
	 *
	 * @return [参数说明]
	 * @see [类、类#方法、类#成员]
	 * 
	 */
	public String getAllCategory() {
		map = new HashMap<String, Object>();
		
		map.put("categories", categoryService.getAllCategories());
		
		return SUCCESS;
	}

	public void setMap(Map<String, Object> map) {
		this.map = map;
	}

	public Map<String, Object> getMap() {
		return map;
	}

	public String getPage() {
		return page;
	}

	public void setPage(String page) {
		this.page = page;
	}

	public String getRows() {
		return rows;
	}

	public void setRows(String rows) {
		this.rows = rows;
	}

	public int getCid() {
		return cid;
	}

	public void setCid(int cid) {
		this.cid = cid;
	}

	public String getCname() {
		return cname;
	}

	public void setCname(String cname) {
		this.cname = cname;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getParam() {
		return param;
	}

	public void setParam(String param) {
		this.param = param;
	}
}
