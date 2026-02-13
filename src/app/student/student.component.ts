import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StudentService } from '../Services/student.service';
import { Student } from '../models/student';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, FormsModule,NgxPaginationModule],
  templateUrl: './student.component.html'
})
export class StudentComponent implements OnInit {

  students: Student[] = [];
  student: Student = {} as Student;
  isEditMode = false;
  p: number = 1;
searchText: string = '';
filterGender: string = '';
selectedStudentId: number = 0;

filteredStudents() {
  return this.students.filter(s => {
    const matchesSearch =
      !this.searchText ||
      s.studentName.toLowerCase().includes(this.searchText.toLowerCase()) ||
      s.course.toLowerCase().includes(this.searchText.toLowerCase()) ||
      s.email.toLowerCase().includes(this.searchText.toLowerCase()) ||
      s.phoneNumber.toString().includes(this.searchText);

    const matchesGender =
      !this.filterGender || s.gender === this.filterGender;

    return matchesSearch && matchesGender;
  });
}

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudents();
  }


loadStudents() {
  this.studentService.getStudents().subscribe({
    next: data => {
      if (data && data.length > 0) {
        // Sort by the correct field (studentId or id)
        this.students = data.sort((a, b) => Number(b.studentId) - Number(a.studentId));
      } else {
        this.students = [];
      }
    },
    error: err => console.error('Error loading students:', err)
  });
}
  // CREATE
  saveStudent() {
    this.studentService.addStudent(this.student).subscribe({
      next: () => {
        this.loadStudents();
        this.resetForm();
      },
      error: err => console.error(err)
    });
  }

  // EDIT (load data into form)
  editStudent(s: Student) {
    this.student = { ...s }; // clone object
    this.isEditMode = true;
  }

  // UPDATE
  updateStudent() {
    this.studentService.updateStudent(this.student).subscribe({
      next: () => {
        this.loadStudents();
        this.resetForm();
      },
      error: err => console.error(err)
    });
  }

  // SAVE OR UPDATE (single button)
  saveOrUpdate() {
    if (this.isEditMode) {
      this.updateStudent();
    } else {
      this.saveStudent();
    }
  }

  confirmDelete(id: number) {
  const confirmResult = confirm('Are you sure you want to delete this record?');

  if (confirmResult) {
    this.deleteStudent(id);
  }
}


  deleteStudent(id: number) {
  this.studentService.deleteStudent(id).subscribe({
    next: () => {
      alert('Student deleted successfully');
      this.loadStudents(); // reload table
    },
    error: () => {
      alert('Delete failed');
    }
  });
}



  // RESET
  resetForm() {
    this.student = {
      id:'any',
      studentId: 0,
      studentName: '',
      age: 0,
      gender: '',
      course: '',
      email: '',
      phoneNumber: ''
    };
    this.isEditMode = false;
  }
}
