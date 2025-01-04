import pandas as pd
import numpy as np
from astrapy import DataAPIClient
import os


# ASTRA_DB_TOKEN = os.getenv("ASTRA_DB_TOKEN")
# ASTRA_DB_END_POINT = os.getenv("ASTRA_DB_END_POINT")
ASTRA_DB_TOKEN = "AstraCS:ZLxjbvhQYgLbadbwxOuHEHGT:5d6d7dfba78e10eeb59b93c566fe15035aca24b433aaed755e8fb045b59a472f"
ASTRA_DB_END_POINT = (
    "https://033152bb-1c9c-4b72-b962-b6915056e989-us-east-2.apps.astra.datastax.com"
)

# Connect to Astra DB
client = DataAPIClient(ASTRA_DB_TOKEN)
db = client.get_database_by_api_endpoint(ASTRA_DB_END_POINT)

# Get a collection in Astra DB
collection = db.get_collection("social_engagement_data")

# Query data from Astra DB and display
query_photo = {"post_type": "photo"}
query_video = {"post_type": "video"}
query_carousel = {"post_type": "carousel"}
query_reels = {"post_type": "reels"}
query_text = {"post_type": "text"}

result_photo = collection.find(query_photo).limit(30)
result_video = collection.find(query_video).limit(30)
result_carousel = collection.find(query_carousel).limit(30)
result_reels = collection.find(query_reels).limit(30)
result_text = collection.find(query_text).limit(30)

df_result_photo = pd.DataFrame(result_photo)
df_result_video = pd.DataFrame(result_video)
df_result_carousel = pd.DataFrame(result_carousel)
df_result_reels = pd.DataFrame(result_reels)
df_result_text = pd.DataFrame(result_text)


def prepare_visualization_data(df_photo, df_video, df_carousel, df_reels, df_text):
    """Prepare data for various visualizations"""

    # 1. Average Engagement by Post Type
    engagement_by_type = pd.DataFrame(
        {
            "Post Type": ["Photo", "Video", "Carousel", "Reels", "Text"],
            "Avg Likes": [
                df_photo["likes"].mean(),
                df_video["likes"].mean(),
                df_carousel["likes"].mean(),
                df_reels["likes"].mean(),
                df_text["likes"].mean(),
            ],
            "Avg Comments": [
                df_photo["comments"].mean(),
                df_video["comments"].mean(),
                df_carousel["comments"].mean(),
                df_reels["comments"].mean(),
                df_text["comments"].mean(),
            ],
            "Avg Shares": [
                df_photo["shares"].mean(),
                df_video["shares"].mean(),
                df_carousel["shares"].mean(),
                df_reels["shares"].mean(),
                df_text["shares"].mean(),
            ],
            "Avg Saves": [
                df_photo["saves"].mean(),
                df_video["saves"].mean(),
                df_carousel["saves"].mean(),
                df_reels["saves"].mean(),
                df_text["saves"].mean(),
            ],
        }
    )

    # 2. Engagement Rates by Post Type
    engagement_rates = pd.DataFrame(
        {
            "Post Type": ["Photo", "Video", "Carousel", "Reels", "Text"],
            "Engagement Rate": [
                (
                    (
                        df_photo["likes"]
                        + df_photo["comments"]
                        + df_photo["shares"]
                        + df_photo["saves"]
                    )
                    / df_photo["impressions"]
                ).mean()
                * 100,
                (
                    (
                        df_video["likes"]
                        + df_video["comments"]
                        + df_video["shares"]
                        + df_video["saves"]
                    )
                    / df_video["impressions"]
                ).mean()
                * 100,
                (
                    (
                        df_carousel["likes"]
                        + df_carousel["comments"]
                        + df_carousel["shares"]
                        + df_carousel["saves"]
                    )
                    / df_carousel["impressions"]
                ).mean()
                * 100,
                (
                    (
                        df_reels["likes"]
                        + df_reels["comments"]
                        + df_reels["shares"]
                        + df_reels["saves"]
                    )
                    / df_reels["impressions"]
                ).mean()
                * 100,
                (
                    (
                        df_text["likes"]
                        + df_text["comments"]
                        + df_text["shares"]
                        + df_text["saves"]
                    )
                    / df_text["impressions"]
                ).mean()
                * 100,
            ],
        }
    )

    # 3. Watch Time Analysis (for video content)
    watch_time_data = pd.DataFrame(
        {
            "Post Type": ["Video", "Reels"],
            "Avg Watch Time (seconds)": [
                df_video["watch_time"].mean(),
                df_reels["watch_time"].mean(),
            ],
        }
    )

    # 4. Hashtag Performance
    hashtag_performance = pd.DataFrame(
        {
            "Post Type": ["Photo", "Video", "Carousel", "Reels", "Text"],
            "Avg Hashtags": [
                df_photo["hashtag_count"].mean(),
                df_video["hashtag_count"].mean(),
                df_carousel["hashtag_count"].mean(),
                df_reels["hashtag_count"].mean(),
                df_text["hashtag_count"].mean(),
            ],
            "Avg Engagement": [
                (
                    (df_photo["likes"] + df_photo["comments"]) / df_photo["impressions"]
                ).mean()
                * 100,
                (
                    (df_video["likes"] + df_video["comments"]) / df_video["impressions"]
                ).mean()
                * 100,
                (
                    (df_carousel["likes"] + df_carousel["comments"])
                    / df_carousel["impressions"]
                ).mean()
                * 100,
                (
                    (df_reels["likes"] + df_reels["comments"]) / df_reels["impressions"]
                ).mean()
                * 100,
                (
                    (df_text["likes"] + df_text["comments"]) / df_text["impressions"]
                ).mean()
                * 100,
            ],
        }
    )

    return {
        "engagement_by_type": engagement_by_type,
        "engagement_rates": engagement_rates,
        "watch_time_data": watch_time_data,
        "hashtag_performance": hashtag_performance,
    }