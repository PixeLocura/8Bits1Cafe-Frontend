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
  timeLeft: number = 10;
  private intervalId: any;
  transaction: any = null;

  constructor(private router: Router) {
    // Try to get transaction data from navigation state
    const nav = this.router.getCurrentNavigation();
    if (nav && nav.extras && nav.extras.state && nav.extras.state['transaction']) {
      this.transaction = nav.extras.state['transaction'];
    }
  }

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft === 0) {
        clearInterval(this.intervalId);
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
