import { DataAPIClient } from "@datastax/astra-db-ts";

// Environment variable validation
if (!process.env.ASTRA_DB_TOKEN) {
  throw new Error("ASTRA_DB_TOKEN environment variable is not set");
}

if (!process.env.ASTRA_DB_END_POINT) {
  throw new Error("ASTRA_DB_END_POINT environment variable is not set");
}

// Initialize the client with proper typing
const ASTRA_DB_TOKEN = process.env.ASTRA_DB_TOKEN;
const ASTRA_DB_END_POINT = process.env.ASTRA_DB_END_POINT;

// Define types for your data structure
export interface SocialEngagementDataType {
  _id: string;
  post_id: number;
  post_type: 'photo' | 'video' | 'carousel' | 'reels' | 'text';
  posted_at: string;
  impressions: number;
  likes: number;
  shares: number;
  comments: number;
  saves: number;
  watch_time: number;
  hashtag_count: number;
  mention_count: number;
}

// Create a singleton client instance
const client = new DataAPIClient(ASTRA_DB_TOKEN);

// Initialize database connection
const db = client.db(ASTRA_DB_END_POINT);
const COLLECTION_NAME = 'social_engagement_data';

// Function to check database connection
export const checkConnection = async (): Promise<boolean> => {
  try {
    const collections = await db.listCollections();
    console.log('Connected to AstraDB. Available collections:', collections);
    return true;
  } catch (error) {
    console.error('Failed to connect to AstraDB:', error);
    return false;
  }
};

// Function to get data with proper typing and error handling
export const getData = async (limit: number = 30): Promise<SocialEngagementDataType[]> => {
  try {
    const collection = db.collection<SocialEngagementDataType>(COLLECTION_NAME);
    const data = await collection.find({}).limit(limit).toArray();

    if (!data || data.length === 0) {
      console.warn('No data found in collection');
      return [];
    }

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch data from AstraDB');
  }
};

// Function to get data by post type
export const getDataByPostType = async (
  postType: 'photo' | 'video' | 'carousel' | 'reels' | 'text',
  limit: number = 30
): Promise<SocialEngagementDataType[]> => {
  try {
    const collection = db.collection<SocialEngagementDataType>(COLLECTION_NAME);
    const data = await collection
      .find({ post_type: postType })
      .limit(limit)
      .toArray();

    return data;
  } catch (error) {
    console.error(`Error fetching ${postType} data:`, error);
    throw new Error(`Failed to fetch ${postType} data from AstraDB`);
  }
};

// Initialize connection check
checkConnection().catch(console.error);

// Export the db instance if needed elsewhere
export const astraDb = db;