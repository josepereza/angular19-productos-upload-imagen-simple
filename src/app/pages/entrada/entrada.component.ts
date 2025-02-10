import { JsonPipe, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';

interface ProductFormData {
  title: string; // El título es una cadena
  price: number; // El precio es un número
}

// Define el tipo del FormGroup tipado
type ProductFormGroup = FormGroup<{
  title: FormControl<string>; // Campo 'title' es un FormControl<string>
  price: FormControl<number>; // Campo 'price' es un FormControl<number>
}>;
@Component({
  selector: 'app-entrada',
  imports: [ReactiveFormsModule, NgFor],
  standalone: true,
  templateUrl: './entrada.component.html',
  styleUrl: './entrada.component.css'
})
export class EntradaComponent implements OnInit {
  ngOnInit(): void {
 // Inicializa el FormGroup en ngOnInit
 this.productForm = this.fb.nonNullable.group({
  title: ['', Validators.required], // Título requerido
  price: [0, [Validators.required, Validators.min(0)]], // Precio requerido y mínimo 0
}) as ProductFormGroup;

// Carga los productos al iniciar el componente
this.fetchProducts();  }
  private apiUrl = 'http://localhost:3000/products'; // URL del backend NestJS
  apiUrlImagen='http://localhost:3000/uploads/'

  // Array para almacenar los productos
  products: any[] = [];

  // Variable para almacenar la imagen seleccionada
  selectedImage: File | null = null;

  productForm!: ProductFormGroup; 

  constructor(private fb: FormBuilder, private productoService:ProductoService) {}

  // Método para cargar los productos desde el backend
  fetchProducts() {
    this.productoService.getProductos().subscribe((data:any)=>{
      this.products=data
    })
  }

  // Método para agregar un producto
  addProduct(event: Event) {
    event.preventDefault();
    if (this.productForm.invalid || !this.selectedImage) return;

    const { title, price } = this.productForm.value;

    const formData = new FormData();
    formData.append('title', title!);
    formData.append('price', price!.toString());
    formData.append('image', this.selectedImage);

   this.productoService.addProducto(formData).subscribe(data=>{
    this.productForm.reset(); // Reiniciar el formulario
    this.selectedImage = null; // Limpiar la imagen seleccionada
    this.fetchProducts(); // Actualizar la lista de productos
   })

     /* fetch(this.apiUrl, {
      method: 'POST',
      body: formData,
    })
      .then(() => {
        this.productForm.reset(); // Reiniciar el formulario
        this.selectedImage = null; // Limpiar la imagen seleccionada
        this.fetchProducts(); // Actualizar la lista de productos
      })
      .catch((error) => console.error('Error:', error)); */
  } 

  // Método para manejar el cambio de archivo
  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.selectedImage = target.files?.[0] || null;
  }

  // Método para eliminar un producto
  deleteProduct(id: number) {
    fetch(`${this.apiUrl}/${id}`, { method: 'DELETE' })
      .then(() => this.fetchProducts()) // Actualizar la lista de productos
      .catch((error) => console.error('Error:', error));
  }

  
}
