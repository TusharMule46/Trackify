Trackify – Kanban Task Management Web App

Trackify is a responsive Kanban-style task management web application designed to streamline workflow organization and improve productivity. It allows users to create, manage, and track tasks efficiently across different stages of completion.

🚀 Features

Create, edit, and delete tasks
Drag-and-drop task management

Three workflow columns:

To Do
In Progress
Done

Persistent data storage using Local Storage
Responsive and modern dark UI
Modal-based task creation interface
Clean and intuitive user experience

🛠️ Tech Stack

HTML5 – Semantic structure
CSS3 / Tailwind CSS – Styling and layout
JavaScript (ES6+) – Application logic and DOM manipulation
LocalStorage API – Client-side data persistence
Git & GitHub – Version control and deployment

🏗️ Project Architecture
Trackify/
│
├── index.html        # Application entry point
├── style.css         # Custom styles
├── script.js         # Core application logic
└── assets/           # Icons or additional resources

Core Functional Modules

Task Creation Module – Handles modal input and validation
Drag-and-Drop Engine – Manages task movement between columns
State Management Layer – Syncs UI with LocalStorage
DOM Controller – Dynamically renders tasks

⚙️ Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/TusharMule46/Trackify.git

2️⃣ Navigate to Project Folder
cd Trackify

3️⃣ Run Application

Simply open:
index.html
in your browser.
No build tools or dependencies required.

💡 How It Works

Tasks are stored as JSON objects.
On page load, the app fetches stored tasks from LocalStorage.
Drag-and-drop events update both UI state and storage.
Changes persist even after browser refresh.

📈 Use Cases

Personal productivity management
Agile sprint planning
Student assignment tracking
Small team workflow visualization

🔒 Future Enhancements

User authentication system
Backend integration (Node.js + MongoDB)
Due dates and priority tagging
Task filtering & search functionality
Real-time collaboration
Dark/Light theme toggle

📦 Deployment
You can deploy using:

GitHub Pages
Netlify
Vercel

Example (GitHub Pages):

git branch -M main
git push -u origin main


Then enable GitHub Pages in repository settings.

🧑‍💻 Author
Tushar Mule
Frontend Developer | JavaScript Enthusiast

📜 License
This project is open-source and available under the MIT License.

