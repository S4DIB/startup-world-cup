"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface WaitlistEntry {
  email: string;
  timestamp: string;
  source: string;
}

export default function AdminPage() {
  const [emails, setEmails] = useState<WaitlistEntry[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [apiKey, setApiKey] = useState("");

  const fetchWaitlist = async () => {
    if (!apiKey) return;

    try {
      setLoading(true);
      const response = await fetch('/api/waitlist/admin', {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch waitlist data');
      }

      const data = await response.json();
      setEmails(data.emails);
      setCount(data.count);
      setError("");
    } catch {
      setError("Failed to fetch waitlist data. Check your API key.");
    } finally {
      setLoading(false);
    }
  };

  const exportCSV = async () => {
    if (!apiKey) return;

    try {
      const response = await fetch('/api/waitlist/admin', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action: 'export-csv' })
      });

      if (!response.ok) {
        throw new Error('Failed to export CSV');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'waitlist.csv';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch {
      setError("Failed to export CSV");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Waitlist Admin</h1>
        
        {/* API Key Input */}
        <div className="mb-8 p-6 bg-gray-800 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Authentication</h2>
          <div className="flex gap-4">
            <input
              type="password"
              placeholder="Enter your admin API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
            />
            <Button
              onClick={fetchWaitlist}
              disabled={!apiKey || loading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {loading ? "Loading..." : "Fetch Data"}
            </Button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900 border border-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Stats */}
        {count > 0 && (
          <div className="mb-8 p-6 bg-gray-800 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Waitlist Statistics</h2>
              <Button
                onClick={exportCSV}
                className="bg-green-600 hover:bg-green-700"
              >
                Export CSV
              </Button>
            </div>
            <div className="text-2xl font-bold text-blue-400">{count} emails collected</div>
          </div>
        )}

        {/* Email List */}
        {emails.length > 0 && (
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-xl font-semibold">Waitlist Emails</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Source
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {emails.map((entry, index) => (
                    <tr key={index} className="hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        {entry.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {new Date(entry.timestamp).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {entry.source}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 