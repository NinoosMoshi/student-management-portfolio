import { Student } from './../../model/student';
import { StudentService } from './../../services/student.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  students!: Student[];
  public viewStudent: any;

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.getAllStudents();
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



  public onOpenModal(student: Student, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addStudentModal');
    }

    if (mode === 'view') {
      this.viewStudent = student;
      button.setAttribute('data-target', '#viewStudentModal');
    }

    container?.appendChild(button);
    button.click();
  }




}
