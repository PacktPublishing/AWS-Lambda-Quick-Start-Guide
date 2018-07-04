'use strict';

const uuid = require('uuid');

class Article {
    constructor(id, text) {
        this.article_id = id;
        this.text = text;
    }
}

const createArticle = (event, callback) => {
    validateAttributes(event, callback);
    const body = JSON.parse(event.body);
    const id = uuid.v1();
    const text = body.text;
    return new Article(id, text);
}

const readArticle = (event, callback) => {
    validateGetId(event, callback);
    const params = event.pathParameters;
    const id = params.id;
    return new Article(id);
}

const updateArticle = (event, callback) => {
    validateId(event, callback);
    validateAttributes(event, callback);
    const body = JSON.parse(event.body);
    const id = body.article_id;
    const text = body.text;
    return new Article(id, text);
}

const deleteArticle = (event, callback) => {
    validateId(event, callback);
    const body = JSON.parse(event.body);
    const id = body.article_id;
    return new Article(id);
}

// Private validation functions
const validateAttributes = (event, callback) => {
    const body = JSON.parse(event.body);
    if (typeof body.text !== 'string') {
        console.error('Validation Failed');
        callback(new Error('Body did not contain a text property of type string.'));
        process.exit(1);
    }
};
const validateId = (event, callback) => {
    const body = JSON.parse(event.body);
    if (typeof body.article_id !== 'string') {
        console.error('Validation Failed');
        callback(new Error('Body did not contain an article_id property of type string.'));
        process.exit(1);
    }
};
const validateGetId = (event, callback) => {
    const params = event.pathParameters;
    if (typeof params.id !== 'string') {
        console.error('Validation Failed');
        callback(new Error('No id path parameter of type string. Please use GET articles/{id}.'));
        process.exit(1);
    }
};

module.exports = {
    Article: Article,
    createArticle: createArticle,
    readArticle: readArticle,
    updateArticle: updateArticle,
    deleteArticle: deleteArticle
}
