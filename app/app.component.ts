import { Component ,Inject, OnInit,ViewChild} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  displayedColumns: string[] = ['productName', 'category', 'freshness', 'price','comment','date','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(public dialog: MatDialog,private apiservice:ApiService) {}
  ngOnInit(){
    this.getAllProducts();
  }
  openDialog() {
    this.dialog.open(DialogComponent,{
      width:'30%',

    });
  }
  editProduct(row:any){
    this.dialog.open(DialogComponent,{
      width:'30%',
      data:row
    });
  }
  deleteProduct(id:number){
    this.apiservice.deleteProduct(id);
    this.apiservice.getProduct();
  }
  getAllProducts(){
    this.apiservice.getProduct().subscribe((result:any)=>{
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


