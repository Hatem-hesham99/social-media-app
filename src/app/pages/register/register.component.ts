import { Component, inject, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { UsersService } from '../../core/services/user/users.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  ///

  private readonly usersService = inject(UsersService)
  private readonly formBuilder= inject(FormBuilder)
  private readonly router= inject( Router )
  
  isloading:boolean = true
  massage:string=''
  register!:FormGroup 
  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
    this.register = this.formBuilder.group({
      name:[null,[Validators.required,Validators.minLength(2)]],
      email:[null,[Validators.required,Validators.email]],
      password:[null,[Validators.required,Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
      rePassword:[null,[Validators.required,Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
      dateOfBirth:[null,[Validators.required]],
      gender:['male',[Validators.required,Validators.pattern(/^(male|female)$/)]],
    },{ validators : this.passwordMatchValidator })
   
  }
  
   passwordMatchValidator(g: AbstractControl ) {
    return g.get('password')?.value === g.get('rePassword')?.value
       ? null : {'mismatch': true};
 }


  registerForm(){
    this.isloading=false
    if(this.register.valid){
      this.usersService.sigUp(this.register.value).subscribe({
        next:(res)=>{
          this.massage = res.message
          console.log(res);
          setTimeout(() => {
            this.router.navigate(['/login'])
          }, 500);


       this.isloading=true

        },error:(err)=>{
          console.log(err);
        this.isloading=true
        this.massage = err.error.error


          
        }

      })
    }
    
  }













}
