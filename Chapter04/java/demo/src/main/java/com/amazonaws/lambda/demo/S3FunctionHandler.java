package com.amazonaws.lambda.demo;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.S3Event;
import com.amazonaws.services.s3.event.S3EventNotification.S3EventNotificationRecord;
import com.amazonaws.services.s3.event.S3EventNotification.S3ObjectEntity;

public class S3FunctionHandler implements RequestHandler<S3Event, Object> {

    @Override
    public Object handleRequest(S3Event input, Context context) {
        for(S3EventNotificationRecord rec : input.getRecords()) {
        	context.getLogger().log("Event Name: " + rec.getEventName() + "\n");
        	context.getLogger().log("Event Source: " + rec.getEventSource() + "\n");
        	S3ObjectEntity s3object = rec.getS3().getObject();
        	context.getLogger().log("S3 Object Key: " + s3object.getKey() + "\n");
        }

        // TODO: implement your handler
        return null;
    }

}
