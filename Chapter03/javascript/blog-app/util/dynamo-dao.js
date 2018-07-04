'use strict';

module.exports = class DynamoDAO {
    constructor(docClient, table) {
        this.dynamo = docClient;
        this.table = table;
    }

    create(model, callback) {
        const params = {
            TableName: this.table,
            Item: model
        };

        this.dynamo.put(params, (error, result) => {
            if (error) {
                console.error(error);
                callback(new Error('Could not save item.'));
                return;
            }

            const response = {
                statusCode: 200,
                body: result.Item,
            };
            callback(null, response);
        });
    }

    read(model, callback) {
        const params = {
            TableName: this.table,
            Key: {
                article_id: model.article_id
            }
        };

        this.dynamo.get(params, (error, result) => {
            if (error) {
                console.error(error);
                callback(new Error('Could not get item.'));
                return;
            }

            const response = {
                statusCode: 200,
                body: result.Item,
            };

            callback(null, response);
        });
    }

    update(model, callback) {
        const params = {
            TableName: this.table,
            Key: {
                article_id: model.article_id
            },
            UpdateExpression: 'set #name = :value',
            ExpressionAttributeNames: {
                '#name': 'text'
            },
            ExpressionAttributeValues: {
                ':value': model.text
            }
        };

        this.dynamo.update(params, (error, result) => {
            if (error) {
                console.error(error);
                callback(new Error('Could not update item.'));
                return;
            }

            const response = {
                statusCode: 200,
                body: result.Item,
            };

            callback(null, response);
        });
    }

    delete(model, callback) {
        const params = {
            TableName: this.table,
            Key: {
                article_id: model.article_id
            }
        };

        this.dynamo.delete(params, (error, result) => {
            if (error) {
                console.error(error);
                callback(new Error('Could not delete item.'));
                return;
            }

            const response = {
                statusCode: 200,
                body: result.Item,
            };

            callback(null, response);
        });
    }

    // caution: scan does not scale for large data sets!
    // better use a data model with hash and range key and
    // retrieve a range of records that belong to the hash key
    // e.g., hash id = "landing_page_articles" and range key =
    // article timestamp
    readAll(callback) {
        const params = {
            TableName: this.table
        };

        this.dynamo.scan(params, (error, result) => {
            if (error) {
                console.error(error);
                callback(new Error('Could not scan items.'));
                return;
            }

            const response = {
                statusCode: 200,
                body: result.Items,
            };

            callback(null, response);
        });
    }
}
