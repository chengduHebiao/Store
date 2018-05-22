/**
 * BBD Service Inc
 * All Rights Reserved @2018
 */

package dysec.education;

/**
 * @author Tony
 * @version CourseResourceDO.java, v0.1 18-4-26 上午11:49 Tony
 *          课程资源
 */
public class CourseResourceDO extends BaseDO {
    /**
     * 资源名
     */
    private String name;
    /**
     * 课程id
     */
    private Long courseId;
    /**
     * 上传时间
     */
    private String uploadTime;
    /**
     * 下载次数
     */
    private Long downloadCounts;

    /**
     * 存储路径
     */
    private String path;

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public String getUploadTime() {
        return uploadTime;
    }

    public void setUploadTime(String uploadTime) {
        this.uploadTime = uploadTime;
    }

    public Long getDownloadCounts() {
        return downloadCounts;
    }

    public void setDownloadCounts(Long downloadCounts) {
        this.downloadCounts = downloadCounts;
    }
}
