export class ClaimData{
    nonce: string;
    sequence: number;
}

export class RewardData {
    item: ItemData;
    gold: number;
    gcash: number;
    error: string;
}

export class ItemData {
    thumbnail: string;
    desc: string;
    name: string;
    item_id: number;
}