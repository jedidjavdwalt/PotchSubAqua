import { Timestamp } from '@firebase/firestore-types';

export class Rental {
    docId: string;
    displayId: string;
    playerFullName: string;
    inventoryItems: string[];
    type: string;
    startDate: Timestamp;
    dueDate: Timestamp;
    endDate: Timestamp;
    feeDue: number;
    feePaid: number;
    feeReturned: number;
    actionRequired: string;

    constructor(data: RentalData) {
        this.docId = data.docId;
        this.displayId = data.displayId;
        this.playerFullName = data.playerFullName;
        this.inventoryItems = data.inventoryItems;
        this.type = data.type;
        this.startDate = data.startDate;
        this.dueDate = data.dueDate;
        this.endDate = data.endDate;
        this.feeDue = data.feeDue;
        this.feePaid = data.feePaid;
        this.feeReturned = data.feeReturned;
        this.actionRequired = data.actionRequired;
    }

    toData(): RentalData {
        return {
            docId: this.docId,
            displayId: this.displayId,
            playerFullName: this.playerFullName,
            inventoryItems: this.inventoryItems,
            type: this.type,
            startDate: this.startDate,
            dueDate: this.dueDate,
            endDate: this.endDate,
            feeDue: this.feeDue,
            feePaid: this.feePaid,
            feeReturned: this.feeReturned,
            actionRequired: this.actionRequired,
        } as RentalData;
    }
}

export class RentalData {
    docId: string;
    displayId: string;
    playerFullName: string;
    inventoryItems: string[];
    type: string;
    startDate: Timestamp;
    dueDate: Timestamp;
    endDate: Timestamp;
    feeDue: number;
    feePaid: number;
    feeReturned: number;
    actionRequired: string;
}
