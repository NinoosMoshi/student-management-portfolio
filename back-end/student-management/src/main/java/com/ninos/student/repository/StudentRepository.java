package com.ninos.student.repository;

import com.ninos.student.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student,Long> {

   public Student findStudentById(Long id);


}
