import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit{

  studentArray: any[] = [];
  studentName: string = "";
  studentAddress: string = "";
  mobile: string = "";

  currentStudentId: string = "";

  constructor(private http: HttpClient) {
   
    console.log("hello contructor");
    this.getAllStudents();
  }

  ngOnInit() {
    console.log("hello ngOnInit");
    
  }

  ngOnChanges(changes: any) {
    console.log(changes)
  }
  register()
  {
  
    let bodyData = {
      "studentName" : this.studentName,
      "studentAddress" : this.studentAddress,
      "mobile" : this.mobile
    };
 
    this.http.post("http://localhost:8081/api/v1/student/save",bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Student Registered Successfully");
        this.getAllStudents();
        this.studentName = '';
        this.studentAddress = '';
        this.mobile  = "";
    });

    
  }

  setUpdate(data: any)
  {
   this.studentName = data.studentName;
   this.studentAddress = data.studentAddress;
   this.mobile = data.mobile;
   this.currentStudentId = data._id;
   
  }


 
  UpdateRecords()
  {
    let bodyData = {
     
      "studentName" : this.studentName,
      "studentAddress" : this.studentAddress,
      "mobile" : this.mobile
    };
    
    this.http.put("http://localhost:8081/api/v1/student/edit"+ "/" + this.currentStudentId , bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Student Registered Updateddd")
        this.getAllStudents();
 
        this.studentName = '';
        this.studentAddress = '';
        this.mobile  = '';
    });
  }

  save()
  {
    if(this.currentStudentId == '')
    {
        this.register();
    }
      else
      {
       this.UpdateRecords();
      }      
 
  }

  setDelete(item: any) {
    
    this.http.delete("http://localhost:8081/api/v1/student/delete"+ "/"+ item._id,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Student Deleted")
        this.getAllStudents();
 
        this.studentName = '';
        this.studentAddress = '';
        this.mobile  = '';
  
    });
 
  }


  getAllStudents() {
    this.http.get<any>("http://localhost:8081/api/v1/student/getAll")
    .subscribe((resultData: any)=>
    {
        console.log(resultData);
        this.studentArray = resultData;
    });
  }
}
