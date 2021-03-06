package com.myProject.sample.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet( "/test" )
public class ServletData extends HttpServlet {
    
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
    	String json="{data:\"data from server\"}";
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().print(json);
        
    }
	
	@Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
    	String json="{data:\"data from server post\"}";
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().print(json);
        
    }

}
