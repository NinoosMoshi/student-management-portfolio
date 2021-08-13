package com.ninos.student.service;

import com.ninos.student.model.Student;

import java.util.List;

public interface StudentService {

    public Student addStudent(Student student);

    public List<Student> findAllStudent();

    public Student updateStudent(Student student);

    public Student findStudentById(Long id);

    public void deleteStudent(Long id);

}
