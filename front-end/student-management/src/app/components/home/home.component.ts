import { Student } from './../../model/student';
import { StudentService } from './../../services/student.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  students: Student[];
  public viewStudent: any;
  public editStudent: Student;
  public deleteStudent: Student;

  // pagination
  public pageSize = 3;
  public page = 1;
  pageSizes = [3, 6, 9];



  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.getAllStudents();
  }



  public searchStudent(key: string): void {
    const results: Student[] = [];
    for (const student of this.students) {
      if (student.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || student.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || student.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || student.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
          results.push(student);
      }
    }
    this.students = results;
    if (results.length === 0 || !key) {
      this.getAllStudents();
    }
  }




  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
  }




  getAllStudents(){
    this.studentService.getStudents().subscribe(
      data =>{
         this.students = data
         console.log(data)
      }
    )
  }




  onAddStudent(addForm: NgForm){
     document.getElementById('add-student-form')?.click();
     this.studentService.addStudent(addForm.value).subscribe({
       next: response =>{
         this.getAllStudents();
         addForm.reset();
       },
       error: error =>{
        alert(error.message);
     }
     });
  }


  onUpdateStudent(student:Student): void{
    this.studentService.updateStudent(student).subscribe(
      (response: Student) =>{
        this.getAllStudents();
      },
      (error:HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }



  onDeleteStudent(studentId:number): void{
    this.studentService.deleteStudent(studentId).subscribe(
      (response:void) =>{
        this.getAllStudents();
      },
      (error:HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }



  public onOpenModal(student: Student, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addStudentModal');
    }
    if (mode === 'edit') {
      this.editStudent = student;
      button.setAttribute('data-target', '#updateStudentModal');
    }
    if (mode === 'delete') {
      this.deleteStudent = student;
      button.setAttribute('data-target', '#deleteStudentModal');
    }

    if (mode === 'view') {
      this.viewStudent = student;
      button.setAttribute('data-target', '#viewStudentModal');
    }

    container?.appendChild(button);
    button.click();
  }




}
