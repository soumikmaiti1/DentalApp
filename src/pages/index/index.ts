import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegistrationPage } from '../registration/registration';
import { LoginPage } from '../login/login';
//import { GooglePlus } from '@ionic-native/google-plus';
//import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { HomePage } from '../home/home';
import { Toast } from '@ionic-native/toast';
import { DISABLED } from '@angular/forms/src/model';
import { Http, Headers, RequestOptions } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import * as $ from 'jquery';
@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
})
export class IndexPage {
  public name: string;
  public email: string;
  public mobile: string;
  public password: string;
  public userKind: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: Toast,
    public http: Http, public loading: LoadingController, private fb: Facebook, private googlePlus: GooglePlus) {
    $(".tabs-ios .tab-button").css("display", "none");
  }
  //private googlePlus: GooglePlus,private fb: Facebook,
  ionViewDidLoad() {
    console.log('ionViewDidLoad IndexPage');
  }
  ionViewWillEnter() {
    $(".tabs-md .tab-button").css("display", "none");
    $(".tabs-ios .tab-button").css("display", "none");
  }

  ionViewWillLeave() {
    //this.tabBarElement.style.display = 'flex';
  }
  signup() {
    this.navCtrl.push(RegistrationPage);
  }
  signin() {
    //this.navCtrl.push(TabsPage);
    this.navCtrl.push(LoginPage);
  }
  FBlogin() {
    let loader = this.loading.create({
      content: 'Getting in...',
    });
    loader.present();

    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then((res) => {
        console.log('Logged into Facebook!', res);
        //alert(JSON.stringify(res));
        //this.userId=res.authResponse.userID;

        this.fb.api('/' + res.authResponse.userID + "/?fields=id,email,first_name,last_name,gender,age_range,picture.width(9999),birthday", ['public_profile', 'email'])
          .then((result) => {
            var name = result.first_name + " " + result.last_name;
            var email = result.email;

            var headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            let options = new RequestOptions({ headers: headers });
            let postParams = {
              name: name,
              mobile: 0,
              email: email,
              userKind: "facebook"
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

                  this.toast.show("Login successful", '5000', 'bottom').subscribe(
                    toast => {
                      console.log(toast);
                    }
                  );
                  loader.dismiss();
                  //this.navCtrl.push(AboutPage,{param1 : "hello" , param2 : "world"});
                  this.navCtrl.push(TabsPage);
                  //this.navCtrl.setRoot(HomePage, { param1: result });

                }


              }, error => {
                console.log(error);// Error getting the data
              });




            ///////////////////////////////////////////
            /*    alert(JSON.stringify(result));
                this.toast.show(`Login successful`, '5000', 'top').subscribe(
                  toast => {
                    console.log(toast);
                  }
                );
               //this.navCtrl.push(AboutPage,{param1 : "hello" , param2 : "world"});
               this.navCtrl.setRoot(HomePage,{param1 : result});*/
          }
          )

      }
      )
      .catch(e => console.log(e));
    this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
  }//end  FBlogin()
  GPlogin() {
    let loader = this.loading.create({
      content: 'Getting in...',
    });
    loader.present();
    this.googlePlus.login({})
      .then(res => {
        var name = res.displayName;
        var email = res.email;

        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });
        let postParams = {
          name: name,
          mobile: 0,
          email: email,
          userKind: "gmail"
        }
        this.http.post("https://y4a22ke4ci.execute-api.us-east-1.amazonaws.com/prod/users", JSON.stringify(postParams), options)
          .subscribe(data => {

            var response = JSON.parse(data['_body']);
            console.log(response);
            //alert(JSON.stringify(response));
            if (response.status == 0) {
              this.toast.show(response.message, '5000', 'bottom').subscribe(
                toast => {
                  console.log(toast);
                }
              );
            } else {
              this.toast.show("Login successful", '5000', 'bottom').subscribe(
                toast => {
                  console.log(toast);
                }
              );
              loader.dismiss();
              //this.navCtrl.push(AboutPage,{param1 : "hello" , param2 : "world"});
              //this.navCtrl.setRoot(HomePage, { param1: res });
              this.navCtrl.push(TabsPage);
            }


          }, error => {
            console.log(error);// Error getting the data

          });

        /* alert(JSON.stringify(res));
         this.toast.show(`Login successful`, '5000', 'top').subscribe(
           toast => {
             console.log(toast);
           }
         );
         this.navCtrl.setRoot(HomePage);*/
      }
      )
      .catch(err => console.error(err));

  }//end GPlogin()
}
