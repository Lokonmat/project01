import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Subject, tap, throwError } from 'rxjs';
import { AuthResponse } from '../models/auth-response';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api_key = "AIzaSyAJUJmXYrqyU8FiuJIMBK-bTzjOCqCwjws"
  user = new Subject<User>();

  constructor(private http: HttpClient) { }

  register(email: string, password: string) {
    return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + this.api_key, {
      email: email,
      password: password,
      returnSecureToken: true,
    }).pipe(
      tap(response => {
        const expirationDate = new Date(new Date().getTime()+(+response.expiresIn * 1000))
        const user = new User(
          response.email,
          response.localId,
          response.idToken,
          expirationDate
        );
      }),

      catchError(this.handleError)
    )
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + this.api_key, {
      email: email,
      password: password,
      returnSecureToken: true,
    }).pipe(
      tap(response => {
      const expirationDate = new Date(new Date().getTime()+(+response.expiresIn * 1000))
      const user = new User(
        response.email,
        response.localId,
        response.idToken,
        expirationDate
      );
        this.user.next(user);
    }),

      catchError(this.handleError)
    )
  }

  private handleError(err: HttpErrorResponse) {
    let message = "Hata oluştu.";

    if(err.error.error) {
      switch(err.error.error.message) {
        case"EMAIL_EXISTS":
          message = "Bu mail adresi zaten kullanımda.";
          break;
        case"TOO_MANY_ATTEMPTS_TRY_LATER":
          message = "Çok fazla sayıda deneme yaptınız. Lütfen bir süre bekleyip sonra tekrar deneyiniz."
          break;
        case "EMAIL_NOT_FOUND":
          message = "Bu mail adresine kayıtlı bir üyelik bulunmamaktadır."
          break;
        case"INVALID_PASSWORD":
          message = "Hatalı parola girişi yaptınız."
          break;
      }
    }

    return throwError(()=> message);
  }
}
