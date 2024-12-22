export interface GetPostsResponse {
  posts?: [Post];
  limit?: number;
  offset?: number;
  total?: number | string;
}

export interface Post {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
