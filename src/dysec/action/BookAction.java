package dysec.action;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import dysec.model.Book;
import dysec.model.Comment;
import dysec.service.IBookService;
import dysec.service.ICategoryService;
import dysec.service.ICommentService;
import dysec.service.IUserService;
import org.apache.commons.lang.StringUtils;
import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;



/**
 * 处理商品各种操作的控制器
 */
public class BookAction extends ActionSupport {

	private static final long serialVersionUID = 6636884103817721964L;

	
	/** 
	 * 注入商品操作service
	 */
	@Resource
	private IBookService bookService;

	/** 
	 * 注入评论操作service
	 */
	@Resource
	private ICommentService commentService;

	/** 
	 * 注入用户操作service
	 */
	@Resource
	private IUserService userService;

	/** 
	 * 注入分类管理操作service 
	 */
	@Resource
	private ICategoryService categoryService;

	//商品id
	private int bid;

	//商品名称
	private String bookname;

	//商品品牌
	private String author;

	//商品发布日期
	private String publishdate;

	//商品图片路径
	private String bookimage;

	//商品备注
	private String publisher;

	//商品描述
	private String detail;

	//原价
	private String preprice;

	//现价
	private String nowprice;

	//所属分类id
	private String cid;
    private int id;

	//总量
	private int total;

	//排序规则
	private int sortType;

	private String filePath; // 用户图片保存路径

	private File pic;

	private String picFileName;

	private String picFileContentType;

	private String picPath;

	//分页编号
	private String page;

	//分页总条数
	private String rows;

	private String param;

	//用于返回前台封装数据map
	private Map<String, Object> map;

	/** 
	 * 上传商品图片方法
	 * 
	 * @return [参数说明]
	 * @see [类、类#方法、类#成员]
	 * 
	 */
	public String uploadBookImage() {
		// 返回结果封装对象
		map = new HashMap<String, Object>();
		Book book;
		picPath = ServletActionContext.getServletContext().getRealPath(
				"/upload/img");
		SimpleDateFormat sdft = new SimpleDateFormat("yyyyMMddHHmmss");
		String name = sdft.format(new Date());
		int position = this.getPicFileName().lastIndexOf(".");
		// 保存用户图片命名
		String savefile = "b" + name
				+ this.getPicFileName().substring(position);
		String filePath = "../upload/img/" + savefile;
		// 输入输出流
		InputStream in = null;
		OutputStream out = null;
		try {
			//允许上传文件格式
			String[] imgExts = {".gif", ".jpg", ".jpeg", ".bmp", ".png"};
			for (String ext : imgExts) {
				if (picFileName.toLowerCase().endsWith(ext)) {
					in = new BufferedInputStream(new FileInputStream(pic), 1024);
					// 得到文件保存的位置(根据root来得到图片保存的路径在tomcat下的该工程里)
					File destFile = new File(picPath, savefile);
					// 把文件写入到上面设置的路径里
					out = new BufferedOutputStream(new FileOutputStream(
							destFile));
					byte[] buffer = new byte[1024];
					//上传并保存写入文件
					while (in.read(buffer) > 0) {
						out.write(buffer);
						int i = 0;
						System.out.println(++i);
					}
					in.close();
					out.close();
					//判断是否是已经存在的商品，是的话直接保存到已有的数据库,否的话添加一条新的数据
					if (0 == bid || bid < 0) {
						book = new Book();
						book.setBookimage(filePath);
						bid = bookService.saveBook(book);
					} else {
						book = bookService.getBookById(bid);
						book.setBookimage(filePath);
						bookService.updateBook(book);
					}

					map.put("bid", bid);
					map.put("filepath", filePath);
					map.put("message", "1");
					return SUCCESS;
				}
			}
			map.put("message", "2");
			return ERROR;
		} catch (Exception e) {
			e.printStackTrace();
			map.put("message", "0");
			return ERROR;
		}
	}

