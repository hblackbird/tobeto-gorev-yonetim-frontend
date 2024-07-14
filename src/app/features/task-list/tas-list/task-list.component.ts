import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject, OnInit } from '@angular/core';
import { ListTaskService } from '../../../services/list-task/list-task.service';
import { CommonModule, DatePipe } from '@angular/common';
import { AuthService } from '../../../services/auth/auth.service';
import { UpdateTaskService } from '../../../services/update-task/update-task.service';
import { Status } from '../../../Enums/status/status';
import { DeleteTaskService } from '../../../services/delete-task/delete-task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  providers:[DatePipe],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  private gorevService = inject(ListTaskService)
  private updateTaskService = inject (UpdateTaskService)
  private authService = inject(AuthService)
  private deleteTaskService = inject(DeleteTaskService)
  gorevler: any[] = [];
  filteredGorevler: any[] = [];
  userId: string | null = null;
  selectedGorev: any = null;
  isModalVisible = false;
  editForm: FormGroup;
  statusEnum = Status;
  sortByOption: string = 'createdDateAsc';

  statusOptions = [
    { label: 'Yeni', value: Status.Yeni },
    { label: 'Devam Ediyor', value: Status.DevamEdiyor },
    { label: 'Tamamlandı', value: Status.Tamamlandi }
  ];
  constructor(private fb: FormBuilder, private datePipe: DatePipe) {
    this.editForm = this.fb.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: [Status.Yeni, Validators.required]
    });
  }
  ngOnInit(): void {
    this.userId = this.authService.getUserIdFromToken();
    this.gorevService.listTasks().subscribe(data => {
      this.gorevler = data.items.map((gorev:any) => ({
        ...gorev,
        createdDate: this.formatDate(gorev.createdDate) // Tarihi dönüştürmek için formatlama işlemi
      }));
  
      if (this.userId) {
        this.filteredGorevler = this.gorevler.filter(gorev => gorev.userId === this.userId);
      } else {
        this.filteredGorevler = this.gorevler;
      }
    });
  }
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const formattedDate = `${this.pad(date.getDate())}-${this.pad(date.getMonth() + 1)}-${date.getFullYear()} ${this.pad(date.getHours())}:${this.pad(date.getMinutes())}`;
    return formattedDate;
  }
  
  private pad(n: number): string {
    return n < 10 ? '0' + n : n.toString();
  }
  applyFiltersAndSorting(): void {
    if (this.userId) {
      this.filteredGorevler = this.gorevler.filter(gorev => gorev.userId === this.userId);
    } else {
      this.filteredGorevler = this.gorevler;
    }

    if (this.sortByOption === 'createdDateAsc') {
      this.filteredGorevler.sort((a, b) => new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime());
    } else if (this.sortByOption === 'createdDateDesc') {
      this.filteredGorevler.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
    }
  }

  editGorev(gorev: any) {
    this.selectedGorev = { ...gorev };
    const { id, title, description, status } = gorev;
    this.editForm.patchValue({ id, title, description, status});
    console.log('editForm values:', this.editForm.value);
    this.isModalVisible = true;
  }

  close() {
    this.isModalVisible = false;
  }

  save() {
    if (this.editForm.valid) {
      const updatedGorev = {
        ...this.editForm.value,
        status: +this.editForm.value.status // Ensure status is treated as number
      };
      this.updateTaskService.updateTask(updatedGorev.id, updatedGorev).subscribe(() => {
        this.ngOnInit(); 
        this.close();
      }, error => {
        console.error('Error occurred:', error);
      });
    }
  }
  

  deleteGorev(gorevId: string) {
    this.deleteTaskService.deleteTask(gorevId).subscribe(()=>{
      this.ngOnInit();
    },error =>{
      console.log('Error occured:', error);
    })
  }

  getStatusText(status: number): string {
    switch (status) {
      case Status.Yeni:
        return 'Yeni';
      case Status.DevamEdiyor:
        return 'Devam Ediyor';
      case Status.Tamamlandi:
        return 'Tamamlandı';
      default:
        return '';
    }
  }
  getStatusNumber(statusText: string): Status {
    switch (statusText) {
      case 'Yeni':
        return Status.Yeni;
      case 'Devam Ediyor':
        return Status.DevamEdiyor;
      case 'Tamamlandı':
        return Status.Tamamlandi;
      default:
        return Status.Yeni;
    }
  }
}
