package cn.wangjf.fdw.service;

import cn.wangjf.fdw.dao.RankDao;

public class RankService {

	private RankDao rankDao = new RankDao();
	
	public int saveAndGet(int time) {
		
		int total = rankDao.getAll();
		
		int less = rankDao.getLess(time);
		
		rankDao.save(time);
		
		if (total == 0) {
			return 100;
		}
		
		return (int) (((double) less / total ) * 100);
		
	}
}
