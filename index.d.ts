declare interface responseBody {
    retCode: number,
}
declare interface Users extends responseBody {
    "user": {
        "email": "jake@jake.jake",
        "token": "jwt.token.here",
        "username": "jake",
        "bio": "I work at statefarm",
        "image": null,
        "id": number
    }
}

declare interface Profile extends responseBody {
    "profile": {
        "username": "jake",
        "bio": "I work at statefarm",
        "image": "https://static.productionready.io/images/smiley-cyrus.jpg",
        "following": false
    }
}

declare interface Article {
    "slug": "how-to-train-your-dragon",
    "title": "How to train your dragon",
    "description": "Ever wonder how?",
    "body": "It takes a Jacobian",
    "tagList": ["dragons", "training"],
    "createdAt": "2016-02-18T03:22:56.637Z",
    "updatedAt": "2016-02-18T03:48:35.824Z",
    "favorited": false,
    "favoritesCount": 0,
    "author": {
        "username": "jake",
        "bio": "I work at statefarm",
        "image": "https://i.stack.imgur.com/xHWG8.jpg",
        "following": false
    }
}
declare interface SingleArticle extends responseBody {
    "article": Article
}
declare interface MultiArticle extends responseBody {
    "articles": Array<Article>,
    "articlesCount": 2
}

declare interface Comment {
    "id": 1,
    "createdAt": "2016-02-18T03:22:56.637Z",
    "updatedAt": "2016-02-18T03:22:56.637Z",
    "body": "It takes a Jacobian",
    "author": {
        "username": "jake",
        "bio": "I work at statefarm",
        "image": "https://i.stack.imgur.com/xHWG8.jpg",
        "following": false
    }
}
declare interface SingleComment extends responseBody {
    "comment": Comment
}
declare interface MultiComment extends responseBody {
    "comments": Array<Comment>
}

declare interface Tags extends responseBody {
    "tags": stirng[]
}

declare interface ErrorCode extends responseBody {
    "errors": {
        "body": [
            "can't be empty"
        ]
    }
}

declare interface CreateArticle {
    "article": {
      "title": "How to train your dragon",
      "description": "Ever wonder how?",
      "body": "You have to believe",
      "tagList": ["reactjs", "angularjs", "dragons"]
    }
}