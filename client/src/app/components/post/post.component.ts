import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/model/post.model';
import { CommentService } from 'src/app/service/comments.service';
import { PostService } from 'src/app/service/post.service';
import { Comment } from 'src/app/model/comment.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  loadedPosts: Post[] = [];
  loadedComments: Comment[] = [];
  isFetching = false;
  error = null;
  private errorSub: Subscription;


  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.errorSub = this.postService.error.subscribe((errorMessage) => {
      this.error = errorMessage;
    });

    this.isFetching = true;
    this.postService.fetchPosts().subscribe(
      (posts) => {
        this.isFetching = false;
        this.loadedPosts = posts;
      },
      (error) => {
        this.error = error.message;
      }
    );
  }

  onCreatePost(data: Post) {
    this.postService.createAndStorePost(data.postId, data.title, data.content);
  }

  onFetchPosts() {
    this.isFetching = true;
    this.postService.fetchPosts().subscribe(
      (posts) => {
        this.isFetching = false;
        this.loadedPosts = posts;
        console.log(this.loadedPosts);
      },
      (error) => {
        this.error = error.message;
        console.log(error);
      }
    );
  }

  onCreateComment(data: Comment) {
    this.commentService.createAndStoreComment(
      data.commentId,
      data.content,
      data.post,
      data.user
    );

    this.router.navigate(['/comments']);
  }

  onFetchComments() {
    this.isFetching = true;
    this.commentService.fetchComments().subscribe(
      (comments) => {
        this.isFetching = false;
        this.loadedComments = comments;
        console.log(this.loadedComments);
      },
      (error) => {
        this.error = error.message;
        console.log(error);
      }
    );
  }

  // getCommentsForPost() {
  //   this.commentService.getCommentsForPost(this.page, this.size, this.postId).subscribe( (res: Comment[]) => {
  //     this.comments = res;
  //     console.log(this.comments);
  //   })
  // }

  onClearPosts() {
    this.postService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }

  deletePost(id: string) {
    this.postService.deletePostById(id).subscribe((res: Post) => {
      this.onFetchPosts();
    });
  }

  deleteComment(id: string) {
    this.commentService.deleteCommentById(id).subscribe((res: Comment) => {
      // this.onFetchComments();
    });
  }

  editPost(id: string) {
    this.postService.editPostById(id).subscribe((res: Post) => {});
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }
}
