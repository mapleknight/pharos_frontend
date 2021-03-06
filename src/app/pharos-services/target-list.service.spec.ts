import {async, TestBed} from '@angular/core/testing';
import {AngularFirestore} from '@angular/fire/firestore';
import {TargetListService } from './target-list.service';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SharedModule} from "../shared/shared.module";
import {GenericTableModule} from "../tools/generic-table/generic-table.module";
import {RadarChartModule} from "../tools/visualizations/radar-chart/radar-chart.module";
import {RouterTestingModule} from "@angular/router/testing";
import {AngularFireModule} from "@angular/fire";
import {COMMON_CONFIG} from "../../../test/test-config";
import {PharosApiService} from "./pharos-api.service";
import {AngularFireAuth} from "@angular/fire/auth";
import {ActivatedRoute} from "@angular/router";
import {MOCKACTIVATEDROUTE} from "../../../test/mock-activate-route";
import {FIRESTORESTUB} from "../../../test/firestore-stub";
import {IdgLevelIndicatorComponent} from "../tools/idg-level-indicator/idg-level-indicator.component";
import {KnowledgeTableComponent} from "../tools/knowledge-table/knowledge-table.component";
import {TargetTableComponent} from "../pharos-main/data-list/tables/target-table/target-table.component";
import {TargetCardComponent} from "../pharos-main/data-list/cards/target-card/target-card.component";

describe('TargetListService', () => {
  let service: TargetListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFirestore, useValue: FIRESTORESTUB }
      ]
    });
    service = TestBed.inject(TargetListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
