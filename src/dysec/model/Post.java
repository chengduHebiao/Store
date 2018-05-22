package dysec.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 文章实体
 */
@Entity
@Table(name = "post")
public class Post {
	/**
	 * id
	 */
	@Id
	@Column(name="pid")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int pid;
	
	/**
	 * 标题
	 */
	@Column(name="title")
	private String title;
	
	/**
	 * 内容
	 */
	@Column(name="content")
	private String content;
	
	/**
	 * 点击量
	 */
	@Column(name="clicktime")
	private int clicktime;
	
	/**
	 * 发布时间
	 */
	@Column(name="publishtime")
	private String publishtime;
	
	/**
	 * 类型
	 */
	@Column(name="type")
	private int type;

	public int getPid() {
		return pid;
	}

	public void setPid(int pid) {
		this.pid = pid;
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

	public int getClicktime() {
		return clicktime;
	}

	public void setClicktime(int clicktime) {
		this.clicktime = clicktime;
	}

	public String getPublishtime() {
		return publishtime;
	}

	public void setPublishtime(String publishtime) {
		this.publishtime = publishtime;
	}

	public void setType(int type) {
		this.type = type;
	}

	public int getType() {
		return type;
	}
}
