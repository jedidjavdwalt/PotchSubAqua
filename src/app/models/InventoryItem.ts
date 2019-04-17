export class InventoryItem {
    type: string;
    number: number;
    brand: string;
    color: string;
    description: string;
    status: string;

    constructor(data: InventoryItemData) {
        this.type = data.type;
        this.number = data.number;
        this.brand = data.brand;
        this.color = data.color;
        this.description = data.description;
        this.status = data.status;
    }

    toData(): InventoryItemData {
        return {
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
    type: string;
    number: number;
    brand: string;
    color: string;
    description: string;
    status: string;
}
