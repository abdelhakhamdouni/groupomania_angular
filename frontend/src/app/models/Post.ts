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

    public static fromJson (json: object): Post{
        return new Post(
            json['id'],
            json['title'],
            json['image'],
            json['avatar'],
            json['description'],
            json['userPseudo'],
            json['likes'],
            json['comments'],
            json['createdAt'],
        )
    }
}