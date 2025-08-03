import { NextRequest, NextResponse } from "next/server";

interface ConversationMessage {
  sender: string;
  content: string;
}

interface ChatRequest {
  message: string;
  conversationHistory?: ConversationMessage[];
}

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory = [] }: ChatRequest = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const geminiApiKey = process.env.GEMINI_API_KEY;
    
    if (!geminiApiKey) {
      return NextResponse.json(
        { error: "Gemini API key not configured" },
        { status: 500 }
      );
    }

    // Create the system prompt for AI CTO
    const systemPrompt = `You are an experienced CTO and technical advisor, specializing in helping non-technical founders turn their ideas into successful tech companies. You have deep experience in startup development, technology strategy, and building scalable products.

YOUR ROLE:
- Act as a strategic technical advisor and CTO
- Guide non-technical founders through the entire technical journey
- Provide step-by-step actionable advice
- Think like an experienced CTO who understands startup challenges

CRITICAL CONVERSATION APPROACH:
1. ALWAYS ask ONE question at a time - never overwhelm with multiple questions
2. Wait for their answer before moving to the next question
3. Build understanding progressively through conversation
4. Only provide comprehensive technical roadmap after gathering all necessary information

INFORMATION GATHERING SEQUENCE (ask one by one):
1. "What's your business idea? Describe it in simple terms."
2. "Who is your target market/customers?"
3. "What problem are you solving for them?"
4. "What's your timeline for launching?"
5. "What's your budget range for development?"
6. "Do you have any technical background or team?"
7. "What makes your solution unique/different?"

ONLY AFTER gathering all information:
- Provide comprehensive technical strategy
- Give specific technology recommendations
- Create actionable roadmap with timelines
- Include budget breakdown and team strategy

COMMUNICATION STYLE:
- Ask ONE question at a time
- Be encouraging but realistic
- Use simple language, avoid jargon
- Listen to their answers and build on them
- Show genuine interest in their vision
- Give confidence while being honest about challenges

CONVERSATION FLOW:
- Start with their idea
- Ask follow-up questions based on their responses
- Build understanding progressively
- Only give comprehensive advice after full context

Remember: You're conducting a strategic discovery session, not an interrogation. Make them feel heard and understood.`;

    // Build conversation context
    const conversationContext = conversationHistory.length > 0 
      ? `\n\nPrevious conversation:\n${conversationHistory.map((msg: ConversationMessage) => `${msg.sender}: ${msg.content}`).join('\n')}\n\n`
      : '';

    // Create the full prompt
    const fullPrompt = `${systemPrompt}${conversationContext}Founder: ${message}\n\nAI CTO:`;

    // Call Gemini API
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': geminiApiKey
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: fullPrompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API error:", errorData);
      return NextResponse.json(
        { error: "Failed to get response from Gemini API" },
        { status: response.status }
      );
    }

    const data = await response.json() as {
      candidates?: Array<{
        content?: {
          parts?: Array<{
            text?: string;
          }>;
        };
      }>;
    };
    
    // Extract the response text from Gemini
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!aiResponse) {
      console.error("Unexpected Gemini response format:", data);
      return NextResponse.json(
        { error: "Invalid response format from Gemini API" },
        { status: 500 }
      );
    }

    return NextResponse.json({ response: aiResponse });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 