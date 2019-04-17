import { InventoryItem } from '../models/InventoryItem';

export interface AppState {

    componentState: {
        addPlayers: boolean;
        addInventory: boolean;
        addRentals: boolean;
    };

    inventoryState: {
        // availableInventory: boolean;
        // rentedInventory: boolean;
        // missingInventory: boolean;
        inventoryItems: InventoryItem[];
    };

}
