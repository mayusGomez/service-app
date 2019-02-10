import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import { FormValidations } from '../../validators/form';
import { UserProfile } from '../../models/user-profile';
import { Gender } from '../../models/user-profile';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public signupForm: FormGroup;
  public genderEnum: Gender;

  constructor(
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public toastController: ToastController
  ) {
    this.signupForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.minLength( 6 ), Validators.required])],
      confirm_password: ['', FormValidations.areEqual('password')]
    });

  }

  ngOnInit() {}

  async signupUser(signupForm): Promise<void> {
    const loading = await this.loadingCtrl.create();
    try {
      /*loading.present();
      const email: string = signupForm.value.email;
      const password: string = signupForm.value.password;
      await this.authService.createUser(email, password);
      await loading.dismiss();
      this.authService.sendEmailVerification();
      const toast = await this.toastController.create({
        message: 'Hemos enviado un correo electrónico para validar tu cuenta, sin esta validación no es posible que solicites un servicio',
        duration: 10000
      });
      toast.present();
      this.router.navigateByUrl('/');*/
      console.log('Genero:'+ signupForm.value.gender);
    } catch (error) {
      await loading.dismiss();
      const alert = await this.alertCtrl.create({
        message: 'Usuario o contraseña validos',//error.message,
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

