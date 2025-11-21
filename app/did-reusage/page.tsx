'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Mock data for DID reusage - extended version
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
  },
  {
    enclave_tx_digest: "0x6060606060606060606060606060606060606060606060606060606060606060",
    did_verified_id: "0x7070707070707070707070707070707070707070707070707070707070707070",
    protocol_involved: "Suilend",
    user_address: "0x8080808080808080808080808080808080808080808080808080808080808080",
    payment_tx_digest: "0x9090909090909090909090909090909090909090909090909090909090909090"
  },
  {
    enclave_tx_digest: "0xa0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0",
    did_verified_id: "0xb0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0",
    protocol_involved: "Alphafi",
    user_address: "0xc0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0",
    payment_tx_digest: "0xd0d0d0d0d0d0d0d0d0d0d0d0d0d0d0d0d0d0d0d0d0d0d0d0d0d0d0d0d0d0d0d0"
  },
  {
    enclave_tx_digest: "0xe0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0",
    did_verified_id: "0xf0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0",
    protocol_involved: "Suilend",
    user_address: "0x0101010101010101010101010101010101010101010101010101010101010101",
    payment_tx_digest: "0x0202020202020202020202020202020202020202020202020202020202020202"
  }
];

// Format address to show first 6 and last 4 characters
const formatAddress = (address: string) => {
  if (!address) return '';
  if (address.length <= 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// Copy to clipboard function
const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

export default function DidReusagePage() {
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

      {/* Professional Header with SuiVerify Theme */}
      <header className="relative z-50 bg-white/90 backdrop-blur-md border-b border-secondary/20 sticky top-0 shadow-sm">
        <div className="max-w-[1920px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/95 backdrop-blur-sm border-[3px] border-secondary/30 rounded-xl text-charcoal-text hover:text-secondary font-bold text-sm transition-all shadow-[0.1em_0.1em] hover:shadow-[0.15em_0.15em] hover:-translate-x-[0.05em] hover:-translate-y-[0.05em]"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Go Back</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-[1920px] mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-charcoal-text mb-2">DID Reusage</h1>
          <p className="text-sm text-charcoal-text/70">Showing all {mockDidReusage.length} results</p>
        </div>

        {/* Full Data Table */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl border-[3px] border-secondary/30 shadow-[0.1em_0.1em]">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-secondary/5 border-b-2 border-secondary/20">
                  <th className="text-left py-4 px-6 text-xs font-semibold text-charcoal-text/70 uppercase tracking-wider">Enclave TX Digest</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-charcoal-text/70 uppercase tracking-wider">DID Verified ID (NFT)</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-charcoal-text/70 uppercase tracking-wider">Protocol Involved</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-charcoal-text/70 uppercase tracking-wider">User Address</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-charcoal-text/70 uppercase tracking-wider">Payment TX Digest</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary/10">
                {mockDidReusage.map((reusage, index) => (
                  <tr key={index} className="hover:bg-secondary/5 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-mono text-primary hover:text-primary-dark cursor-pointer font-semibold">
                          {formatAddress(reusage.enclave_tx_digest)}
                        </span>
                        <button
                          onClick={() => copyToClipboard(reusage.enclave_tx_digest)}
                          className="text-charcoal-text/40 hover:text-secondary transition-colors"
                          title="Copy Enclave TX"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-mono text-primary hover:text-primary-dark cursor-pointer font-semibold">
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
                          title="Copy User Address"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-mono text-primary hover:text-primary-dark cursor-pointer font-semibold">
                          {formatAddress(reusage.payment_tx_digest)}
                        </span>
                        <button
                          onClick={() => copyToClipboard(reusage.payment_tx_digest)}
                          className="text-charcoal-text/40 hover:text-secondary transition-colors"
                          title="Copy Payment TX"
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
        </div>
      </main>
    </div>
  );
}
