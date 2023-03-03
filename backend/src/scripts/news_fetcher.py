import requests
import json
import csv
import pandas as pd
from deep_translator import GoogleTranslator
from textblob import TextBlob
import os


def news_fetcher():
    # Get URL response
    response = requests.get('https://newsdata.io/api/1/news?apikey=pub_1709389c6917d1ce9fcfbc5f7904091ccdf06&country=es,us,ve&language=es')

    # Store usable response data
    allArticles = response.json()['results']


    # Store Data in json file
    with open('data.json', 'w') as f:
        json.dump(allArticles, f)
        

    # Convert data to csv
    with open('data.json') as json_file:
        data = json.load(json_file)
        
    data_file = open('data_file.csv', 'w')
    csv_writer = csv.writer(data_file)
    count = 0

    for column in data:
        if count == 0:
            header = column.keys()
            csv_writer.writerow(header)
            count += 1
        csv_writer.writerow(column.values())
    data_file.close()


    # Store Data in data frame
    df = pd.read_csv('data_file.csv')

    # Add sentiment score to dataframe
    df[['sentiment_score']] = 0

    # Traverse DataFrame for sentiment analysis
    for index, row in df.iterrows():
        desc = row['description']
        if isinstance(desc, float):
            text = GoogleTranslator(source='es', target='en').translate(row['title'])
        else:
            text = GoogleTranslator(source='es', target='en').translate(row['description'])
        text = text.lower()
        blob = TextBlob(text)
        sentiment = blob.sentiment.polarity
        df['sentiment_score'] = df['sentiment_score'].replace(['sentiment_score'])
        df.at[index,'sentiment_score'] = sentiment
    print(df)

    out = df.to_json(orient='records')[1:-1].replace('},{', '} {')
    with open('news_articles.json', 'w') as f:
        f.write(out)

def file_deleter():
    file1 = 'data_file.csv'
    if(os.path.exists(file1) and os.path.isfile(file1)):
        os.remove(file1)
        print("file deleted")
    else:
        print("file not found")

    file2 = 'data.json'
    if(os.path.exists(file2) and os.path.isfile(file2)):
        os.remove(file2)
        print("file deleted")


news_fetcher()
file_deleter()