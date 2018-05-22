/**
 * BBD Service Inc
 * All Rights Reserved @2018
 */

package dysec.education;

/**
 * @author Tony
 * @version LeaveMessageDO.java, v0.1 18-4-26 上午11:52 Tony
 *          留言
 */
public class LeaveMessageDO extends BaseDO {
    /**
     * 内容
     */
    private String content;
    /**
     * 时间
     */
    private String createTime;
    /**
     * 留言者，可匿名
     */
    private Long userId;

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
