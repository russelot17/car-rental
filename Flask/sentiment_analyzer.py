import pandas as pd
df = pd.read_csv('Coachella.csv', encoding='latin-1')
text = df['text'].values

import re
urlRegEx = r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+'
specialRegEx = r"[^A-Za-z0-9 ]"

def preprocessInput(textInput):
    for x in range(len(textInput)):
        textInput[x] = re.sub(urlRegEx, '', textInput[x])
        textInput[x] = re.sub(specialRegEx, '', textInput[x])
    from nltk.stem import PorterStemmer
    ps = PorterStemmer()
    for x in range(len(textInput)):
        stmt = ''
        for y in textInput[x].split():
            stmt = stmt + ps.stem(y) + ' '
        textInput[x] = stmt
    return textInput

text = preprocessInput(text)

# import nltk
# nltk.download('vader_lexicon')

from nltk.sentiment.vader import SentimentIntensityAnalyzer
analyzer = SentimentIntensityAnalyzer()
df['scores'] = df['text'].apply(lambda review: analyzer.polarity_scores(review))
print(df.head())

def analyzeInput(textInput):
    a = analyzer.polarity_scores(textInput[0])
    return a
# df.to_csv('Coachella(Clean).csv')

