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
  faSearch = faSearch;
  searchTerm: string = '';

  constructor(private momentsService: MomentsService) {}

  ngOnInit(): void {
      this.momentsService.getAllMoments().subscribe(items => {
        const data = items.data;
        data.forEach(item => item.created_at = new Date(item.created_at!).toLocaleDateString('pt-BR'));
        this.allMoments = data;
        this.filterMoments = data;
      });
  }

  search(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    this.allMoments = this.filterMoments.filter(moment => moment.title.toLowerCase().includes(value.toLowerCase()));
  }

}
