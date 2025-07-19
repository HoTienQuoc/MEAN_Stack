import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';

@Component({
  imports: [RouterModule, HomePageComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'ngshop';
}
