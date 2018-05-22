package dysec.service.imp;

import javax.annotation.Resource;

import dysec.dao.IMessageDao;
import dysec.model.Message;
import dysec.service.IMessageService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;




@Service("messageService")
@Transactional
public class MessageService implements IMessageService {

	@Resource
	private IMessageDao messageDao;
	
	public boolean addMessage(Message message) {
		return messageDao.save(message);
	}
}
