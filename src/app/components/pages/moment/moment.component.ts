import { Component, OnInit } from '@angular/core';
import { MomentsService } from 'src/app/services/moments.service';
import { Moments } from 'src/app/moments';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { MessagesService } from 'src/app/services/messages.service';
import { Comment } from 'src/app/comment';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { CommentService } from 'src/app/services/comment.service';
import { text } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})
export class MomentComponent implements OnInit {

  moment?: Moments;
  baseApiUrl = environment.baseApiUrl;
  faTimes = faTimes;
  faEdit = faEdit;
  commentForm!: FormGroup;

  constructor(
    private momentService: MomentsService,
    private messagesService: MessagesService,
    private route: ActivatedRoute,
    private router: Router,
    private commentService: CommentService
    ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.momentService.getMoment(id).subscribe(item => this.moment = item.data);
    this.commentForm = new FormGroup({
      text: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required])
    });
  }

  get text() {
    return this.commentForm.get('text')!;
  }

  get username() {
    return this.commentForm.get('username')!;
  }

  async onSubmit(formDirective: FormGroupDirective) {
    if(this.commentForm.invalid) {
      return;
    }
    const data: Comment = this.commentForm.value;
    data.momentId = Number(this.moment!.id);
    await this.commentService.createComent(data).subscribe(comment => this.moment!.comments!.push(comment.data));
    this.messagesService.add('Comentário adicionado!');
    this.commentForm.reset();
    formDirective.resetForm();
  }

  async removeHandler(id: number) {
    await this.momentService.removeMoment(id).subscribe()
    this.messagesService.add(`O Momento '${this.moment?.title}' foi excluído!`);
    this.router.navigate(['/']);
  }

}
