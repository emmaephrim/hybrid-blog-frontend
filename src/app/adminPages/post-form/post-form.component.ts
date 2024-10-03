import {
  Component,
  inject,
  ViewEncapsulation,
  PLATFORM_ID,
  Inject,
  afterNextRender,
} from '@angular/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Post } from '../../model/post';
import { PostService } from '../../service/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryModel } from '../../model/category';
import { CategoryService } from '../../service/category.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post-form',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, CKEditorModule],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css',
})
export class PostFormComponent {
  public Editor: any | null;
  public config: any;
  public editPostId!: string;

  categories: CategoryModel[] = [];
  postForm: FormGroup;
  post: Post = new Post();
  postService: PostService = inject(PostService);
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private toastr: ToastrService,

    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // afterNextRender(() => {
    //   this.loadCkEditor();
    // });

    this.postForm = new FormGroup({
      id: new FormControl(null),
      title: new FormControl(this.post.title, [Validators.required]),
      imageUrl: new FormControl(this.post.imageUrl, [
        Validators.required,
        Validators.pattern('https?://.+'),
      ]),
      content: new FormControl(this.post.content, [
        Validators.required,
        Validators.max(200),
      ]),
      categoryId: new FormControl(this.post.categoryId, [Validators.required]),
      userId: new FormControl(this.post.userId),
      createdAt: new FormControl(this.post.createdAt, [Validators.required]),
      // comments: new FormControl(this.post.comments),
      likes: new FormControl(this.post.likes),
      dislikes: new FormControl(this.post.dislikes),
      shares: new FormControl(this.post.shares),
    });
  }

  ngOnInit() {
    this.editPostId = this.route.snapshot.params['id'];
    if (this.editPostId) {
      this.postService.findPostById(this.editPostId).subscribe((post) => {
        this.post = post;
        this.postForm.patchValue(this.post);
      });
    }

    if (isPlatformBrowser(this.platformId)) {
      this.loadCkEditor();
    }

    this.categoryService.getAllCategories().subscribe((result) => {
      this.categories = result;
    });
  }

  async loadCkEditor() {
    const {
      ClassicEditor,
      Bold,
      Essentials,
      Italic,
      Mention,
      Paragraph,
      Undo,
    } = await import('ckeditor5');

    this.config = {
      toolbar: [
        'paragraph',
        'undo',
        'redo',
        '|',
        'bold',
        'italic',
        'essentials',
      ],
      plugins: [Bold, Essentials, Italic, Mention, Paragraph, Undo],
    };

    this.Editor = ClassicEditor;
  }

  public handleSubmit() {
    this.post = this.postForm.value as Post;

    if (this.editPostId != null) {
      this.postService.updatePost(this.post).subscribe((result) => {
        this.toastr.success('Post updated successfully');
        this.router.navigate(['admin/manage-posts']);
      });
    } else {
      this.postService.savePost(this.post).subscribe((result) => {
        this.toastr.success('Post saved successfully');
        this.postForm.reset();
      });
    }
  }

  public goToDashboard() {
    this.router.navigate(['/admin']);
  }
}
