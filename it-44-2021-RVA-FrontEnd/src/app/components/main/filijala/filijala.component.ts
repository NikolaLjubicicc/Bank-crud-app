import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Filijala } from 'src/app/models/filijala';
import { FilijalaService } from 'src/app/services/filijala.service';
import { FilijalaDialogComponent } from '../../dialogs/filijala-dialog/filijala-dialog.component';
import { Banka } from 'src/app/models/banka';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-filijala',
  templateUrl: './filijala.component.html',
  styleUrls: ['./filijala.component.css']
})
export class FilijalaComponent implements OnInit, OnDestroy{
  displayedColumns = ['id','adresa','brojPultova','posedujeSef','banka','actions'];
  dataSource!: MatTableDataSource<Filijala>;
  subscription!: Subscription;
  parentSelectedFilijala!:Filijala;

  @ViewChild(MatSort,{static:false}) sort!:MatSort;
  @ViewChild(MatPaginator,{static:false}) paginator!:MatPaginator;
  
  constructor(private service:FilijalaService, public dialog:MatDialog){
    
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadData();
  }


public loadData(){
 this.subscription = this.service.getAllFilijalas().subscribe(
    (data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
  ),
  (error: Error) => {
    console.log(error.name + ' '+ error.message);
  }
 }

public openDialog(flag:number,id?:number,adresa?:string,brojPultova?:number,posedujeSef?:boolean,banka?:Banka){
  const dialogRef = this.dialog.open(FilijalaDialogComponent, {data:{id,adresa,brojPultova,posedujeSef,banka}});
  dialogRef.componentInstance.flag = flag;
  dialogRef.afterClosed().subscribe(
    (result) => {
      if(result == 1){
        this.loadData();
      }
    }
  )
}

  public selectRow(row: any){
  this.parentSelectedFilijala = row;
   }
public applyFilter(filter:any){
  filter = filter.target.value;
  filter = filter.trim();
  filter = filter .toLocaleLowerCase();
  this.dataSource.filter = filter;
 }
}
