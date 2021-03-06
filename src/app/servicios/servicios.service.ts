import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class ServiciosService {
  url: string = 'https://comedor-api.herokuapp.com';
  token: string;
  decodedToken: any;
  usuarioLogeado$ = new BehaviorSubject<any>('');
  sidebarState$ = new BehaviorSubject<boolean>(true);

  options: any;

  constructor(private http: HttpClient) {}

  getDecodedAccessToken(): any {
    try {
      this.decodedToken = jwt_decode(this.token);

      this.obtenerUsuarios().subscribe((respuesta) => {
        this.filtrarUsuarios(respuesta);
      });
    } catch (error) {
      console.log('error from getDecodedAccessToken', error);
    }
  }

  setearSesion(respuestaServidor: any) {
    localStorage.setItem('token', respuestaServidor.token);

    this.token = respuestaServidor.token;

    this.options = {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };

    this.getDecodedAccessToken();
  }

  filtrarUsuarios(usuarios: any) {
    return this.usuarioLogeado$.next(
      usuarios.filter((usuario) => usuario.username == this.decodedToken.sub)
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.usuarioLogeado$.next('');
    this.token = undefined;
    this.options = undefined;
  }

  // servicio que registra al usuario
  registro(
    nombreApellido: string,
    email: string,
    password: string,
    rol: Object
  ): Observable<any> {
    let body = {
      username: email,
      email: nombreApellido,
      password: password,
      rol: rol,
    };

    return this.http.post(`${this.url}/registro`, body);
  }

  // servicio que retorna el token dentro del key "token" en el caso que se pasan las credenciales correctas.
  login(username: string, password: string): Observable<any> {
    let body = {
      username: username,
      password: password,
    };
    return this.http.post(`${this.url}/login`, body);
  }

  obtenerPlatos() {
    const httpOptions = {
      headers: new HttpHeaders(),
    };
    return this.http.get(`${this.url}/api/platos`, this.options);
  }

  obtenerUsuarios() {
    return this.http.get(`${this.url}/api/usuarios`, this.options);
  }

  crearPlato(body: any) {
    return this.http.post(`${this.url}/api/platos`, body, this.options);
  }

  eliminarPlato(id: number) {
    return this.http.delete(`${this.url}/api/platos/${id}`, this.options);
  }

  modificarPlato(body: any, id: number) {
    return this.http.put(`${this.url}/api/platos/${id}`, body, this.options);
  }

  obtenerPlato(id: number) {
    return this.http.get(`${this.url}/api/platos/${id}`, this.options);
  }

  crearReserva(body: any){
    return this.http.post(`${this.url}/api/reservas`, body, this.options);
  }

  crearPedirPlato(body: any){
    return this.http.post(`${this.url}/api/pedirPlato`, body, this.options);
  }

  obtenerReservas(){
    return this.http.get(`${this.url}/api/reservas`, this.options);
  }

  obtenerFranjas(){
    return this.http.get(`${this.url}/api/franjas`, this.options);
  }

  toggleSidebarState(arg: boolean){
    this.sidebarState$.next(arg);
  }
}
