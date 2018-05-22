/**
 * BBD Service Inc
 * All Rights Reserved @2018
 */

package dysec.service;

import dysec.education.CourseDO;

import java.util.List;

/**
 * @author hebiao
 * @version $Id:ICourseService.java, v0.1 2018/4/28 17:57 hebiao Exp $$
 */
public interface ICourseService {
    /**
     * 查询老师的课程列表
     *
     * @param teacherId
     * @param pageNo
     * @param pageSize
     * @return
     */
    List<CourseDO> findCourseByteacherId(Long teacherId, int pageNo, int pageSize);

    /**
     * 统计老师的课程总数目
     *
     * @param teacherId
     * @return
     */
    Long countTeachersCourses(Long teacherId);


    /**
     * 查询学生的已经选的课程列表
     *
     * @param studentId
     * @param pageNo
     * @param pageSize
     * @return
     */
    List<CourseDO> findCourseByStudentId(Long studentId, int pageNo, int pageSize);


    /**
     * 统计学生的课程总数目
     *
     * @param teacherId
     * @return
     */
    Long countStudentCourses(Long teacherId);
}
