import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
import { Http, Headers, RequestOptions } from '@angular/http';
import { LoginPage } from '../login/login';
import { LoadingController } from 'ionic-angular';
/**
 * Generated class for the RegistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {
  public name: string;
  public email: string;
  public mobile: string;
  public password: string;
  public userKind: string;
  public address: string;
  public stream: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: Toast, public http: Http, public loading: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationPage');
  }
  registerUser() {
    var name = this.name;
    var email = this.email;
    var mobile = this.mobile;
    var password = this.password;
    var address = this.address;
    var stream = this.stream;
    var filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (name == '' || name == undefined) {
      this.toast.show(`Oppps! Please enter name`, '5000', 'bottom').subscribe(
        toast => {
          console.log(toast);
        }
      );
    }
    else
    if ((email == '' || email == undefined) ||(!filter.test(email))) {
      this.toast.show(`Oppps! Please enter valid email`, '5000', 'bottom').subscribe(
        toast => {
          console.log(toast);
        }
      );
    }
      else
      if (stream == '' || stream == undefined) {
        this.toast.show(`Oppps! Please enter stream`, '5000', 'bottom').subscribe(
          toast => {
            console.log(toast);
          }
        );
      }
      else
      if (address == '' || address == undefined) {
        this.toast.show(`Oppps! Please enter address`, '5000', 'bottom').subscribe(
          toast => {
            console.log(toast);
          }
        );
      }  
      else
        if (mobile == '' || mobile == undefined) {
          this.toast.show(`Oppps! Please enter mobile no`, '5000', 'bottom').subscribe(
            toast => {
              console.log(toast);
            }
          );
        }
        else if (password == '' || password == undefined) {
          this.toast.show(`Oppps! Please enter password`, '5000', 'bottom').subscribe(
            toast => {
              console.log(toast);
            }
          );
        }
        else {
          let loader = this.loading.create({
            content: 'Registering...',
          });
          loader.present();
          var headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
          let options = new RequestOptions({ headers: headers });
          let postParams = {
            name: name,
            mobile: mobile,
            email: email,
            stream: stream,
            address:address,
            password: password,
            userKind: "normal"
          }
          this.http.post("https://y4a22ke4ci.execute-api.us-east-1.amazonaws.com/prod/users", JSON.stringify(postParams), options)
            .subscribe(data => {

              var response = JSON.parse(data['_body']);
              console.log(response);
              if (response.status == 0) {
                this.toast.show(response.message, '5000', 'bottom').subscribe(
                  toast => {
                    console.log(toast);
                  }
                );
              } else {
                this.toast.show(response.message, '5000', 'bottom').subscribe(
                  toast => {
                    console.log(toast);
                  }
                );
                loader.dismiss();
                this.navCtrl.push(LoginPage, {})
              }


            }, error => {
              console.log(error);// Error getting the data
            });
        }
  }//end registerUser()
}//end class
