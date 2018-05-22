package dysec.dao;

import java.io.Serializable;
import java.util.List;

/**
 * baseDao接口
 */
public interface IBaseDao<T> {

	/*
	 * 保存一个对象
	 * @param obj
	 * @return
	 */
	public boolean save(T obj);

	/*
	 * 删除一个对象
	 * @param obj
	 * @return boolean
	 */
	public boolean delete(T obj);

	/*
	 * 更新一个对象
	 * @param obj
	 * @return boolean
	 */
	public boolean update(T obj);

	/*
	 * 保存或更新一个对象
	 * @param obj
	 * @return boolean
	 */
	public boolean saveOrUpdate(T obj);

	/*
	 * 查询
	 * @param hql
	 * @return list
	 */
	public List<T> find(String hql);

	/*
	 * 多参数查询
	 * @param hql
	 * @param param
	 * @return List
	 */
	public List<T> find(String hql, Object[] param);

	/*
	 * 多参数查询
	 * @param hql
	 * @param param
	 * @return List
	 */
	public List<T> find(String hql, List<Object> param);

	/*
	 * 查询集合（分页）
	 * @param hql
	 * @param page(第几页)
	 * @param rows(每页显示几条数据)
	 */
	public List<T> find(String hql, Integer page, Integer rows);

	/*
	 * 查询集合（分页）
	 * @param hql
	 * @param param
	 * @param page(第几页)
	 * @param rows(每页显示几条数据)
	 */
	public List<T> find(String hql, Object[] param, Integer page, Integer rows);

	/*
	 * 查询集合（分页）
	 * @param hql
	 * @param param
	 * @param page(第几页)
	 * @param rows(每页显示几条数据)
	 */
	public List<T> find(String hql, List<Object> param, Integer page,
                        Integer rows);

	/*
	 * 获取一个对象
	 * @param obj
	 * @param id
	 * @return Object
	 */
	public T get(Class<T> c, Serializable id);

	/*
	 * 获取一个对象
	 * @param hql
	 * @param param
	 * @return Object
	 */
	public T get(String hql, Object[] param);

	/*
	 * 获取一个对象
	 * @param hql
	 * @param param
	 * @return Object
	 */
	public T get(String hql, List<Object> param);

	/*
	 * select count(*) from 类
	 * @param hql
	 * @return long
	 */
	public Long count(String hql);

	/*
	 * select count(*) from 类
	 * @param hql
	 * @param param
	 * @return long
	 */
	public Long count(String hql, Object[] param);

	/*
	 * select count(*) from 类
	 * @param hql
	 * @param param
	 * @return long
	 */
	public Long count(String hql, List<Object> param);

	/*
	 * 执行HQL语句
	 * @param hql
	 * @return 响应数目
	 */
	public Integer executeHql(String hql);

	/*
	 * 执行HQL语句
	 * @param hql
	 * @param param
	 * @return 响应数目
	 */
	public Integer executeHql(String hql, Object[] param);

	/*
	 * 执行HQL语句
	 * @param hql
	 * @param param
	 * @return
	 */
	public Integer executeHql(String hql, List<Object> param);
}
