package dysec.action;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;


import com.opensymphony.xwork2.ActionSupport;
import dysec.model.Message;
import dysec.service.IMessageService;


public class MessageAction extends ActionSupport{

	private static final long serialVersionUID = -1530724094076780489L;
	
	@Resource
	private IMessageService messageService;
	
	private String title;
	private String content;
	private String mid;
	private int type;
	private String sendtime;
	private Map<String, Object> map;
	
	public String test() {
		map = new HashMap<String, Object>();
		map.put("1", 1);
		
		return SUCCESS;
	}
	
	public String sendMsg() {
		map = new HashMap<String, Object>();
		Message msg = new Message();
		msg.setTitle(title);
		msg.setContent(content);
		msg.setSendtime(sendtime);
		msg.setType(type);
		if(messageService.addMessage(msg))
			map.put("success", 1);
		else
			map.put("success", 0);
		
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
	public String getMid() {
		return mid;
	}
	public void setMid(String mid) {
		this.mid = mid;
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
	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public void setMap(Map<String, Object> map) {
		this.map = map;
	}

	public Map<String, Object> getMap() {
		return map;
	}

}
