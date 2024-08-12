# sw-fullstack-coding-challenge
## Goal
Add a new umap graphing feature to the existing web app. **This assessment should take a maximum of 5 hours**. 

## Submitting Assessment
Clone this repository and push it to a private repo on your account, and then give access to the following users:
- [@nomichris](https://github.com/nomichris)
- [@thomas-dunlop](https://github.com/thomas-dunlop)

Make sure to email chris.harris@nomic.bio when you complete the assesment and it is ready for review. 

## UMAP Feature
[UMAP](https://umap-learn.readthedocs.io/en/latest/) (Uniform Manifold Approximation and Projection for Dimension Reduction) is a dimension reduction technique. For this assesment, you need to plot a two dimensional UMAP scatterplot with x_coor along the x-axis and y_coor along the y-axis. The user should be able to select which dataset to display, what points appear based on their metadata, and colour the plot based on a selected target's signal. See below for an example plot. 

![Example UMAP](./Example%20UMAP.png)

Feature Requirements
- A user should be able to select a dataset and visualize the associated UMAP plot points in a scatter plot. 
- A user should be able to filter which points appear based on their associated metadata (ex, only showing plot points for Donor 1).
- A user should be able to colour the plot points based on the signal level for an associated target (ex, user can select APRIL and the plot points will be coloured using a continous gradient based on the linked SampleSignals with target=APRIL). 
- Your solution should be scalable to 500 targets and 1000 samples per dataset.

Tech stack requirements
- CSS styling should be done using [tailwind](https://tailwindcss.com/). 
- Endpoints should be written using [django-rest-framework](https://www.django-rest-framework.org/). The Dataset endpoint gives a good example of written endpoints, serializers, and tests using the framework.
- Graphs should use [plotly js](https://plotly.com/javascript/react/).
- Backend queries should use [SWR Vercel](https://swr.vercel.app/). The homepage shows a good example of fetching Datasets using the package. 
- You can optionally use [Flowbite](https://flowbite-react.com/) and [Tremor](https://www.tremor.so/) as component libraries.
- **`yarn build` should work on the finished project**

A react page has already been created at `fronted/src/app/umap` to contain the feature. 

## Running Instructions
You will need the following installed
- python
- node
- pip

Frontend from root directory
```
cd frontend
yarn install
yarn dev
```
Backend from the root directory (assumes using Linux)
```
python -m venv venv
source venv/bin/activate
pip install pipenv
pipenv install
pipenv install --dev
cd graphing_app
python manage.py reset_db
python manage.py migrate
python manage.py add_dev_data
python manage.py runserver
```
