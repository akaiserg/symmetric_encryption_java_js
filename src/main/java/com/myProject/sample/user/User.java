package com.myProject.sample.user;

import java.util.HashMap;

public class User {

	private static 	HashMap<String, String> USERS= new HashMap<String,String>();
	
	public static final String getPassUser(String user) {
		
		User.USERS.put("user", "123");
		User.USERS.put("user2", "123");
		User.USERS.put("user3", "123");
		
		return User.USERS.get(user);
		
	}

}
