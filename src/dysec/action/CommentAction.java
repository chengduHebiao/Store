/**
 * @Project: Store
 * @Title: CommentAction.java
 * @Package dysec.dysec.action
 */
package dysec.action;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import dysec.model.Comment;
import dysec.service.IBookService;
import dysec.service.ICommentService;
import dysec.service.IUserService;


/**
 * 评论管理控制器
 */
public class CommentAction extends ActionSupport {
	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = -5225350242914249923L;

	/** 
	 * 注入评论管理service 
	 */
	@Resource
	private ICommentService commentService;
	/** 
	 * 注入商品管理service
	 */
	@Resource
	private IBookService bookService;
	/** 
	 * 注入用户管理service 
	 */
	@Resource
	private IUserService userService;

	//接收参数
	private String param;
	private String detail;
	//商品id
	private int bid;
	//评论id
	private int cid;
	
	private int page;
	private int rows;
	
	private Map<String, Object> map;

	/** 
	 * 添加商品评论
	 *
	 * @return [参数说明]
	 * @see [类、类#方法、类#成员]
	 * 
	 */
	public String addComment() {
		map = new HashMap<String, Object>();
		String msg = "";
		int success = -1;
		Map session = ActionContext.getContext().getSession();
		//检查是否登录
		if(null==session.get("uid") || null==session.get("username")) {
			msg = "请先登录";
		} else {
			Comment comment = new Comment();
			comment.setComment(detail);
			comment.setBid(bid);
			comment.setCommenttime(new SimpleDateFormat("yy-MM-dd hh:mm:ss").format(new Date()));
			int uid = (int) session.get("uid");
			//设置发表评论的用户id
			comment.setUid(uid);
			commentService.addOrUpdateComment(comment);
			success = 1;
			msg = "成功";
		}
		map.put("msg", msg);
		map.put("success", success);
		
		return SUCCESS;
	}
	
	/** 
	 * 后台删除评论信息
	 *
	 * @return [参数说明]
	 * @see [类、类#方法、类#成员]
	 * 
	 */
	public String removeComments() {
		map = new HashMap<>();
		String msg = "";
		int success = -1;
		//检查参数
		if(null==param || "".equals(param)) {
			msg = "参数错误";
		} else {
			//解析传入的所有需要操作的评论id
			String[] ids = param.replace("[", "").replace("]", "").split(",");
			for (int i = 0; i < ids.length; i++) {
				int coid = Integer.parseInt(ids[i]);
				Comment comment = commentService.getCommentByCoid(coid);
				//删除评论
				commentService.removeComment(comment);
			}
			msg = "共"+ids.length+"条数据删除成功";
			success = 1;
		}
		map.put("msg", msg);
		map.put("success", success);
		
		return SUCCESS;
	}
	
	/** 
	 * 获取所有评论列表
	 *
	 * @return [参数说明]
	 * @see [类、类#方法、类#成员]
	 * 
	 */
	public String getAllComment(){
		map = new HashMap<String, Object>();
		Map<String, Object> myMap;
		//调用service查询所有评论列表
		List<Comment> comments = commentService.getAllComments(page, rows, 0);
		List<Map<String, Object>> list = new ArrayList<>();
		for(int i=0; i<comments.size(); i++) {
			Comment c = comments.get(i);
			myMap = new HashMap<String, Object>();
			myMap.put("coid", c.getCoid());
			myMap.put("comment", c.getComment());
			myMap.put("commenttime", c.getCommenttime());
			myMap.put("book", bookService.getBookById(c.getBid()).getBookname());
			myMap.put("bid", c.getBid());
			myMap.put("username", userService.getUserByUid(c.getUid()).getUsername());
			myMap.put("uid", c.getUid());
			
			list.add(myMap);
		}
		
		map.put("rows", list);
		map.put("total", commentService.countAll(0));
		
		return SUCCESS;
	}

	/**
	 * @return bid
	 */
	public int getBid() {
		return bid;
	}

	/**
	 * @param bid
	 *            要设置的 bid
	 */
	public void setBid(int bid) {
		this.bid = bid;
	}

	/**
	 * @return cid
	 */
	public int getCid() {
		return cid;
	}

	/**
	 * @param cid
	 *            要设置的 cid
	 */
	public void setCid(int cid) {
		this.cid = cid;
	}

	public Map<String, Object> getMap() {
		return map;
	}

	public void setMap(Map<String, Object> map) {
		this.map = map;
	}

	/**
	 * @return detail
	 */
	public String getDetail() {
		return detail;
	}

	/**
	 * @param detail 要设置的 detail
	 */
	public void setDetail(String detail) {
		this.detail = detail;
	}

	/**
	 * @return page
	 */
	public int getPage() {
		return page;
	}

	/**
	 * @param page 要设置的 page
	 */
	public void setPage(int page) {
		this.page = page;
	}

	/**
	 * @return rows
	 */
	public int getRows() {
		return rows;
	}

	/**
	 * @param rows 要设置的 rows
	 */
	public void setRows(int rows) {
		this.rows = rows;
	}

	public String getParam() {
		return param;
	}

	public void setParam(String param) {
		this.param = param;
	}

}
