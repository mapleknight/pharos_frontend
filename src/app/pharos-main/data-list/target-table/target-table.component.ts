import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {DynamicPanelComponent} from '../../../tools/dynamic-panel/dynamic-panel.component';
import {takeUntil} from 'rxjs/operators';
import {PageData} from '../../../models/page-data';
import {BatchUploadModalComponent} from "../../../tools/batch-upload-modal/batch-upload-modal.component";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment.prod";

@Component({
  selector: 'pharos-target-table',
  templateUrl: './target-table.component.html',
  styleUrls: ['./target-table.component.css']
})

export class TargetTableComponent  extends DynamicPanelComponent implements OnInit, OnDestroy {
  displayColumns: string[] = ['name', 'gene', 'idgTDL', 'idgFamily', 'novelty', 'jensenScore', 'antibodyCount', 'knowledgeAvailability'];
  // displayColumns: string[] = ['list-select', 'name', 'gene', 'idgTDL', 'idgFamily', 'novelty', 'jensenScore', 'antibodyCount', 'knowledgeAvailability'];
  @Output() readonly sortChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() readonly pageChange: EventEmitter<string> = new EventEmitter<string>();

  /**
   * page data object set by parent component
   */
  @Input() pageData: PageData;

  /**
   * boolean to show or hide the large "targets" label
   * @type {boolean}
   */
  @Input() showLabel = true;

  dataSource = new MatTableDataSource<any>(this.data);
  rowSelection = new SelectionModel<any>(true, []);

  constructor(public dialog: MatDialog,
              public http: HttpClient) {
    super();
  }

  ngOnInit() {
        this._data
        // listen to data as long as term is undefined or null
        // Unsubscribe once term has value
          .pipe(
            // todo: this unsubscribe doesn't seem to work
            takeUntil(this.ngUnsubscribe)
          )
          .subscribe(x => {
            console.log(this);
            this.dataSource.data = this.data;
          });
  }

  changeSort($event): void {
    this.sortChange.emit($event);
  }

  changePage($event): void {
    this.pageChange.emit($event);
  }

  batchUpload() {
    let dialogRef = this.dialog.open(BatchUploadModalComponent, {
        height: '50vh',
        width: '66vw',
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);

      this.http.post('/targets/resolve', result).subscribe(res => {
        console.log(res);
      })

      /*   this.http.post(`${environment.apiUrl}targets/resolve`, result, httpOptions).subscribe(res => {
        console.log(res);
      })*/
    //  this.animal = result;
    });
  }

  compareTargets() {
    console.log(this.rowSelection.selected);
  }

  createTopic() {
    console.log(this.rowSelection.selected);
  }

  saveTargets() {
    console.log(this.rowSelection.selected);
  }

ngOnDestroy(): void {
  this.ngUnsubscribe.next();
this.ngUnsubscribe.complete();
}
}
