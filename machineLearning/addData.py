import pandas as pd
import os

file_map = {
    'item': 'itemDatabase.csv',
    'itemRating': 'itemRatingsDatabase.csv',
    'user': 'userDatabase.csv',
    'chef' : 'chefDatabase.csv',
    'chefRating' : 'chefRatingsDatabase.csv',
}

def addItem(data, data_type):
    if data_type not in file_map:
        raise ValueError(f"Invalid data_type: {data_type}. Must be one of {list(file_map.keys())}")
    t = os.getcwd()
    file_path = os.path.join(t,'newData',file_map[data_type])
    database = pd.read_csv(file_path)
    database = database.append(data, ignore_index=True)
    database.to_csv(file_path, index=False)
