import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, Subject, of, throwError } from 'rxjs';
import { Post } from '../model/post.model';
import { User } from '../model/user.model';
import { Comment } from '../model/comment.model';

@Injectable({ providedIn: 'root' })
export class CommentService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  private commentUrl = 'http://localhost:8080/api/comments';
  private userUrl = 'http://localhost:8080/api/users';
  private postUrl =  'http://localhost:8080/api/posts';

  httpOptions = {
    headers: { 'Content-Type': 'application/json' },
  };

  createAndStoreComment(
    commentId: string,
    content: string,
    post: Post,
    user: User
  ) {
    const commentData: Comment = {
      commentId: commentId,
      content: content,
      post: post,
      user: user,
    };

    this.http
    .post<{ name: string }>(this.commentUrl, commentData)
    .subscribe(
      (responseData) => {
        console.log(responseData);
      },
      (error) => {
        this.error.next(error.message);
      }
    );
  }

  addComment(comment : Comment): Observable<Comment>{
    return this.http
    .post<Comment>(this.commentUrl, comment, this.httpOptions)
    .pipe(catchError(this.handleError<Comment>('addComment')));

  }

  getPost(id: number): Observable<Post>{
    return this.http.get<Post>(`${this.postUrl}/${id}`)
    .pipe(catchError(this.handleError<Post>('`getPost id=${id}`')));
  }

  getUser(id: number): Observable<User>{
    return this.http.get<User>(`${this.userUrl}/${id}`)
    .pipe(catchError(this.handleError<User>('`getUser id=${id}`')));
  }


  fetchComments() {
    return this.http
      .get('http://localhost:8080/api/comments', {
        headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
        params: new HttpParams().set('print', 'pretty'),
      })
      .pipe(
        map((responseData) => {
          const commentsArray: Comment[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              commentsArray.push({ ...responseData[key], commentId: key });
            }
          }
          return commentsArray;
        }),
        catchError((errorRes) => {
          return throwError(errorRes);
        })
      );
  }

  getComment(id:number): Observable<Comment>{
    const url = `${this.commentUrl}/${id}`;
    return this.http.get<Comment>(url)
    .pipe(catchError(this.handleError<Comment>(`getComment id=${id}`)));

  }


  // getCommentsForPost(page: number, size: number, id: number): Observable<Comment[]> {
  //   const url = 'http://localhost:8080/api/comments/post/' + id + '?page=' + page + '&size=' + size;

  //   return this.http
  //     .get<Comment[]>(url, this.httpOptions)
  // }

  deleteComments(){
    return this.http.delete('http://localhost:8080/api/comments');

  }

  deleteCommentById(id: string): Observable<Comment>{
    const url = `${this.commentUrl}/${id}`;
    return this.http.delete<Comment>(url, this.httpOptions);


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
