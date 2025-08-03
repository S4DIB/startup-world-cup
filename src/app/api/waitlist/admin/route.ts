import { NextRequest, NextResponse } from "next/server";
import { waitlistStorage } from "@/lib/waitlistStorage";

interface AdminRequest {
  action: string;
}

export async function GET(request: NextRequest) {
  try {
    // Basic authentication - you should implement proper auth
    const authHeader = request.headers.get('authorization');
    const apiKey = process.env.ADMIN_API_KEY;
    
    if (!apiKey || authHeader !== `Bearer ${apiKey}`) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const emails = waitlistStorage.getAllEmails();
    const count = waitlistStorage.getEmailCount();

    return NextResponse.json({
      success: true,
      count,
      emails
    });

  } catch (error) {
    console.error("Admin API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch waitlist data." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Basic authentication
    const authHeader = request.headers.get('authorization');
    const apiKey = process.env.ADMIN_API_KEY;
    
    if (!apiKey || authHeader !== `Bearer ${apiKey}`) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { action }: AdminRequest = await request.json();

    if (action === 'export-csv') {
      const csvData = waitlistStorage.exportToCSV();
      
      return new NextResponse(csvData, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename="waitlist.csv"'
        }
      });
    }

    return NextResponse.json(
      { error: "Invalid action" },
      { status: 400 }
    );

  } catch (error) {
    console.error("Admin API error:", error);
    return NextResponse.json(
      { error: "Failed to process request." },
      { status: 500 }
    );
  }
} 