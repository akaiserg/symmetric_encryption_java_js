package com.myProject.sample.servlet;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import com.myProject.sample.aes.AesUtil;
import com.myProject.sample.aes.AesValue;
import com.myProject.sample.util.TimestampValue;

@WebServlet( "/getInformation" )
public class AesResponseServelet extends HttpServlet {
	
    
    
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;


	@Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
    	BufferedReader br = new BufferedReader(new  InputStreamReader(request.getInputStream()));
        String json = "";
        if(br != null){
            json = br.readLine();
        } 
        System.out.println(json);
        
        JSONObject jsonObject = new JSONObject(json);
        String value = jsonObject.getString("data");        
        System.out.println(value);
        String ciphertext = value;
        
        String passphrase = AesValue.PASSPHRASE;
        int iterationCount =AesValue.ITERATION_COUNT;
        int keySize = AesValue.KEY_SIZE;        
        String salt =AesValue.SALT;        
        String iv = AesValue.IV;
                
        AesUtil aesUtil = new AesUtil(keySize, iterationCount);                
        String plaintext = aesUtil.decrypt(salt, iv, passphrase, ciphertext);
        System.out.println(plaintext);
        
        JSONObject obj = new JSONObject();        
    	obj.put("data", aesUtil.encrypt(salt, iv, passphrase, this.generateMessage(plaintext)));    	        
    	response.getWriter().print(obj.toString());
    	
    }
    
    
    private String  generateMessage(String clientMessage){
    	
    	return "message from the server  is: "+TimestampValue.getValue()+".... Message from the client was: "+clientMessage;
    	
    }

    
}
