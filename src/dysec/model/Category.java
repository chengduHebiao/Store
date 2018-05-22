package dysec.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 分类的实体
 */
@Entity
@Table(name = "category")
public class Category {
	/**
	 * id
	 */
	@Id
	@Column(name = "cid")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int cid;
	
	/**
	 * 分类名称
	 */
	@Column(name = "cname")
	private String cname;
	
	/**
	 * 分类描述
	 */
	@Column(name = "description")
	private String description;

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
	
}
