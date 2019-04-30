import { Timestamp } from '@firebase/firestore-types';

export class Player {
    id: string;
    player: string;
    playerCell: number;
    gender: string;
    birthDate: Timestamp;
    ageGroup: string;
    parent: string;
    parentCell: number;

    constructor(data: PlayerData) {
        this.id = data.id;
        this.player = data.player;
        this.playerCell = data.playerCell;
        this.gender = data.gender;
        this.birthDate = data.birthDate;
        this.ageGroup = data.ageGroup;
        this.parent = data.parent;
        this.parentCell = data.parentCell;
    }

    toData(): PlayerData {
        return {
            id: this.id,
            player: this.player,
            playerCell: this.playerCell,
            gender: this.gender,
            birthDate: this.birthDate,
            ageGroup: this.ageGroup,
            parent: this.parent,
            parentCell: this.parentCell,
        } as PlayerData;
    }
}

export class PlayerData {
    id: string;
    player: string;
    playerCell: number;
    gender: string;
    birthDate: Timestamp;
    ageGroup: string;
    parent: string;
    parentCell: number;
}