"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.models import db, User
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token, JWTManager


# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False



# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object
CORS(app)

@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file

@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response

# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = "adios-coroto"  # Change this "super secret" with something else!
jwt = JWTManager(app)

# REGISTER ENDPOINT
@app.route('/signup', methods=["POST"])
def register_user():
    user_email = request.json.get("email", None)
    user_password = request.json.get("password", None)

    user_exists = User.query.filter_by(email = user_email).first()

    if user_exists:
        return jsonify({"msg": "Sorry, this user is already exists!"}), 300
    
    new_user = User(email = user_email, password = user_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"msg": "User created successfully"}), 200



# LOGIN ENDPOINT
@app.route("/login", methods=["POST"])
def user_login():
    user_email = request.json.get("email", None)
    user_password = request.json.get("password", None)

    user = User.filter.query(email = user_email, password = user_password).first()

    if user is None:
        return jsonify({"Error": "Wrong email or password"}), 401
    
    token = create_access_token(identity= user.id)
    return jsonify({"response": "Successfully logged in", "token": token, "user_id" : user.id}), 200



# ACCESSING USER'S PRIVATE PAGE
@app.route("/private", methods=["GET"])
@jwt_required()
def show_email():
    current_user_id = get_jwt_identity()
    user = User.filter.get(current_user_id)
    return jsonify({"email": user.email, "id": user.id, "response": "That is your data up there!"}), 200

# GETTING ALL THE USERS
@app.route("/users", methods=["GET"])
def get_all_users():
    all_users = User.query.all()
    mapped_users = list(map(lambda index: index.serialize(), all_users))

    response_body = jsonify(mapped_users)
    return response_body, 200

# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
