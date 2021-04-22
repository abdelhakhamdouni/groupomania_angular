export default class Post{
    constructor(
    public id: number,
    public title: string,
    public image: string,
    public avatar: string,
    public description: string,
    public author: string,
    public likes: number,
    public comments: number,
    public createdAt: Date){}

    public static fromJson (jsonPost: object): Post{
        return new Post(
            jsonPost['id'],
            jsonPost['title'],
            jsonPost['image'],
            jsonPost['avatar'],
            jsonPost['description'],
            jsonPost['userPseudo'],
            jsonPost['likes'],
            jsonPost['comments'],
            jsonPost['createdAt'],
        )
    }
}