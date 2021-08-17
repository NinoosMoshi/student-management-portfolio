import { Student } from './../model/student';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseURL = "http://localhost:8080/api"

  constructor(private http: HttpClient) { }



  //  http://localhost:8080/api/all
  public getStudents(): Observable<Student[]>{
    return this.http.get<Student[]>(`${this.baseURL}/all`).pipe(
      map(response => response)
    );
  }


  // http://localhost:8080/api/add
  public addStudent(student: Student): Observable<Student>{
    return this.http.post<Student>(`${this.baseURL}/add`, student).pipe(
      map(response => response)
    );
  }



  // http://localhost:8080/api/update
  public updateStudent(student: Student): Observable<Student>{
     return this.http.put<Student>(`${this.baseURL}/update`, student).pipe(
       map(response => response)
     );
  }


  // http://localhost:8080/api/delete/{studentId}
  public deleteStudent(studentId: number):Observable<void> {
     return this.http.delete<void>(`${this.baseURL}/delete/${studentId}`)
  }








}
