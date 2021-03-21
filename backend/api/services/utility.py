import random
import string

"""
create a unique digit id with size $len$

input: 
  number len : length of digit id

output:
  string id : unique digit id with size $len$
"""
def create_unique_id(len):
    return ''.join(random.choices(string.digits, k=len))