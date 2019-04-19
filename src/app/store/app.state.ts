import { InventoryItem } from '../models/InventoryItem';
import { Player } from '../models/Player';
import { Rental } from '../models/Rental';


export interface AppState {

    playersState: {
        players: Player[];
        selectedPlayer: Player;
    };

    inventoryState: {
        inventoryItems: InventoryItem[];
        selectedInventoryItem: InventoryItem;
    };

    rentalState: {
        rentals: Rental[];
        selectedRental: Rental;
    };

}