	/** 
	 * 根据商品名称查找商品(模糊查询)
	 * @return [参数说明]
	 * @see [类、类#方法、类#成员]
	 * 
	 */
	public String searchBook() {
		map = new HashMap<String, Object>();
		String msg = "";
		if (null == param || "".equals(param)) {
			msg = "参数错误";
			map.put("msg", msg);
		} else {
			List<Book> books = bookService.getBooksByKeywords(param);
			map.put("books", books);
		}

		return SUCCESS;
	}

	/** 
	 * 根据类别查询该分类下的商品列表
	 *
	 * @return [参数说明]
	 * @see [类、类#方法、类#成员]
	 * 
	 */
	public String listBooksByType() {
		map = new HashMap<String, Object>();
		String msg = "";
		//验证检查类别id参数
		if (0 >= id) {
			msg = "参数错误";
			map.put("msg", msg);
		} else {
			//调用service方法查询列表
			List<Book> books = bookService.getBooksByCid(id, page, rows);
			//根据排序规则排序
			switch (sortType) {
			case 1:
				books = bookService.getBooksByClickTime(page, rows, id);
				break;
			case 2:
				books = bookService.getBestSelledBooks(page, rows, id);
				break;
			case 3:
				books = bookService.getBooksOrderedByPrice(page, rows, id);
				break;
			}
			//存入map，统一返回json
			map.put("books", books);
			map.put("category", categoryService.getCategory(id).getCname());
		}

		return SUCCESS;
	}

	/** 
	 * 后台添加一个商品
	 *
	 * @return [参数说明]
	 * @see [类、类#方法、类#成员]
	 * 
	 */
	public String addBook() {
		map = new HashMap<String, Object>();
		int success = -1;
		String msg = "";
		Book book;
		if (0 == bid || bid < 0) {
			book = new Book();
		} else {
			book = bookService.getBookById(bid);
		}
		//设置商品的属性
		book.setAuthor(author);
		book.setBookimage(bookimage);
		book.setBookname(bookname);
		book.setCid(id);
		book.setDetail(detail);
		book.setTotal(total);
		book.setNowprice(nowprice);
		book.setPreprice(preprice);
		book.setPublishdate(publishdate);
		book.setPublisher(publisher);
		book.setClicktime(0);
		if (bookService.updateBook(book)) {
			msg = "添加成功";
			success = 1;
		}
		map.put("success", success);
		map.put("msg", msg);

		return SUCCESS;
	}

	/** 
	 * 删除一条商品信息
	 *
	 * @return [参数说明]
	 * @see [类、类#方法、类#成员]
	 * 
	 */
	public String removeBook() {
		map = new HashMap<String, Object>();
		String[] ids;
		int success = -1;
		String msg = "";
		//检查传入参数
		if (null == param || "".equals(param)) {
			msg = "参数错误";
		} else {
			//批量删除时，传入的所有需要删除的id
			ids = param.replace("[", "").replace("]", "").split(",");
			for (int i = 0; i < ids.length; i++) {
				int removeId;
				try {
					removeId = Integer.parseInt(ids[i]);
				} catch (Exception e) {
					// TODO: handle exception
					msg = "参数错误";
					success = -1;
					break;
				}
				//调用service删除商品
				bookService.removeBook(bookService.getBookById(removeId));
				msg = "共" + ids.length + "条数据删除成功";
				success = 1;
			}
		}
		map.put("success", success);
		map.put("msg", msg);

		return SUCCESS;
	}

	/** 
	 * 分页查询商品信息
	 *
	 * @return [参数说明]
	 * @see [类、类#方法、类#成员]
	 * 
	 */
	public String getBooks() {
		map = new HashMap<String, Object>();
		List<Book> list = bookService.getBooksByCid(id, page, rows);

		//封装成前端easyui需要的数据格式，统一转换成json返回前端
		map.put("rows", list);
		map.put("total", bookService.countByType(id));

		return SUCCESS;
	}

