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

// ============================================
// Settlement API (protocol-pay-microservice)
// ============================================

export interface SettlementRecord {
    id: number;
    enclave_tx_digest: string;
    did_verified_id: string;
    did_nft_name: string | null;
    protocol_uid: number;
    protocol_name: string;
    protocol_address: string | null;
    user_address: string;
    payment_tx_digest: string;
    settlement_amount: number;
    timestamp: number;
    created_at: string;
    status: string;
}

export interface SettlementsResponse {
    success: boolean;
    total: number;
    count: number;
    pagination: {
        limit: number;
        page: number;
        totalPages: number;
    };
    data: SettlementRecord[];
}

export async function fetchSettlements(
    options: {
        limit?: number;
        page?: number;
    } = {}
): Promise<SettlementsResponse> {
    const params = new URLSearchParams({
        limit: String(options.limit || 100),
        page: String(options.page || 1),
    });

    const settlementApiUrl = process.env.NEXT_PUBLIC_SETTLEMENT_API_URL || 'http://localhost:3001';
    const response = await fetch(`${settlementApiUrl}/api/settlement/all?${params}`);

    if (!response.ok) {
        throw new Error('Failed to fetch settlements');
    }

    return response.json();
}
