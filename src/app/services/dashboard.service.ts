import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as data from '../../assets/config.json';
const word = (<any>data).apiServer;

@Injectable()
export class DashboardService {
  public serviceurl = word;

  constructor(private http: HttpClient) {
    // console.log(this.base);
  }

  /**
  * Obtiene los datos necesarios para la gráfica de transacciones por status
  * @param inicial
  * @param final
  */
  getTotalTransactionCybersourceGraph(inicial: string, final: string): Observable<any> {
    return this.http.get(this.serviceurl + 'GetTotalTransactionCybersourceGraph?startDate='
    + inicial + '&endDate=' + final).pipe(map(res => res));

  }

  /**
   * Obtiene los totales para el panel de dashboard con filtro de fechas
   * @param inicial
   * @param final
   */
  getTotalTransactions(inicial: string, final: string): Observable<any> {
    return this.http.get(this.serviceurl + 'GetTotalTransactions?startDate='
    + inicial + '&endDate=' + final).pipe(map(res => res));

  }

  /**
   * Obtiene el numero de transacciones que se encuentran
   * en la pasarela bancaria para el panel de dashboard con filtro de fechas
   * @param inicial
   * @param final
   */
  getTotalPasarelaTransactionsByDateFromDB(inicial: string, final: string): Observable<any> {
    return this.http.get(this.serviceurl + 'GetTotalPasarelaTransactionsByDateFromDB?startDate='
    + inicial + '&endDate=' + final).pipe(map(res => res));
  }
  /**
   * Obtiene el numero de transacciones operadas por entidad bancaria, así como su monto
   * @param inicial
   * @param final
   */
  getTransactionsByBankGraph(inicial: string, final: string): Observable<any> {
    return this.http.get(this.serviceurl + 'GetTransactionsByBankGraph?startDate='
    + inicial + '&endDate=' + final).pipe(map(res => res));
  }

  /**
   * Obtiene el detalle de la gráfica de transacciones operadas y rechazadas
   * @param inicial
   * @param final
   * @param bankName
   */
  getTransactionsByBankDetailGraph(inicial: string, final: string, bankName: string): Observable<any> {
    return this.http.get(this.serviceurl + 'GetTransactionsByBankDetailGraph?startDate='
    + inicial + '&endDate=' + final + '&BankName=' + bankName).pipe(map(res => res));
  }

  /**
   * Obtiene el número de transacciones por montos de recargas
   * @param inicial
   * @param final
   * @param bankName
   */
  getTransactionsByRechargeAmountGraph(inicial: string, final: string): Observable<any> {
    return this.http.get(this.serviceurl + 'GetTransactionsByRechargeAmountGraph?startDate='
    + inicial + '&endDate=' + final).pipe(map(res => res));
  }

  /**
   * Obtiene el total del costo operativo cybersource por transacción
   * @param inicial
   * @param final
   */
  getTotalTransByOperationGraph(inicial: string, final: string): Observable<any> {
    return this.http.get(this.serviceurl + 'GetTotalTransByOperationGraph?startDate='
    + inicial + '&endDate=' + final).pipe(map(res => res));
  }

  /**
   * Obtiene el total de transacciones por tipo de tarjeta
   * @param inicial
   * @param final
   */
  getTotalTransByAccountTypeGraph(inicial: string, final: string): Observable<any> {
    return this.http.get(this.serviceurl + 'GetTotalTransByAccountTypeGraph?startDate='
    + inicial + '&endDate=' + final).pipe(map(res => res));
  }
  /**
   * Monitorea el status del servicio
   */
  getStatusConexionService() {
    return this.http.get(this.serviceurl + 'GetStatusConexionService').pipe(map(res => res));
  }

}
