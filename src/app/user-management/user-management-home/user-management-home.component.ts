import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UsersService } from 'src/app/users.service';


@Component({
  selector: 'app-user-management-home',
  templateUrl: './user-management-home.component.html',
  styleUrls: ['./user-management-home.component.css']
})
export class UserManagementHomeComponent {

  constructor(private user: UsersService) {}

  //collecting data from the server
  userData: any;
  ngOnInit(): void{
    this.user.getAllUsers().subscribe((allData) => {
      console.log(allData);
      this.userData = allData;
    });
  }

  //adding new user to the server
  addUser =  new FormGroup({
    name : new FormControl('') ,
    email: new FormControl(''),
    role: new FormControl(''),
    imageUrl: new FormControl('')
  });

  //submitting the form
  msg: boolean = false;
  //this function is called when the form is submitted
   onSubmit(){
    this.user.addUser(this.addUser.value).subscribe((data) => {
      
      this.msg = true;
      this.ngOnInit();
      this.removeMessageAfter5Sec();
      this.addUser.reset();
    
    });
   };
   //removing message after clicking on the button
   //removing message after 5 seconds
   removeMessageAfter5Sec(){
    setTimeout(() => {
      this.msg = false;
    }, 5000);
   }
  
   removeMessage(){
    this.msg = false;
   }
   //deleting user from the server
   deleteUser(id: number){
    this.user.deleteUser(id).subscribe((data) => {
      this.ngOnInit();
    });
  }
 
  
}