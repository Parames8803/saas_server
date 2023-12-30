from flask import Flask, jsonify,request
import re

app= Flask(__name__)


@app.route("/" , methods = ['POST'])
def hello():
    json_data = request.get_json()
    resume = json_data.get('resume','')
    jobSkills = json_data.get('job','')
    if(resume == "") or (jobSkills == ""):
        json_message = {
            "Message" : "Values Required..."
        }
        return (jsonify(json_message) , 400)
    else:
        corpus=[]
        Corpus=[]
        Stop_word=['i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', "you're", "you've", "you'll", "you'd", 'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', "she's", 'her', 'hers', 'herself', 'it', "it's", 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that', "that'll", 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', "don't", 'should', "should've", 'now', 'd', 'll', 'm', 'o', 're', 've', 'y', 'ain', 'aren', "aren't", 'couldn', "couldn't", 'didn', "didn't", 'doesn', "doesn't", 'hadn', "hadn't", 'hasn', "hasn't", 'haven', "haven't", 'isn', "isn't", 'ma', 'mightn', "mightn't", 'mustn', "mustn't", 'needn', "needn't", 'shan', "shan't", 'shouldn', "shouldn't", 'wasn', "wasn't", 'weren', "weren't", 'won', "won't", 'wouldn', "wouldn't"]
        Review=re.sub('[^a-zA-Z]', " ", resume).lower().split()
        Review= [word for word in Review if not word in set(Stop_word)]
        corpus.append(Review)
        review=re.sub('[^a-zA-Z]', " ", jobSkills).lower().split()
        review= [word for word in review if not word in set(Stop_word)]
        Corpus.append(review)
        set_text1=set(corpus[0])
        set_text2=set(Corpus[0])
        similarity_percentage=(len(set_text2.intersection(set_text1))/len(set_text2))*100
        data={"percentage":similarity_percentage}
        return (jsonify(data),200)
