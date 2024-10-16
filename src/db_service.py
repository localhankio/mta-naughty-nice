import pymongo

mongo_url = "mongodb://127.0.0.1:27017/"
mongo_client = pymongo.MongoClient(mongo_url)

db = mongo_client["mta"]

nn_col = db["naughty_nice"]

# doc = {"year": "2023", "month": "01", "naughty": "F", "nice": "L"}

# nn_col.insert_one(doc)
