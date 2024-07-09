import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  private authService = inject(AuthService)
  userData: any;
  userId: string | null = null;
  ngOnInit(): void {
    this.userId = this.authService.getUserIdFromToken();
    if (this.userId) {
      this.authService.getUserFromId(this.userId).subscribe(
        data => {
          this.userData = data;
        },
        error => {
          console.error('Error fetching user data:', error);
        }
      );
    }
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  logout(){
    this.authService.logout();
  }
}
