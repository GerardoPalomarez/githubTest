import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiService {
  public dev = 'http://34.211.213.112/PASEDEV/api/';
  public prod = 'http://34.211.213.112/PASE/api/';
  public localurl = 'http://localhost:3000/'; // API Local
  public serviceurl = this.dev; // API Remota

  constructor(private http: HttpClient) {}

  /**
  * Obtiene los datos necesarios para la gráfica de transacciones por status
  * @param inicial
  * @param final
  */
  getGraficaAtransacciones(inicial: string, final: string): Observable<any> {
    return this.http.get(this.serviceurl + 'CyberSource/GetTotalTransactionsByDateFromDB?startDate='
    + inicial + '&endDate=' + final).pipe(map(res => res));
  }

  /**
   * Obtiene los totales para el panel de dashboard con filtro de fechas
   * @param inicial
   * @param final
   */
  getTotalTransaccionesByDate(inicial: string, final: string): Observable<any> {
    return this.http.get(this.serviceurl + 'TotalTransaction/GetTotalTransactions?startDate='
    + inicial + '&endDate=' + final).pipe(map(res => res));

  }

  getGraficaPasarelaBancaria(inicial: string, final: string): Observable<any> {
    return this.http.get(this.serviceurl + 'Pasarela/GetTotalPasarelaTransactionsByDateFromDB?startDate='
    + inicial + '&endDate=' + final).pipe(map(res => res));
  }
}
