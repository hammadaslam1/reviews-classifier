from flask import Flask
import spacy
import json
# import en_core_web_sm  # noqa: F401

from spacy.lang.en import English  # noqa: F401
import nltk
from nltk.sentiment import SentimentAnalyzer, SentimentIntensityAnalyzer
nltk.download('vader_lexicon')



# import Flask

app = Flask(__name__)




positives = [ 'good','awesome','superb','marvellous','delight','proud','eager','cheer','glowing','smile','laughter','paradise','bright','honesty','trust','affectionate','beloved','rapture','heartwarming','flourish','rejoice','satisfy','success','achievement','victory','blessing','fortune','enrich','valuable','outstanding','exceptional','unique','perfect', 'admirably', 'admire', 'admirable', 'Love', 'Happy', 'Joy', 'Excited', 'Wonderful', 'Fantastic', 'Excellent', 'Great', 'Amazing', 'Beautiful', 'Brilliant', 'Delightful', 'Fabulous', 'Glorious', 'Magnificent', 'Marvelous', 'Pleasant',  'Spectacular', 'Splendid', 'Cheerful', 'Vibrant', 'Energetic', 'Euphoric', 'Ecstatic', 'Blissful', 'Exhilarated', 'Elated', 'Enthusiastic', 'Optimistic', 'Content', 'Bless', 'Thrilled', 'Satisfied',  'Fulfilled', 'Triumphant',  'Sunny', 'Resplendent', 'Gleeful', 'Rejuvenated', 'Hopeful', 'Uplifted', 'Exuberant',  'Serene', 'Alive', 'Bubbly', 'Buoyant', 'Lively', 'Merry', 'Playful',  'Satisfying', 'Brave', 'Calm', 'Compassionate',  'Courageous', 'Determined', 'Empowered',  'Generous',  'Gracious', 'Honest',  'Intelligent', 'Kind', 'Motivated', 'Passionate', 'Patient',  'Rational', 'Reassuring', 'Refreshing',  'Sympathetic', 'Tranquil', 'Understanding',     'Zesty', 'Adventurous', 'Charming', 'Cherished', 'Creative', 'Dazzling', 'Empathetic', 'Enchanting', 'Endearing', 'Fascinating', 'Friendly', 'Genuine', 'Graceful', 'Harmonious', 'Humble', 'Incredible', 'Innovative', 'Inspiring', 'Jovial', 'Kind-hearted', 'Liberated', 'Merciful', 'Nurturing', 'Open-minded',  'Poised', 'Powerful',  'Resourceful', 'Sincere', 'Soulful', 'Stunning', 'Thriving', 'Transformative', 'Unwavering', 'Vivacious', 'Wholesome', 'Youthful', 'Zealous', 'Abundant', 'Bountiful', 'Benevolent', 'Capable', 'Confident', 'Courteous', 'Effervescent', 'Empowering', 'Engaging', 'Fearless', 'Grateful', 'Hospitable', 'Inventive', 'Jubilant',  'Magnetic', 'Noble', 'Original',  'Practical', 'Proactive', 'Prosperous', 'Purposeful', 'Radiant', 'Reliable', 'Remarkable', 'Spirited', 'Stimulating', 'Successful', 'Supportive', 'Tenacious',  'Victorious', 'Whimsical', 'Wise', 'Witty']

positive_words = [a.lower() for a in positives]
# print(positive_words)

