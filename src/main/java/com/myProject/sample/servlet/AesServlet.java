package com.myProject.sample.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.myProject.sample.aes.AesUtil;

@WebServlet( "/aes" )
public class AesServlet extends HttpServlet {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String passphrase = request.getParameter("passphrase");
        int iterationCount = Integer.parseInt(request.getParameter("iterationCount"));
        int keySize = Integer.parseInt(request.getParameter("keySize"));
        String salt = request.getParameter("salt");
        String ciphertext = request.getParameter("ciphertext");
        String iv = request.getParameter("iv");
        
        AesUtil aesUtil = new AesUtil(keySize, iterationCount);
        String plaintext = aesUtil.decrypt(salt, iv, passphrase, ciphertext);
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().print(plaintext);
    }
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	
        String passphrase = "the quick brown fox jumps over the lazy dog";
        int iterationCount = 1000;
        int keySize = 128;
        String salt = "3FF2EC019C627B945225DEBAD71A01B6985FE84C95A70EB132882F88C0A59A55";        
        String iv = "F27D5C9927726BCEFE7510B1BDD3D137";
        
        String ciphertext= new String("AzIAWc4Sr6HkmZ8h8OPYYFRD22o2+vdX+Fbn3JMOrhY=");
        
        
        AesUtil aesUtil = new AesUtil(keySize, iterationCount);
        String plaintext = aesUtil.decrypt(salt, iv, passphrase, ciphertext);
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().print(plaintext);
    }

}
