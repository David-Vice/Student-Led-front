import { Component, OnInit } from '@angular/core'
import { ApiService } from 'app/services/api.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  formLoaded:boolean = false;
  public contentHeader: object;
  tmpImage: any = null;
  detections: any[] = [];
  tmpFormData: any = null;

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {
    this.formLoaded = true;
    this.contentHeader = {
      headerTitle: 'Home',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/'
          },
          {
            name: 'Sample',
            isLink: false
          }
        ]
      }
    }
  }

  uploadPhoto = (event) => {
    if(event.target.files.length === 0) 
      return;

    let fileToUpload = <File>event.target.files[0];
    const formData = new FormData();
    formData.append('Image', fileToUpload, fileToUpload.name);
    formData.append('FolderDir', 'Uploads');
    this.tmpFormData = formData;

    // display locally
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.tmpImage = event.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);
  }
  
  deletePhoto()
  {
    this.tmpImage = null;
    this.tmpFormData = null;
  }

  sendPhoto()
  {
    this.formLoaded = false;
    this.apiService.uploadPhoto(this.tmpFormData)
    .subscribe(
      (response: any) => 
      {
        this.tmpImage = environment.apiUrl+"/Uploads/Uploads/"+response['framedImage']+"?version=1";
        this.detections = JSON.parse(response["details"])['detections'];
        console.log(this.detections);
      },
      error => 
      {
        console.log(error);
      },
      () => 
      {
        this.formLoaded = true;
      }
    );
  }

  getName(detection)
  {
    return detection["category"] + ' ' + this.round(detection.score*100,2) + '%';
  }

  round(num: number, decimalPlaces: number): number {
    const factor = Math.pow(10, decimalPlaces);
    return Math.round(num * factor) / factor;
  }

  getTapaz(name)
  {
    return "https://tap.az/elanlar?keywords="+name;
  }

  getEbay(name)
  {
    return "https://www.ebay.com/sch/i.html?_nkw="+name;
  }

  getAmazon(name)
  {
    return "https://www.amazon.com/s?k="+name;
  }
}

