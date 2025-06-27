import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-success',
  template: '',
  standalone: true
})
export class LoginSuccessComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (token) {
      localStorage.setItem('token', token); // Store JWT for API usage
      this.router.navigate(['/']); // Redirect to home or dashboard
    } else {
      this.router.navigate(['/login']); // Fallback if no token
    }
  }
}
