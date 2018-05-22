/**
 * BBD Service Inc
 * All Rights Reserved @2018
 */

package dysec.education;

/**
 * @author Tony
 * @version UserDO.java, v0.1 18-4-26 上午11:28 Tony
 *          用户表
 */
public class UserDO extends BaseDO {
    /**
     * 用户名
     */
    private String userName;
    /**
     * 密码
     */
    private String passWord;
    /**
     * 真实姓名
     */
    private String trueName;
    /**
     * 用户类型：0 管理员 1 学生 2 教师
     */
    private Integer roleType;
    /**
     * 联系方式
     */
    private String tel;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassWord() {
        return passWord;
    }

    public void setPassWord(String passWord) {
        this.passWord = passWord;
    }

    public String getTrueName() {
        return trueName;
    }

    public void setTrueName(String trueName) {
        this.trueName = trueName;
    }

    public Integer getRoleType() {
        return roleType;
    }

    public void setRoleType(Integer roleType) {
        this.roleType = roleType;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    @Override
    public String toString() {
        return "UserDO[" +
                "userName='" + userName + '\'' +
                ", passWord='" + passWord + '\'' +
                ", trueName='" + trueName + '\'' +
                ", roleType=" + roleType +
                ", tel='" + tel + '\'' +
                ']';
    }
}
