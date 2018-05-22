package dysec.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/*******************
 * Message 站内信息实体
 * @author hACk
 *
 */
@Entity
@Table(name = "message")
public class Message {
	/**
	 * 消息id
	 */
	@Id
	@Column(name = "mid")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int mid;
	
	/**
	 * 消息标题
	 */
	@Column(name = "title")
	private String title;
	
	/**
	 * 消息名称
	 */
	@Column(name = "content")
	private String content;
	@Column(name = "type")
	private int type;
	
	/**
	 * 创建时间
	 */
	@Column(name = "sendtime")
	private String sendtime;

	public Message() {
		
	}
	
	public int getMid() {
		return mid;
	}

	public void setMid(int mid) {
		this.mid = mid;
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

	public String getSendtime() {
		return sendtime;
	}

	public void setSendtime(String sendtime) {
		this.sendtime = sendtime;
	}
}
