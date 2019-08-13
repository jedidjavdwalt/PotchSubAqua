import { Timestamp } from '@firebase/firestore-types';

export class Player {
    docId: string;
    birthDate: Timestamp;
    parentFullName: string;
    parentCell: number;
    playerFullName: string;
    playerCell: number;
    gender: string;
    ageGroup: string;

    status: string;

    constructor(data: PlayerData) {
        this.docId = data.docId;
        this.birthDate = data.birthDate;
        this.parentFullName = data.parentFullName;
        this.parentCell = data.parentCell;
        this.playerFullName = data.playerFullName;
        this.playerCell = data.playerCell;
        this.gender = data.gender;
        this.ageGroup = data.ageGroup;

        this.status = data.status;
    }

    toData(): PlayerData {
        return {
            docId: this.docId,
            birthDate: this.birthDate,
            parentFullName: this.parentFullName,
            parentCell: this.parentCell,
            playerFullName: this.playerFullName,
            playerCell: this.playerCell,
            gender: this.gender,
            ageGroup: this.ageGroup,

            status: this.status,
        } as PlayerData;
    }
}

export class PlayerData {
    docId: string;
    birthDate: Timestamp;
    parentFullName: string;
    parentCell: number;
    playerFullName: string;
    playerCell: number;
    gender: string;
    ageGroup: string;

    status: string;
}
