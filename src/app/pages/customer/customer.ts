import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface CustomerDetail {
  sale: number;
  order: number;
  payment: number;
}

interface CustomerData {
  id: number;
  name: string;
  email: string;
  phone: string;
  detail: CustomerDetail;
}

@Component({
  selector: 'app-customer',
  imports: [FormsModule, RouterLink],
  templateUrl: './customer.html',
  styleUrl: './customer.css',
})
export class Customer {
  customers: CustomerData[] = [
    {
      id: 1,
      name: 'Rahul Patel',
      email: 'rahul.patel@email.com',
      phone: '+91 98765 43210',
      detail: { sale: 0, order: 0, payment: 0 },
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 87654 32109',
      detail: { sale: 0, order: 0, payment: 0 },
    },
    {
      id: 3,
      name: 'Amit Kumar',
      email: 'amit.kumar@email.com',
      phone: '+91 76543 21098',
      detail: { sale: 0, order: 0, payment: 0 },
    },
    {
      id: 4,
      name: 'Sneha Gupta',
      email: 'sneha.gupta@email.com',
      phone: '+91 65432 10987',
      detail: { sale: 0, order: 0, payment: 0 },
    },
    {
      id: 5,
      name: 'Vikram Singh',
      email: 'vikram.singh@email.com',
      phone: '+91 54321 09876',
      detail: { sale: 0, order: 0, payment: 0 },
    },
    {
      id: 6,
      name: 'Ananya Reddy',
      email: 'ananya.reddy@email.com',
      phone: '+91 43210 98765',
      detail: { sale: 0, order: 0, payment: 0 },
    },
    {
      id: 7,
      name: 'Rajesh Joshi',
      email: 'rajesh.joshi@email.com',
      phone: '+91 32109 87654',
      detail: { sale: 0, order: 0, payment: 0 },
    },
    {
      id: 8,
      name: 'Deepika Nair',
      email: 'deepika.nair@email.com',
      phone: '+91 21098 76543',
      detail: { sale: 0, order: 0, payment: 0 },
    },
    {
      id: 9,
      name: 'Suresh Iyer',
      email: 'suresh.iyer@email.com',
      phone: '+91 10987 65432',
      detail: { sale: 0, order: 0, payment: 0 },
    },
    {
      id: 10,
      name: 'Kavita Desai',
      email: 'kavita.desai@email.com',
      phone: '+91 99887 76655',
      detail: { sale: 0, order: 0, payment: 0 },
    },
    {
      id: 11,
      name: 'Arjun Mehta',
      email: 'arjun.mehta@email.com',
      phone: '+91 88776 65544',
      detail: { sale: 0, order: 0, payment: 0 },
    },
    {
      id: 12,
      name: 'Neha Verma',
      email: 'neha.verma@email.com',
      phone: '+91 77665 54433',
      detail: { sale: 0, order: 0, payment: 0 },
    },
    {
      id: 13,
      name: 'Manish Tiwari',
      email: 'manish.tiwari@email.com',
      phone: '+91 66554 43322',
      detail: { sale: 0, order: 0, payment: 0 },
    },
    {
      id: 14,
      name: 'Pooja Malhotra',
      email: 'pooja.malhotra@email.com',
      phone: '+91 55443 32211',
      detail: { sale: 0, order: 0, payment: 0 },
    },
    {
      id: 15,
      name: 'Rohit Choudhary',
      email: 'rohit.choudhary@email.com',
      phone: '+91 44332 21100',
      detail: { sale: 0, order: 0, payment: 0 },
    },
  ];

  getInitials(name: string): string {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('');
  }

  searchQuery = '';

  get filteredCustomers(): CustomerData[] {
    if (!this.searchQuery.trim()) return this.customers;
    const q = this.searchQuery.toLowerCase();
    return this.customers.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.includes(q),
    );
  }
}
