export default class User{
    constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public avatar: string,
    public roles: string,
    public password: string,
    public createdAt: Date){}

    public static fromJson (json: object): User{
        return new User(
            json['id'],
            json['firstName'],
            json['lastName'],
            json['email'],
            json['avatar'],
            json['roles'],
            json['password'],
            json['createdAt'],
        )
    }
}