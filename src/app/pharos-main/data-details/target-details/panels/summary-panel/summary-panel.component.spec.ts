import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryPanelComponent } from './summary-panel.component';
import {SharedModule} from '../../../../../shared/shared.module';
import {RadarService} from '../../../../../tools/visualizations/radar-chart/radar.service';
import {RadarChartComponent} from '../../../../../tools/visualizations/radar-chart/radar-chart.component';
import {PropertyDisplayComponent} from '../../../../../tools/generic-table/components/property-display/property-display.component';
import {RouterTestingModule} from '@angular/router/testing';
import {KnowledgeTableComponent} from '../../../../../tools/knowledge-table/knowledge-table.component';

describe('SummaryPanelComponent', () => {
  let component: SummaryPanelComponent;
  let fixture: ComponentFixture<SummaryPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedModule
      ],
      providers: [
        RadarService
      ],
      declarations: [
        PropertyDisplayComponent,
        SummaryPanelComponent,
        KnowledgeTableComponent,
        RadarChartComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
