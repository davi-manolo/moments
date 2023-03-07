import { Component } from '@angular/core';
import { Moments } from 'src/app/moments';
import { MessagesService } from 'src/app/services/messages.service';
import { MomentsService } from 'src/app/services/moments.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css']
})
export class NewMomentComponent {

  btnText: string = 'Compartilhar!'

  constructor(
    private momentsService: MomentsService,
    private messageService: MessagesService,
    private router: Router
    ) {}

  async createHandler(moment: Moments) {
    const formData = new FormData();
    formData.append('title', moment.title);
    formData.append('description', moment.description);
    if(moment.image) {
      formData.append('image', moment.image);
    }
    await this.momentsService.createMoment(formData).subscribe();
    this.messageService.add('Momento registrado com sucesso!');
    this.router.navigate(['/']);
  }

}
