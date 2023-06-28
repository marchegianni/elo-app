import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MysqlService {
  private apiUrl = `${environment.apiUrl}/api`; // Assuming your Node.js server is running on this URL

  constructor(private http: HttpClient) {}

  getAllPlayers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`, { responseType: 'json' });
  }

  saveGameResult(gameResult: any) {
    return this.http.post(`${this.apiUrl}/game-results`, gameResult);
  }

  // Add other methods for updating, deleting, etc.
}