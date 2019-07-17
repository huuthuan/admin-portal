import {Component, HostBinding, Input, OnInit, TemplateRef} from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  @HostBinding('class.minimized') navMinimized: boolean = window.innerWidth < 992;

  @Input() headerTemplate: TemplateRef<any>;
  @Input() sidebarTemplate: TemplateRef<any>;
  @Input() mainTemplate: TemplateRef<any>;

  constructor() {
  }

  ngOnInit() {

  }

  onSidebarToggle() {
    this.navMinimized = !this.navMinimized;
    window.dispatchEvent(new Event('resize'));
  }
}
