from models.config import app, db
from controller.history_chat_controller import history_bp
from controller.user_controller import user_bp
from controller.ai_blog_controller import ai_blog_bp


# Blueprints registration
app.register_blueprint(history_bp, url_prefix='/history')
app.register_blueprint(user_bp, url_prefix='/user')
app.register_blueprint(ai_blog_bp, url_prefix='/ai-blog')


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        print("✅ Database tables created successfully")
    app.run(debug=True)
    print("🚀 Server is running on http://localhost:5000")