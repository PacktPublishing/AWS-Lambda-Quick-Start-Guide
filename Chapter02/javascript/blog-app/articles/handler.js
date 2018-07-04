'use strict';

module.exports.createArticle = (event, context, callback) => {
	console.log('event is', event);
	console.log('context is', context);
	let remainingTime = context.getRemainingTimeInMillis();
    let functionName = context.functionName;
    let AWSrequestID = context.awsRequestId;

	const response = {
		statusCode: 200,
		body: JSON.stringify({
		     ev: event,
		     rt: remainingTime,
		 })
	}

callback( null, response)
};