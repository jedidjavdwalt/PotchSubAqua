import { Timestamp } from '@firebase/firestore-types';

export class Rental {
    id: string;
    player: string;
    inventoryItems: string[];
    type: string;
    dateKitOut: Timestamp;
    dateKitDue: Timestamp;
    dateKitIn: Timestamp;
    feeDue: number;
    feePaid: number;
    feeReturned: number;
    actionRequired: string;

    constructor(data: RentalData) {
        this.id = data.id;
        this.player = data.player;
        this.inventoryItems = data.inventoryItems;
        this.type = data.type;
        this.dateKitOut = data.dateKitOut;
        this.dateKitDue = data.dateKitDue;
        this.dateKitIn = data.dateKitIn;
        this.feeDue = data.feeDue;
        this.feePaid = data.feePaid;
        this.feeReturned = data.feeReturned;
        this.actionRequired = data.actionRequired;
    }

    toData(): RentalData {
        return {
            id: this.id,
            player: this.player,
            inventoryItems: this.inventoryItems,
            type: this.type,
            dateKitOut: this.dateKitOut,
            dateKitDue: this.dateKitDue,
            dateKitIn: this.dateKitIn,
            feeDue: this.feeDue,
            feePaid: this.feePaid,
            feeReturned: this.feeReturned,
            actionRequired: this.actionRequired,
        } as RentalData;
    }
}

export class RentalData {
    id: string;
    player: string;
    inventoryItems: string[];
    type: string;
    dateKitOut: Timestamp;
    dateKitDue: Timestamp;
    dateKitIn: Timestamp;
    feeDue: number;
    feePaid: number;
    feeReturned: number;
    actionRequired: string;
}
