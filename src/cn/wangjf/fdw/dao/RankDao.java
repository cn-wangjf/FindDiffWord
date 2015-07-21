package cn.wangjf.fdw.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class RankDao extends BaseDao {

	public int getAll() {
		Connection conn = getConn();
		PreparedStatement ps = null;
		ResultSet rs = null;
		int total = 0;
		try {
			ps = conn.prepareStatement("select sum(amount) as total from time_rank");
			rs = ps.executeQuery();
			total = rs.getInt("total");
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close(rs, ps, conn);
		}
		return total;
	}
	
	public int getLess(int time) {
		Connection conn = getConn();
		PreparedStatement ps = null;
		ResultSet rs = null;
		int total = 0;
		try {
			ps = conn.prepareStatement("select sum(amount) as total from time_rank where time >= ?");
			ps.setInt(1, time);
			rs = ps.executeQuery();
			total = rs.getInt("total");
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close(rs, ps, conn);
		}
		return total;
	}

	public void save(int time) {
		Connection conn = getConn();
		PreparedStatement ps = null;
		PreparedStatement ps2 = null;
		try {
			ps = conn.prepareStatement("update time_rank set amount = amount + 1 where time = ?");
			ps.setInt(1, time);
			int row = ps.executeUpdate();
			if(row == 0) {
				ps2 = conn.prepareStatement("insert into time_rank(time, amount) values (?, 1)");
				ps2.setInt(1, time);
				ps2.executeUpdate();
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close(ps, ps2, conn);
		}
	}
}
