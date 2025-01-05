import pandas as pd
from astrapy import DataAPIClient
import os

df = pd.read_csv("mock_social_data.csv")


ASTRA_DB_TOKEN = os.getenv("ASTRA_DB_TOKEN")
ASTRA_DB_END_POINT = os.getenv("ASTRA_DB_END_POINT")

# Connect to Astra DB
client = DataAPIClient(ASTRA_DB_TOKEN)
db = client.get_database_by_api_endpoint(ASTRA_DB_END_POINT)


# Create a collection in Astra DB
collection = db.create_collection("social_engagement_data")
print(f"Connected to Astra DB: {db.list_collection_names()}")


# Load data into Astra DB
collection.insert_many(df.to_dict(orient="records"))
print(f"Data loaded into Astra DB: {collection.count_documents({})} records")

# Query data from Astra DB and display
query = {"post_type": "photo"}
result = collection.find(query).limit(10)

df_result = pd.DataFrame(result)
print(df_result.head())