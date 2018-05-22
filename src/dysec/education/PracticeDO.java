/**
 * BBD Service Inc
 * All Rights Reserved @2018
 */

package dysec.education;

/**
 * @author Tony
 * @version PracticeDO.java, v0.1 18-4-26 下午12:28 Tony
 */
public class PracticeDO extends BaseDO {

    /**
     * 题目
     */
    private String content;
    /**
     * 课程id
     */
    private Long courseId;
    /**
     *教师id
     */
    private Long teacherId;
    /**
     *存储路径
     */
    private String path;
    /**
     *发布时间
     */
    private String createTime;
    /**
     *下载次数
     */
    private Long downloadCounts;

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public Long getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(Long teacherId) {
        this.teacherId = teacherId;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public Long getDownloadCounts() {
        return downloadCounts;
    }

    public void setDownloadCounts(Long downloadCounts) {
        this.downloadCounts = downloadCounts;
    }
}
