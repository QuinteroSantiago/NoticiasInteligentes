import requests
import pandas as pd
from sentiment_analysis import sentiment_analysis
import json

def news_fetcher():
    # Get URL response
    response = requests.get('https://newsdata.io/api/1/news?apikey=pub_1709389c6917d1ce9fcfbc5f7904091ccdf06&country=es,us,ve&language=es')

    # Store usable response data
    allArticles = response.json()['results']

    # Convert data to DataFrame
    df = pd.DataFrame(allArticles)

    # Add sentiment score to dataframe
    df['sentiment_score'] = 0

    # Traverse DataFrame for sentiment analysis
    for index, row in df.iterrows():
        desc = row['description']
        if pd.isna(desc):
            text = row['title']
        else:
            text = row['description']
        sentiment = sentiment_analysis(text.lower())
        df.at[index, 'sentiment_score'] = sentiment

    # Convert DataFrame to array of JSON objects
    json_array = df.to_dict(orient='records')
    
    return json_array

def create_json_structure(json_array):
    articles_db = {}
    
    for index, row in enumerate(json_array):
        article_id = index + 1
        keywords = row['keywords']
        category = row['category']
        if keywords:
            if isinstance(keywords, list):
                tags = keywords
            else:
                tags = list(set(keywords.split(',')))
        elif category:
            tags = category
        else:
            tags = []
        # tags = list(set(keywords.split(','))) if keywords else []
        articles_db[article_id] = {
            "title": row['title'],
            "imgUrl": row['image_url'],
            "tags": tags,
            "link": row['link'],
            "date": row['pubDate'],
            "sentiment_score": row['sentiment_score'],
        }
    
    return articles_db

def append_to_file(articles_db, file_name='news_articles.json'):
    # Check if the file exists, otherwise create an empty dictionary
    try:
        with open(file_name, 'r') as f:
            existing_data = json.load(f)
    except FileNotFoundError:
        existing_data = {}

    # Append the new articles_db to the existing data
    existing_data.update(articles_db)

    existing_data = unique_ids(existing_data)

    # Write the updated data back to the file
    with open(file_name, 'w') as f:
        json.dump(existing_data, f)

def unique_ids(data):
    # Fix duplicate keys by generating new unique ids
    fixed_data = {}
    seen_titles = set()
    idx = 1
    for item in data.values():
        # Check if the title has not been seen before
        if item["title"] not in seen_titles:
            fixed_data[str(idx)] = item
            seen_titles.add(item["title"])
            idx += 1
    return fixed_data


news_array = news_fetcher()
articles_db = create_json_structure(news_array)
append_to_file(articles_db)
