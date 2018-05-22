/**
 * BBD Service Inc
 * All Rights Reserved @2018
 */

package dysec.webSocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpSession;
import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

/**
 * @author Tony
 * @version P2PChatRoom.java, v0.1 18-4-28 下午3:01 Tony
 */
@ServerEndpoint(value = "/chatRoom/{username}"/*configurator = HttpSessionWSHelper.class*/, encoders = {ServerEncoder.class})
@Component
public class P2PChatRoom {
    private Session session;//本身的ws session
    private HttpSession httpSession;//对应的 httpSession
    private static CopyOnWriteArraySet<P2PChatRoom> P2PChatRoomSet = new CopyOnWriteArraySet<>();//保证线程安全
    private Session targetSession;//目标session
    private String targetName;//目标name

    @Autowired
    private UserDao userDao;

    public P2PChatRoom() {
        Log.info("---------------启动webSocket P2PChatRoom聊天室-----------------------");
    }

    //初次连接初始化操作
    private void init(Session session, EndpointConfig config) {
        this.setSession(session);
        HttpSession httpSession = (HttpSession) config.getUserProperties().get(HttpSession.class.getName());
        this.setHttpSession(httpSession);
    }

    //与用户配对
    private void connect2Users(String username, Wuser self) {
        boolean flag = false;
        for (P2PChatRoom p2pChatRoom : P2PChatRoomSet) {
            Wuser user = (Wuser) p2pChatRoom.getHttpSession().getAttribute("user");
            if (user.getName().equals(username)) {
                targetName = username;//必须要在能连接会话的时候赋值
                targetSession = p2pChatRoom.getSession();//获取目标对象的Session

                //同时给对方也连接本身的target
                p2pChatRoom.setTargetSession(session);
                p2pChatRoom.setTargetName(self.getName());
                flag = true;
                break;
            }
        }

        if (flag) {
            ChatRecord sysSelf = new ChatRecord(new Wuser("系统", "000", 0), self.getId(), "*连接" + targetName + "成功");
            ChatRecord sysTarget = new ChatRecord(new Wuser("系统", "000", 0), self.getId(), self.getName() + "请求与您通话！");//不等待对方同意
            try {
                session.getBasicRemote().sendObject(sysSelf);
                targetSession.getBasicRemote().sendObject(sysTarget);
            } catch (Exception e) {
                e.printStackTrace();
            }
            Log.info("会话连接成功");
        } else {
            ChatRecord sysSelf = new ChatRecord(new Wuser("系统", "000", 0), self.getId(), "连接失败.对方不在线");
            try {
                session.getBasicRemote().sendObject(sysSelf);
            } catch (Exception e) {
                e.printStackTrace();
            }
            Log.info("会话连接失败");
        }
    }

    /**
     * 将消息发送给所有人
     *
     * @param msg 消息
     */
    public void send2All(String msg) throws IOException, EncodeException {
        ChatRecord chatRecord = new ChatRecord(new Wuser("系统", "000", 0), 0, msg);
        //发送在线列表
        for (P2PChatRoom p2pChatRoom : P2PChatRoomSet) {
            p2pChatRoom.getSession().getBasicRemote().sendObject(chatRecord);
        }
    }

    /**
     * 发送在线列表
     *
     * @throws IOException     IO异常
     * @throws EncodeException 编码器异常
     */
    private void sendOnlineUsers() throws IOException, EncodeException {
        //当有新用户连接服务器时，将在线列表发送给所有在线用户
        Log.info("发送在线列表");
        Set<Wuser> userSet = new HashSet<>();
        for (P2PChatRoom p2pChatRoom : P2PChatRoomSet) {
            Wuser temp = (Wuser) p2pChatRoom.getHttpSession().getAttribute("user");
            if (temp != null) {
                temp.setChatRecords(null);//不需要加载聊天记录----否则会引起死循环解析
                userSet.add(temp);
            }
        }
        //发送在线列表
        for (P2PChatRoom p2pChatRoom : P2PChatRoomSet) {
            p2pChatRoom.getSession().getBasicRemote().sendObject(userSet);
        }
    }

