'use strict';

const Article = require('./model.js');

module.exports = class ArticleController {
    constructor(dbDAO) {
        this.dbDAO = dbDAO;
    }

    createArticle(article, callback) {
        this.dbDAO.create(article, (error, result) => {
            if (error) {
                callback(error);
            } else {
                const response = {
                    statusCode: 200,
                    headers: {
                        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                        "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
                    },
                    body: JSON.stringify(article)
                };
                callback(null, response);
            }
        });
    }

    readArticle(article, callback) {
        this.dbDAO.read(article, (error, result) => {
            if (error) {
                callback(error);
            } else {
                const response = {
                    statusCode: 200,
                    headers: {
                        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                        "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
                    },
                    body: JSON.stringify(result.body)
                };
                callback(null, response);
            }
        });
    }

    readAllArticles(callback) {
        this.dbDAO.readAll((error, result) => {
            if (error) {
                callback(error);
            } else {
                const response = {
                    statusCode: 200,
                    headers: {
                        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                        "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
                    },
                    body: JSON.stringify(result.body)
                };
                callback(null, response);
            }
        });
    }

    updateArticle(article, callback) {
        this.dbDAO.update(article, (error, result) => {
            if (error) {
                callback(error);
            } else {
                const response = {
                    statusCode: 200,
                    headers: {
                        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                        "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
                    },
                    body: JSON.stringify(result)
                };
                callback(null, response);
            }
        });
    }

    deleteArticle(article, callback) {
        this.dbDAO.delete(article, (error, result) => {
            if (error) {
                callback(error);
            } else {
                const response = {
                    statusCode: 200,
                    headers: {
                        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                        "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
                    },
                    body: JSON.stringify(result)
                };
                callback(null, response);
            }
        });
    }
}
