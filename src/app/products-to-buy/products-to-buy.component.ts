import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { Product } from '../product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products-to-buy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products-to-buy.component.html',
  styleUrl: './products-to-buy.component.css'
})
export class ProductsToBuyComponent implements OnInit{
  http = inject(HttpClient);
  url = "http://localhost:3000/products";
  products = signal<Product[]>([]);

  ngOnInit(): void {
    this.http.get<Product[]>(this.url).subscribe(resp => {
      this.products.set(resp) 
    })
  }

  addProduct(event: any) {
    let nameProduct = event.target.value;
    let newProduct: Product = {
      name: nameProduct,
      completed: false
    }
    
    this.http.post<Product>(this.url, newProduct).subscribe(resp => {
      this.products.update(prev => [...prev, resp])

      // Reset del campo input
      event.target.value= '';
    })
  }

  isBought(item: Product){
    let updatedProduct = {...item, completed: !item.completed}

    this.http.patch<Product>(`${this.url}/${item.id}`, updatedProduct).subscribe(resp => {
      this.products.update(prev => {
        return prev.map(p => p.id === item.id ? resp : p)
      })
    })
  }

  onDelete(item: Product){
    this.http.delete<Product>(`${this.url}/${item.id}`).subscribe(resp => {
      this.products.update(prev => prev.filter(product => product.id != item.id))
    })
  }
}