negatives = ['sad', 'bad','unhappy','terrible','awful','horrible','miserable','sorrow','distress','depress','disastrous','irritate','upset','disappoint','inferior','faulty','flaw','unpleasant','disgust','offensive','disgrace','shameful','unfortunate','unlucky','regrettable','pessimistic','hopeless','agony','malicious','disrespect','insult','unkind','harsh','unfair','cruel','violence','hate','conflict','harmful','danger','fail','loss','injure','suffer','damage','destruct','ruin','reject','abandon','neglect', 'cons', 'Angry', 'Sad', 'Disappointed', 'Frustrated', 'Annoyed', 'Unhappy', 'Hateful', 'Terrible', 'Awful', 'Horrible', 'Anxious', 'Depressed', 'Miserable', 'Dismal', 'Gloomy', 'Melancholy', 'Grief', 'Sorrow', 'Despair', 'Pessimistic', 'Dreadful', 'Troubled', 'Distressed', 'Furious', 'Offended', 'Insulted', 'Enraged', 'Hostile', 'Bitter', 'Resentful', 'Aggressive', 'Hurtful', 'Cruel', 'Mean', 'Unpleasant', 'Dismayed', 'Discouraged', 'Disheartened', 'Hopeless', 'Desperate', 'Frightened', 'Panicked', 'Terrified', 'Nervous', 'Worried', 'Stressed', 'Insecure', 'Uneasy', 'Timid', 'Embarrassed', 'Humiliated', 'Guilty', 'Ashamed', 'Inferior', 'Worthless', 'Inadequate', 'Incapable', 'Incompetent', 'Insignificant', 'Inferior', 'Powerless', 'Invisible', 'Bored', 'Tired', 'Exhausted', 'Weary', 'Drained', 'Drowsy', 'Sleepy', 'Sluggish', 'Lazy', 'Unmotivated', 'Indifferent', 'Apathetic', 'Bored', 'Dull', 'Lifeless', 'Stagnant', 'Stupid', 'Ignorant', 'Naive', 'Silly', 'Gullible', 'Inattentive', 'Forgetful', 'Neglectful', 'Careless', 'Irresponsible', 'Reckless', 'Inconsiderate', 'Insensitive', 'Selfish', 'Greedy', 'Inhumane', 'Cynical', 'Skeptical', 'Suspicious', 'Paranoid', 'Judgmental', 'Critical', 'Picky', 'Stubborn', 'Argumentative', 'Defensive', 'Aggressive', 'Violent', 'Reckless', 'Rude', 'Impolite', 'Offensive', 'Disrespectful', 'Disobedient', 'Rebellious', 'Reproachful', 'Blaming', 'Critical', 'Manipulative', 'Deceitful', 'Dishonest', 'Corrupt', 'Fraudulent', 'Malicious', 'Cunning', 'Vindictive', 'Cruel', 'Wicked', 'Evil', 'Sinister', 'Menacing', 'Deceptive', 'Misleading', 'Confused', 'Distracted', 'Disturbed', 'Perplexed', 'Bewildered', 'Disoriented', 'Ambivalent', 'Indecisive', 'Uncertain', 'Puzzled', 'Foolish', 'Absurd', 'Ridiculous', 'Preposterous', 'Senseless', 'Futile', 'Useless', 'Worthless']

negative_words = [a.lower() for a in negatives]
# print(negative_words)



with open('amazonMouse.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Extract reviews and labels
reviews = [item['review_text'].lower() for item in data]
labels = [item['review_title'] for item in data]


nlp = spacy.load("en_core_web_sm")
sid = SentimentIntensityAnalyzer()
@app.route('/')
def index():    
    html_content = '<html><body>'
    for rev in reviews:
        
        html_content += f'<h1>Review</h1>'
        p_count = 0
        n_count = 0
        doc = nlp(rev)
        token_list = [token for token in doc]
        filtered_list = [token for token in doc if not token.is_stop]

        lemmas = [
            f"{token.lemma_}"
            for token in filtered_list
        ]
        string = ' '.join(lemmas)
        
        html_content += f'<h3>Positive Words</h3>'
        for word in positive_words:
            if word in string:
                p_count+=1
                html_content += f'<span> {word}, </span>'
        html_content += f'<h3>Negative Words</h3>'
        for word in negative_words:
            if word in string:
                n_count+=1
                html_content += f'<span> {word}, </span>'
    
    
        html_content += f'<h3>Review Body</h3>'
        html_content += f'<p>{rev}</p>'
        scores = sid.polarity_scores(rev)
        html_content+=f"<h5>Sentiment scores: {scores}</h5>"
        if scores['neg'] > scores['pos']:
            html_content+= f"<h6>This review contains negative sentiments.</h6>"
        elif scores['pos'] > scores['neg']:
            html_content+= f"<h6>This review contains positive sentiments.</h6>"
        else:
            html_content+= f"<h6>This review is neutral.</h6>"
        html_content += f'<br><h4>Positive Words: {p_count}</h4>'
        html_content += f'<h4>Negative Words: {n_count}</h4>'
        
        if p_count>n_count:
            html_content += f'<h3>This review is Positive review.</h3><br><br>'
            
        elif p_count<n_count:
            html_content += f'<h3>This review is Negative review.</h3><br><br>'
            # print("it is a Negative Review")
        else:
            html_content += f'<h3>This review is Neutral review.</h3><br><br>'
            # print('it is a neutral review')
        
    html_content += '</body></html>'
    return html_content


        
if __name__ == "__main__":
    app.run()
