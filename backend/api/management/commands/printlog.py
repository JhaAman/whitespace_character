"""Print Log Helper Functions

Org: Team Whitespace Character
Authors: Khai Nguyen, khainguyen@umass.edu
Created: April 24, 2021

Helper functions for console pretty prints
"""

import json


class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'


class Print():
    def header(self, msg):
        msg = json.dumps(msg) if type(msg) is dict else str(msg)
        print(f"{bcolors.HEADER}{msg}{bcolors.ENDC}".format(msg=json.dumps(msg)))
    def msg(self, msg):
        msg = json.dumps(msg) if type(msg) is dict else str(msg)
        print(msg)
    def success(self, msg):
        msg = json.dumps(msg) if type(msg) is dict else str(msg)
        print(f"{bcolors.OKGREEN}{msg}{bcolors.ENDC}".format(msg=json.dumps(msg)))
    def highlight(self, msg):
        msg = json.dumps(msg) if type(msg) is dict else str(msg)
        print(bcolors.OKCYAN + msg + bcolors.ENDC)
    def fail(self, msg):
        msg = json.dumps(msg) if type(msg) is dict else str(msg)
        print(bcolors.FAIL + msg + bcolors.ENDC)