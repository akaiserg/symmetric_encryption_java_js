package com.myProject.sample.util;

import java.sql.Timestamp;

public class TimestampValue {

	private TimestampValue() {		
	}
	
	public static final String getValue(){
		
		 java.util.Date date= new java.util.Date();
		 Timestamp timestamp = new Timestamp(date.getTime());
		 return timestamp.toString();
		
	}

}
