import { Timestamp } from '@firebase/firestore-types';

export class Rental {
    id: string;
    player: string;
    inventoryItems: string[];
    type: string;
    dateKitOut: Timestamp;
    dateKitIn: Timestamp;
    dateKitDue: Timestamp;
    dateFeePaid: Timestamp;
    dateFeeReturned: Timestamp;
    feePaid: number;
    feeDue: number;
    actionRequired: string;

    constructor(data: RentalData) {
        this.id = data.id;
        this.player = data.player;
        this.inventoryItems = data.inventoryItems;
        this.type = data.type;
        this.dateKitOut = data.dateKitOut;
        this.dateKitIn = data.dateKitIn;
        this.dateKitDue = data.dateKitDue;
        this.dateFeePaid = data.dateFeePaid;
        this.dateFeeReturned = data.dateFeeReturned;
        this.feeDue = data.feeDue;
        this.actionRequired = data.actionRequired;
    }

    toData(): RentalData {
        return {
            id: this.id,
            player: this.player,
            inventoryItems: this.inventoryItems,
            type: this.type,
            dateKitOut: this.dateKitOut,
            dateKitIn: this.dateKitIn,
            dateKitDue: this.dateKitDue,
            dateFeePaid: this.dateFeePaid,
            dateFeeReturned: this.dateFeeReturned,
            feePaid: this.feePaid,
            feeDue: this.feeDue,
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
    dateKitIn: Timestamp;
    dateKitDue: Timestamp;
    dateFeePaid: Timestamp;
    dateFeeReturned: Timestamp;
    feePaid: number;
    feeDue: number;
    actionRequired: string;
}
