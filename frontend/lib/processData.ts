import { SocialEngagementDataType } from "@/utils/load-data";

const processData = (engagementData: SocialEngagementDataType[]) => {
  const groupedData = engagementData.reduce((acc, curr) => {
    if (!acc[curr.post_type]) {
      acc[curr.post_type] = {
        likes: [],
        comments: [],
        shares: [],
        saves: [],
        impressions: [],
        watch_time: [],
        hashtag_count: []
      };
    }

    acc[curr.post_type].likes.push(curr.likes);
    acc[curr.post_type].comments.push(curr.comments);
    acc[curr.post_type].shares.push(curr.shares);
    acc[curr.post_type].saves.push(curr.saves);
    acc[curr.post_type].impressions.push(curr.impressions);
    acc[curr.post_type].watch_time.push(curr.watch_time);
    acc[curr.post_type].hashtag_count.push(curr.hashtag_count);

    return acc;
  }, {} as Record<string, { [key: string]: number[] }>);

  return Object.entries(groupedData).map(([postType, metrics]) => {
    const totalEngagements =
      metrics.likes.reduce((a, b) => a + b, 0) +
      metrics.comments.reduce((a, b) => a + b, 0) +
      metrics.shares.reduce((a, b) => a + b, 0) +
      metrics.saves.reduce((a, b) => a + b, 0);

    const totalImpressions = metrics.impressions.reduce((a, b) => a + b, 0);

    return {
      'Post Type': postType.charAt(0).toUpperCase() + postType.slice(1),
      'Likes': Math.round(metrics.likes.reduce((a, b) => a + b, 0) / metrics.likes.length),
      'Comments': Math.round(metrics.comments.reduce((a, b) => a + b, 0) / metrics.comments.length),
      'Shares': Math.round(metrics.shares.reduce((a, b) => a + b, 0) / metrics.shares.length),
      'Saves': Math.round(metrics.saves.reduce((a, b) => a + b, 0) / metrics.saves.length),
      'Engagement Rate': Number(((totalEngagements / totalImpressions) * 100).toFixed(2)),
      'Hashtags': Math.round(metrics.hashtag_count.reduce((a, b) => a + b, 0) / metrics.hashtag_count.length),
      ...(['video', 'reels'].includes(postType) ? {
        'Watch Time': Number((metrics.watch_time.reduce((a, b) => a + b, 0) / metrics.watch_time.length).toFixed(2))
      } : {})
    };
  });
}

export default processData;