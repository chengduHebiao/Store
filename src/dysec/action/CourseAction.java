/**
 * BBD Service Inc
 * All Rights Reserved @2018
 */

package dysec.action;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import dysec.education.CourseDO;
import dysec.education.UserDO;
import dysec.service.ICourseService;
import dysec.util.PageResult;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author hebiao
 * @version $Id:CourseAction.java, v0.1 2018/4/28 18:04 hebiao Exp $$
 */
public class CourseAction extends ActionSupport {
    @Autowired
    private ICourseService courseService;

    public Map<String, Object> getMap() {
        return map;
    }

    public void setMap(Map<String, Object> map) {
        this.map = map;
    }

    private Map<String, Object> map;
    private int pageNo;//当前页
    private int pageSize =6;//每页条数


    /**
     * 分页查询课程
     * @return
     */
    public String getCourseList() {
        map = new HashMap<>();
        Map session = ActionContext.getContext().getSession();
        UserDO user = (UserDO) session.get("uid");
        UserDO user1 =new UserDO();
        user1.setId(1L);
        user1.setRoleType(2);
        List<CourseDO> courseDOList = new ArrayList<>();
        PageResult<CourseDO> pageResult = new PageResult<>();
        if (user1 != null) {
            if (user1.getRoleType().equals(2)) {
                courseDOList = courseService.findCourseByteacherId(user1.getId(), pageNo, pageSize);
                map.put("total",courseService.countTeachersCourses(user1.getId()).intValue());
               // pageResult = new PageResult<>(pageNo, pageSize, courseService.countTeachersCourses(user1.getId()).intValue(), courseDOList);

            } else if (user1.getRoleType().equals(1)) {
                courseDOList = courseService.findCourseByStudentId(user1.getId(), pageNo, pageSize);
               // pageResult = new PageResult<>(pageNo, pageSize, courseService.countTeachersCourses(user.getId()).intValue(), courseDOList);
            }

        }

        map.put("rows", courseDOList);
        return SUCCESS;
    }


}
