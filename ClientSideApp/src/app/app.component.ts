import { Component, OnInit, ViewChild } from "@angular/core";
import { StatusService } from "./_services/status.service";
import { MatTableDataSource } from "@angular/material/table";
import { status } from "./models/status";
import { MatPaginator } from "@angular/material/paginator";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  dataSource = new MatTableDataSource<status>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  value = new status();

  buttonName = "Save";

  columnsToDisplay: string[] = [
    "name",
    "shopName",
    "status",
    "statusDate",
    "action",
  ];
constructor(private service: StatusService) {}
  ngOnInit(): void {
   this.getStatusDetails();
  }

  getStatusDetails() {
    this.service.getStatusDetails().subscribe((result: status[]) => {
      if (result) {
        console.log(result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.data = result as status[];
        console.log(result);
      }
    },err =>{
      console.error(err.error + " \n" + err.message);
    });
  }
  customFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource.filter);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  Delete(value: status) {
    if (confirm("do you want to delete?")) {
      this.service.deleteStatusDetails(value.statusId).subscribe((result) => {
        if (result) {
          this.customAlert('delete');
        }
      },err =>{
        console.error(err.error + " \n" + err.message);
      });
    }
  }

  Edit(value: status) {
    this.buttonName = "Update";
    this.value.statusId = value.statusId;
    this.value.name = value.name;
    this.value.shopName = value.shopName;
    this.value.status = value.status;
    this.value.statusDate = value.statusDate;
  }

  saveUpdaateStatusDetails() {
    if(this.value.name==''){
      alert('Must be enter Name');
      return;
    }
    else if(this.value.shopName ==''){
      alert('Must be enter Shop Name');
      return;
    }

    if (this.buttonName == "Save") {
      this.service.saveStatusDetails(this.value).subscribe((result) => {
        if (result) {
          this.customAlert('save');
        }
      },err =>{
        console.error(err.error + " \n" + err.message);
      });
    } else if (this.buttonName == "Update") {
      this.service
        .updateStatusDetails(this.value.statusId, this.value)
        .subscribe((result) => {
          if (result) {
            this.customAlert('update');
          }
        },err =>{
          console.error(err.error + " \n" + err.message);
        });
    }
  }

  customAlert(status: string) {
    if (status == "save") {
      alert('Saved successfully.');
      this.Clear();
    } else if (status == "update") {
      alert('Update successfully.');
      this.Clear();
    } else if (status == "delete") {
      alert('Deleted successfully.');
    }
    this.getStatusDetails();
    this.buttonName="Save";
  }
  Clear(){
    this.value.name='';
    this.value.shopName='';
    this.value.status='';
    this.value.statusDate=null;
    this.buttonName="Save";
  }
}
