import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  inventoryClicked = false;
  typesClicked = false;
  statusesClicked = false;

  constructor(
    private router: Router,
  ) { }

  inventoryToggle() {
    this.inventoryClicked = !this.inventoryClicked;
  }

  typesToggle() {
    this.typesClicked = !this.typesClicked;
  }

  statusesToggle() {
    this.statusesClicked = !this.statusesClicked;
  }

  navigateTypes() {
    this.router.navigateByUrl('types');
  }

  navigateStatuses() {
    this.router.navigateByUrl('statues');
  }

  ngOnInit() {
  }

}
