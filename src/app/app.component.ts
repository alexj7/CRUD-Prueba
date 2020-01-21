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
  private indexEdit;
  private loader:boolean = false
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
      let qty =  Math.ceil(this.createdUsers.length / 6)
      let aux = []
      for (let index = 1; index <= Number(qty); index++) {
       aux.push(index + 2)
      }
      return aux
    }
  }

  myUser(page){
    let first = 0
    for (let index = 3; index < page; index++) {
      first = first + 6
    }
    console.log(first)
    let users = this.createdUsers.slice(first, first + 6)
    console.log(users)
    if(users.length != 0){
      this.users = users
      this.page = page
    }
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

  editUser(user){
    this.user = {...user}
    this.create = true
  }

  updateUser(){
    debugger
    if(this.user.id >= 12){
      this.createdUsers[this.indexEdit] = this.user
      if(this.page > 2){
        this.myUser(this.page)
      }
      this.showAlert('success', 'success', 'Usuario editado exitosamente')
    }
    else{
      this.loader = true
      this.userService.updateUser(this.user).subscribe(data =>{
        console.log(data)
        this.loader = false
        this.showAlert('success', 'success', 'Usuario editado exitosamente')
        debugger
        this.users[this.indexEdit] = data.body
        
      }, error => {
        this.loader = false
        console.log(error)
        this.showAlert('error', 'error', 'error inesperado')
      })
    }
  
  }

  getUser(page){
    this.loader = true
    this.userService.getUser(page).subscribe(data => {
      this.loader = false
      this.users = data.data
      this.maxPage = data.total_pages
      console.log('data',data)
    }, error => {
      this.loader = false
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
    this.loader = true
    this.userService.createUser(this.user).subscribe(data =>{
      this.loader = false
      this.user['id'] = 13 + this.createdUsers.length
      this.createdUsers.push(this.user)
      console.log(data)
      if(this.page > 2){
        this.myUser(this.page)
      }
      this.showAlert('success', 'success', 'Usuario creado exitosamente')

    },error =>{
      this.loader = false
      console.log(error)
      this.showAlert('error', 'error', 'error inesperado')
    })
  }

  delUser(id){
    if(this.page > 2){
      let aux;
      this.createdUsers.forEach((element, index) =>{
        element.id == id
        aux = index
      })
      this.createdUsers.splice(aux, 1)
      this.myUser(this.page)
      return
    }

    this.userService.delUser(id).subscribe(data => {
      this.users.splice(this.indexEdit, 1)
      if(this.indexEdit > 12){
        this.createdUsers = this.users
      }
      if(this.users.length == 0){
        this.getUser(this.page)
      }
      this.loader = false
    }, error => {
        this.loader = false
        this.showAlert('error', 'error', 'error inesperado')
    })
  }
  
}

