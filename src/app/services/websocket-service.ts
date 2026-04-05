import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  connect(): Observable<any> {
    return new Observable(observer => {

      const ws = new WebSocket('ws://localhost:8080');

      ws.onopen = () => {
        console.log('Connected to backend');
      };

      ws.onmessage = (event) => {
        observer.next(JSON.parse(event.data));
      };

      ws.onerror = (err) => {
        console.error(' WS Error', err);
      };

      ws.onclose = () => {
        console.warn('WS Closed - retrying...');
        setTimeout(() => this.connect().subscribe(observer), 2000);
      };

      return () => ws.close();
    });
  }
}
