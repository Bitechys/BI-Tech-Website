import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from 'src/app/service/main.service';


@Component({
  selector: 'app-franchise',
  templateUrl: './franchise.component.html',
  styleUrls: ['./franchise.component.scss']
})
export class FranchiseComponent implements OnInit {


  franchiseForm : any = FormGroup;

  // mailAccessKey = '9846f83c-1fcf-4aa0-bc53-a219ee76f8f1';
  mailAccessKey = this.service.mailAccessKey;

  formFeed : boolean = false

  constructor(private fb: FormBuilder, public service: MainService) { 

  }



  ngOnInit(): void {
    this.franchiseForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      code:['+91', Validators.required],
      phone: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      location: ['', Validators.required],
      message:['']
    });
   

  }

  formReset(){
    this.franchiseForm = this.fb.group({
      name: [''],
      email: [''],
      phone: [''],
      location: [''],
      message:[''],
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
    formData.append('name', this.franchiseForm.value.name);
    formData.append('email', this.franchiseForm.value.email);
    formData.append('code', this.franchiseForm.value.code);
    formData.append('phone', this.franchiseForm.value.phone);
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
    formData.append('Name', this.franchiseForm.value.name);
    formData.append('Email', this.franchiseForm.value.email);
    formData.append('Phone Number', this.franchiseForm.value.code + ' ' + this.franchiseForm.value.phone);
    // formData.append('phone', this.franchiseForm.value.phone);
    formData.append('Preferred Location', this.franchiseForm.value.location);
    formData.append('Message', this.franchiseForm.value.message);

    // -- email customization
    formData.append('access_key', this.mailAccessKey);
    formData.append('subject', 'New Franchise Request from your Site');
    formData.append('from_name', 'The Crispy Chicken - Franchise Notification');

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
      // this.franchiseForm.reset();
      this.formReset();
      // this.franchiseForm.value.code = '+91';

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




  // selectCountry(country: any) {
  //   this.selectedCountryCode = country;
  // }

  selectedCountryCode: any;


  getSelectedCountryName(): string {
    const selectedCountry = this.service.new.find(country => country.dial_code === this.franchiseForm.get('code').value);
    return selectedCountry ? selectedCountry.name : '';
  }

  getSelectedCountryDialCode(): any{
    const selectedCountry = this.service.new.find(country => country.dial_code === this.franchiseForm.get('code').value);
    return selectedCountry ? selectedCountry.dial_code : '';
  }

  getSelectedCountryImage(): string {
    const selectedCountry = this.service.new.find(country => country.dial_code === this.franchiseForm.get('code').value);
    return selectedCountry ? selectedCountry.image : '';
  }


  card = [
    {
      "title": "Established Brand",
      "content": "Join a recognized brand with a loyal customer base and a reputation for excellence.",
      "img": "fa-3x fa-regular fa-copyright",
    },
    {
      "title": "Proven Business Model",
      "content": "Benefit from a time-tested business model that has proven successful in multiple locations.",
      "img": "fa-3x fa-solid fa-briefcase",
    },
    {
      "title": "Training and Support",
      "content": "Receive comprehensive training and ongoing support from our experienced team to help you run your franchise smoothly.",
      "img": "fa fa-3x fa-user-tie",
    },
    {
      "title": "Marketing Assistance",
      "content": "Avail of marketing strategies and materials to boost your presence in the local market and attract more customers.",
      "img": "fa-3x fa-solid fa-chart-simple",
    },
    // {
    //   "title": "Menu Innovation",
    //   "content": "Participate in the creation of new menu items and stay ahead of evolving food trends",
    //   "img": "fa-3x fa-solid fa-lightbulb",
    // },
  ]

  cardnew = [
    {
      "title": "Submit Your Inquiry",
      "content": "Fill out the franchise inquiry form below to express your interest in joining our franchise family. ",
      "img": "fa-3x fa-solid fa-square-phone",
    },
    {
      "title": "Initial Consultation ",
      "content": "Our team will reach out to schedule an initial consultation to discuss your business goals and answer any questions you may have.",
      "img": "fa-3x fa-solid fa-briefcase",
    },
    {
      "title": "Location Selection",
      "content": "We'll work together to find the ideal location for your Crispy Chicken restaurant.",
      "img": "fa-3x fa-solid fa-map-location",
    },
    {
      "title": "Franchise Agreement",
      "content": "Review and sign the franchise agreement, outlining the terms and conditions of our partnership. ",
      "img": "fa-3x fa-solid fa-handshake",
    },
    {
      "title": "Training and Support",
      "content": "Attend our comprehensive training program to equip you with all the knowledge needed to run a successful Crispy Chicken franchise. ",
      "img": "fa-3x fa-solid fa-headset",
    },
    {
      "title": "Grand Opening",
      "content": " With our support, launch your Crispy Chicken restaurant with a grand opening event that attracts customers from day one. ",
      "img": "fa-3x fa-solid fa-shop",
    },
  ]

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

  onSelectChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    if (target && target.value) {
      this.updateFirstWord(target.value);
    }
  }
}
