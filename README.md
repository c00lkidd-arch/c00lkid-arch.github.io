# GitHub Messaging App

A fully functional messaging application that uses your GitHub repository as its database and API backend.

## Features

- 💬 Real-time messaging across multiple conversations
- 🔄 Messages stored as JSON in your GitHub repository
- 🌐 Self-hosted API using Express.js
- 🎨 Beautiful, responsive UI
- 👥 Multiple conversations support
- ⚡ Auto-refreshing messages every 2 seconds

## Architecture

- **Backend**: Node.js + Express.js server that reads/writes to GitHub via Octokit API
- **Database**: `messages.json` file in the GitHub repository
- **Frontend**: Single-page application (index.html) with vanilla JavaScript
- **API**: RESTful endpoints for message CRUD operations

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- GitHub Personal Access Token (with `repo` and `gist` scopes)

### 1. Clone the Repository

```bash
git clone https://github.com/c00lkidd-arch/c00lkid-arch.github.io.git
cd c00lkid-arch.github.io
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```
GITHUB_TOKEN=ghp_your_token_here
PORT=3000
```

**How to get a GitHub Personal Access Token:**
1. Go to https://github.com/settings/tokens
2. Click "Generate new token"
3. Select scopes: `repo` (full control of private repositories)
4. Copy the token and add it to `.env`

### 4. Start the Server

```bash
npm start
```

The server will start on `http://localhost:3000`

For development with auto-reload:
```bash
npm run dev
```

### 5. Open the Frontend

Open your browser and navigate to:
```
file:///path/to/c00lkid-arch.github.io/index.html
```

Or serve it with a simple HTTP server:
```bash
# Using Python
python -m http.server 8000

# Then visit http://localhost:8000
```

## API Endpoints

### Get all messages
```
GET /api/messages
```

### Get messages from a conversation
```
GET /api/messages/:conversation
```

### Send a message
```
POST /api/messages
Content-Type: application/json

{
  "text": "Hello!",
  "sender": "John",
  "conversation": "general"
}
```

### Update a message
```
PUT /api/messages/:id
Content-Type: application/json

{
  "text": "Updated message",
  "read": true
}
```

### Delete a message
```
DELETE /api/messages/:id
```

### Get all conversations
```
GET /api/conversations
```

### Health check
```
GET /health
```

## How It Works

1. **Messages Storage**: All messages are stored in `messages.json` in your GitHub repository
2. **GitHub API**: The Express server uses Octokit to read and write to the repository
3. **Frontend Updates**: The UI polls the API every 2 seconds to fetch new messages
4. **Conversations**: Messages are grouped by conversation name for organization

## Security Notes

- Never commit `.env` file with your GitHub token
- Use a Personal Access Token with minimal required scopes
- Consider using environment variables in production
- Add `.env` to `.gitignore`

## File Structure

```
c00lkid-arch.github.io/
├── package.json           # Node.js dependencies
├── server.js             # Express.js API server
├── index.html            # Frontend UI
├── messages.json         # Messages database (auto-created)
├── .env                  # Environment variables (not committed)
├── .gitignore           # Git ignore file
└── README.md            # This file
```

## Troubleshooting

**"Cannot find module" errors:**
```bash
npm install
```

**GitHub API errors:**
- Verify your GitHub token is correct
- Check token has `repo` scope
- Ensure you have permission to write to the repository

**CORS errors:**
- Make sure the frontend is making requests to `http://localhost:3000`
- Check that the server is running

**Messages not loading:**
- Check browser console for errors
- Verify API is running on port 3000
- Check GitHub token permissions

## Future Enhancements

- User authentication
- Message encryption
- File sharing
- Message reactions
- Typing indicators
- Online status
- Message search
- Message threading

## License

MIT

## Author

c00lkidd-arch

---

**Enjoy your GitHub-powered messaging app! 🚀**
