import fs from 'fs';
import path from 'path';

interface WaitlistEntry {
  email: string;
  timestamp: string;
  source: string;
}

class WaitlistStorage {
  private readonly STORAGE_FILE = path.join(process.cwd(), 'data', 'waitlist.json');

  constructor() {
    this.ensureDataDirectory();
  }

  private ensureDataDirectory() {
    const dataDir = path.dirname(this.STORAGE_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
  }

  private readWaitlist(): WaitlistEntry[] {
    try {
      if (!fs.existsSync(this.STORAGE_FILE)) {
        return [];
      }
      const data = fs.readFileSync(this.STORAGE_FILE, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading waitlist:', error);
      return [];
    }
  }

  private writeWaitlist(entries: WaitlistEntry[]): void {
    try {
      fs.writeFileSync(this.STORAGE_FILE, JSON.stringify(entries, null, 2));
    } catch (error) {
      console.error('Error writing waitlist:', error);
      throw error;
    }
  }

  addEmail(email: string, source: string = 'website'): boolean {
    try {
      const entries = this.readWaitlist();
      
      // Check if email already exists
      if (entries.some(entry => entry.email.toLowerCase() === email.toLowerCase())) {
        return false; // Email already exists
      }

      const newEntry: WaitlistEntry = {
        email: email.toLowerCase(),
        timestamp: new Date().toISOString(),
        source
      };

      entries.push(newEntry);
      this.writeWaitlist(entries);
      
      console.log(`Added email to waitlist: ${email}`);
      return true;
    } catch (error) {
      console.error('Error adding email to waitlist:', error);
      return false;
    }
  }

  getAllEmails(): WaitlistEntry[] {
    return this.readWaitlist();
  }

  getEmailCount(): number {
    return this.readWaitlist().length;
  }

  exportToCSV(): string {
    const entries = this.readWaitlist();
    const headers = ['Email', 'Timestamp', 'Source'];
    const rows = entries.map(entry => [entry.email, entry.timestamp, entry.source]);
    
    const csvContent = [headers, ...rows]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');
    
    return csvContent;
  }
}

export const waitlistStorage = new WaitlistStorage(); 