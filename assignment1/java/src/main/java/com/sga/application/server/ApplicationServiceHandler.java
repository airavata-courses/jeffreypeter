package com.sga.application.server;

import org.apache.thrift.TException;
import org.json.JSONException;
import org.json.JSONObject;

public class ApplicationServiceHandler implements ApplicationService.Iface {

    @Override
    public java.lang.String communicate(java.lang.String input) throws TException {
		System.out.println("IN:JAVA::Communicate");
    	String response = "";
		try {
			JSONObject obj = new JSONObject(input);
			java.lang.String text = obj.getString("text") + ":InJava";
			System.out.println("text::"+text);
			obj.put("text",text);
			response = obj.toString();
		} catch(JSONException e) {
			System.out.println("IN:JAVA::Exception::"+e.getMessage());
			e.printStackTrace();
			JSONObject obj = new JSONObject(input);
			obj.put("msg","Invalid input characters");
			response = obj.toString();
		}
        return response;
    }

}