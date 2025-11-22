// API service for fetching DID claim events

export interface DIDClaimEvent {
  id: number;
  registry_id: string;
  user_address: string;
  did_type: string;
  user_did_id: string;
  nft_id: string;
  checkpoint_sequence_number: number;
  transaction_digest: string;
  timestamp_ms: number;
  event_index: number;
}

export interface APIResponse {
  success: boolean;
  data: DIDClaimEvent[];
  pagination: {
    limit: number;
    offset: number;
    total: number;
    has_more: boolean;
  };
}

export async function fetchDIDEvents(
  options: {
    limit?: number;
    offset?: number;
    did_type?: string;
  } = {}
): Promise<APIResponse> {
  const params = new URLSearchParams({
    limit: String(options.limit || 100),
    offset: String(options.offset || 0),
    ...(options.did_type && { did_type: options.did_type }),
  });

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8080';
  const response = await fetch(`${apiUrl}/api/events?${params}`);

  if (!response.ok) {
    throw new Error('Failed to fetch DID events');
  }

  return response.json();
}
