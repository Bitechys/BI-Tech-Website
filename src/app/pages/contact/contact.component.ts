import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from 'src/app/service/main.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactForm : any = FormGroup;

  // mailAccessKey = '9846f83c-1fcf-4aa0-bc53-a219ee76f8f1';
  mailAccessKey = this.service.mailAccessKey;

  formFeed : boolean = false

  constructor(private fb: FormBuilder, public service: MainService) { 

  }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message:['']
    });
  }

  private color: string = '';
  showAlert: boolean = false;
  alertMessage: string = '';
  onSubmit: boolean = false;
     
  get alertColor() {
    return `text-${this.color}-400`;
  }
  
  hideAlert() {
    setTimeout(() => {
      this.showAlert = false;
      console.log(this.showAlert, "this.showAlert");
    }, 5000);
    
  }

  testfunc(){
    let formData: FormData = new FormData();
    formData.append('name', this.contactForm.value.name);
    formData.append('email', this.contactForm.value.email);
    formData.append('code', this.contactForm.value.code);
    formData.append('phone', this.contactForm.value.phone);
    // -- email customization
    formData.append('access_key', '7db731ea-8288-44ad-ab77-74cacad84484');
    formData.append('subject', 'Franchise Request From Your Site');
    formData.append('from_name', 'Franchise Notification');

    console.log(formData, "formData")
  }
  
  selectedValue:any;

  onChange(event: any) {
    this.selectedValue = event.target.value;
  }
  
  async submitEmail() {
    this.onSubmit = true;
    // -- set formData values
    // let formData: FormData = new FormData();
    // formData.append('name', this.contactFormValues.name);
    // formData.append('email', this.contactFormValues.email);
    // formData.append('body', this.contactFormValues.body);
    // // -- email customization
    // formData.append('access_key', '');
    // formData.append('subject', 'Email Support From Your Site');
    // formData.append('from_name', 'Contact Notification');

    let formData: FormData = new FormData();
    formData.append('Name', this.contactForm.value.name);
    formData.append('Email', this.contactForm.value.email);
    // formData.append('Phone Number', this.contactForm.value.code + ' ' + this.contactForm.value.phone);
    // formData.append('phone', this.contactForm.value.phone);
    // formData.append('Preferred Location', this.contactForm.value.location);
    formData.append('Message', this.contactForm.value.message);

    // -- email customization
    formData.append('access_key', this.mailAccessKey);
    formData.append('subject', 'New Contact Submission from your Site');
    formData.append('from_name', 'The Crispy Chicken - Contact Notification');

    console.log(formData, "formData")
  
    try {
      // -- send email
      const res = await this.service.sendEmail(formData);
      if (!res.ok) {
        throw new Error();
      }
      this.alertMessage = 'Email sent successfully!';
      this.color = 'green';
      this.formFeed = true;
      this.contactForm.reset();
      // this.contactForm.value.code = '+91';

    } catch (err) {
      // handle error
      this.alertMessage = 'Something went wrong, try again later!';
      this.color = 'red';
      this.formFeed = false;
    }
    // -- reset submit and hide alert
    this.onSubmit = false;
    this.showAlert = true;
    this.hideAlert();
  }

  preventFirstLetterSpace(event: any) {
    // Check if the key pressed is space and if it's the first character
    if (event.key === ' ' && event.target['selectionStart'] === 0) {
      event.preventDefault();
    }
  }

  updateFirstWord(optionValue: any): void {
    const firstWord = optionValue.split(' ')[0]; // Split by space and take the first word
    const selectedIndex = this.service.new.indexOf(optionValue);
    this.service.new[selectedIndex] = firstWord;
  }

}
