export class UserData {
    userId: Number;
    userName: string;

    constructor(data: any) {
        this.userId = data.userId;
        this.userName = data.userName;
    }

    isLoggedIn(): boolean {
        return this.userId > 0;
    }
}
