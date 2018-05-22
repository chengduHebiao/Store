/**
 * BBD Service Inc
 * All Rights Reserved @2018
 */

package dysec.webSocket;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

/**
 * @author Tony
 * @version Wuser.java, v0.1 18-4-28 下午3:08 Tony
 */
@Entity
@Table(name = "users")
public class Wuser {
    private int id;
    private String name;
    private String avatar;//头像路径
    private int sex;//0 for male 1 for female
    private Timestamp registerTime;
    private Timestamp loginTime;
    private Set<ChatRecord> chatRecords = new HashSet<>();

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Column(name = "name")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Column(name = "avatar")
    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    @Column(name = "gender")
    public int getSex() {
        return sex;
    }

    public void setSex(int sex) {
        this.sex = sex;
    }

    @Column(name = "registerTime", columnDefinition = "timestamp default CURRENT_TIMESTAMP")
    public Timestamp getRegisterTime() {
        return registerTime;
    }

    public void setRegisterTime(Timestamp registerTime) {
        this.registerTime = registerTime;
    }

    @Column(name = "loginTime", insertable = false)
    public Timestamp getLoginTime() {
        return loginTime;
    }

    public void setLoginTime(Timestamp loginTime) {
        this.loginTime = loginTime;
    }

    @OneToMany(cascade = {CascadeType.ALL}, fetch = FetchType.EAGER, mappedBy = "sender")
    public Set<ChatRecord> getChatRecords() {
        return chatRecords;
    }

    public void setChatRecords(Set<ChatRecord> chatRecords) {
        this.chatRecords = chatRecords;
    }

    public Wuser() {

    }

    public Wuser(String name, String avatar, int sex) {
        this.name = name;
        this.avatar = avatar;
        this.sex = sex;
    }
}