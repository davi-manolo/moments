import { Component, OnInit } from '@angular/core';
import { MomentsService } from 'src/app/services/moments.service';
import { Moments } from 'src/app/moments';
import { environment } from 'src/environments/environment.development';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allMoments: Moments[] = [];
  filterMoments: Moments[] = [];
  baseApiUrl = environment.baseApiUrl;

  //TODO: Search

  constructor(private momentsService: MomentsService) {}

  ngOnInit(): void {
      this.momentsService.getAllMoments().subscribe(items => {
        const data = items.data;
        data.map(item => item.created_at = new Date(item.created_at!).toLocaleDateString('pt-BR'));
        this.allMoments = data;
        this.filterMoments = data;
      });
  }

}
