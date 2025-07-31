# Gemini API Integration Setup

## Step 1: Get Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

## Step 2: Configure Environment Variables

Create a `.env.local` file in your project root with:

```env
GEMINI_API_KEY=your_actual_api_key_here
```

Replace `your_actual_api_key_here` with your real Gemini API key.

## Step 3: Restart Development Server

After adding the environment variable, restart your development server:

```bash
npm run dev
```

## Step 4: Test the Integration

1. Navigate to `/chat` in your application
2. Send a message
3. You should now receive real responses from Gemini AI

## API Configuration Details

The integration uses:
- **Model**: `gemini-2.0-flash` (latest and fastest)
- **Endpoint**: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`
- **Authentication**: API Key via `X-goog-api-key` header

## Error Handling

The application includes comprehensive error handling:
- ✅ API key validation
- ✅ Network error handling
- ✅ Invalid response format handling
- ✅ User-friendly error messages

## Security Notes

- Never commit your `.env.local` file to version control
- The API key is only used server-side in the API route
- All requests are validated and sanitized

## Troubleshooting

If you encounter issues:

1. **"Gemini API key not configured"**: Check your `.env.local` file
2. **"Failed to get response from Gemini API"**: Verify your API key is valid
3. **Network errors**: Check your internet connection
4. **Rate limiting**: Gemini has usage limits, wait and try again

## Next Steps

Once working, you can enhance the integration with:
- Conversation history context
- System prompts for specific roles
- Temperature and other model parameters
- Streaming responses for real-time typing 