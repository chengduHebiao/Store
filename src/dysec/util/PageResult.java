/**
 * BBD Service Inc
 * All Rights Reserved @2018
 */

package dysec.util;

import java.util.List;

/**
 *
 *
 * @author hebiao
 * @version $Id:PageResult.java, v0.1 2018/4/28 18:18 hebiao Exp $$ 
 */
public class PageResult<T> {
    //当前页
    private Integer page;
    //每页显示条数
    private Integer pageSize;
    //总页数
    private Integer pageCount;
    //总条数
    private Integer totalSize;
    //数据
    private List<T> dataObject;

    public PageResult(){

    }
    public PageResult(Integer page, Integer pageSize, Integer totalSize, List<T> dataObject) {
        this.page = page;
        this.pageSize = pageSize;
        this.totalSize = totalSize;
        this.dataObject = dataObject;
    }

    public Integer getPage() {
        return page;
    }

    public void setPage(Integer page) {
        this.page = page;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public Integer getPageCount() {
        return pageCount;
    }

    public void setPageCount(Integer pageCount) {
        this.pageCount = pageCount;
    }

    public Integer getTotalSize() {
        return totalSize;
    }

    public void setTotalSize(Integer totalSize) {
        this.totalSize = totalSize;
    }

    public List<T> getDataObject() {
        return dataObject;
    }

    public void setDataObject(List<T> dataObject) {
        this.dataObject = dataObject;
    }

    @Override
    public String toString() {
        return "PageResult{" +
                "page=" + page +
                ", pageSize=" + pageSize +
                ", pageCount=" + pageCount +
                ", totalSize=" + totalSize +
                '}';
    }
}
