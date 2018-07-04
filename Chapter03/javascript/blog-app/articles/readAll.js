'use strict';

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const readArticle = require('./model.js').readArticle;
const DynamoDAO = require('../util/dynamo-dao.js');
const ArticleController = require('./controller.js');

module.exports.handler = (event, context, callback) => {
    const dynamoDAO = new DynamoDAO(dynamo, 'BlogTable');
    const controller = new ArticleController(dynamoDAO);
    controller.readAllArticles(callback);
};
