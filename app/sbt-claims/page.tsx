'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Mock data for SBT claims - extended version
const mockSbtClaims = [
  {
    id: 1,
    registry_id: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    user_address: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    did_type: "github",
    user_did_id: "octocat",
    nft_id: "0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba",
    checkpoint_sequence_number: 264113881,
    transaction_digest: "5xK8mN9pQ2rS3tU4vW5xY6zA7bC8dE9fG0hI1jK2lM3nO4pQ5rS6tU7vW8xY9zA0",
    timestamp_ms: 1732136414611,
    event_index: 0
  },
  {
    id: 2,
    registry_id: "0x2345678901bcdef2345678901bcdef2345678901bcdef2345678901bcdef",
    user_address: "0xbcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    did_type: "twitter",
    user_did_id: "twitter_user",
    nft_id: "0xa9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba",
    checkpoint_sequence_number: 264113882,
    transaction_digest: "6yL9nO0qR3sT4uV5wX6yZ7aB8cD9eF0gH1iJ2kL3mN4oP5qR6sT7uV8wX9yZ0",
    timestamp_ms: 1732136415611,
    event_index: 1
  },
  {
    id: 3,
    registry_id: "0x3456789012cdef3456789012cdef3456789012cdef3456789012cdef",
    user_address: "0xcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    did_type: "discord",
    user_did_id: "discord_user",
    nft_id: "0xb9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba",
    checkpoint_sequence_number: 264113883,
    transaction_digest: "7zM0oP1rS4tU5vW6xY7zA8bC9dE0fG1hI2jK3lL4mM5nO6pP7qR8sT9uV0wX1",
    timestamp_ms: 1732136416611,
    event_index: 2
  },
  {
    id: 4,
    registry_id: "0x4567890123def4567890123def4567890123def4567890123def",
    user_address: "0xdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    did_type: "github",
    user_did_id: "developer123",
    nft_id: "0xc9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba",
    checkpoint_sequence_number: 264113884,
    transaction_digest: "8aN1pQ2sT5uV6wX7yZ8aB9cD0eF1gH2iI3jJ4kK5lL6mM7nN8oO9pP0qR1sS2",
    timestamp_ms: 1732136417611,
    event_index: 3
  },
  {
    id: 5,
    registry_id: "0x5678901234ef5678901234ef5678901234ef5678901234ef",
    user_address: "0xef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    did_type: "twitter",
    user_did_id: "crypto_user",
    nft_id: "0xd9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba",
    checkpoint_sequence_number: 264113885,
    transaction_digest: "9bO2qR3tU6vW7xY8zA9bC0dE1fG2hH3iI4jJ5kK6lL7mM8nN9oO0pP1qQ2rR3",
    timestamp_ms: 1732136418611,
    event_index: 4
  },
  {
    id: 6,
    registry_id: "0x6789012345f6789012345f6789012345f6789012345f",
    user_address: "0xf1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    did_type: "github",
    user_did_id: "blockchain_dev",
    nft_id: "0xe9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba",
    checkpoint_sequence_number: 264113886,
    transaction_digest: "0cP3rS4uV7wX8yZ9aB0cD1eF2gG3hH4iI5jJ6kK7lL8mM9nN0oO1pP2qQ3rR4",
    timestamp_ms: 1732136419611,
    event_index: 5
  },
  {
    id: 7,
    registry_id: "0x7890123456789012345678901234567890123456789012345678901234567890",
    user_address: "0x01234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    did_type: "discord",
    user_did_id: "gamer_pro",
    nft_id: "0xf9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba",
    checkpoint_sequence_number: 264113887,
    transaction_digest: "1dQ4sT5vW8xY9zA0bC1dE2fF3gH4hH5iI6jJ7kK8lL9mM0nN1oO2pP3qQ4rR5",
    timestamp_ms: 1732136420611,
    event_index: 6
  },
  {
    id: 8,
    registry_id: "0x8901234567890123456789012345678901234567890123456789012345678901",
    user_address: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    did_type: "twitter",
    user_did_id: "web3_enthusiast",
    nft_id: "0x09876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba",
    checkpoint_sequence_number: 264113888,
    transaction_digest: "2eR5tU6wX9yZ0aB1cD2eE3fG4gH5hH6iI7jJ8kK9lL0mM1nN2oO3pP4qQ5rR6",
    timestamp_ms: 1732136421611,
    event_index: 7
  }
];

