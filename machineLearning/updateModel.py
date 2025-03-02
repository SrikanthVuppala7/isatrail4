from lightfm import LightFM
from lightfm.data import Dataset
import pandas as pd
import os
import pickle

base_path = os.path.join(os.getcwd(), 'baseData')
new_data_path = os.path.join(os.getcwd(), 'newData')

def updateModel(model_type='item'):
    # Load the preexisting model
    model_filename = 'itemModel.pkl' if model_type == 'item' else 'chefModel.pkl'
    with open(model_filename, 'rb') as model_file:
        model = pickle.load(model_file)

    # Load the new data
    if model_type == 'item':
        new_usersDb = pd.read_csv(os.path.join(new_data_path, 'userDatabase.csv'))
        new_itemsDb = pd.read_csv(os.path.join(new_data_path, 'itemDatabase.csv'))
        new_ratingsDb = pd.read_csv(os.path.join(new_data_path, 'itemRatingsDatabase.csv'))
    elif model_type == 'chef':
        new_usersDb = pd.read_csv(os.path.join(new_data_path, 'userDatabase.csv'))
        new_itemsDb = pd.read_csv(os.path.join(new_data_path, 'chefDatabase.csv'))
        new_ratingsDb = pd.read_csv(os.path.join(new_data_path, 'chefRatingsDatabase.csv'))
    else:
        raise ValueError(f"Invalid model_type: {model_type}. Must be 'item' or 'chef'.")

    dataset = Dataset()


    dataset.fit(
        users=new_usersDb['userID'].unique(),
        items=new_itemsDb['itemID'].unique(),
        user_features=new_usersDb.columns[1:],  # Assuming the first column is userID
        item_features=new_itemsDb.columns[1:]   # Assuming the first column is itemID
    )

   
    interactions, weights = dataset.build_interactions(
        [(x['userID'], x['itemID'], x['rating']) for _, x in new_ratingsDb.iterrows()]
    )


    user_features = dataset.build_user_features(
        (x['userID'], {col: x[col] for col in new_usersDb.columns[1:]}) for _, x in new_usersDb.iterrows()
    )
    item_features = dataset.build_item_features(
        (x['itemID'], {col: x[col] for col in new_itemsDb.columns[1:]}) for _, x in new_itemsDb.iterrows()
    )


    model.fit_partial(interactions, 
                      sample_weight=weights, 
                      user_features=user_features, 
                      item_features=item_features, 
                      epochs=5, 
                      num_threads=2)

    # Append new data to old data
    if model_type == 'item':
        usersDb = pd.read_csv(os.path.join(base_path, 'userDatabase.csv'))
        itemsDb = pd.read_csv(os.path.join(base_path, 'itemDatabase.csv'))
        ratingsDb = pd.read_csv(os.path.join(base_path, 'itemRatingsDatabase.csv'))

        usersDb = usersDb.append(new_usersDb, ignore_index=True)
        itemsDb = itemsDb.append(new_itemsDb, ignore_index=True)
        ratingsDb = ratingsDb.append(new_ratingsDb, ignore_index=True)

        usersDb.to_csv(os.path.join(base_path, 'userDatabase.csv'), index=False)
        itemsDb.to_csv(os.path.join(base_path, 'itemDatabase.csv'), index=False)
        ratingsDb.to_csv(os.path.join(base_path, 'itemRatingsDatabase.csv'), index=False)

        # Clear the new data files
        pd.DataFrame(columns=new_usersDb.columns).to_csv(os.path.join(new_data_path, 'userDatabase.csv'), index=False)
        pd.DataFrame(columns=new_itemsDb.columns).to_csv(os.path.join(new_data_path, 'itemDatabase.csv'), index=False)
        pd.DataFrame(columns=new_ratingsDb.columns).to_csv(os.path.join(new_data_path, 'itemRatingsDatabase.csv'), index=False)
    elif model_type == 'chef':
        usersDb = pd.read_csv(os.path.join(base_path, 'userDatabase.csv'))
        itemsDb = pd.read_csv(os.path.join(base_path, 'chefDatabase.csv'))
        ratingsDb = pd.read_csv(os.path.join(base_path, 'chefRatingsDatabase.csv'))

        usersDb = usersDb.append(new_usersDb, ignore_index=True)
        itemsDb = itemsDb.append(new_itemsDb, ignore_index=True)
        ratingsDb = ratingsDb.append(new_ratingsDb, ignore_index=True)

        usersDb.to_csv(os.path.join(base_path, 'userDatabase.csv'), index=False)
        itemsDb.to_csv(os.path.join(base_path, 'chefDatabase.csv'), index=False)
        ratingsDb.to_csv(os.path.join(base_path, 'chefRatingsDatabase.csv'), index=False)

        # Clear the new data files
        pd.DataFrame(columns=new_usersDb.columns).to_csv(os.path.join(new_data_path, 'userDatabase.csv'), index=False)
        pd.DataFrame(columns=new_itemsDb.columns).to_csv(os.path.join(new_data_path, 'chefDatabase.csv'), index=False)
        pd.DataFrame(columns=new_ratingsDb.columns).to_csv(os.path.join(new_data_path, 'chefRatingsDatabase.csv'), index=False)


    with open(model_filename, 'wb') as model_file:
        pickle.dump(model, model_file)

# Example usage:
# updateModel(model_type='item')
# updateModel(model_type='chef')