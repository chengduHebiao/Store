/**
 * BBD Service Inc
 * All Rights Reserved @2018
 */

package dysec.dao.imp;

import dysec.dao.ICourseDao;
import dysec.education.CourseDO;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author hebiao
 * @version $Id:CourseDao.java, v0.1 2018/4/28 17:49 hebiao Exp $$
 */
@Repository("courseDao")
public class CourseDao extends BaseDao<CourseDO> implements ICourseDao {
    @Override
    public List<CourseDO> findCourseByteacherId(Long teacherId, int pageNo, int pageSize) {
        String hql = "from CourseDO where teacherId= ?";
        Object[] param = {teacherId};
        return this.find(hql, param, pageNo, pageSize);

    }

    @Override
    public Long countTeachersCourses(Long teacherId) {
        String hql = "select count(*) from CourseDO where teacherId= ?";
        Object[] param = {teacherId};
        return this.count(hql, param);
    }
}
