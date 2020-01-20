import { Component } from '@angular/core';
import { UserService } from './user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private createdUsers = [];
  private users:any[] = [];
  private search: string = '';
  private page: number = 1;
  public email = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  private create: boolean = false
  private user: any = {
    first_name: '',
    last_name: '',
    email: ''
  }
  private maxPage: any;

  constructor ( private userService:UserService){
    
  }

  ngOnInit() {
    // this.showAlert('success', 'success', 'cargado plataforma')
    
    this.getUser(this.page)
  }

  extraPage(){
    if(this.createdUsers.length != 0){
      if(this.createdUsers.length < 6){
        return [3]
      }
      let qty = (this.createdUsers.length / 6).toFixed(); 
      let aux = []
      for (let index = 0; index < Number(qty); index++) {
       aux.push(index + 2)
      }
      return aux
    }
  }

  myUser(page){

  }

  showAlert( type , title , message){
    Swal.fire(
      title,
      message,
      type,
      
    ).then((result) => {
      if (result.value) {
        this.create = false
        this.user = {
          first_name: '',
          last_name: '',
          email: ''
        }
      }
    })
  }

  valid(){
    if(this.user.first_name != '' && this.user.last_name != '' && this.user.email != '' && this.email.test(this.user.email) ){
      return false
    }else{
      return true
    }
  }

  getUser(page){
    this.userService.getUser(page).subscribe(data => {
      this.users = data.data
      this.maxPage = data.total_pages
      console.log('data',data)
    }, error => {
        console.log(error)
    })
  }

  changePage(page){
    if(page > this.maxPage){
      page = this.maxPage
      return 
    }
    if(page < 1){
      page = 1
      return
    }
    this.page = page
    this.getUser(this.page)
  }

  change(){
    this.create = !this.create
    this.user = {
      first_name: '',
      last_name: '',
      email: ''
    }
  }

  createUser(){
    this.userService.createUser(this.user).subscribe(data =>{
      this.user['id'] = 12 + this.createdUsers.length
      this.createdUsers.push(this.user)
      console.log(data)
      this.showAlert('success', 'success', 'cargado plataforma')

    },error =>{
      console.log(error)
      this.showAlert('error', 'error', 'error inesperado')
    })
  }

  delUser(id){
    this.userService.delUser(id).subscribe(data => {
      this.users = data.data
      console.log('data',data)
    }, error => {
        console.log(error)
        this.showAlert('error', 'error', 'error inesperado')
    })
  }
  
}

