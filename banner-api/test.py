import json





def getTable():
    with open('./geotargets-2019-10-09.json', 'r', encoding='utf-8') as myfile:
        data=myfile.read()

# parse file
    COUNTRY = []
    obj = json.loads(data)

# show values

    for data in obj:
        """  print("Name: " + str(data['Name']))
        print("Canonical Name: " + str(data['CanonicalName']))
        print("Criteria ID: " + str(data['CriteriaID']))
        print("Status: " + str(data['Status'])) """
        COUNTRY.append({
            "Name": str(data['Name']),
            "CanonicalName": str(data['CanonicalName']),
            "CriteriaID": str(data['CriteriaID']),
            "Status":  str(data['Status']) 
            })
    print(COUNTRY)


getTable()