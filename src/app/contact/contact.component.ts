import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { ReCaptcha2Component } from 'ngx-captcha';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  @ViewChild('captchaElem') captchaElem: ReCaptcha2Component;

  @Input() contact;

  public form: FormGroup;
  public siteKey = '6LcP86MUAAAAANZK3dX4GgOA7CYX1DPGSlMx6FDI';
  public size = 'normal';
  public result = '';

  constructor(
    private fb : FormBuilder,
    private service: AppService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      subject: ['', Validators.required],
      email: ['', Validators.required],
      message: ['', Validators.required],
      recaptcha: ['', Validators.required]
    });
  }

  send() {
    if (this.form.valid) {
      let payload = Object.assign({}, this.form.value);
      delete payload.recaptcha;
      return this.service.sendMail(payload)
      .subscribe(
        data => {
          this.captchaElem.resetCaptcha();
          this.form.reset();
          this.result = 'success';
          console.log('success');
          setTimeout(() => { this.result = ''}, 3000);
        },
        error => {
          this.captchaElem.resetCaptcha();
          this.form.reset();
          this.result = 'success';
          console.log('success');
          setTimeout(() => { this.result = ''}, 3000);
        }
      );
    }
  }

}
