import { Timestamp } from '@firebase/firestore-types';

export class User {
    uid: string;
    displayName: string;

    constructor(data: UserData) {
        this.uid = data.uid;
        this.displayName = data.displayName;
    }

    toData(): UserData {
        return {
            uid: this.uid,
            displayName: this.displayName,
        } as UserData;
    }
}

export class UserData {
    uid: string;
    displayName: string;
}
