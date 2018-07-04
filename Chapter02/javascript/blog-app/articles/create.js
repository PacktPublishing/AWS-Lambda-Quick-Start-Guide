'use strict';

module.exports.handler = (event, context, callback) => {
    const data = JSON.parse(event.body);
	if (data.text && typeof data.text !== 'string'){
		console.error('Validation Failed');
		callback(new Error('Body did not contain a text property.'));
		return;
	}
	console.log(data.text);
	const response = {
		statusCode: 200,
		body: JSON.stringify({
			message: 'Created article.'
		 }),
	};
	callback(null, response);
};
