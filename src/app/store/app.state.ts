import { InventoryItem } from '../models/InventoryItem';
import { Player } from '../models/Player';


export interface AppState {

    inventoryState: {
        inventoryItems: InventoryItem[];
        selectedInventoryItem: InventoryItem;
    };

    playersState: {
        players: Player[];
        selectedPlayer: Player;
    };

}
