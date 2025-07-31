export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  content: string;
  sender: "user" | "agent";
  timestamp: Date;
}

class ChatStorage {
  private readonly STORAGE_KEY = 'ai_cto_chat_sessions';
  private readonly MAX_SESSIONS = 50; // Keep last 50 sessions

  // Get all chat sessions
  getAllSessions(): ChatSession[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return [];
      
      const sessions = JSON.parse(stored);
      return sessions.map((session: any) => ({
        ...session,
        createdAt: new Date(session.createdAt),
        updatedAt: new Date(session.updatedAt),
        messages: session.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
      }));
    } catch (error) {
      console.error('Error loading chat sessions:', error);
      return [];
    }
  }

  // Get a specific session by ID
  getSession(sessionId: string): ChatSession | null {
    const sessions = this.getAllSessions();
    return sessions.find(session => session.id === sessionId) || null;
  }

  // Create a new chat session
  createSession(title?: string): ChatSession {
    const session: ChatSession = {
      id: this.generateSessionId(),
      title: title || 'New Chat',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const sessions = this.getAllSessions();
    sessions.unshift(session); // Add to beginning
    
    // Keep only the last MAX_SESSIONS
    if (sessions.length > this.MAX_SESSIONS) {
      sessions.splice(this.MAX_SESSIONS);
    }

    this.saveSessions(sessions);
    return session;
  }

  // Update a session with new messages
  updateSession(sessionId: string, messages: Message[]): void {
    const sessions = this.getAllSessions();
    const sessionIndex = sessions.findIndex(s => s.id === sessionId);
    
    if (sessionIndex !== -1) {
      sessions[sessionIndex].messages = messages;
      sessions[sessionIndex].updatedAt = new Date();
      
      // Update title based on first user message
      if (messages.length > 0) {
        const firstUserMessage = messages.find(msg => msg.sender === 'user');
        if (firstUserMessage) {
          const title = this.generateTitle(firstUserMessage.content);
          sessions[sessionIndex].title = title;
        }
      }
      
      this.saveSessions(sessions);
    }
  }

  // Delete a session
  deleteSession(sessionId: string): void {
    const sessions = this.getAllSessions();
    const filteredSessions = sessions.filter(s => s.id !== sessionId);
    this.saveSessions(filteredSessions);
  }

  // Clear all sessions
  clearAllSessions(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  // Export session as JSON
  exportSession(sessionId: string): string | null {
    const session = this.getSession(sessionId);
    return session ? JSON.stringify(session, null, 2) : null;
  }

  // Import session from JSON
  importSession(sessionData: string): ChatSession | null {
    try {
      const session = JSON.parse(sessionData);
      const sessions = this.getAllSessions();
      sessions.unshift(session);
      this.saveSessions(sessions);
      return session;
    } catch (error) {
      console.error('Error importing session:', error);
      return null;
    }
  }

  // Private methods
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateTitle(firstMessage: string): string {
    // Extract a meaningful title from the first user message
    const words = firstMessage.split(' ').slice(0, 6); // Take first 6 words
    return words.join(' ') + (words.length >= 6 ? '...' : '');
  }

  private saveSessions(sessions: ChatSession[]): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(sessions));
    } catch (error) {
      console.error('Error saving chat sessions:', error);
    }
  }
}

export const chatStorage = new ChatStorage(); 