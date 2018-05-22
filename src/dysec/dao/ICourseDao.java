/**
 * BBD Service Inc
 * All Rights Reserved @2018
 */

package dysec.dao;

import dysec.education.CourseDO;

import java.util.List;

/**
 *
 *
 * @author hebiao
 * @version $Id:ICourseDao.java, v0.1 2018/4/28 17:42 hebiao Exp $$
 */
public interface ICourseDao extends IBaseDao<CourseDO>{
    /**
     * 查询老师的课程列表
     * @param teacherId
     * @param pageNo
     * @param pageSize
     * @return
     */
    List<CourseDO> findCourseByteacherId(Long teacherId,int pageNo,int pageSize);

    /**
     * 统计老师的课程总数目
     * @param teacherId
     * @return
     */
    Long countTeachersCourses(Long teacherId);


}
