import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment } from 'src/app/model/comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {

  @Input() comment:Comment;
	@Input() index:number = -1;
	@Output() deleteCommentIndex: EventEmitter<number> = new EventEmitter();  
  

  constructor(){}

  ngOnInit(): void {
    
  }
  deleteComment(id:any){
    this.deleteCommentIndex.emit(id);

  }



  // isFetching = false;
  // loadedComments: Comment[] = [];
  // error = null;
  // private errorSub: Subscription;

  // constructor(private commentService: CommentService, private router : Router) {}

  // ngOnInit() {
  //   this.errorSub = this.commentService.error.subscribe((errorMessage) => {
  //     this.error = errorMessage;
  //   });

  //   this.isFetching = true;
  //   this.commentService.fetchComments().subscribe(
  //     (comments) => {
  //       this.isFetching = false;
  //       this.loadedComments = comments;
  //     },
  //     (error) => {
  //       this.error = error.message;
  //     }
  //   );
  // }

  // // onCreateComment(data: Comment) {
  // //   this.commentService.createAndStoreComment(
  // //     data.commentId,
  // //     data.content,
  // //     data.post,
  // //     data.user
  // //   );

  // //   this.router.navigate(['/posts']);
  // // }



  // onClearComments() {
  //   this.commentService.deleteComments().subscribe(() => {
  //     this.loadedComments = [];
  //   });
  // }

  // ngOnDestroy() {
  //   this.errorSub.unsubscribe();
  // }
}
