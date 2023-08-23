# Import the dependencies

from sqlalchemy import create_engine, text, Column, Integer, String, Date
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session
from datetime import date

import os
import pandas as pd

def LoadData():
    #Load your PostGres database
    userName = "postgres"
    password = "postgres" #use your postgres password if you changed it
    database = "COVID-19 Data" #you can use any db you want, I just happened to use this one

    engine = create_engine(f"postgresql+psycopg2://{userName}:{password}@localhost:5432/{database}")

    conn = engine.connect()

    #Pull the data into pandas. We are filtering by the period    
    
    try:
        # Query All Records in the the Database
        query = text("SELECT * FROM Countries")
        countries_df = pd.read_sql(query, conn)
        
    except:
        print("No data Available")
        
    return countries_df
    

 #Create a base class for declarating class definitions to produce Table objects
Base = declarative_base()

class Countries(Base): 
    __tablename__ = "Countries"

    Country = Column(String, primary_key=True)
    WHO_Region = Column(String)

class Cases(Base): 
    __tablename__ = "Cases"

    Country = Column(String)
    WHO_Region = Column(String)
    Cases_Cumulative_Total = Column(Integer)
    New_Cases_Last_7_Days = Column(Integer)
    Deaths_Cumulative_Total = Column(Integer)
    New_Deaths_Last_7_Days = Column(Integer)
    Case_ID = Column(Integer, primary_key=True)

class Vaccination(Base): 
    __tablename__ = "Vaccinations"

    Country = Column(String)
    WHO_Region = Column(String)
    Date_Updated = Column(Date)
    Total_Vaccinations = Column(Integer)
    Persons_Vaccinated_Plus1_Dose = Column(Integer)
    First_Vaccine_Date = Column(Date)
    Persons__Booster_Add_Dose = Column(Integer)
    Vax_ID = Column(Integer, primary_key=True)

# Create dataframe for Countries 
countries_df = LoadData()
countries_df.head()

# Create dataframe for Cases 
cases_df = LoadData()
cases_df.head()

# Create dataframe for Vaccinations
vaccination_df = LoadData()
vaccination_df.head()

if __name__ == "__main__":
    import pandas as pd
    import random
    from sqlalchemy.orm import Session
    random.seed(42)


    #if os.path.exists(dbpath):
        #os.remove(dbpath)

    userName = "postgres"
    password = "postgres" #use your postgres password if you changed it
    database = "COVID-19 Data" #you can use any db you want, I just happened to use this one

    engine = create_engine(f"postgresql+psycopg2://{userName}:{password}@localhost:5432/{database}")

    conn = engine.connect()

    

    



        


        

   


