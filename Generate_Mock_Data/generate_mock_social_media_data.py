import random
import pandas as pd
import numpy as np
from datetime import datetime, timedelta


# Number of posts
n_posts = 1000

post_types = ["photo", "video", "carousel", "reels", "text"]

# Create data
data = {
    "post_id": range(1, n_posts + 1),
    "post_type": np.random.choice(
        post_types,
        n_posts,
        p=[0.3, 0.2, 0.25, 0.15, 0.1],
    ),
    "posted_at": [
        (datetime.now() - timedelta(days=int(x))).strftime("%Y-%m-%d %H:%M:%S")
        for x in np.random.randint(0, 90, n_posts)
    ],
    "impressions": np.random.randint(1000, 50000, n_posts),
    "likes": np.random.randint(100, 5000, n_posts),
    "shares": np.random.randint(10, 1000, n_posts),
    "comments": np.random.randint(5, 500, n_posts),
    "saves": np.random.randint(5, 300, n_posts),
    # Advanced metrics
    "watch_time": np.random.uniform(0, 300, n_posts),  # seconds
    "hashtag_count": np.random.randint(1, 10, n_posts),
    "mention_count": np.random.randint(0, 5, n_posts),
}

# Create DataFrame
df = pd.DataFrame(data)

# Display the DataFrame
# df.head()

# save into csv
df.to_csv("mock_social_data.csv", index=False)