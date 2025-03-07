import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../core/services/user/users.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

   private readonly formBuilder = inject(FormBuilder)
   private readonly usersService = inject(UsersService)
   private readonly router = inject(Router)
    login!:FormGroup 
    isloading:boolean = true
    massage:string =''
    
    ngOnInit(): void {
      this.initForm()
    }
  
    initForm(){
      this.login = this.formBuilder.group({
        email:[null,[Validators.required,Validators.email]],
        password:[null,[Validators.required,Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
      })
     
    }
    
    loginForm(){
      this.isloading=false
      
        this.usersService.sigIn(this.login.value).subscribe({
          next:(res)=>{
            
            if(res.message ==='success' ){

              console.log(res);
              localStorage.setItem('token', res.token )
              setTimeout(() => {
                this.router.navigate(['/timeline'])
              }, 300);
    


            }

           
  
         this.isloading=true
  
          },
          error:(err)=>{
            console.log(err);
            this.massage = err.error.error
          this.isloading=true
  
          }
  
        })
      }
      
 
  

}
