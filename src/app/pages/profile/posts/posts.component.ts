import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, Subject } from 'rxjs';
import { PostService } from 'src/app/services/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnChanges {
  @Input() user: any;
  @Input() editable: boolean;

  posts$: Observable<any>;
  editing: boolean;
  editingPost: any;

  update$: Subject<any> = new Subject();
  updateSub: Subscription;
  firstImageUrl: string;

  constructor(
    private router: Router,
    private postService: PostService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.posts$ = this.postService.getUserPosts(this.user.uid);
  }

  editPost(post: any) {
    this.postService.editingPost = post;
    this.router.navigateByUrl('/new/post');
  }

  deletePost(post: any) {
    this.postService.deletePost(post.postId)
      .then(() => {
        this.snackBar.open('Post deleted!', 'Ok', { duration: 3333 });
      })
      .catch(error => {
        console.log('error deleting post', { post, error });
        this.snackBar.open('There was an error deleting your post, try again later', '', { duration: 3000 });
      });
  }

  viewPost(postId: string) {
    this.router.navigateByUrl(`/post/${postId}`);
  }

}
