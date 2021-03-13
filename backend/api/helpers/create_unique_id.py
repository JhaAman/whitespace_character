import random
import string

def create_unique_id(len):
    return ''.join(random.choices(string.digits, k=len))