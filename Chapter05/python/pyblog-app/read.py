from __future__ import print_function # Python 2/3 compatibility
import json
import boto3

def handler(event, context):
    print('received read event{}'.format(event))
    dynamodb = boto3.resource('dynamodb', region_name='eu-central-1')
    table = dynamodb.Table('PyBlogTable')
    params = event['pathParameters']
    id = params['article_id']

    get_response = table.get_item(
        Key = {
            'article_id': id
            }
        )

    print('get response{}'.format(get_response))

    response = {
        "statusCode": 200,
        "body": json.dumps(get_response['Item'])
    }

    return response
