import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { AddTaskService } from '../../../services/add-task/add-task.service';

@Component({
  selector: 'app-add-tasks',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-tasks.component.html',
  styleUrl: './add-tasks.component.css'
})
export class AddTasksComponent implements OnInit {
  form: FormGroup;
  userId: string | null = null;
  private authService = inject(AuthService)
  private addTaskService = inject(AddTaskService)
 constructor(private fb: FormBuilder) {
  this.form = this.fb.group({
    title: ['', Validators.required],
    userId: [{ value: '', disabled: true }, Validators.required],
    status: [0, Validators.required],
    description: ['', Validators.required]
  });
 }
  ngOnInit(): void {
    this.userId = this.authService.getUserIdFromToken();
    if(this.userId){
      this.form.patchValue({ userId: this.userId });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const gorevData = { ...this.form.getRawValue() };
      
      this.addTaskService.addTask(gorevData).subscribe(response => {
        this.form.reset({
        title: '',
        userId: this.userId,
        description: ''
      });
      }, error => {
        console.error('Görev eklenirken hata oluştu:', error);
      });
    }
  }
}
