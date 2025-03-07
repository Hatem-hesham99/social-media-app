import { Post } from './../../core/interfaces/iall-posts';
import { afterNextRender, Component, inject, OnInit } from '@angular/core';
import { PostsService } from '../../core/services/postes/posts.service';
import { IAllPosts } from '../../core/interfaces/iall-posts';
import { DatePipe } from '@angular/common';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommentsService } from '../../core/services/comments/comments.service';
import { initFlowbite } from 'flowbite';


@Component({
  selector: 'app-timeline',
  imports: [DatePipe, InfiniteScrollDirective, ReactiveFormsModule,FormsModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css'
})
export class TimelineComponent implements OnInit {

  constructor(){
      afterNextRender(()=>{
        initFlowbite();
      })
     }

  private readonly postsService = inject(PostsService);
  private readonly commentsService = inject(CommentsService)
  private readonly fb = inject(FormBuilder)

  AllPosts!: IAllPosts
  counterpage: number = 1
  isloading: boolean = false
  postFile!:File   
  postbody:string=''

  ngOnInit(): void {
    this.getPosts()
    this.initForm()
   
  }
  

  changeimg(e:Event){
    const input = e.target as HTMLInputElement
    if(input.files && input.files.length>0){
      this.postFile = input.files[0]  
    }
  }

  uploadpost(){
    const formData = new FormData()
    formData.append('body',this.postbody)
    formData.append('image',this.postFile)
    
    this.postsService.createPost(formData).subscribe({
      next:(res)=>{
        console.log(res);
        this.allPostesData()

      }
    })
  }

 
  allPostesData(){
    this.postsService.getAllPosts().subscribe({
      next:(res)=>{
        console.log('allPostesData',res);
        this.AllPosts.posts = res.posts
        
      }
    })
  }


  getPosts(): void {
    this.postsService.getAllPosts().subscribe({
      next: (res) => {
        this.AllPosts = res
        console.log(res);

      }
    })
  }


  onScroll() {
    console.log('scrolled!!');
    this.isloading = true
    this.counterpage++
    this.postsService.getAllPosts(this.counterpage).subscribe({
      next: (res) => {
        this.AllPosts.posts.push(...res.posts)
        console.log(...res.posts);
        this.isloading = false
      }
    })

  }

  formComment!: FormGroup

  initForm(): void {
    this.formComment = this.fb.group(
      {
        content: [null],
        post: [null]
      }
    )
  }


  submitComment(post: Post) {

    this.isloading = true
    this.formComment.get('post')?.patchValue(post._id)

    this.commentsService.createComment(this.formComment.value).subscribe({
      next: (res) => {
        post.comments = res.comments
        console.log(res);
        this.isloading = false
        this.formComment.get('content')?.patchValue(null)

      },
      error: (err) => {
        console.log(err);
        this.isloading = false

      }
    })


  }


}
