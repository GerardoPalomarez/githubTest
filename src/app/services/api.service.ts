import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiService {
  public localurl = 'http://localhost:3000/'; // API Local
  public serviceurl = 'http://testapics.somee.com/api/'; // API Remota

  constructor(private http: HttpClient) {}

  /**
  * Obtiene los datos necesarios para la gráfica de transacciones por status
  * @param inicial
  * @param final
  */
  getGraficaAtransacciones(inicial: string, final: string): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.http.get(this.serviceurl + 'CyberSource/GetTotalTransactionsByDateFromDB?startDate=' + inicial + '&endDate=' + final).pipe(map(res => res));
  }

  /**
   * Obtiene los totales para el panel de dashboard con filtro de fechas
   * @param inicial
   * @param final
   */
  getTotalTransaccionesByDate(inicial: string, final: string): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.http.get(this.serviceurl + 'TotalTransaction/GetTotalTransactions?startDate=' + inicial + '&endDate=' + final).pipe(map(res => res));

  }
}
