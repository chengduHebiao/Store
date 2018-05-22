package dysec.dao.imp;

import dysec.dao.IMessageDao;
import dysec.model.Message;
import org.springframework.stereotype.Repository;



@Repository("messageDao")
public class MessageDao extends BaseDao<Message> implements IMessageDao {
	
}
