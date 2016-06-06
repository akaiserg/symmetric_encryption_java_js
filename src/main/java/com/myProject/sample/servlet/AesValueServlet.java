package com.myProject.sample.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.myProject.sample.service.CipheredInformation;

@WebServlet( "/getInfoSite" )
public class AesValueServlet extends HttpServlet {
	    
    
   	private static final long serialVersionUID = 1L;

	@Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
    	
    	response.setStatus(HttpServletResponse.SC_OK);
    	response.getWriter().print(CipheredInformation.getObfuscatedJs());
    	
    }   
    
}
