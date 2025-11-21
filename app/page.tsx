'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

// Mock data for SBT claims
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
  }
];

// Mock data for DID reusage
const mockDidReusage = [
  {
    enclave_tx_digest: "0x1111111111111111111111111111111111111111111111111111111111111111",
    did_verified_id: "0x2222222222222222222222222222222222222222222222222222222222222222",
    protocol_involved: "Alphafi",
    user_address: "0x3333333333333333333333333333333333333333333333333333333333333333",
    payment_tx_digest: "0x4444444444444444444444444444444444444444444444444444444444444444"
  },
  {
    enclave_tx_digest: "0x5555555555555555555555555555555555555555555555555555555555555555",
    did_verified_id: "0x6666666666666666666666666666666666666666666666666666666666666666",
    protocol_involved: "Suilend",
    user_address: "0x7777777777777777777777777777777777777777777777777777777777777777",
    payment_tx_digest: "0x8888888888888888888888888888888888888888888888888888888888888888"
  },
  {
    enclave_tx_digest: "0x9999999999999999999999999999999999999999999999999999999999999999",
    did_verified_id: "0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    protocol_involved: "Alphafi",
    user_address: "0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
    payment_tx_digest: "0xcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc"
  },
  {
    enclave_tx_digest: "0xdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
    did_verified_id: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    protocol_involved: "Suilend",
    user_address: "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
    payment_tx_digest: "0x1010101010101010101010101010101010101010101010101010101010101010"
  },
  {
    enclave_tx_digest: "0x2020202020202020202020202020202020202020202020202020202020202020",
    did_verified_id: "0x3030303030303030303030303030303030303030303030303030303030303030",
    protocol_involved: "Alphafi",
    user_address: "0x4040404040404040404040404040404040404040404040404040404040404040",
    payment_tx_digest: "0x5050505050505050505050505050505050505050505050505050505050505050"
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

export default function ExplorerPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

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

      {/* Integrated Header - Not as a separate component */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
        <Image
              src="/head_logo.png" 
              alt="SuiVerify" 
              width={120} 
              height={40}
              className="h-10 w-auto"
            />
          </div>

          {/* Search Field */}
          <div className="flex-1 max-w-md ml-8">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 bg-white/95 backdrop-blur-sm border-[3px] border-primary/30 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary text-charcoal-text placeholder-charcoal-text/40 text-sm transition-all shadow-[0.1em_0.1em]"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          {/* Stats Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {/* DID Issued */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border-[3px] border-primary/30 shadow-[0.1em_0.1em]">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-primary/15">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-charcoal-text/60 uppercase tracking-wider">
                  DID Issued
                </p>
              </div>
              <p className="text-3xl font-bold text-charcoal-text">
                1,234
              </p>
            </div>

            {/* Total Users */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border-[3px] border-secondary/30 shadow-[0.1em_0.1em]">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-secondary/15">
                  <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-charcoal-text/60 uppercase tracking-wider">
                  Total Users
                </p>
              </div>
              <p className="text-3xl font-bold text-charcoal-text">
                5,678
              </p>
            </div>

            {/* Protocols Integrated */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border-[3px] border-warning/30 shadow-[0.1em_0.1em]">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-warning/15">
                  <svg className="w-5 h-5 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-charcoal-text/60 uppercase tracking-wider">
                  Protocols Integrated
                </p>
              </div>
              <p className="text-3xl font-bold text-charcoal-text">
                12
              </p>
            </div>
          </div>

          {/* Two Tables Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* SBT Claims Table */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border-[3px] border-primary/30 shadow-[0.1em_0.1em]">
              <h2 className="text-2xl font-bold mb-6 text-charcoal-text">SBT Claims</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-primary/20">
                      <th className="text-left py-3 px-2 text-xs font-semibold text-charcoal-text/60 uppercase tracking-wider">User Address</th>
                      <th className="text-left py-3 px-2 text-xs font-semibold text-charcoal-text/60 uppercase tracking-wider">DID Type</th>
                      <th className="text-left py-3 px-2 text-xs font-semibold text-charcoal-text/60 uppercase tracking-wider">DID ID</th>
                      <th className="text-left py-3 px-2 text-xs font-semibold text-charcoal-text/60 uppercase tracking-wider">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockSbtClaims.slice(0, 4).map((claim) => (
                      <tr key={claim.id} className="border-b border-primary/10 hover:bg-primary/5 transition-colors">
                        <td className="py-3 px-2 text-sm text-charcoal-text font-mono">
                          {formatAddress(claim.user_address)}
                        </td>
                        <td className="py-3 px-2 text-sm text-charcoal-text">
                          {claim.did_type}
                        </td>
                        <td className="py-3 px-2 text-sm text-charcoal-text">
                          {claim.user_did_id}
                        </td>
                        <td className="py-3 px-2 text-sm text-charcoal-text">
                          {formatDate(claim.timestamp_ms)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6">
                <Link
                  href="/sbt-claims"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-xl font-bold text-sm transition-all shadow-[0.1em_0.1em] hover:shadow-[0.15em_0.15em] hover:-translate-x-[0.05em] hover:-translate-y-[0.05em]"
                >
                  Show More
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* DID Reusage Table */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border-[3px] border-secondary/30 shadow-[0.1em_0.1em]">
              <h2 className="text-2xl font-bold mb-6 text-charcoal-text">DID Reusage</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-secondary/20">
                      <th className="text-left py-3 px-2 text-xs font-semibold text-charcoal-text/60 uppercase tracking-wider">Protocol</th>
                      <th className="text-left py-3 px-2 text-xs font-semibold text-charcoal-text/60 uppercase tracking-wider">User Address</th>
                      <th className="text-left py-3 px-2 text-xs font-semibold text-charcoal-text/60 uppercase tracking-wider">DID NFT</th>
                      <th className="text-left py-3 px-2 text-xs font-semibold text-charcoal-text/60 uppercase tracking-wider">Enclave TX</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockDidReusage.slice(0, 4).map((reusage, index) => (
                      <tr key={index} className="border-b border-secondary/10 hover:bg-secondary/5 transition-colors">
                        <td className="py-3 px-2 text-sm text-charcoal-text font-semibold">
                          {reusage.protocol_involved}
                        </td>
                        <td className="py-3 px-2 text-sm text-charcoal-text font-mono">
                          {formatAddress(reusage.user_address)}
                        </td>
                        <td className="py-3 px-2 text-sm text-charcoal-text font-mono">
                          {formatAddress(reusage.did_verified_id)}
                        </td>
                        <td className="py-3 px-2 text-sm text-charcoal-text font-mono">
                          {formatAddress(reusage.enclave_tx_digest)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6">
                <Link
                  href="/did-reusage"
                  className="inline-flex items-center justify-center px-6 py-3 bg-secondary text-white rounded-xl font-bold text-sm transition-all shadow-[0.1em_0.1em] hover:shadow-[0.15em_0.15em] hover:-translate-x-[0.05em] hover:-translate-y-[0.05em]"
                >
                  Show More
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
