import { Component } from '@angular/core';
import { Router, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-burrito-admin-layout',
  imports: [RouterOutlet],
  templateUrl: './burrito-admin-layout.html',
  styleUrl: './burrito-admin-layout.css',
})
export class BurritoAdminLayout {}
