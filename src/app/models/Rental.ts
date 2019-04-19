import { Timestamp } from '@firebase/firestore-types';

export class Rental {
    id: string;
    player: string;
    inventoryItem: string;
    type: string;
    kitOut: Timestamp;
    kitIn: Timestamp;
    kitDue: Timestamp;
    feePaid: Timestamp;
    feeReturned: Timestamp;
    feeDue: number;
    actionRequired: string;

    constructor(id: string, data: RentalData) {
        this.id = id;
        this.player = data.player;
        this.inventoryItem = data.inventoryItem;
        this.type = data.type;
        this.kitOut = data.kitOut;
        this.kitIn = data.kitIn;
        this.kitDue = data.kitDue;
        this.feePaid = data.feePaid;
        this.feeReturned = data.feeReturned;
        this.feeDue = data.feeDue;
        this.actionRequired = data.actionRequired;
    }

    toData(): RentalData {
        return {
            player: this.player,
            inventoryItem: this.inventoryItem,
            type: this.type,
            kitOut: this.kitOut,
            kitIn: this.kitIn,
            kitDue: this.kitDue,
            feePaid: this.feePaid,
            feeReturned: this.feeReturned,
            feeDue: this.feeDue,
            actionRequired: this.actionRequired,
        } as RentalData;
    }
}

export class RentalData {
    player: string;
    inventoryItem: string;
    type: string;
    kitOut: Timestamp;
    kitIn: Timestamp;
    kitDue: Timestamp;
    feePaid: Timestamp;
    feeReturned: Timestamp;
    feeDue: number;
    actionRequired: string;
}
