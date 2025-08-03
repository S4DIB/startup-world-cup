import { NextRequest, NextResponse } from "next/server";
import { waitlistStorage } from "@/lib/waitlistStorage";

interface WaitlistRequest {
  email: string;
}

export async function POST(request: NextRequest) {
  try {
    const { email }: WaitlistRequest = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    // Add email to waitlist storage
    const success = waitlistStorage.addEmail(email, 'website');
    
    if (!success) {
      return NextResponse.json(
        { error: "This email is already on our waitlist!" },
        { status: 400 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: "Thank you! You've been added to our waitlist. We'll notify you when we launch!" 
    });

  } catch (error) {
    console.error("Waitlist API error:", error);
    return NextResponse.json(
      { error: "Failed to add to waitlist. Please try again." },
      { status: 500 }
    );
  }
} 