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
import com.myProject.sample.aes.AesValueItranet;
import com.myProject.sample.user.User;
import com.myProject.sample.util.TimestampValue;

@WebServlet( "/getInformationIntranet" )
public class AesResponseIntranetServelet extends HttpServlet {
	
    
    
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
        String data = jsonObject.getString("data");
        String user =null;
        
        String finalMessage=null;
        if(jsonObject.has("user")){
        	user= jsonObject.getString("user");
        	String plaintext=this.decipherMessage(user, data);
        	finalMessage=this.cipherMessage(user, this.generateMessage(plaintext));
        }else{
        	finalMessage=this.generateMessage(data);
        }
        
        
        JSONObject obj = new JSONObject();        
        obj.put("user",user);
    	obj.put("data",finalMessage);    	        
    	response.getWriter().print(obj.toString());
    
    }
    
    
	
	private  String decipherMessage(String user, String data){
		
		String passphrase =User.getPassUser(user); 
        int iterationCount =AesValueItranet.ITERATION_COUNT;
        int keySize = AesValueItranet.KEY_SIZE;        
        String salt =AesValueItranet.SALT;        
        String iv = AesValueItranet.IV;
                
        AesUtil aesUtil = new AesUtil(keySize, iterationCount);                
        String plaintext = aesUtil.decrypt(salt, iv, passphrase, data);
        System.out.println("------->"+plaintext);
        return plaintext;
    
	}
	
	private  String cipherMessage(String user, String data){
		
		String passphrase =User.getPassUser(user);
		String salt =AesValueItranet.SALT;        
        String iv = AesValueItranet.IV;
        int iterationCount =AesValueItranet.ITERATION_COUNT;
        int keySize = AesValueItranet.KEY_SIZE;
        AesUtil aesUtil = new AesUtil(keySize, iterationCount);
		String cipheredMessage=aesUtil.encrypt(salt, iv, passphrase, data);
		return cipheredMessage;
 
    
	}
	 	
    private String  generateMessage(String clientMessage){
    	
    	return "message from the server  is: <b>"+TimestampValue.getValue()+"</b>.... Message from the client was: <b>"+clientMessage+"</br>";
    	
    }

    
}
