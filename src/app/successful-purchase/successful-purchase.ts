import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-successful-purchase',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './successful-purchase.html',
  styleUrls: ['./successful-purchase.css']
})
export class SuccessfulPurchase implements OnInit, OnDestroy {
  timeLeft: number = 5;
  private intervalId: any;

  constructor(private router: Router) { }

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft === 0) {
        this.router.navigate(['/']);
      }
    }, 1000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
