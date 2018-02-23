import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public useremail: string;
  public userpasswd: string;
  public userEmailid: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: Toast,
    public http: Http, private storage: Storage, public loading: LoadingController) {

  }
 /*  ionViewDidLoad() {
    this.userEmailid = this.storage.get('userEmailid');
    if (this.userEmailid == '' || this.userEmailid == undefined) {
      
    }
    else {
      this.navCtrl.setRoot(TabsPage);
    }
  } */

  loginUser() {
    var useremail = this.useremail;
    var password = this.userpasswd;
    var filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if ((useremail == '' || useremail == undefined) ||(!filter.test(useremail))) {
      this.toast.show(`Oppps! Please enter valid email`, '5000', 'bottom').subscribe(
        toast => {
          console.log(toast);
        }
      );
    }    
    else
      if (password == '' || password == undefined) {
        this.toast.show(`Oppps! Please enter Password`, '5000', 'bottom').subscribe(
          toast => {
            console.log(toast);
          }
        );
      }
      else {
        let loader = this.loading.create({
          content: 'Getting in...',
        });
        loader.present();
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });
        let postParams = {
          email: useremail,
          password: password
        }
        this.http.post("https://y4a22ke4ci.execute-api.us-east-1.amazonaws.com/prod/login", JSON.stringify(postParams), options)
          .subscribe(data => {
            var response = JSON.parse(data['_body']);
            console.log(response);
            if (response.status == 0) {
              this.toast.show(response.message, '5000', 'bottom').subscribe(
                toast => {
                  console.log(toast);
                  loader.dismiss();
                }
              );
            } else {
              this.toast.show(response.message, '5000', 'bottom').subscribe(
                toast => {
                  console.log(toast);
                }
              );
              loader.dismiss();
              /*------------Here I need set one local storage. E.g;  this.storage.set('userArray',response.data[0]);----------------------------*/
              this.storage.set('userArray', response.data[0]);          
              this.storage.set('userName', response.data[0].username);
              this.storage.set('userEmailid', response.data[0].email);
              this.storage.set('userMobile', response.data[0].mobile);
              setTimeout(() => {
                console.log('Async operation has ended');
              }, 2000);
              //this.navCtrl.setRoot(HomePage);
              this.navCtrl.push(TabsPage);
            }
    
          }, error => {
            console.log(error);// Error getting the data
          });
      }
  }
}
