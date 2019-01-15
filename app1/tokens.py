import requests
import json

def getData():
    POSTURL = "http://127.0.0.1:8000/api-token-auth/"
    GETURL = "http://127.0.0.1:8000/api/"
    PARAMS = {'username':'testname', 'password':'testpass'}
    HEADERS = {'Content-Type':'application/json'}

    # Generate jwt token with testuser testpass
    newkey = requests.post(url=POSTURL, data = PARAMS)
    t = newkey.text
    k = json.loads(t)
    newkey = ('JWT '+ k["token"])
    print(newkey)

    # Pull api Data with this auth tokenKey
    HEADERS2 = {'Content-Type':'application/json','Authorization':newkey}
    listdata = requests.get(url=GETURL, headers = HEADERS2)
    t = listdata.text
    data = json.loads(t)

    # Send data to front end
    print(data)
