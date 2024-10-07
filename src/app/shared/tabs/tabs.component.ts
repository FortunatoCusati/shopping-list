import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HomeComponent } from '../../home/home.component';
import { ProductsToBuyComponent } from '../../products-to-buy/products-to-buy.component';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [
    CommonModule,
    HomeComponent,
    ProductsToBuyComponent
  ],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css'
})
export class TabsComponent {
  tab : number = 1;
}
