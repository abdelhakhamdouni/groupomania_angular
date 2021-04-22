export default class Comment{
    constructor(
        public comment: string,
        public userId: number,
        public postId: number,
        public parent: number
    ){}

    public static fromJson(JsonComment:Comment): Comment {
        return new Comment(
            JsonComment['comment'],
            JsonComment['userId'],
            JsonComment['postId'],
            JsonComment['parent'],
        )
    }
}