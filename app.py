from flask import Flask, render_template, jsonify
from sqlalchemy.orm import Session
from sqlalchemy import create_engine,func


#Load From the Database file that I created. It is in this same directory
import pandas as pd

app = Flask(__name__)

#Route to produce your main home page. 
#Feel free to add additional HTML routes to add additional pages
@app.route("/")
def index(): 
    return render_template("index.html")

#This is the main data route, it will produce JSON for your javascript to use
#You will wind up calling into it using d3.json("/LoadData/1") to get period 1
@app.route("/LoadData")
def LoadData(): 


    userName = "postgres"
    password = "postgres" #use your postgres password if you changed it
    database = "COVID-19 Data" #you can use any db you want, I just happened to use this one

    engine = create_engine(f"postgresql+psycopg2://{userName}:{password}@localhost:5432/{database}")

    conn = engine.connect()

    #engine = create_engine(f'sql:///{dbpath}')
    #session = Session(engine)

    #Pull the data into pandas. We are filtering by the period
    #data = pd.read_sql(session.query(Grade).filter(Grade.Period == period).statement, session.bind)

    #data = data.groupby(["Sex"]).mean()

    #Produce a JSON object (aka a list of python dictionaries)
    #scoreList = []
    #for sex in data.index: 

        #scoreList.append({
            #"Sex" : sex, 
            #"AvgScore" :  data.loc[sex]['Score']
        #})

    #Return the JSON that you created
    return jsonify("")


if __name__ == "__main__":
    app.run(debug=True)

