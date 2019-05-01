import { Timestamp } from '@firebase/firestore-types';

export class Player {
    docId: string;
    playerFullName: string;
    playerCell: number;
    gender: string;
    birthDate: Timestamp;
    ageGroup: string;
    parentFullName: string;
    parentCell: number;

    constructor(data: PlayerData) {
        this.docId = data.docId;
        this.playerFullName = data.playerFullName;
        this.playerCell = data.playerCell;
        this.gender = data.gender;
        this.birthDate = data.birthDate;
        this.ageGroup = data.ageGroup;
        this.parentFullName = data.parentFullName;
        this.parentCell = data.parentCell;
    }

    toData(): PlayerData {
        return {
            docId: this.docId,
            playerFullName: this.playerFullName,
            playerCell: this.playerCell,
            gender: this.gender,
            birthDate: this.birthDate,
            ageGroup: this.ageGroup,
            parentFullName: this.parentFullName,
            parentCell: this.parentCell,
        } as PlayerData;
    }
}

export class PlayerData {
    docId: string;
    playerFullName: string;
    playerCell: number;
    gender: string;
    birthDate: Timestamp;
    ageGroup: string;
    parentFullName: string;
    parentCell: number;
}
