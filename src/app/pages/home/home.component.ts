import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  
  userName = 'Vikas Sharma';
  userAddress = '123 Elite Street, New York, NY 10001';
  checkedIn = false;
  checkOutDone = false;

  get greeting(): string {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Good Morning';
    if (hour >= 12 && hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  }

  checkIn() {
    this.checkedIn = true;
    alert('You have checked in');
  }

  checkOut() {
    this.checkOutDone = true;
    alert('You have checked out');
  }

  recentOrders = [
    {
      id: 'DEL-4810',
      from: 'Main Street Store',
      to: '123 Elite Street',
      date: 'Yesterday',
      amount: '$32.00',
    },
    {
      id: 'DEL-4805',
      from: 'City Center',
      to: '123 Elite Street',
      date: '2 days ago',
      amount: '$15.75',
    },
  ];
}
