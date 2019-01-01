export class Account {
    constructor(
        public enabled: boolean,
        public authorities: string[],
        public email: string,
        public firstName: string,
        public langKey: string,
        public lastName: string,
        public username: string,
        public imageUrl: string
    ) {}
}
