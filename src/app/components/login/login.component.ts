import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Route, Router } from '@angular/router';
declare var M: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  // providers: [AuthService, FormGroup]
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService, private route: Router) { }
  get email() { return this.userForm.get('email'); }
  get password() { return this.userForm.get('password'); }
  ngOnInit() {
    // console.log(this.auth.getUser());
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }
  doLogin() {
    if (!this.userForm.valid) { return; }
    this.auth.login(this.userForm.value).subscribe((res) => {
      if (res.status === 'success') {
        this.auth.setUser(res.body.user);
        this.auth.setAccessToken(res.body.user.access_token[0].token);
        this.route.navigate(['/admin/contract']);
      }
      M.toast({ html: res.message });
    });
  }

}
