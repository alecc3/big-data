from pyspark.sql import SparkSession
import flask
from flask import request, jsonify
import json
from flask_cors import CORS, cross_origin

app = flask.Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config["DEBUG"] = True

FILE_PATH = './utils/orderJSON.json'

sc = SparkSession.builder.appName("PysparkExample").config("spark.sql.shuffle.partitions", "50").config(
    "spark.driver.maxResultSize", "5g").config("spark.sql.execution.arrow.enabled", "true").getOrCreate()
dataframe = sc.read.option("multiline", "true").json(FILE_PATH)


@app.route('/data', methods=['GET'])
@cross_origin()
def api_all():
    query = request.args.get('query')
    results = dataframe.filter(dataframe['Item Name'].contains(
        query)).toJSON().map(lambda j: json.loads(j)).collect()
    return json.dumps(results)


app.run()
