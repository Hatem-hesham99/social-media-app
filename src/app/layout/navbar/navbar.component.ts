import { afterNextRender, Component } from '@angular/core';
import { initFlowbite } from 'flowbite'

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
   constructor(){
    afterNextRender(()=>{
      initFlowbite();
    })
   }


}