// Format address to show first 6 and last 4 characters
const formatAddress = (address: string) => {
  if (!address) return '';
  if (address.length <= 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// Format timestamp to readable date
const formatDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export default function SbtClaimsPage() {
  const router = useRouter();

  return (
    <div className="w-full bg-ghost-white outfit min-h-screen relative overflow-hidden">
      {/* Blob Animations Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      {/* Subtle gradient overlay for depth */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none"></div>

      {/* Subtle pattern overlay */}
      <div
        className="fixed inset-0 z-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, var(--color-primary) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      ></div>

      {/* Main Content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Go Back Button */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-white/95 backdrop-blur-sm border-[3px] border-primary/30 rounded-xl font-bold text-sm text-charcoal-text transition-all shadow-[0.1em_0.1em] hover:shadow-[0.15em_0.15em] hover:-translate-x-[0.05em] hover:-translate-y-[0.05em]"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Go Back
            </Link>
          </div>

          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-charcoal-text">SBT Claims</h1>
            <p className="text-base text-charcoal-text/70">Complete list of all SBT claims</p>
          </div>

          {/* Full Data Table */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border-[3px] border-primary/30 shadow-[0.1em_0.1em]">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-primary/20">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-charcoal-text/60 uppercase tracking-wider">ID</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-charcoal-text/60 uppercase tracking-wider">Registry ID</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-charcoal-text/60 uppercase tracking-wider">User Address</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-charcoal-text/60 uppercase tracking-wider">DID Type</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-charcoal-text/60 uppercase tracking-wider">User DID ID</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-charcoal-text/60 uppercase tracking-wider">NFT ID</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-charcoal-text/60 uppercase tracking-wider">Checkpoint</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-charcoal-text/60 uppercase tracking-wider">Transaction</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-charcoal-text/60 uppercase tracking-wider">Timestamp</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-charcoal-text/60 uppercase tracking-wider">Event Index</th>
                  </tr>
                </thead>
                <tbody>
                  {mockSbtClaims.map((claim) => (
                    <tr key={claim.id} className="border-b border-primary/10 hover:bg-primary/5 transition-colors">
                      <td className="py-3 px-4 text-sm text-charcoal-text font-semibold">
                        {claim.id}
                      </td>
                      <td className="py-3 px-4 text-sm text-charcoal-text font-mono">
                        {formatAddress(claim.registry_id)}
                      </td>
                      <td className="py-3 px-4 text-sm text-charcoal-text font-mono">
                        {formatAddress(claim.user_address)}
                      </td>
                      <td className="py-3 px-4 text-sm text-charcoal-text">
                        {claim.did_type}
                      </td>
                      <td className="py-3 px-4 text-sm text-charcoal-text">
                        {claim.user_did_id}
                      </td>
                      <td className="py-3 px-4 text-sm text-charcoal-text font-mono">
                        {formatAddress(claim.nft_id)}
                      </td>
                      <td className="py-3 px-4 text-sm text-charcoal-text">
                        {claim.checkpoint_sequence_number}
                      </td>
                      <td className="py-3 px-4 text-sm text-charcoal-text font-mono">
                        {formatAddress(claim.transaction_digest)}
                      </td>
                      <td className="py-3 px-4 text-sm text-charcoal-text">
                        {formatDate(claim.timestamp_ms)}
                      </td>
                      <td className="py-3 px-4 text-sm text-charcoal-text">
                        {claim.event_index}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

