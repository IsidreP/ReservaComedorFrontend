import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  url:string = 'https://comedor-api.herokuapp.com';

  token:string = localStorage.getItem('token');

  options = {
    headers: {
      'Authorization': `Bearer ${this.token}`
    }
  };

  constructor(private http: HttpClient) { }

  setearSesion(respuestaServidor: any){
    localStorage.setItem('token', respuestaServidor.token);
  }

  logout() {
    localStorage.removeItem("token");
  }

  // servicio que registra al usuario
  registro(nombreApellido: string, email: string, password: string, passwordRepetido: string, rol: Object): Observable<any>{
    let body = {
      nombreApellido: nombreApellido,
      email: email,
      password: password,
      passwordRepetido: passwordRepetido,
      rol: rol
    }
    return this.http.post(`${this.url}/registro`, body)
  }

  // servicio que retorna el token dentro del key "token" en el caso que se pasan las credenciales correctas.
  login(username: string, password: string): Observable<any>{

    let body = {
      username: username,
      password: password
    }

    return this.http.post(`${this.url}/login`, body).pipe(
      tap(
        respuesta => {
          this.setearSesion(respuesta)
        }
      )
    );
  }


  obtenerPlatos(){
    let options = {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    }
    return this.http.get(`${this.url}/api/platos`, this.options)
  }
}
