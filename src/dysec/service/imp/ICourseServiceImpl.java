/**
 * BBD Service Inc
 * All Rights Reserved @2018
 */

package dysec.service.imp;

import dysec.dao.imp.CourseDao;
import dysec.education.CourseDO;
import dysec.service.ICourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author hebiao
 * @version $Id:ICourseServiceImpl.java, v0.1 2018/4/28 17:59 hebiao Exp $$
 */
@Service
@Transactional
public class ICourseServiceImpl implements ICourseService {
    @Autowired
    private CourseDao courseDao;

    @Override
    public List<CourseDO> findCourseByteacherId(Long teacherId, int pageNo, int pageSize) {
        return courseDao.findCourseByteacherId(teacherId, pageNo, pageSize);
    }

    @Override
    public Long countTeachersCourses(Long teacherId) {
        return courseDao.countTeachersCourses(teacherId);
    }

    @Override
    public List<CourseDO> findCourseByStudentId(Long studentId, int pageNo, int pageSize) {
        return null;
    }

    @Override
    public Long countStudentCourses(Long teacherId) {
        return null;
    }
}
