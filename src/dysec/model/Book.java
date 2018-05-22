package dysec.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 商品实体类 映射数据库中的商品表
 */
@Entity
@Table(name = "book")
public class Book {
	/**
	 * id
	 */
	@Id
	@Column(name = "bid")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int bid;
	
	/**
	 * bookname
	 */
	@Column(name = "bookname")
	private String bookname;

	/***
	 * 品牌
	 */
	@Column(name = "author")
	private String author;
	
	/**
	 * 发布日期
	 */
	@Column(name = "publishdate")
	private String publishdate;
	
	/**
	 * 商品的图片
	 */
	@Column(name = "bookimage")
	private String bookimage;
	
	/**
	 * 备注
	 */
	@Column(name = "publisher")
	private String publisher;
	
	/**
	 * 简介
	 */
	@Column(name = "detail")
	private String detail;
	
	/**
	 * 原价
	 */
	@Column(name = "preprice")
	private String preprice;
	
	/**
	 * 现价
	 */
	@Column(name = "nowprice")
	private String nowprice;
	
	/**
	 * 点击量
	 */
	@Column(name = "clicktime")
	private int clicktime;
	
	/**
	 * 种类
	 */
	@Column(name = "cid")
	private int cid;
	
	/** 
	 * 总量 
	 */
	@Column(name = "total")
	private int total;
	
	/** 
	 * 已售 
	 */
	@Column(name = "selled")
	private int selled;

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

	public int getClicktime() {
		return clicktime;
	}

	public void setClicktime(int clicktime) {
		this.clicktime = clicktime;
	}

	public int getCid() {
		return cid;
	}

	public void setCid(int cid) {
		this.cid = cid;
	}

	/**
	 * @return total
	 */
	public int getTotal() {
		return total;
	}

	/**
	 * @param total 要设置的 total
	 */
	public void setTotal(int total) {
		this.total = total;
	}

	/**
	 * @return selled
	 */
	public int getSelled() {
		return selled;
	}

	/**
	 * @param selled 要设置的 selled
	 */
	public void setSelled(int selled) {
		this.selled = selled;
	}
	
}
