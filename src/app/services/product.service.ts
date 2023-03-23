import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay, map, Observable, tap } from "rxjs";
import { Product } from "../models/product";

// Local service
@Injectable()
export class ProductService {
    private url ="https://ng-shopapp-99e88-default-rtdb.firebaseio.com/";


    constructor(private http: HttpClient) {}
    getProducts(categoryId: number):Observable<Product[]> {
        return this.http
            .get<Product[]>(this.url + "urun.json")
            .pipe(
                map(data => {
                    const products: Product[] = [];

                    for(const key in data) {
                        if(categoryId) {
                            if(categoryId == data[key].categoryId) {
                                products.push({...data[key], id: key});
                            }
                        } else {

                            products.push({...data[key], id: key});
                        }
                      }

                    return products;
                }),
                tap(data => console.log(data)),
                delay(1000)
            );
    }

    getProductById(id: string): Observable<Product> {
        return this.http.get<Product>(this.url + "urun/" + id +".json").pipe(delay(1000));
    }

    createProduct(product: Product): Observable<Product> {
        return this.http.post<Product>(this.url +"urun.json", product);
    }
}