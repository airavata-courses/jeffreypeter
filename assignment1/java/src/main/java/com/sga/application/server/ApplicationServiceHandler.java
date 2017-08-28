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
			obj.put("text",obj.getString("text") + ":InJava");
			response = obj.toString();
		} catch(JSONException e) {
			e.printStackTrace();
		}
        return response;
    }

}