import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public signupForm: FormGroup;
  constructor(
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
    });
  }

  ngOnInit() {}

  async signupUser(signupForm): Promise<void> {
    const loading = await this.loadingCtrl.create();
    try {
      loading.present();

      const email: string = signupForm.value.email;
      const password: string = signupForm.value.password;
      await this.authService.createUser(email, password);
      await loading.dismiss();
      this.router.navigateByUrl('/');
    } catch (error) {
      await loading.dismiss();
      const alert = await this.alertCtrl.create({
        message: error.message,
        buttons: [
          {
            text: 'OK',
            role: 'cancel',
          },
        ],
      });
      alert.present();
    }
  }
}

