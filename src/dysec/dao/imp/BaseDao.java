package dysec.dao.imp;

import dysec.dao.IBaseDao;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.util.List;


/**
 * baseDao实现
 */
public class BaseDao<T> implements IBaseDao<T> {

    @Autowired
    protected SessionFactory sessionFactory;

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    public SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    public boolean save(T obj) {
        boolean flag = false;
        try {
            this.sessionFactory.getCurrentSession().save(obj);
            flag = true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return flag;
    }

    /* (non-Javadoc)
     * @see dysec.dysec.dao.IBaseDao#delete(java.lang.Object)
     */
    public boolean delete(T obj) {
        boolean flag = false;
        try {
            this.sessionFactory.getCurrentSession().delete(obj);
            flag = true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return flag;
    }

    /* (non-Javadoc)
     * @see dysec.dysec.dao.IBaseDao#update(java.lang.Object)
     */
    public boolean update(T obj) {
        boolean flag = false;
        try {
            this.sessionFactory.getCurrentSession().update(obj);
            flag = true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return flag;
    }

    /* (non-Javadoc)
     * @see dysec.dysec.dao.IBaseDao#saveOrUpdate(java.lang.Object)
     */
    public boolean saveOrUpdate(T obj) {
        boolean flag = false;
        try {
            this.sessionFactory.getCurrentSession().saveOrUpdate(obj);
            flag = true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return flag;
    }

    /* (non-Javadoc)
     * @see dysec.dysec.dao.IBaseDao#find(java.lang.String)
     */
    @SuppressWarnings("unchecked")
    public List<T> find(String hql) {
        // TODO Auto-generated method stub
        try {
            return this.sessionFactory.getCurrentSession().createQuery(hql).list();
        } catch (RuntimeException e) {
            throw e;
        }
    }

    /* (non-Javadoc)
     * @see dysec.dysec.dao.IBaseDao#find(java.lang.String, java.lang.Object[])
     */
    @SuppressWarnings("unchecked")
    public List<T> find(String hql, Object[] param) {
        try {
            Query query = this.sessionFactory.getCurrentSession().createQuery(hql);
            if (param != null && param.length > 0) {
                for (int i = 0; i < param.length; i++) {
                    query.setParameter(i, param[i]);
                }
            }
            return query.list();
        } catch (RuntimeException e) {
            throw e;
        }
    }

    /* (non-Javadoc)
     * @see dysec.dysec.dao.IBaseDao#find(java.lang.String, java.util.List)
     */
    @SuppressWarnings("unchecked")
    public List<T> find(String hql, List<Object> param) {
        try {
            Query query = this.sessionFactory.getCurrentSession().createQuery(hql);
            if (param != null && param.size() > 0) {
                for (int i = 0; i < param.size(); i++) {
                    query.setParameter(i, param.get(i));
                }
            }
            return query.list();
        } catch (RuntimeException e) {
            throw e;
        }

    }

    /* (non-Javadoc)
     * @see dysec.dysec.dao.IBaseDao#find(java.lang.String, java.lang.Object[], java.lang.Integer, java.lang.Integer)
     */
    @SuppressWarnings("unchecked")
    public List<T> find(String hql, Object[] param, Integer page, Integer rows) {
        if (page == null || page < 1) {
            page = 1;
        }
        if (rows == null || rows < 1) {
            rows = 10;
        }
        try {
            Query query = this.sessionFactory.getCurrentSession().createQuery(hql);

            if (param != null && param.length > 0) {
                for (int i = 0; i < param.length; i++) {
                    query.setParameter(i, param[i]);
                }
            }
            return query.setFirstResult((page - 1) * rows).setMaxResults(rows).list();
        } catch (RuntimeException e) {
            throw e;
        }
    }

    /* (non-Javadoc)
     * @see dysec.dysec.dao.IBaseDao#find(java.lang.String, java.util.List, java.lang.Integer, java.lang.Integer)
     */
    @SuppressWarnings("unchecked")
    public List<T> find(String hql, List<Object> param, Integer page,
                        Integer rows) {
        if (page == null || page < 1) {
            page = 1;
        }
        if (rows == null || rows < 1) {
            rows = 10;
        }
        try {
            Query query = this.sessionFactory.getCurrentSession().createQuery(hql);
            if (param != null && param.size() > 0) {
                for (int i = 0; i < param.size(); i++) {
                    query.setParameter(i, param.get(i));
                }
            }
            return query.setFirstResult((page - 1) * rows).setMaxResults(rows).list();
        } catch (RuntimeException e) {
            throw e;
        }
    }

    /* (non-Javadoc)
     * @see dysec.dysec.dao.IBaseDao#get(java.lang.Class, java.io.Serializable)
     */
    @SuppressWarnings("unchecked")
    public T get(Class<T> c, Serializable id) {
        try {
            return (T) this.sessionFactory.getCurrentSession().get(c, id);
        } catch (RuntimeException e) {
            throw e;
        }
    }

    /* (non-Javadoc)
     * @see dysec.dysec.dao.IBaseDao#get(java.lang.String, java.lang.Object[])
     */
    public T get(String hql, Object[] param) {
        try {
            List<T> list = this.find(hql, param);
            if (list != null && list.size() > 0) {
                return list.get(0);
            } else {
                return null;
            }
        } catch (RuntimeException e) {
            throw e;
        }
    }

    /* (non-Javadoc)
     * @see dysec.dysec.dao.IBaseDao#get(java.lang.String, java.util.List)
     */
    public T get(String hql, List<Object> param) {
        try {
            List<T> list = this.find(hql, param);
            if (list != null && list.size() > 0) {
                return list.get(0);
            } else {
                return null;
            }
        } catch (RuntimeException e) {
            throw e;
        }
    }

    /* (non-Javadoc)
     * @see dysec.dysec.dao.IBaseDao#count(java.lang.String)
     */
    public Long count(String hql) {
        // TODO Auto-generated method stub
        try {
            return (Long) this.sessionFactory.getCurrentSession().createQuery(hql).uniqueResult();
        } catch (RuntimeException e) {
            throw e;
        }
    }

    /* (non-Javadoc)
     * @see dysec.dysec.dao.IBaseDao#count(java.lang.String, java.lang.Object[])
     */
    public Long count(String hql, Object[] param) {
        try {
            Query q = this.sessionFactory.getCurrentSession().createQuery(hql);
            if (param != null && param.length > 0) {
                for (int i = 0; i < param.length; i++) {
                    System.out.println(param[i]);
                    q.setParameter(i, param[i]);
                }
            }
            System.out.println(q.uniqueResult());
            System.out.println((Long) q.uniqueResult());
            return (Long) q.uniqueResult();
        } catch (RuntimeException e) {
            throw e;
        }
    }

    /* (non-Javadoc)
     * @see dysec.dysec.dao.IBaseDao#count(java.lang.String, java.util.List)
     */
    public Long count(String hql, List<Object> param) {
        try {
            Query q = this.sessionFactory.getCurrentSession().createQuery(hql);
            if (param != null && param.size() > 0) {
                for (int i = 0; i < param.size(); i++) {
                    q.setParameter(i, param.get(i));
                }
            }
            return (Long) q.uniqueResult();
        } catch (RuntimeException e) {
            throw e;
        }
    }

    /* (non-Javadoc)
     * @see dysec.dysec.dao.IBaseDao#executeHql(java.lang.String)
     */
    public Integer executeHql(String hql) {
        try {
            return this.sessionFactory.getCurrentSession().createQuery(hql).executeUpdate();
        } catch (RuntimeException e) {
            throw e;
        }
    }

    /* (non-Javadoc)
     * @see dysec.dysec.dao.IBaseDao#executeHql(java.lang.String, java.lang.Object[])
     */
    public Integer executeHql(String hql, Object[] param) {
        try {
            Query q = this.sessionFactory.getCurrentSession().createQuery(hql);
            if (param != null && param.length > 0) {
                for (int i = 0; i < param.length; i++) {
                    q.setParameter(i, param[i]);
                }
            }
            return q.executeUpdate();
        } catch (RuntimeException e) {
            throw e;
        }

    }

    /* (non-Javadoc)
     * @see dysec.dysec.dao.IBaseDao#executeHql(java.lang.String, java.util.List)
     */
    public Integer executeHql(String hql, List<Object> param) {
        try {
            Query q = this.sessionFactory.getCurrentSession().createQuery(hql);
            if (param != null && param.size() > 0) {
                for (int i = 0; i < param.size(); i++) {
                    q.setParameter(i, param.get(i));
                }
            }
            return q.executeUpdate();
        } catch (RuntimeException e) {
            throw e;
        }
    }

    @SuppressWarnings("unchecked")
    public List<T> find(String hql, Integer page, Integer rows) {
        if (page == null || page < 1) {
            page = 1;
        }
        if (rows == null || rows < 1) {
            rows = 10;
        }
        try {
            Query query = this.sessionFactory.getCurrentSession().createQuery(hql);
            return query.setFirstResult((page - 1) * rows).setMaxResults(rows).list();
        } catch (RuntimeException e) {
            throw e;
        }
    }


}