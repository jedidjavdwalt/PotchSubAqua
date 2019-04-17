import { InventoryItem } from '../models/InventoryItem';

export interface AppState {

    componentState: {
        selectedType: string;
    };

    maskState: {
        allMasks: InventoryItem[];
    };

    snorkelState: {
        allSnorkels: InventoryItem[];
    };

    gloveState: {
        allGloves: InventoryItem[];
    };

    stickState: {
        allSticks: InventoryItem[];
    };

    finsState: {
        allFins: InventoryItem[];
    };

    availableState: {
        allAvailable: InventoryItem[];
    };

    rentedState: {
        allRented: InventoryItem[];
    };

    missingState: {
        allMissing: InventoryItem[];
    };

}
