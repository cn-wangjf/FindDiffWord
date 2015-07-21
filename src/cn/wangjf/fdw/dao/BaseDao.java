package cn.wangjf.fdw.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public abstract class BaseDao {

	protected final Connection getConn() {
		Connection conn = null;
		try {
			Class.forName("org.sqlite.JDBC");
			String dbPath = this.getClass().getClassLoader().getResource("\\").getPath() + "game.db";
			conn = DriverManager.getConnection("jdbc:sqlite:" + dbPath);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return conn;
	}

	protected final void close(Object... objs) {
		try {
			for (Object obj : objs) {
				
				if(obj == null) {
					continue;
				}
				
				if (obj instanceof ResultSet) {
					((ResultSet) obj).close();
				} else if (obj instanceof Statement) {
					((Statement) obj).close();
				} else if (obj instanceof Connection) {
					((Connection) obj).close();
				} else {
					throw new IllegalArgumentException();
				}
				obj = null;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
