import random
import string

"""Create Unique ID

Create a unique digit id with size 'len'

Input: 
  (number) len -- length of digit id

Output:
  (string) id -- unique digit id with size 'len'
"""
def create_unique_id(len):
    return ''.join(random.choices(string.digits, k=len))