import { InventoryItem } from '../models/InventoryItem';
import { Player } from '../models/Player';
import { Rental } from '../models/Rental';
import { User } from '../models/User';


export interface AppState {

    usersState: {
        loggedInUser: User;
    };

    playersState: {
        players: Player[];
        selectedPlayer: Player;
    };

    inventoryState: {
        inventoryItems: InventoryItem[];
        selectedInventoryItem: InventoryItem;
        availableMasks: InventoryItem[];
        availableSnorkels: InventoryItem[];
        availableGloves: InventoryItem[];
        availableSticks: InventoryItem[];
        availableFins: InventoryItem[];
    };

    rentalsState: {
        rentals: Rental[];
        selectedRental: Rental;
    };

}
