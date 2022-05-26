import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-custom-column',
  templateUrl: './custom-column.component.html',
  styleUrls: ['./custom-column.component.css']
})
export class CustomColumnComponent implements OnInit {
  rowData:any;
  columnDefs = [
    {headerName: 'Make', field: 'make'},
    {headerName: 'Model', field: 'model',type:'rightAlighned'},
    {headerName: 'Price', field: 'price',editable: true}
];
rightAlighned:{
  headerClass: 'ag-right-aligned-header';
} | undefined

defaultColDef = {
  width: 100,
  headerComponentParams: {
      template:
          '<div class="ag-cell-label-container" role="presentation">' +
          '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
          '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
          '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
          '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
          '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
          '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
          '    ** <span ref="eText" class="ag-header-cell-text" role="columnheader"></span>' +
          '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
          '  </div>' +
          '</div>'
  }
};
  constructor(private http: HttpClient,) { }
   url:any = 'https://www.ag-grid.com/example-assets/row-data.json';
  ngOnInit(): void {
    //fetching data from server

   this.http.get(this.url).subscribe(data=>{
     this.rowData = data;
   })
  }



}
