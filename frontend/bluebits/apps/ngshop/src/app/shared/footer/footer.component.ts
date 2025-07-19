import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ngshop-footer',
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent implements OnInit{
  constructor(){}
  ngOnInit(): void {
    
  }
}