	/** 
	 * 首页展示的商品列表(热销，最新上架)
	 *
	 * @return [参数说明]
	 * @see [类、类#方法、类#成员]
	 * 
	 */
	public String getIndexBooks() {
		map = new HashMap<String, Object>();
		List<Book> latestBooks = bookService.getLatestBooks("1", "10", id);
		List<Book> bestSelledBooks = bookService.getBestSelledBooks("1", "10",
                id);

		map.put("latestBooks", latestBooks);
		map.put("bestSelledBooks", bestSelledBooks);

		return SUCCESS;
	}

	/** 
	 * 加载一个商品的详细信息
	 *
	 * @return [参数说明]
	 * @see [类、类#方法、类#成员]
	 * 
	 */
	public String loadBookInformation() {
		map = new HashMap<>();
		String msg = "";
		//检查参数
		if (0 >= bid) {
			msg = "参数错误";
		} else {
			Book book = null;
			List<Comment> comments = null;
			List<String> usernames = new ArrayList<String>();
			List<Book> latestBooks = null;
			List<Book> bestSelledBooks = null;

			//最新推荐商品列表
			latestBooks = bookService.getLatestBooks("1", "3", 0);
			//热销商品列表
			bestSelledBooks = bookService.getBestSelledBooks("1", "5", 0);
			book = bookService.getBookById(bid);
			//加载商品评论
			comments = commentService.getCommentsByBid(bid);
			Iterator<Comment> iterator = comments.iterator();
			while (iterator.hasNext()) {
				usernames.add(userService
						.getUserByUid(iterator.next().getUid()).getUsername());
			}

			map.put("book", book);
			map.put("comments", comments);
			map.put("usernames", usernames);
			map.put("latestBooks", latestBooks);
			map.put("bestSelledBooks", bestSelledBooks);
			map.put("category", categoryService.getCategory(book.getCid())
					.getCname());
			//点击率+1
			book.setClicktime(book.getClicktime() + 1);
			bookService.updateBook(book);
		}

		map.put("msg", msg);

		return SUCCESS;
	}

	/** 
	 * 热销商品列表
	 *
	 * @return [参数说明]
	 * @see [类、类#方法、类#成员]
	 * 
	 */
	public String getBestSelledBooks() {
		map = new HashMap<String, Object>();
		List<Book> books = bookService.getBestSelledBooks("1", "3", 0);
		map.put("books", books);

		return SUCCESS;
	}

	/** 
	 * 将商品加入购物车
	 *
	 * @return [参数说明]
	 * @see [类、类#方法、类#成员]
	 * 
	 */
	public String addToCart() {
		map = new HashMap<String, Object>();
		String msg = "msg";
		int success = -1;
		Map session = ActionContext.getContext().getSession();
		//检查是否登录
		if (null == session.get("uid")) {
			msg = "请先登录";
		} else {
			List<Book> cart;
			if (null == session.get("cart")) {
				cart = new ArrayList<>();
				session.put("cart", cart);
			} else {
				cart = (List<Book>) session.get("cart");
			}
			Book book = bookService.getBookById(bid);
			cart.add(book);
			session.put("cart", cart);
			msg = "添加成功，您可以到我的购物车查看";
			success = 1;
		}
		map.put("msg", msg);
		map.put("success", success);

		return SUCCESS;
	}

	/** 
	 * 展示购物车列表
	 *
	 * @return [参数说明]
	 * @see [类、类#方法、类#成员]
	 * 
	 */
	public String showCart() {
		map = new HashMap<>();
		Map session = ActionContext.getContext().getSession();
		String msg = "";
		//检查是否登录
		if (null == session.get("uid")) {
			msg = "请先登录";
			map.put("msg", msg);
		} else {
			List<Book> books = (List<Book>) session.get("cart");
			map.put("books", books);
		}

		return SUCCESS;
	}

