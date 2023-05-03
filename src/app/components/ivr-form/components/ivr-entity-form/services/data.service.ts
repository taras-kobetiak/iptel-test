import { Injectable } from '@angular/core';

export interface IData { buttons: string[]; actions: string[], statuses: string[] }

@Injectable({
  providedIn: 'root'
})
export class DataService {

  data: IData = {
    buttons: ['Button 0', 'Button 1', 'Button 2', 'Button 3', 'Button 4', 'Button 5', 'Button 6', 'Button 7', 'Button 8', 'Button 9'],
    actions: ['Action 0', 'Action 1', 'Action 2', 'Action 3', 'Action 4'],
    statuses: ['Status 0', 'Status 1', 'Status 2']
  }

  getData(): IData {
    return this.data;
  }
}
