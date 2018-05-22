/**
 * BBD Service Inc
 * All Rights Reserved @2018
 */

package dysec.webSocket;

import javax.persistence.*;
import java.sql.Timestamp;

/**
 * @author Tony
 * @version ChatRecord.java, v0.1 18-4-28 下午3:09 Tony
 */
@Entity
@Table(name = "chatRecord")
/*@DynamicInsert*/
public class ChatRecord {
    private int id;
    private Wuser sender;
    private int receiver;//指定id
    private String content;
    private Timestamp time;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
    //不需要懒加载
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="senderId")
    public Wuser getSender() {
        return sender;
    }

    public void setSender(Wuser sender) {
        this.sender = sender;
    }

    @Column(name = "receiverId")
    public int getReceiver() {
        return receiver;
    }

    public void setReceiver(int receiver) {
        this.receiver = receiver;
    }

    @Column(name = "content",columnDefinition = "LONGTEXT")
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Column(name = "time",columnDefinition = "timestamp default CURRENT_TIMESTAMP")
    public Timestamp getTime() {
        return time;
    }

    public void setTime(Timestamp time) {
        this.time = time;
    }

    public ChatRecord() {
    }

    public ChatRecord(Wuser sender, int receiver, String content) {
        this.sender = sender;
        this.receiver = receiver;
        this.content = content;
        this.time=new Timestamp(System.currentTimeMillis());
    }
}