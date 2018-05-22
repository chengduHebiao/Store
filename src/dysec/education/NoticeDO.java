/**
 * BBD Service Inc
 * All Rights Reserved @2018
 */

package dysec.education;

/**
 * @author Tony
 * @version NoticeDO.java, v0.1 18-4-26 上午11:36 Tony
 * 公告
 */
public class NoticeDO extends BaseDO {
    /**
     * 内容
     */
    private String content;
    /**
     * 发布时间
     */
    private String createTime;
    /**
     * 发布用户
     */
    private String userId;

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

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
