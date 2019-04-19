export class InventoryItem {
    id: string;
    type: string;
    number: number;
    brand: string;
    color: string;
    description: string;
    status: string;

    constructor(id: string, data: InventoryItemData) {
        this.id = id;
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
