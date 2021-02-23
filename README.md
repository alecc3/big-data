## Getting Started

`npm install`

`npm start`

Then, start the server:

`cd backend`

`pip install -r requirements.txt`

Test a few of the following queries:

'Curry'

'Rice'

'Naan'

'Vegetable'

'Prawn'

'wine'

## About

Queries have been debounced through the frontend (1000ms delay) in case of rate limiting (when using 3rd party APIs) and preventing unnecessary API calls. Although this does not technically follow the project specification of 'Update search results with each character entered by the user' I believe this is a best practice. 

The frontend is written in React, and the backend is written in Python & Flask.

For test data, I used a .json file with 120,000~ objects/rows. While this is a magnitude less than 1,000,000 in the specification, the data size is similar enough for the purposes of this exercise.

In order to process the data, I used Pyspark (Python wrapper around Apache Spark, used for distributed big data processing)
The '/data' route takes in a query parameter, and retrieves Item Names that contain the query.

## Limitations

Queries are case sensitive (normalization is possible with something like Regex)

Albeit optimized through Pyspark, load time scales with the size of the dataset since all data is displayed/retrieved - for extremely large datasets we can use pagination or 'infinite scroll' where we retrieve the data in chunks instead

No CSS (in the interest of time)
