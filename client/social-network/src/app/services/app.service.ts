import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { User } from '../model/user.model';
import { Post } from '../model/post.model';
import { Comment } from '../model/comment.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private postsUrl = 'http://localhost:8080/api/posts';
  private usersUrl = 'http://localhost:8080/api/users';
  private commentsUrl = 'http://localhost:8080/api/comments';

  httpOptions = {
    headers: { 'Content-Type': 'application/json' }
  };

  constructor(private http: HttpClient) { }

  validateUser(username: String, password: String): Observable<User>{
    const url = this.usersUrl + '/login' + '?username=' + username + '&password=' + password;

    return this.http
      .get<User>(url, this.httpOptions)
      .pipe(catchError(this.handleError<User>('validateUser')));
  }

  getPosts(page: number, size: number): Observable<Post[]> {
    const url = 'http://localhost:8080/api/posts?page=' + page + '&size=' + size;

    return this.http
      .get<Post[]>(url, this.httpOptions)
      .pipe(catchError(this.handleError<Post[]>('getPosts', [])));
  }


  getCommentsForUser(id: number,page: number, size: number): Observable<Comment[]> {
    const url = 'http://localhost:8080/api/comments/user/'+ id + '?page=' + page + '&size=' + size;
      
    return this.http
      .get<Comment[]>(url, this.httpOptions)
      .pipe(catchError(this.handleError<Comment[]>('getCommentsForUser', [])));
  }





  getPost(id: number): Observable<Post> {
    const url = `${this.postsUrl}/${id}`;

    return this.http
      .get<Post>(url, this.httpOptions)
      .pipe(catchError(this.handleError<Post>('getPost')));
  }

  getCommentsForPost(page: number, size: number, id: number): Observable<Comment[]> {
    const url = 'http://localhost:8080/api/comments/post/' + id + '?page=' + page + '&size=' + size;

    return this.http
      .get<Comment[]>(url, this.httpOptions)
      .pipe(catchError(this.handleError<Comment[]>('getComments', [])));
  }

  getPostsForUser( id:number, page: number, size: number): Observable<Post[]> {
    const url = 'http://localhost:8080/api/posts/user/' + id + '?page=' + page + '&size=' + size;
 
    return this.http
    .get<Post[]>(url,this.httpOptions )
    .pipe(catchError(this.handleError<Post[]>('getPostsForUser', [])));
    
    
  }

  addPost(post: Post):Observable<Post>{
    return this.http.post<Post>(this.postsUrl, post, this.httpOptions);
  }

<<<<<<< HEAD
  addComment(comment: Comment):Observable<Comment>{
    return this.http.post<Comment>(this.commentsUrl, comment, this.httpOptions);
=======
  // EDIT
  editPost(id: number, post: Post): Observable<Post>{
    const url = `${this.postsUrl}/${id}`;
    return this.http
    .put<Post>(this.postsUrl, post, this.httpOptions)
    .pipe(catchError(this.handleError<Post>('updatePost')));

  }

  // DELETE
  deletePost(id: number): Observable<Post> {
    const url = `${this.postsUrl}/${id}`;

    return this.http
      .delete<Post>(url, this.httpOptions)
      .pipe(catchError(this.handleError<Post>('deletePost')));
>>>>>>> feature/edit-delete-post
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
