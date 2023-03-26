import { Component, OnInit } from '@angular/core'
import { ApiService } from 'app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  public contentHeader: object;
  tmpImage: any = null;
  tmpFormData: any = null;

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {
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
    this.apiService.uploadPhoto(this.tmpFormData)
    .subscribe(
      (response: any) => 
      {
        console.log(response)
      },
      error => 
      {
        console.log(error);
      },
      () => 
      {
        
      }
    );
  }
}
