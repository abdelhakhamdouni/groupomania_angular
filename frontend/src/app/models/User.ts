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

    public static fromJson (jsonUser: object): User{
        console.log(jsonUser)
        return new User(
            jsonUser['user']['id'],
            jsonUser['user']['firstName'],
            jsonUser['user']['lastName'],
            jsonUser['user']['email'],
            jsonUser['user']['avatar'],
            jsonUser['user']['roles'],
            jsonUser['user']['password'],
            jsonUser['user']['createdAt'],
        )
    }
}