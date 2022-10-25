import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, Subject, throwError } from 'rxjs';
import { Post } from '../model/post.model';
import { User } from '../model/user.model';
import { Comment } from '../model/comment.model';

@Injectable({ providedIn: 'root' })
export class PostService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  private postsUrl = 'http://localhost:8080/api/posts';

  httpOptions = {
    headers: { 'Content-Type': 'application/json' },
  };

  createAndStorePost(postId: string, title: string, content: string) {
    const postData: Post = { postId: postId, title: title, content: content };

    this.http
      .post<{ name: string }>('http://localhost:8080/api/posts', postData)
      .subscribe(
        (responseData) => {
          console.log(responseData);
        },
        (error) => {
          this.error.next(error.message);
        }
      );
  }

  
  fetchPosts() {
    return this.http
      .get<{ [key: string]: Post }>('http://localhost:8080/api/posts', {
        headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
        params: new HttpParams().set('print', 'pretty'),
      })
      .pipe(
        map((responseData) => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], postId: key });
            }
          }
          return postsArray;
        }),
        catchError((errorRes) => {
          // Send to analytics server
          return throwError(errorRes);
        })
      );
  }

  

  editPostById(id: string): Observable<Post> {
    const url = `${this.postsUrl}/${id}`;

    return this.http.put<Post>(url, this.httpOptions);
  }

  deletePosts() {
    return this.http.delete('http://localhost:8080/api/posts');
  }

  deletePostById(id: string): Observable<Post> {
    const url = `${this.postsUrl}/${id}`;

    return this.http.delete<Post>(url, this.httpOptions);
  }
}
