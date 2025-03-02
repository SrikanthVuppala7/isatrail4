from lightfm import LightFM
from lightfm.data import Dataset
import pandas as pd
import os
import pickle

base_path = os.path.join(os.getcwd(), 'baseData')

def createDB(model_type='item'):
    if model_type == 'item':
        usersDb = pd.read_csv(os.path.join(base_path, 'userDatabase.csv'))
        itemsDb = pd.read_csv(os.path.join(base_path, 'itemDatabase.csv'))
        ratingsDb = pd.read_csv(os.path.join(base_path, 'itemRatingsDatabase.csv'))
    elif model_type == 'chef':
        usersDb = pd.read_csv(os.path.join(base_path, 'userDatabase.csv'))
        itemsDb = pd.read_csv(os.path.join(base_path, 'chefDatabase.csv'))
        ratingsDb = pd.read_csv(os.path.join(base_path, 'chefRatingsDatabase.csv'))
    else:
        raise ValueError(f"Invalid model_type: {model_type}. Must be 'item' or 'chef'.")

    dataset = Dataset()

    dataset.fit(
        users=usersDb['userID'].unique(),
        items=itemsDb['itemID'].unique(),
        user_features=usersDb.columns[1:],  
        item_features=itemsDb.columns[1:]  
    )

    interactions, weights = dataset.build_interactions(
        [(x['userID'], x['itemID'], x['rating']) for _, x in ratingsDb.iterrows()]
    )

    user_features = dataset.build_user_features(
        (x['userID'], {col: x[col] for col in usersDb.columns[1:]}) for _, x in usersDb.iterrows()
    )
    item_features = dataset.build_item_features(
        (x['itemID'], {col: x[col] for col in itemsDb.columns[1:]}) for _, x in itemsDb.iterrows()
    )

    model = LightFM(loss='warp')

    model.fit(interactions, 
              sample_weight=weights, 
              user_features=user_features, 
              item_features=item_features, 
              epochs=30, 
              num_threads=2)

    # Save the model as a pickle object
    model_filename = 'itemModel.pkl' if model_type == 'item' else 'chefModel.pkl'
    with open(model_filename, 'wb') as model_file:
        pickle.dump(model, model_file)

# Example usage:
# createDB(model_type='item')
# createDB(model_type='chef')