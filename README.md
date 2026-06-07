# GitHub Messaging App

A fully functional messaging application that runs directly on GitHub Pages at **https://c00lkid-arch.github.io/**

## Features

- 💬 Real-time messaging across multiple conversations
- 🔄 Messages stored using browser localStorage
- 🌐 Hosted on GitHub Pages (no server required!)
- 🎨 Beautiful, responsive UI
- 👥 Multiple conversations support
- ⚡ Auto-refreshing messages every 2 seconds
- 📱 Works on desktop and mobile

## Architecture

- **Frontend**: Single-page application hosted on GitHub Pages
- **Database**: Browser localStorage (persists on your device)
- **No Backend Required**: Pure client-side application
- **Data Sync**: Optional GitHub Gist integration (read-only)

## Quick Start

### Option 1: Visit the Live App
Just open https://c00lkid-arch.github.io/ in your browser and start messaging!

### Option 2: Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/c00lkidd-arch/c00lkid-arch.github.io.git
   cd c00lkid-arch.github.io
   ```

2. Serve the files locally:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Or using Node.js
   npx http-server
   ```

3. Open your browser to `http://localhost:8000`

## How It Works

1. **Local Storage**: Messages are stored in your browser's localStorage
2. **Persistent**: Data persists even after closing the browser
3. **No Sync**: Each browser/device maintains its own messages
4. **Optional GitHub Sync**: Can read from GitHub Gists if configured

## Usage

1. **Create a Conversation**: Enter a name in the "New conversation" field and click "+ New"
2. **Select Conversation**: Click on any conversation in the sidebar
3. **Set Your Name**: Enter your name in the top-right corner
4. **Send Messages**: Type a message and press Enter or click Send
5. **Auto-Refresh**: Messages update automatically every 2 seconds

## Features

- ✅ Multiple conversations
- ✅ Send/receive messages
- ✅ Auto-refresh every 2 seconds
- ✅ Beautiful UI with gradient design
- ✅ Custom sender names
- ✅ Timestamps on all messages
- ✅ Local data persistence
- ✅ No login required
- ✅ Completely free

## File Structure

```
c00lkid-arch.github.io/
├── index.html           # Complete app (HTML + CSS + JavaScript)
├── README.md           # This file
├── CNAME               # GitHub Pages custom domain (if applicable)
└── .gitattributes      # Git settings
```

## Data Storage

Messages are stored in your browser's localStorage under the key `messages_db`. Each message has:
- `id`: Unique identifier (timestamp)
- `text`: Message content
- `sender`: Name of the sender
- `conversation`: Conversation name
- `timestamp`: When the message was sent
- `read`: Read status

## Limitations

- **Storage Limit**: Browser localStorage typically limits to 5-10MB
- **Per-Device**: Messages stored locally on each device
- **No Cloud Sync**: Messages don't sync across devices automatically
- **Browser-Dependent**: Clearing browser data will clear messages

## Browser Support

Works on all modern browsers:
- ✅ Chrome/Edge
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

## Advanced: Optional Server Backend

If you want a server with GitHub API integration, see the `server.js` and `package.json` files. To use the server:

1. Get a GitHub Personal Access Token from https://github.com/settings/tokens
2. Set up environment variables
3. Run `npm install && npm start`
4. Update `index.html` API URLs to point to your server

## Troubleshooting

**Messages not appearing:**
- Check browser console (F12) for errors
- Ensure localStorage is enabled
- Try a different conversation
- Clear browser cache and reload

**Messages disappearing:**
- Don't clear browser data/cache
- Use the same browser/device
- Check if private browsing mode is enabled

**App not loading:**
- Check internet connection
- Try hard refresh (Ctrl+F5 or Cmd+Shift+R)
- Ensure JavaScript is enabled

## Future Enhancements

- Cloud synchronization
- Message encryption
- File sharing
- Message search
- Dark mode
- User authentication
- Message reactions

## License

MIT

## Author

c00lkidd-arch

---

**Enjoy your GitHub-hosted messaging app! 🚀**

Visit: https://c00lkid-arch.github.io/
