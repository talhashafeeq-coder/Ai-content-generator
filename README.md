# 🧠 AI Blog Generator

The **AI Blog Generator** is a full-stack web application that allows users to generate blog content using OpenAI’s language models. It features a modern frontend built with **React.js** and a backend powered by **Python/Flask**, offering seamless integration between the UI and the AI content generation engine.

---

## 📁 Project Structure

ai_blog_generator/

│

├── frontend/ # React-based user interface

├── backend/ # Flask API for AI blog generation

├── README.md # Root documentation (you're reading this)
 


---

## 🚀 Features

- 📝 AI-powered blog content generation
- 🌐 Responsive UI built with React
- 🧠 Integration with OpenAI API (GPT)
- 💾 Save, copy, or export generated blog posts
- 🧭 Routing with React Router
- 📜 Markdown preview support
- 📤 RESTful API with Flask
- 🔐 Environment-based config management

---

## 🛠️ Tech Stack

### 🔹 Frontend
- **React.js**
- **Axios**
- **React Router DOM**
- **Bootstrap** (or your preferred CSS framework)

### 🔹 Backend
- **Python**
- **Flask**
- **OpenAI API**
- **Flask-CORS**

---

## 📦 Installation Guide

### Step 1: Clone the Repository
```bash
git clone https://github.com/talhashafeeq-coder/Ai-content-generator.git
cd ai_blog_generator
```
# Step 2: Setup the Backend
```bash
cd backend

python -m venv venv

source venv/bin/activate  # For Windows: 
venv\Scripts\activate

pip install -r requirements.txt
```
### 🔐 Create a .env file and add your OpenAI API key:

OPENAI_API_KEY=your_api_key_here
## Run the Flask server:
```bash
python main.py
```
### Step 3: Setup the Frontend
``` bash
cd ../frontend
npm install
npm run dev
```
Frontend runs at: http://localhost:5173

Backend runs at: http://localhost:5000 

### 🧪 Example Usage
1- User enters blog topic or prompt in the form.

2- React sends request to Flask backend via Axios.

3- Flask uses OpenAI to generate blog text.

4- Response is returned and shown in the frontend with copy/export options.

### 🧪 Example Usage
User enters blog topic or prompt in the form.

React sends request to Flask backend via Axios.

Flask uses OpenAI to generate blog text.

Response is returned and shown in the frontend with copy/export options.

## 🙌 Acknowledgements
OpenAI

React

Flask

## 🤝 Contributing
Pull requests are welcome.
For major changes, please open an issue first to discuss what you would like to change.
