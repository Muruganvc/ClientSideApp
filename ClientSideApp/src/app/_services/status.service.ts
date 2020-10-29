import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { status } from '../models/status';

@Injectable({
  providedIn: "root",
})
export class StatusService {
  baseApiUrl : string="https://localhost:44328/";

  constructor(private http : HttpClient) {}

  getStatusDetails() : Observable<status[]>{
    let Url = `${this.baseApiUrl}Status/getStutasDetails`;
    return this.http.get<status[]>(Url);
  }

  getStatusDetailById(statusId:number): Observable<status>{
    let Url = `${this.baseApiUrl}Status/getStutasDetailsById/${statusId}`;
    return this.http.get<status>(Url);
  }

  saveStatusDetails(data:status) : Observable<number>{
    let Url = `${this.baseApiUrl}Status/SaveStatusDetials`;
    let header = new HttpHeaders({ 'Content-Type': 'application/json' });
    let value  = JSON.stringify(data);
    return this.http.post<number>(Url,value,{headers : header});
  }

  updateStatusDetails(statusId:number,data:status) : Observable<number>{
    let Url = `${this.baseApiUrl}Status/UpdateStatusDetials/${statusId}`;
    let header = new HttpHeaders({ 'Content-Type': 'application/json' });
    let value  = JSON.stringify(data);
    return this.http.put<number>(Url,value,{headers: header});
  }

  deleteStatusDetails(statusId:number) : Observable<number>{
    let Url = `${this.baseApiUrl}Status/DeleteStatusDetials/${statusId}`;
    return this.http.delete<number>(Url);
  }
}
