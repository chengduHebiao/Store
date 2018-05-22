/**
 * BBD Service Inc
 * All Rights Reserved @2018
 */

package dysec.education;

/**
 * @author Tony
 * @version HomeWorkDO.java, v0.1 18-4-26 下午12:24 Tony
 */
public class HomeWorkDO extends BaseDO {
    /**
     * 课程id
     */
    private Long courseId;
    /**
     *学生id
     */
    private Long studentId;
    /**
     *教师id
     */
    private Long teacherId;
    /**
     *习题id
     */
    private Long practiceId;
    /**
     *存储路径
     */
    private String path;
    /**
     *上传时间
     */
    private String uploadTime;

    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public Long getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(Long teacherId) {
        this.teacherId = teacherId;
    }

    public Long getPracticeId() {
        return practiceId;
    }

    public void setPracticeId(Long practiceId) {
        this.practiceId = practiceId;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getUploadTime() {
        return uploadTime;
    }

    public void setUploadTime(String uploadTime) {
        this.uploadTime = uploadTime;
    }
}