    @OnOpen
    public void onOpen(@PathParam("username") String username, Session session, EndpointConfig config) {
        try {
            Log.info("正在连接服务器.....，username:" + username);
            init(session, config);
            P2PChatRoomSet.add(this);
            Log.info("服务器当前连接数：" + P2PChatRoomSet.size());

            Wuser self = (Wuser) httpSession.getAttribute("user");
            Log.info("ws自己对应的httpSession：" + self.getName());

            send2All(self.getName() + "上线");

            if (username != null && !username.equals("null")) {
                connect2Users(username, self);
                sendOnlineUsers();
            } else {
                Log.info("*连接服务器成功");
                //发送在线列表
                sendOnlineUsers();
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    @OnMessage
    public void onMessage(Session session, String msg) {
        Wuser self = (Wuser) httpSession.getAttribute("user");
        if (targetName == null || targetSession == null) {
            //未选择私聊的连接者
            Log.info("未选择私聊的连接者:" + self.getName() + " 消息将转发给自己");
            ChatRecord me = new ChatRecord(self, self.getId(), msg);
            try {
                session.getBasicRemote().sendObject(me);
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else {
            Log.info("服务器收到来自" + self.getName() + "转发给" + targetName + "的信息：" + msg);
            Wuser target = userDao.getUserByUsername(targetName);
            ChatRecord chats = new ChatRecord(self, target.getId(), msg);
            //userDao.save(chats);//保存聊天记录----是不是应该发送出去后再保存
            try {
                if (targetSession.isOpen()) {
                    targetSession.getBasicRemote().sendObject(chats);
                } else {
                    session.getBasicRemote().sendObject(new ChatRecord(new Wuser("系统", "000", 0), 0, "对方已下线"));
                }
                // session.getBasicRemote().sendObject(chats);不用发送给自己
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

    }


    @OnError
    public void onError(Session session, Throwable throwable) {
        Wuser user = (Wuser) httpSession.getAttribute("user");
        if (user != null) {
            Log.info("用户:" + user.getName() + " 连接异常. throwable:" + throwable.getMessage());
        } else {
            Log.info("session:" + session.getId() + "连接异常. throwable:" + throwable.getMessage());
        }
    }

    @OnClose
    public void onClose(Session session, CloseReason reason) {
        try {
            Wuser user = (Wuser) httpSession.getAttribute("user");
            P2PChatRoomSet.remove(this);//会不会remove 两次
            if (user != null) {
                Log.info(user.getName() + "断开连接，原因：" + reason.getReasonPhrase());
                //下线提醒
                send2All(user.getName() + "下线");
                //释放连接

            } else {
                Log.info("session:" + session.getId() + "断开连接，原因：" + reason.getReasonPhrase());
            }

            //发送在线列表
            sendOnlineUsers();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    public Session getSession() {
        return session;
    }

    public void setSession(Session session) {
        this.session = session;
    }

    public HttpSession getHttpSession() {
        return httpSession;
    }

    public void setHttpSession(HttpSession httpSession) {
        this.httpSession = httpSession;
    }

    public Session getTargetSession() {
        return targetSession;
    }

    public void setTargetSession(Session targetSession) {
        this.targetSession = targetSession;
    }

    public String getTargetName() {
        return targetName;
    }

    public void setTargetName(String targetName) {
        this.targetName = targetName;
    }

    public static CopyOnWriteArraySet<P2PChatRoom> getP2PChatRoomSet() {
        return P2PChatRoomSet;
    }

    public static void setP2PChatRoomSet(CopyOnWriteArraySet<P2PChatRoom> p2PChatRoomSet) {
        P2PChatRoomSet = p2PChatRoomSet;
    }

    public UserDao getUserDao() {
        return userDao;
    }

    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }
}
