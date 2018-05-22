package dysec.action;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.opensymphony.xwork2.ActionSupport;
import dysec.model.Post;
import dysec.service.IPostService;
import dysec.util.HTMLSpirit;


/**
 * 文章控制器
 * 
 */
public class PostAction extends ActionSupport{

	/**
	 * 
	 */
	private static final long serialVersionUID = 4915788298860941280L;
	
	/** 
	 * 注入文章service
	 */
	@Resource
	private IPostService postService;
	
	//文章标题
	private String title;
	//文章内容
	private String content;
	//文章类型（商品资讯，降价通知）
	private int type;
	//文章id
	private int pid;
	//分页页码
	private String page;
	//总条数
	private String rows;
	private String param;
	
	private Map<String, Object> map;
	
	/**
	 * 发布或者修改信息
	 * @return
	 */
	public String publishPost() {
		map = new HashMap<String, Object>();
		int success = -1;
		String msg = "";
		//检查标题
		if(null == title || "".equals(title)) {
			msg = "标题不能为空";
		} else if(null == content || "".equals(content)) {
			//检查内容
			msg = "内容不能为空";
		} else {
			//发表文章
			Post post;
			if(0 == pid) {
				post = new Post();
				post.setClicktime(0);
				post.setPublishtime(new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(new Date()));
			} else {
				post = postService.getPostById(pid);
				if(null == post)
					post = new Post();
			}
			//设置文章属性
			post.setContent(content);
			post.setTitle(title);
			post.setType(type);
			if(postService.addPost(post)){
				success = 1;
				msg = "成功";
			} else {
				msg = "出错了";
			}
		}
		map.put("msg", msg);
		map.put("success", success);
		
		return SUCCESS;
	}
	
	/** 
	 * 加载文章详情
	 * 
	 */
	public String loadPost() {
		map = new HashMap<String, Object>();
		String msg = "";
		//检查文章id参数
		if(0 >= pid) {
			msg = "参数错误";
			map.put("msg", msg);
		} else {
			Post post = postService.getPostById(pid);
			map.put("post", post);
			post.setClicktime(post.getClicktime()+1);
			postService.addPost(post);
		}
		
		return SUCCESS;
	}
	
	/** 
	 * 后台删除文章
	 * 
	 */
	public String removePosts() {
		String msg = "This is in method remove!";
		map = new HashMap<String, Object>();
		int success = -1;
		//检查参数
		if(null==param || "".equals(param)){
			msg = "参数错误";
		} else {
			//解析前端传入的需要删除的所有文章id
			String[] id = param.replace("[", "").replace("]", "").split(",");
			for (int i = 0; i < id.length; i++) {
				Post post = null;
				try {
					post = postService.getPostById(Integer.parseInt(id[i]));
				} catch (Exception e) {
					msg = "参数有错误";
					break;
				}
				postService.removePost(post);
			}
			msg = "共"+id.length+"条记录删除成功";
			success = 1;
		}
		map.put("msg", msg);
		map.put("success", success);
		
		return SUCCESS;
	}
	
	/** 
	 * 所有文章列表,可根据文章类型进行筛选
	 * 
	 */
	public String listPosts() {
		map = new HashMap<String, Object>();
		//根据类型和分页查询文章列表
		List<Post> list = this.postService.getPostsByType(type, page, rows);
		List<Post> listForPage = new ArrayList<>();
		for(Post post : list) {
			String contentInPost = post.getContent();
			//过滤html代码
			post.setContent(HTMLSpirit.delHTMLTag(contentInPost).substring(0, 50));
			listForPage.add(post);
		}
		map.put("rows", listForPage);
		map.put("total", this.postService.countByType(type));
		
		return SUCCESS;
	}
	
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	public int getPid() {
		return pid;
	}
	public void setPid(int pid) {
		this.pid = pid;
	}

	public void setMap(Map<String, Object> map) {
		this.map = map;
	}

	public Map<String, Object> getMap() {
		return map;
	}

	public void setPage(String page) {
		this.page = page;
	}

	public String getPage() {
		return page;
	}

	public void setRows(String rows) {
		this.rows = rows;
	}

	public String getRows() {
		return rows;
	}

	public void setParam(String param) {
		this.param = param;
	}

	public String getParam() {
		return param;
	}
}