	/** 
	 * 从购物车中删除一条商品信息
	 *
	 * @return [参数说明]
	 * @see [类、类#方法、类#成员]
	 * 
	 */
	public String removeFromCart() {
		map = new HashMap<>();
		Map session = ActionContext.getContext().getSession();
		String msg = "";
		int success = -1;
		//检查是否登录
		if (null == session.get("uid")) {
			msg = "请先登录";
			map.put("msg", msg);
		} else {
			//从购物车中删除商品信息
			List<Book> books = (List<Book>) session.get("cart");
			Book book = bookService.getBookById(bid);
			if (null == books) {
				msg = "出错了";
			} else {
				for (int i = 0; i < books.size(); i++) {
					Book b = books.get(i);
					if (bid == b.getBid()) {
						books.remove(i);
					}
				}
				session.put("cart", books);
				success = 1;
				msg = "成功";
			}
		}
		map.put("success", success);
		map.put("msg", msg);

		return SUCCESS;
	}

	/** 
	 * 提交购物车中的商品订单
	 *
	 * @return [参数说明]
	 * @see [类、类#方法、类#成员]
	 * 
	 */
	public String commitCart() {
		map = new HashMap<>();
		Map session = ActionContext.getContext().getSession();
		String msg = "";
		int success = -1;
		Double total = 0.0;
		if (null == session.get("uid")) {
			msg = "请先登录";
			map.put("msg", msg);
		} else {
			List<Book> books = (List<Book>) session.get("cart");
			for (int i = 0; i < books.size(); i++) {
				Book b = books.get(i);
				b.setSelled(b.getSelled() + 1);
				bookService.updateBook(b);
				total += Double.valueOf(b.getNowprice());
				books.remove(i);
			}
			session.put("cart", books);
			success = 1;
			msg = "提交成功，总价￥" + total;
		}
		map.put("success", success);
		map.put("msg", msg);

		return SUCCESS;
	}

	/** 
	 * 查询一个商品的详细信息
	 *
	 * @return [参数说明]
	 * @see [类、类#方法、类#成员]
	 * 
	 */
	public String getOneBook() {
		map = new HashMap<String, Object>();
		Book book = bookService.getBookById(bid);

		map.put("book", book);

		return SUCCESS;
	}

	public int getBid() {
		return bid;
	}

	public void setBid(int bid) {
		this.bid = bid;
	}

	public String getBookname() {
		return bookname;
	}

	public void setBookname(String bookname) {
		this.bookname = bookname;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getPublishdate() {
		return publishdate;
	}

	public void setPublishdate(String publishdate) {
		this.publishdate = publishdate;
	}

	public String getBookimage() {
		return bookimage;
	}

	public void setBookimage(String bookimage) {
		this.bookimage = bookimage;
	}

	public String getPublisher() {
		return publisher;
	}

	public void setPublisher(String publisher) {
		this.publisher = publisher;
	}

	public String getDetail() {
		return detail;
	}

	public void setDetail(String detail) {
		this.detail = detail;
	}

	public String getPreprice() {
		return preprice;
	}

	public void setPreprice(String preprice) {
		this.preprice = preprice;
	}

	public String getNowprice() {
		return nowprice;
	}

	public void setNowprice(String nowprice) {
		this.nowprice = nowprice;
	}

	public int getTotal() {
		return total;
	}

	public void setTotal(int total) {
		this.total = total;
	}

	public Map<String, Object> getMap() {
		return map;
	}

	public void setMap(Map<String, Object> map) {
		this.map = map;
	}

	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public File getPic() {
		return pic;
	}

	public void setPic(File pic) {
		this.pic = pic;
	}

	public String getPicFileName() {
		return picFileName;
	}

	public void setPicFileName(String picFileName) {
		this.picFileName = picFileName;
	}

	public String getPicFileContentType() {
		return picFileContentType;
	}

	public void setPicFileContentType(String picFileContentType) {
		this.picFileContentType = picFileContentType;
	}

	public String getPicPath() {
		return picPath;
	}

	public void setPicPath(String picPath) {
		this.picPath = picPath;
	}

	public void setCid(String cid) {
		this.cid = cid;
        if(StringUtils.isNotEmpty(cid))
        this.id = Integer.valueOf(this.cid);
	}

	public String getCid() {
		return cid;
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

	public String getParam() {
		return param;
	}

	public void setParam(String param) {
		this.param = param;
	}

	public int getSortType() {
		return sortType;
	}

	public void setSortType(int sortType) {
		this.sortType = sortType;
	}

}
