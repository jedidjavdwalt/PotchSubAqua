export class InventoryItem {
    docId: string;
    displayId: string;
    type: string;
    number: number;
    brand: string;
    color: string;
    description: string;
    status: string;

    constructor(data: InventoryItemData) {
        this.docId = data.docId;
        this.displayId = data.displayId;
        this.type = data.type;
        this.number = data.number;
        this.brand = data.brand;
        this.color = data.color;
        this.description = data.description;
        this.status = data.status;
    }

    toData(): InventoryItemData {
        return {
            docId: this.docId,
            displayId: this.displayId,
            type: this.type,
            number: this.number,
            brand: this.brand,
            color: this.color,
            description: this.description,
            status: this.status,
        } as InventoryItemData;
    }
}

export class InventoryItemData {
    docId: string;
    displayId: string;
    type: string;
    number: number;
    brand: string;
    color: string;
    description: string;
    status: string;
}
