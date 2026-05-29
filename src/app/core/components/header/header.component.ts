import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  userName = 'Vikas Sharma';
  userAddress = '123 Elite Street, New York, NY 10001';
}
