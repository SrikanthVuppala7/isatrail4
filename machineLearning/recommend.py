from lightfm import LightFM
import pandas as pd
import numpy as np
import os
import pickle
from math import radians, sin, cos, sqrt, atan2

base_path = os.path.join(os.getcwd(), 'baseData')

def haversine(lat1, lon1, lat2, lon2):
    R = 6371.0 

    dlat = radians(lat2 - lat1)
    dlon = radians(lon2 - lon1)
    a = sin(dlat / 2)**2 + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon / 2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    distance = R * c
    return distance

def recommend(userID, user_lat, user_lon, model_type='item', k=10, max_distance=None):
    model_filename = 'itemModel.pkl' if model_type == 'item' else 'chefModel.pkl'
    with open(model_filename, 'rb') as model_file:
        model = pickle.load(model_file)

    if model_type == 'item':
        itemsDb = pd.read_csv(os.path.join(base_path, 'itemDatabase.csv'))
    elif model_type == 'chef':
        itemsDb = pd.read_csv(os.path.join(base_path, 'chefDatabase.csv'))
    else:
        raise ValueError(f"Invalid model_type: {model_type}. Must be 'item' or 'chef'.")

    item_ids = itemsDb['itemID'].unique()
    scores = model.predict(userID, item_ids)

    if max_distance is not None:
        distances = itemsDb.apply(lambda row: haversine(user_lat, user_lon, row['latitude'], row['longitude']), axis=1)
        itemsDb['distance'] = distances
        itemsDb = itemsDb[itemsDb['distance'] <= max_distance]
        item_ids = itemsDb['itemID'].unique()
        scores = scores[np.isin(item_ids, itemsDb['itemID'])]

    top_k_items = item_ids[np.argsort(-scores)][:k]
    return top_k_items

# Example usage:
# top_items = recommend(userID=1, user_lat=40.7128, user_lon=-74.0060, model_type='item', k=10, max_distance=10)
# top_chefs = recommend(userID=1, user_lat=40.7128, user_lon=-74.0060, model_type='chef', k=10, max_distance=10)