from __future__ import print_function # Python 2/3 compatibility
import json
import boto3
import uuid

def handler(event, context):
    print('received update event{}'.format(event))
    dynamodb = boto3.resource('dynamodb', region_name='eu-central-1')
    table = dynamodb.Table('PyBlogTable')
    body = json.loads(event['body'])
    id = body['article_id']
    text = body['text']

    update_response = table.update_item(
        Key = {
                'article_id': id
            },
        UpdateExpression = 'set #name = :value',
        ExpressionAttributeNames = {
            '#name': 'text'
            },
        ExpressionAttributeValues = {
            ':value': text
            }
        )

    print('update response{}'.format(update_response))

    response = {
        "statusCode": 200,
        "body": json.dumps({"message":"updated"})
    }

    return response
