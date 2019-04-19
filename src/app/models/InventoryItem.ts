export class InventoryItem {
    id: string;
    type: string;
    number: number;
    brand: string;
    color: string;
    description: string;
    status: string;
    rentalId: string;

    constructor(data: InventoryItemData) {
        this.id = data.id;
        this.type = data.type;
        this.number = data.number;
        this.brand = data.brand;
        this.color = data.color;
        this.description = data.description;
        this.status = data.status;
        this.rentalId = data.rentalId;
    }

    toData(): InventoryItemData {
        return {
            id: this.id,
            type: this.type,
            number: this.number,
            brand: this.brand,
            color: this.color,
            description: this.description,
            status: this.status,
            rentalId: this.rentalId,
        } as InventoryItemData;
    }
}

export class InventoryItemData {
    id: string;
    type: string;
    number: number;
    brand: string;
    color: string;
    description: string;
    status: string;
    rentalId: string;
}
