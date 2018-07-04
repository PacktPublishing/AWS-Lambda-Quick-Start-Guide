package com.amazonaws.lambda.demo;

import java.io.IOException;

import org.junit.BeforeClass;
import org.junit.Test;

import com.amazonaws.services.lambda.runtime.Context;

import com.amazonaws.services.lambda.runtime.events.S3Event;

/**
 * A simple test harness for locally invoking your Lambda function handler.
 */
public class S3FunctionHandlerTest {

    private static S3Event input;

    @BeforeClass
    public static void createInput() throws IOException {
        input = TestUtils.parse("s3-event.put.json", S3Event.class);
    }

    private Context createContext() {
        TestContext ctx = new TestContext();

        // TODO: customize your context here if needed.
        ctx.setFunctionName("Your Function Name");

        return ctx;
    }

    @Test
    public void testS3FunctionHandler() {
        S3FunctionHandler handler = new S3FunctionHandler();
        Context ctx = createContext();

        Object output = handler.handleRequest(input, ctx);

        // TODO: validate output here if needed.
        if (output != null) {
            System.out.println(output.toString());
        }
    }
}
