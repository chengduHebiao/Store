package dysec.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 评论实体
 */
@Entity
@Table(name = "comment")
public class Comment {
	/**
	 * id
	 */
	@Id
	@Column(name = "coid")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int coid;
	
	/***
	 * 商品id
	 */
	@Column(name = "bid")
	private int bid;
	
	/***
	 * 评论内容
	 */
	@Column(name = "comment")
	private String comment;
	
	/***
	 * 用户id
	 */
	@Column(name = "uid")
	private int uid;
	
	/***
	 * 评论时间
	 */
	@Column(name = "commenttime")
	private String commenttime;
	
//	private String book;

	public int getCoid() {
		return coid;
	}

	public void setCoid(int coid) {
		this.coid = coid;
	}

	public int getBid() {
		return bid;
	}

	public void setBid(int bid) {
		this.bid = bid;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public int getUid() {
		return uid;
	}

	public void setUid(int uid) {
		this.uid = uid;
	}

	public String getCommenttime() {
		return commenttime;
	}

	public void setCommenttime(String commenttime) {
		this.commenttime = commenttime;
	}

/*	public String getBook() {
		return book;
	}

	public void setBook(String book) {
		this.book = book;
	}*/
}
