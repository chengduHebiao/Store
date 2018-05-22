/**
 * BBD Service Inc
 * All Rights Reserved @2018
 */

package dysec.education;

import javax.persistence.*;

/**
 * @author Tony
 * @version CourseDO.java, v0.1 18-4-26 上午11:44 Tony
 * 课程
 */
@Entity
@Table(name = "course")
public class CourseDO {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * 课程名
     */
    @Column(name = "name")
    private String name;
    /**
     * 教师id,一个课程只有一个教师
     */
    @Column(name = "teacherId")
    private Long teacherId;

    /**
     * 课程周期 单位：周
     */
    @Column(name = "priod")
    private Long priod;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(Long teacherId) {
        this.teacherId = teacherId;
    }

    public Long getPriod() {
        return priod;
    }

    public void setPriod(Long priod) {
        this.priod = priod;
    }
}
