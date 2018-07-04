from __future__ import print_function # Python 2/3 compatibility
import json
import boto3

def handler(event, context):
    print('received delete event{}'.format(event))
    dynamodb = boto3.resource('dynamodb', region_name='eu-central-1')
    table = dynamodb.Table('PyBlogTable')
    body = json.loads(event['body'])
    id = body['article_id']

    delete_response = table.delete_item(
        Key = {
            'article_id': id
            }
        )

    print('delete response{}'.format(delete_response))

    response = {
        "statusCode": 200,
        "body": json.dumps({"message":"deleted"})
    }

    return response
