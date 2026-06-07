const express = require('express');
const cors = require('cors');
const { Octokit } = require('octokit');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Initialize Octokit with GitHub token
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

const OWNER = 'c00lkidd-arch';
const REPO = 'c00lkidd-arch.github.io/c00lkid-arch.github.io/';
const MESSAGES_PATH = 'messages.json';

// Helper function to get messages file
async function getMessagesFile() {
  try {
    const response = await octokit.rest.repos.getContent({
      owner: OWNER,
      repo: REPO,
      path: MESSAGES_PATH
    });
    const content = Buffer.from(response.data.content, 'base64').toString('utf-8');
    return { messages: JSON.parse(content), sha: response.data.sha };
  } catch (error) {
    if (error.status === 404) {
      return { messages: [], sha: null };
    }
    throw error;
  }
}

// Helper function to save messages file
async function saveMessagesFile(messages, sha) {
  const content = Buffer.from(JSON.stringify(messages, null, 2)).toString('base64');
  
  if (!sha) {
    // Create new file
    await octokit.rest.repos.createOrUpdateFileContents({
      owner: OWNER,
      repo: REPO,
      path: MESSAGES_PATH,
      message: 'Initialize messages database',
      content: content
    });
  } else {
    // Update existing file
    await octokit.rest.repos.createOrUpdateFileContents({
      owner: OWNER,
      repo: REPO,
      path: MESSAGES_PATH,
      message: 'Update messages',
      content: content,
      sha: sha
    });
  }
}

// GET all messages
app.get('/api/messages', async (req, res) => {
  try {
    const { messages } = await getMessagesFile();
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// GET messages for a specific conversation
app.get('/api/messages/:conversation', async (req, res) => {
  try {
    const { messages } = await getMessagesFile();
    const conversationMessages = messages.filter(msg => msg.conversation === req.params.conversation);
    res.json(conversationMessages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch conversation messages' });
  }
});

// POST a new message
app.post('/api/messages', async (req, res) => {
  try {
    const { text, sender, conversation } = req.body;
    
    if (!text || !sender || !conversation) {
      return res.status(400).json({ error: 'Missing required fields: text, sender, conversation' });
    }

    const { messages, sha } = await getMessagesFile();
    
    const newMessage = {
      id: Date.now().toString(),
      text,
      sender,
      conversation,
      timestamp: new Date().toISOString(),
      read: false
    };

    messages.push(newMessage);
    await saveMessagesFile(messages, sha);

    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save message' });
  }
});

// DELETE a message
app.delete('/api/messages/:id', async (req, res) => {
  try {
    const { messages, sha } = await getMessagesFile();
    const messageIndex = messages.findIndex(msg => msg.id === req.params.id);

    if (messageIndex === -1) {
      return res.status(404).json({ error: 'Message not found' });
    }

    messages.splice(messageIndex, 1);
    await saveMessagesFile(messages, sha);

    res.json({ success: true, message: 'Message deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete message' });
  }
});

// UPDATE a message
app.put('/api/messages/:id', async (req, res) => {
  try {
    const { text, read } = req.body;
    const { messages, sha } = await getMessagesFile();
    const message = messages.find(msg => msg.id === req.params.id);

    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    if (text !== undefined) message.text = text;
    if (read !== undefined) message.read = read;

    await saveMessagesFile(messages, sha);
    res.json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update message' });
  }
});

// GET all conversations
app.get('/api/conversations', async (req, res) => {
  try {
    const { messages } = await getMessagesFile();
    const conversations = [...new Set(messages.map(msg => msg.conversation))];
    res.json(conversations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch conversations' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Messaging app API running on http://localhost:${port}`);
});
