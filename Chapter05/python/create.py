from __future__ import print_function # Python 2/3 compatibility
import json
import boto3
import uuid

def handler(event, context):
    print('received create event{}'.format(event))
    dynamodb = boto3.resource('dynamodb', region_name='eu-central-1')
    table = dynamodb.Table('PyBlogTable')
    id = str(uuid.uuid1())
    body = json.loads(event['body'])
    text = body['text']

    put_response = table.put_item(
        Item = {
            'article_id': id,
            'text': text
            }
        )

    print('put response{}'.format(put_response))

    response = {
        "statusCode": 200,
        "body": json.dumps({"article_id": id})
    }

    return response
