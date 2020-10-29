import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {Ligand} from '../../../../../models/ligand';
import {takeUntil} from 'rxjs/operators';
import {NavSectionsService} from "../../../../../tools/sidenav-panel/services/nav-sections.service";

@Component({
  selector: 'pharos-ligand-details',
  templateUrl: './ligand-details.component.html',
  styleUrls: ['./ligand-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LigandDetailsComponent extends DynamicPanelComponent implements OnInit, OnDestroy {

  /**
   * ligand object
   */
  @Input() ligand: Ligand;

  constructor(private changeRef: ChangeDetectorRef,
              public navSectionsService: NavSectionsService) {
    super(navSectionsService);
  }

  /**
   * set data
   */
  ngOnInit() {
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        if (this.data && this.data.ligands) {
          this.ligand = this.data.ligands;
          this.loadingComplete();
          this.changeRef.markForCheck();
        }
      });
  }

  /**
   * tracks if element is active in view
   * @param {string} fragment
   */
  active(fragment: string) {
    this.navSectionsService.setActiveSection(fragment);
  }

  /**
   * clean up on leaving component
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
