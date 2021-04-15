import random
import string
import io
import json

from rest_framework.renderers import JSONRenderer


"""Create Unique ID

Create a unique digit id with size 'len'

Input: 
    (number) len -- length of digit id

Output:
    (string) id -- unique digit id with size 'len'
"""
def create_unique_id(len):
    return ''.join(random.choices(string.digits, k=len))


def to_json(data):
    return json.dumps(data).encode('utf8')