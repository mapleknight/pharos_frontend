import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit} from '@angular/core';
import {Ligand} from '../../../../models/ligand';
import {Target} from '../../../../models/target';
import {PharosConfig} from '../../../../../config/pharos-config';

/**
 * component to display a condensed ligand view
 */
@Component({
  selector: 'pharos-ligand-card',
  templateUrl: './ligand-card.component.html',
  styleUrls: ['./ligand-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LigandCardComponent implements OnInit {

  /**
   * ligand input to display
   */
  @Input() ligand: Ligand;

  /**
   * optional target to display activity data for
   */
  @Input() target?: Target;

  /**
   * find the first target activity for the ligand
   */
  primeActivity: any;


  /**
   * no args constructor
   */
  constructor(
  ) {
  }

  /**
   * find prime activity based on ligand activites for the target
   */
  ngOnInit() {
    this.primeActivity = this.ligand.activities.filter(act => act.moa);
    if (this.primeActivity.length === 0) {
      this.primeActivity = this.ligand.activities.filter(act => act.type === 'Kd' || act.type === 'Ki');
    }
    if (this.primeActivity.length === 0) {
      this.primeActivity = this.ligand.activities.sort((a, b) => a.value - b.value);
    }
    }
}
