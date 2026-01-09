import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '@core';

@Component({
  selector: 'app-main-layout',
  standalone: false,
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent implements OnInit {
  @Input() pageTitle = "Dashboard";
  @Input() pageSubtitle?: string;

  sidebarOpen = true;
  currentUser: any | null = null;

  menuItems = [
    {
      label: "MI RANCHO",
      route: "/dashboard",
      icon: "assets/sidevar/home_bco.svg",
    },
    {
      label: "ANIMALES",
      route: "/animales",
      icon: "assets/sidevar/vaca_bco.svg",
    },
    {
      label: "RAZAS",
      route: "/breeds",
      icon: "assets/sidevar/bread.svg",
    },
    {
      label: "GRANJAS",
      route: "/farms",
      icon: "assets/sidevar/tractor.svg",
    },
    {
      label: "LOTES",
      route: "/lots",
      icon: "assets/sidevar/agave_bco.svg",
    },
    {
      label: "INVENTARIO",
      route: "/inventario",
      icon: "assets/sidevar/buzon_vde.svg",
    },
    {
      label: "REPORTES",
      route: "/reportes",
      icon: "assets/sidevar/reportes_bco.svg",
    },
  ];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // this.currentUser = this.authService.getCurrentUser();
  }

  getUserInitial(): string {
    return this.currentUser?.username?.charAt(0).toUpperCase() || "U";
  }

  logout(): void {
    // this.authService.logout();
  }

  get sidebarClasses(): string {
    return `fixed inset-y-0 left-0 z-20 w-16 bg-white transform transition-all duration-500 ease-out ${this.sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`;
  }

  get mainContentClasses(): string {
    return "lg:pl-16 transition-all duration-500 ease-out ";
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }
}