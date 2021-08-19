import { Student } from './../../model/student';
import { StudentService } from './../../services/student.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ChartType } from 'src/app/enum/ChartType';
import { Chart } from 'chart.js';

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

  // chart
  public male: any[] = [];
  public female: any[] = [];
  public traceList: any[];
  public httpDefaultTraces: any[] = [];

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.getAllStudents();
  }


  // start excel
  public exportTableToExcel(): void {
    const downloadLink = document.createElement('a');   // a is anchor tag
    const dataType = 'application/vnd.ms-excel';
    const table = document.getElementById('httptrace-table');   // httptrace-table is id of table
    const tableHTML = table.outerHTML.replace(/ /g, '%20');
    const filename = 'httptrace.xls';
    document.body.appendChild(downloadLink);
    downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
    downloadLink.download = filename;
    downloadLink.click();
}
// end excel





  //  start chart

  processTraces(trace: string){
    switch(trace){
      case 'male':
        this.male.push(trace);
        break;

      case 'female':
        this.female.push(trace);
        break;

      default:
        this.httpDefaultTraces.push(trace);
    }
 }



 private initializeBarChart(): Chart {
  const barChartElement = document.getElementById('barChart') as HTMLCanvasElement;
  return new Chart(barChartElement, {
    type: ChartType.BAR,
    data: {
        labels: [`# Male:${this.male.length}, Percent:${(this.male.length / (this.male.length+this.female.length)) * 100}%`,
                 `# Female:${this.female.length}, Percent:${(this.female.length / (this.male.length+this.female.length)) * 100}%`],
        datasets: [{data: [this.male.length, this.female.length],
            backgroundColor: [ 'rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
            borderWidth: 3
        }]
    },
    options: {
      title: { display: true, text: 'bar chart' },
      legend: { display: false },
      scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

}


private initializePieChart(): Chart {
  const pieChartElement = document.getElementById('pieChart') as HTMLCanvasElement;
  return new Chart(pieChartElement, {
    type: ChartType.PIE,
    data: {
      labels: [`# Male:${this.male.length}, Percent:${(this.male.length / (this.male.length+this.female.length)) * 100}%`,
               `# Female:${this.female.length}, Percent:${(this.female.length / (this.male.length+this.female.length)) * 100}%`],
      datasets: [{data: [this.male.length, this.female.length],
          backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
          borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
          borderWidth: 3
        }]
    },
    options: {
      title: { display: true, text: "pie chart" },
      legend: { display: true },
      display: true
    }
});
}




  // end chart



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
         for(let temp in data){
        // console.log(temp)
        // console.log(data[temp].gender
          this.processTraces(data[temp].gender);
          this.initializeBarChart();
          this.initializePieChart();
          this.students = data;
         }

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
