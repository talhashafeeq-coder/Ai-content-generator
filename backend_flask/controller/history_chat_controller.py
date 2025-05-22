from flask import Blueprint, request, jsonify
from datetime import datetime
from models.config import db
from models.history_chat import HistoryTable

history_bp = Blueprint('history_bp', __name__)


# CREATE: Add new history entry
@history_bp.route('/v1/history', methods=['POST'])
def create_history():
    data = request.get_json()
    user_id = data.get('user_id')
    input_question = data.get('input_question')
    title = data.get('title')

    if not user_id or not input_question or not title:
        return jsonify({'error': 'Missing required fields'}), 400

    new_history = HistoryTable(
        user_id=user_id,
        input_question=input_question,
        title=title,
        timestamp=datetime.utcnow()
    )

    try:
        db.session.add(new_history)
        db.session.commit()
        return jsonify({'message': 'History created', 'history': new_history.serialize()}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Database error', 'details': str(e)}), 500


# READ ALL: Get all history entries
@history_bp.route('/v1/histories', methods=['GET'])
def get_histories():
    histories = HistoryTable.query.all()
    return jsonify([h.serialize() for h in histories]), 200


# READ ONE: Get single history entry by id
@history_bp.route('/<int:history_id>', methods=['GET'])
def get_history(history_id):
    history = HistoryTable.query.get(history_id)
    if not history:
        return jsonify({'error': 'History not found'}), 404
    return jsonify(history.serialize()), 200


# UPDATE: Update history entry by id
@history_bp.route('/<int:history_id>', methods=['PUT'])
def update_history(history_id):
    history = HistoryTable.query.get(history_id)
    if not history:
        return jsonify({'error': 'History not found'}), 404

    data = request.get_json()
    history.input_question = data.get('input_question', history.input_question)
    history.title = data.get('title', history.title)
    # timestamp update optional; agar chaho updated time set karo
    history.timestamp = datetime.utcnow()

    try:
        db.session.commit()
        return jsonify({'message': 'History updated', 'history': history.serialize()}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Database error', 'details': str(e)}), 500


# DELETE: Delete history entry by id
@history_bp.route('/v1/historyDelete/<int:history_id>', methods=['DELETE'])
def delete_history(history_id):
    history = HistoryTable.query.get(history_id)
    if not history:
        return jsonify({'error': 'History not found'}), 404

    try:
        db.session.delete(history)
        db.session.commit()
        return jsonify({'message': 'History deleted'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Database error', 'details': str(e)}), 500
