import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'cdr';
  dynamicForm: FormGroup;
  formdata: any[] = [{ label: 'first name' }];
  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.dynamicForm = this.formBuilder.group({});
    let form = {};
    this.getJSON().subscribe((data) => {
      this.formdata = data.item;
      for (let i = 0; i < this.formdata.length; i++) {
        form[this.formdata[i].linkId] = new FormControl(
          '',
          Validators.required
        );
        // form[this.formdata[i].text] = new FormControl('');
      }
      this.dynamicForm = new FormGroup(form);
      console.log(this.dynamicForm.controls);
    });
  }

  ngOnInit() {}
  public getJSON(): Observable<any> {
    return this.http.get('./assets/questionnaire.json');
  }
  get f() {
    return this.dynamicForm.controls;
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.dynamicForm.invalid) {
      return;
    }
    console.log(this.dynamicForm.controls);
  }
}
