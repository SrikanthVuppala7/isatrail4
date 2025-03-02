baseData ->
All the data we have until now and model has been trained on
includes : userData,chefData,itemData(i.e. food items),chefRatingsData (which user gave which chef how much rating),itemRatingsData

newData ->
Data that model is yet to be trained on
includes same type of data as base data

Assumptions :
First column in userData,itemData,chefData is their id
ChefRatingsData and itemRatings data contain the columns [x['userID'],x['itemID'],x['rating']]

addData.py -> To add new data into the newData database
baseModelCreate.py -> Create a model based on the baseData database
updateModel.py -> append newData to baseData and clear newData database. Train model on newData.
recommend.py -> get top-k recommendations for a user
