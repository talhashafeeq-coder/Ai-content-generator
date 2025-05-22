from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text
from models.config import db
from datetime import datetime

class HistoryTable(db.Model):
    __tablename__ = 'history'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    input_question = Column(Text, nullable=False)
    title = Column(Text, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)

    def serialize(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'input_question': self.input_question,
            'title': self.title,
            'timestamp': self.timestamp
        }
