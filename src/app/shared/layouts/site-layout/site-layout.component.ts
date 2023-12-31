import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialService } from '../../material.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements AfterViewInit {
  @ViewChild('floating') floatingRef!:ElementRef;
  links = [
    { url: '/overview', name: 'Огляд' },
    { url: '/analytics', name: 'Аналітика' },
    { url: '/history', name: 'Історія' },
    { url: '/order', name: 'Додати замовлення' },
    { url: '/categories', name: 'Асортимент' },
  ];
  constructor(private auth: AuthService,
    private router: Router) { }
  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/login']);
  }
  ngAfterViewInit(): void {
    MaterialService.initializeFloatingButton(this.floatingRef)
  }
}
