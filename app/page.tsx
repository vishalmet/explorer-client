'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

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

// Mock chart data for Total Credentials Issued (Bar Chart)
const credentialsIssuedData = [
  { date: '10/24', value: 8500000 },
  { date: '10/28', value: 8700000 },
  { date: '11/01', value: 8900000 },
  { date: '11/05', value: 9000000 },
  { date: '11/09', value: 9100000 },
  { date: '11/13', value: 9200000 },
  { date: '11/17', value: 9298876 },
];

// Mock chart data for Total Transactions (Area Chart)
const transactionsData = [
  { date: '10/24', value: 150000 },
  { date: '10/28', value: 165000 },
  { date: '11/01', value: 180000 },
  { date: '11/05', value: 175000 },
  { date: '11/09', value: 190000 },
  { date: '11/13', value: 185000 },
  { date: '11/17', value: 181162 },
];

// Format address to show first 6 and last 4 characters
const formatAddress = (address: string) => {
  if (!address) return '';
  if (address.length <= 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// Format timestamp to relative time (e.g., "3 secs ago")
const formatTimeAgo = (timestamp: number) => {
  const now = Date.now();
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return `${seconds} secs ago`;
  if (minutes < 60) return `${minutes} mins ago`;
  if (hours < 24) return `${hours} hrs ago`;
  return `${days} days ago`;
};

// Copy to clipboard function
const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

// Custom tooltip for charts
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-sm border-[3px] border-primary/30 rounded-xl p-3 shadow-[0.1em_0.1em]">
        <p className="text-sm font-bold text-charcoal-text">{`${payload[0].value.toLocaleString()}`}</p>
      </div>
    );
  }
  return null;
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

      {/* Professional Header with SuiVerify Theme */}
      <header className="relative z-50 bg-white/90 backdrop-blur-md border-b border-primary/20 sticky top-0 shadow-sm">
        <div className="max-w-[1920px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
        <Image
                src="/head_logo.png" 
                alt="SuiVerify Explorer" 
                width={140} 
                height={45}
                className="h-10 w-auto"
          priority
        />
            </div>

            {/* Search Bar - Prominent and Professional */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-primary/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search by Txn Hash / Block / Address / DID"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/95 backdrop-blur-sm border-[3px] border-primary/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm text-charcoal-text placeholder-charcoal-text/40 transition-all shadow-[0.1em_0.1em]"
                />
              </div>
            </div>

            {/* Network/Info Section */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="text-right">
                <div className="text-xs text-charcoal-text/60 uppercase tracking-wide font-semibold">Network</div>
                <div className="text-sm font-bold text-charcoal-text">Mainnet</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-[1920px] mx-auto px-6 py-8">
        {/* Stats Cards - Professional Design with SuiVerify Theme */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {/* DID Issued */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl border-[3px] border-primary/30 p-6 shadow-[0.1em_0.1em] hover:shadow-[0.15em_0.15em] transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-primary/15">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-charcoal-text/60 uppercase tracking-wider">DID Issued</p>
                </div>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-charcoal-text">1,234</p>
              <span className="text-xs font-medium text-success">+0.020%</span>
            </div>
            <p className="text-xs text-charcoal-text/60 mt-1">past 30 days</p>
          </div>

          {/* Total Users */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl border-[3px] border-secondary/30 p-6 shadow-[0.1em_0.1em] hover:shadow-[0.15em_0.15em] transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-secondary/15">
                  <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-charcoal-text/60 uppercase tracking-wider">Total Users</p>
                </div>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-charcoal-text">5,678</p>
              <span className="text-xs font-medium text-success">+0.029%</span>
            </div>
            <p className="text-xs text-charcoal-text/60 mt-1">past 30 days</p>
          </div>

          {/* Protocols Integrated */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl border-[3px] border-warning/30 p-6 shadow-[0.1em_0.1em] hover:shadow-[0.15em_0.15em] transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-warning/15">
                  <svg className="w-5 h-5 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-charcoal-text/60 uppercase tracking-wider">Protocols Integrated</p>
                </div>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-charcoal-text">12</p>
              <span className="text-xs font-medium text-charcoal-text/60">0%</span>
            </div>
            <p className="text-xs text-charcoal-text/60 mt-1">past 30 days</p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* Total Credentials Issued - Bar Chart */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl border-[3px] border-primary/30 p-6 shadow-[0.1em_0.1em]">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-charcoal-text mb-1">Total Credentials Issued</h3>
              <p className="text-xs text-charcoal-text/60">Shows total VCs issued based on verified on-chain identity actions.</p>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={credentialsIssuedData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#7C3AED" opacity={0.1} />
                <XAxis 
                  dataKey="date" 
                  stroke="#212529"
                  strokeWidth={2}
                  tick={{ fill: '#64748B', fontSize: 12, fontWeight: 600 }}
                />
                <YAxis 
                  stroke="#212529"
                  strokeWidth={2}
                  tick={{ fill: '#64748B', fontSize: 12, fontWeight: 600 }}
                  tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {credentialsIssuedData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="#7C3AED" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Total Transactions - Area Chart */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl border-[3px] border-secondary/30 p-6 shadow-[0.1em_0.1em]">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-charcoal-text mb-1">Total Transactions</h3>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-charcoal-text">17,042,606</p>
                <p className="text-xs text-charcoal-text/60">Daily Transaction (Avg): 181,162 txns</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={transactionsData}>
                <defs>
                  <linearGradient id="colorTransactions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#14B8A6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#14B8A6" opacity={0.1} />
                <XAxis 
                  dataKey="date" 
                  stroke="#212529"
                  strokeWidth={2}
                  tick={{ fill: '#64748B', fontSize: 12, fontWeight: 600 }}
                />
                <YAxis 
                  stroke="#212529"
                  strokeWidth={2}
                  tick={{ fill: '#64748B', fontSize: 12, fontWeight: 600 }}
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#14B8A6" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorTransactions)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Two Tables Side by Side - Professional Design with SuiVerify Theme */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* SBT Claims Table */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl border-[3px] border-primary/30 shadow-[0.1em_0.1em]">
            <div className="px-6 py-4 border-b-2 border-primary/20 flex items-center justify-between">
              <h2 className="text-lg font-bold text-charcoal-text">SBT Claims</h2>
              <Link href="/sbt-claims" className="text-primary hover:text-primary-dark text-sm font-bold flex items-center gap-1 transition-colors">
                View All
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-primary/5 border-b-2 border-primary/20">
                    <th className="text-left py-3 px-6 text-xs font-semibold text-charcoal-text/70 uppercase tracking-wider">User Address</th>
                    <th className="text-left py-3 px-6 text-xs font-semibold text-charcoal-text/70 uppercase tracking-wider">DID Type</th>
                    <th className="text-left py-3 px-6 text-xs font-semibold text-charcoal-text/70 uppercase tracking-wider">DID ID</th>
                    <th className="text-left py-3 px-6 text-xs font-semibold text-charcoal-text/70 uppercase tracking-wider">Age</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/10">
                  {mockSbtClaims.slice(0, 4).map((claim) => (
                    <tr key={claim.id} className="hover:bg-primary/5 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-mono text-primary hover:text-primary-dark cursor-pointer font-semibold">
                            {formatAddress(claim.user_address)}
                          </span>
                          <button
                            onClick={() => copyToClipboard(claim.user_address)}
                            className="text-charcoal-text/40 hover:text-primary transition-colors"
                            title="Copy address"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/15 text-primary border border-primary/30">
                          {claim.did_type}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-charcoal-text font-medium">{claim.user_did_id}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-charcoal-text/70">{formatTimeAgo(claim.timestamp_ms)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t-2 border-primary/20">
              <Link
                href="/sbt-claims"
                className="w-full flex items-center justify-center px-4 py-2.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl text-sm font-bold transition-all shadow-[0.1em_0.1em] hover:shadow-[0.15em_0.15em] hover:-translate-x-[0.05em] hover:-translate-y-[0.05em] border-[3px] border-primary/30"
              >
                View All SBT Claims
              </Link>
            </div>
          </div>

          {/* DID Reusage Table */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl border-[3px] border-secondary/30 shadow-[0.1em_0.1em]">
            <div className="px-6 py-4 border-b-2 border-secondary/20 flex items-center justify-between">
              <h2 className="text-lg font-bold text-charcoal-text">DID Reusage</h2>
              <Link href="/did-reusage" className="text-secondary hover:text-secondary-dark text-sm font-bold flex items-center gap-1 transition-colors">
                View All
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-secondary/5 border-b-2 border-secondary/20">
                    <th className="text-left py-3 px-6 text-xs font-semibold text-charcoal-text/70 uppercase tracking-wider">Protocol</th>
                    <th className="text-left py-3 px-6 text-xs font-semibold text-charcoal-text/70 uppercase tracking-wider">User Address</th>
                    <th className="text-left py-3 px-6 text-xs font-semibold text-charcoal-text/70 uppercase tracking-wider">DID NFT</th>
                    <th className="text-left py-3 px-6 text-xs font-semibold text-charcoal-text/70 uppercase tracking-wider">Enclave TX</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-secondary/10">
                  {mockDidReusage.slice(0, 4).map((reusage, index) => (
                    <tr key={index} className="hover:bg-secondary/5 transition-colors">
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-secondary/15 text-secondary border border-secondary/30">
                          {reusage.protocol_involved}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-mono text-primary hover:text-primary-dark cursor-pointer font-semibold">
                            {formatAddress(reusage.user_address)}
                          </span>
                          <button
                            onClick={() => copyToClipboard(reusage.user_address)}
                            className="text-charcoal-text/40 hover:text-secondary transition-colors"
                            title="Copy address"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-mono text-charcoal-text font-medium">
                            {formatAddress(reusage.did_verified_id)}
                          </span>
                          <button
                            onClick={() => copyToClipboard(reusage.did_verified_id)}
                            className="text-charcoal-text/40 hover:text-secondary transition-colors"
                            title="Copy DID NFT"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-mono text-charcoal-text font-medium">
                            {formatAddress(reusage.enclave_tx_digest)}
                          </span>
                          <button
                            onClick={() => copyToClipboard(reusage.enclave_tx_digest)}
                            className="text-charcoal-text/40 hover:text-secondary transition-colors"
                            title="Copy TX"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t-2 border-secondary/20">
              <Link
                href="/did-reusage"
                className="w-full flex items-center justify-center px-4 py-2.5 bg-secondary/10 hover:bg-secondary/20 text-secondary rounded-xl text-sm font-bold transition-all shadow-[0.1em_0.1em] hover:shadow-[0.15em_0.15em] hover:-translate-x-[0.05em] hover:-translate-y-[0.05em] border-[3px] border-secondary/30"
              >
                View All DID Reusage
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
