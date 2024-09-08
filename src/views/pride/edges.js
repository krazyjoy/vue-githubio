const edgeData = [
    {
        id: 'Twitter_Dataset-positives',
        source: 'Twitter-Dataset',
        target: 'positive-users'

    },
    {
        id: 'Twitter_Dataset-negatives',
        source: 'Twitter-Dataset',
        target: 'negative-users'
    },
    {
        id: 'positives-twitter_timeline',
        source: 'positive-users',
        target: 'twitter-timeline'
    },
    {
        id: 'negatives-twitter_timeline',
        source: 'negative-users',
        target: 'twitter-timeline'
    },
    {
        id: 'timeline-posts',
        source: 'twitter-timeline',
        target: 'user-twitter-posts'
    },
    {   
        id: 'twitter_posts-text',
        source: 'user-twitter-posts',
        target: 'twitter-text'
    },
    {
        id: 'twitter_posts-image',
        source: 'user-twitter-posts',
        target: 'twitter-image'
    },
    {
        id: 'twitter_text-encode_text',
        source: 'twitter-text',
        target: 'encode-text'
    },
    {
        id: 'twitter_image-encode_image',
        source: 'twitter-image',
        target: 'encode-image'
    },
    {
        id: 'encode_text-encoded',
        source: 'encode-text',
        target: 'encoded-text'
    },
    {
        id: 'encode_image-encoded',
        source: 'encode-image',
        target: 'encoded-image'
    },
    {
        id: 'stf_dataset-PHQ9',
        source: 'StudentLife-Dataset',
        target: 'PHQ9'
    },
    {
        id: 'PHQ9-userCol',
        source: 'PHQ9',
        target: 'PHQ9-user'
    },
    {
        id: 'PHQ9-dateCol',
        source: 'PHQ9-user',
        target: 'PHQ9-date'
    },
    {
        id: 'PHQ9-maxCol',
        source: 'PHQ9-user',
        target: 'PHQ9-max'
    },
    {
        id: 'PHQ9-minCol',
        source: 'PHQ9-user',
        target: 'PHQ9-min'
    },
    {
        id: 'PHQ9-meanCol',
        source: 'PHQ9-user',
        target: 'PHQ9-mean'
    },
    {
        id: 'PHQ9-varCol',
        source: 'PHQ9-user',
        target: 'PHQ9-var'
    },
    {
        id: 'PHQ9-stdCol',
        source: 'PHQ9-user',
        target: 'PHQ9-std'
    },
    {
        id: 'PHQ9-medianCol',
        source: 'PHQ9-user',
        target: 'PHQ9-median'
    },
    {
        id: 'PHQ9-skewCol',
        source: 'PHQ9-user',
        target: 'PHQ9-skew'
    },
    {
        id: 'PHQ9-process_df',
        source: 'PHQ9',
        target: 'Process-Dataframe'
    },
    {
        id: 'process_df-clean_sensing_feats',
        source: 'Process-Dataframe',
        target: 'Clean-Sensing-Features'
    },
    {
        id: 'clean_sensing_feats-projection1',
        source: 'Clean-Sensing-Features',
        target: 'projection1'
    },
    {
        id: 'projection1-projected1',
        source: 'projection1',
        target: 'projected1'
    },
    {
        id: 'projected1-projection2',
        source: 'projected1',
        target: 'projection2'
    },
    {
        id: 'projection2-projected2',
        source: 'projection2',
        target: 'projected2'
    }

]

export default edgeData;
