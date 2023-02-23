import { Component } from '@angular/core';
import { Moments } from 'src/app/moments';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css']
})
export class NewMomentComponent {

  btnText: string = 'Compartilhar!'

  async createHandler(moment: Moments) {
    const formData = new FormData();
    formData.append('title', moment.title);
    formData.append('description', moment.description);
    if(moment.image) {
      formData.append('image', moment.image);
    }
    //TODO
    //Enviar para o service
    //Exibir mensagem
    //Fazer redirect
  }

}
