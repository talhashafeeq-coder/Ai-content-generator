from flask import Blueprint, request, jsonify
from models.user import UserTable
from models.config import db
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from datetime import timedelta


user_bp = Blueprint('user', __name__)

# 🔸 CREATE User
@user_bp.route('/v1/users', methods=['POST'])
def create_user():
    data = request.json
    if not all(k in data for k in ('username', 'password', 'email')):
        return jsonify({"error": "Missing required fields"}), 400

    user = UserTable(
        username=data['username'],
        email=data['email']
    )
    user.set_password(data['password'])
    
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "User created successfully", "user": user.serialize()}), 201

# 🔹 READ All Users
@user_bp.route('/v1/get-users', methods=['GET'])
def get_all_users():
    users = UserTable.query.all()
    return jsonify([user.serialize() for user in users])

# 🔍 READ One User by ID
@user_bp.route('/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = UserTable.query.get(user_id)
    if user:
        return jsonify(user.serialize())
    return jsonify({"error": "User not found"}), 404

# ✏️ UPDATE User
@user_bp.route('/v1/update-user/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = UserTable.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.json
    if 'username' in data:
        user.username = data['username']
    if 'email' in data:
        user.email = data['email']
    if 'password' in data:
        user.set_password(data['password'])

    db.session.commit()
    return jsonify({"message": "User updated successfully", "user": user.serialize()})

# ❌ DELETE User
@user_bp.route('/v1/delete-user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = UserTable.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted successfully"})

# 🔑 User Login



@user_bp.route('/v1/login', methods=['POST'])
def login():
    data = request.json
    if not data or not all(k in data for k in ('username', 'password')):
        return jsonify({"error": "Missing required fields"}), 400

    user = UserTable.query.filter_by(username=data['username']).first()
    
    if user and user.check_password(data['password']):
        # JWT token create karo (e.g., valid for 1 day)
        access_token = create_access_token(identity=user.id, expires_delta=timedelta(days=1))
        
        return jsonify({
            "message": "Login successful",
            "access_token": access_token,
            "user": user.serialize()
        }), 200

    return jsonify({"error": "Invalid username or password"}), 401

# 🔑Get userlogin
@user_bp.route('/v1/user/<int:user_id>', methods=['GET'])
def get_user_profile(user_id):
    user = UserTable.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({"user": user.serialize()}), 200

# logout route


    