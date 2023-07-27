import { MaterialService } from './../shared/material.service';
import { OverviewPage } from './../shared/interfaces';
import { Observable } from 'rxjs';
import { Component, ElementRef, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { AnalyticsService } from '../shared/services/analytics.service';
import { MaterialInstance } from '../shared/material.service';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss']
})
export class OverviewPageComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('tapTarget') tapTargetRef!: ElementRef;
  data$!: Observable<OverviewPage>;
  tapTarget!: MaterialInstance | any;
  yesterday:Date=new Date()
  constructor(
    private service: AnalyticsService
  ) { }
  ngOnInit(): void {
    this.data$ = this.service.getOverview();
    this.yesterday.setDate(this.yesterday.getDate()-1);
  }
  openInfo() {
    this.tapTarget.open();
  }
  ngAfterViewInit(): void {
    this.tapTarget=MaterialService.initTapTarget(this.tapTargetRef);
  }
  ngOnDestroy(): void {
    this.tapTarget.destroy();
  }
}
