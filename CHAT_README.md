# AI Chat Assistant

A modern, responsive chat interface built with Next.js 15, React 19, and TypeScript.

## Features

- **Real-time Chat Interface**: Clean, modern UI with message bubbles
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Smooth Animations**: Framer Motion powered animations for message appearance
- **Auto-scroll**: Automatically scrolls to the latest message
- **Loading States**: Visual feedback during AI response generation
- **TypeScript**: Full type safety throughout the application
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS

## Tech Stack

- **Next.js 15** - React framework with App Router
- **React 19.1.0** - UI library with Server Components
- **TypeScript 5** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling
- **shadcn/ui** - Modern component library (New York style)
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons
- **clsx & tailwind-merge** - Conditional styling utilities

## Project Structure

```
src/
├── app/
│   ├── chat/
│   │   └── page.tsx          # Chat page route
│   └── api/
│       └── chat/
│           └── route.ts       # API endpoint for chat
├── components/
│   └── chat/
│       ├── ChatContainer.tsx  # Main chat component
│       ├── ChatMessage.tsx    # Individual message component
│       ├── ChatInput.tsx      # Input field component
│       └── index.ts          # Component exports
```

## Components

### ChatContainer
- Manages chat state and message flow
- Handles auto-scrolling to latest messages
- Simulates AI responses (ready for real API integration)
- Responsive layout with header and input areas

### ChatMessage
- Renders individual messages with different styles for user/agent
- Includes avatars and timestamps
- Smooth animations on message appearance
- Responsive bubble design

### ChatInput
- Auto-resizing textarea
- Send button with proper states
- Keyboard shortcuts (Enter to send, Shift+Enter for new line)
- Attachment button for future file uploads

## Usage

1. Navigate to `/chat` in your application
2. Type a message and press Enter or click the send button
3. The AI will respond with a simulated message
4. Messages are animated and auto-scroll to the bottom

## API Integration

The chat is ready for real AI integration. To connect to Gemini API:

1. Add your Gemini API key to environment variables:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

2. Uncomment the API integration code in `src/app/api/chat/route.ts`

3. Update the ChatContainer to use the real API instead of setTimeout

## Styling

- Uses Tailwind CSS for responsive design
- shadcn/ui components for consistent UI
- Custom animations with Framer Motion
- Dark/light mode support through CSS variables
- Mobile-first responsive design

## Future Enhancements

- [ ] Real Gemini API integration
- [ ] File upload support
- [ ] Message history persistence
- [ ] User authentication
- [ ] Real-time typing indicators
- [ ] Message reactions
- [ ] Voice input/output
- [ ] Code syntax highlighting
- [ ] Markdown support

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Visit `http://localhost:3000/chat` to see the chat interface in action. 