package cn.wangjf.fdw.action;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import cn.wangjf.fdw.service.RankService;

@WebServlet("/RankAction")
public class RankAction extends HttpServlet {
	private static final long serialVersionUID = 1L;
     
	private RankService rankService = new RankService();
	
    public RankAction() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String timeStr = request.getParameter("time");
		if(timeStr == null) {
			return;
		} else {
			int time = Integer.valueOf(timeStr);
			int rank = rankService.saveAndGet(time);
			ActionSupport.printJson(response, rank);
		}
		
		
		
	}

}
