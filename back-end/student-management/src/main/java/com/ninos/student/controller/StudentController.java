package com.ninos.student.controller;

import com.ninos.student.model.Student;
import com.ninos.student.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class StudentController {

    private StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    // http://localhost:8080/api/all
    @GetMapping("/all")
    public ResponseEntity<List<Student>> getAllStudents(){
        List<Student> students = studentService.findAllStudent();
        return new ResponseEntity<List<Student>>(students, HttpStatus.OK);
    }



    // http://localhost:8080/api/add
    @PostMapping("/add")
    public ResponseEntity<Student> addNewStudent(@RequestBody Student student){
        Student students = studentService.addStudent(student);
        return new ResponseEntity<Student>(students, HttpStatus.CREATED);
    }


    // http://localhost:8080/api/update
    @PutMapping("/update")
    public ResponseEntity<Student> updateStudent(@RequestBody Student student){
        Student updateStudent = studentService.updateStudent(student);
        return new ResponseEntity<Student>(updateStudent, HttpStatus.OK);
    }


    // http://localhost:8080/api/find/{value}
    @GetMapping("/find/{id}")
    public ResponseEntity<Student> findStudent(@PathVariable("id") Long id){
      Student findStudent = studentService.findStudentById(id);
      return new ResponseEntity<Student>(findStudent,HttpStatus.OK);
    }


    // http://localhost:8080/api/delete/{value}
    @DeleteMapping("/delete/{id}")
    public void deleteStudent(@PathVariable("id") Long id){
        studentService.deleteStudent(id);
    }





}
