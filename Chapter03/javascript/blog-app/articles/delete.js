'use strict';

module.exports.handler = (event, context, callback) => {
   
	console.log(data.text);
	const response = {
		statusCode: 200,
		body: JSON.stringify({
			message: 'Delete article.'
		 }),
	}
	callback(null, response);
};
