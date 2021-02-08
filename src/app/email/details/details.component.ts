import { Component, OnInit } from '@angular/core';
import { EmailsService } from 'src/app/emails.service';
import { EmailHome } from '../email-home';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  // email!: EmailHome;

  id!:number;
  constructor(
    public email:EmailHome,
    public service:EmailsService,
    private router: Router,
    private activatedRoute : ActivatedRoute
  ) { }

  ngOnInit(): void {
    const par = this.activatedRoute.snapshot.paramMap.get('id');
    // this.id = this.activatedRoute.snapshot.paramMap.get('id' as any);
    this.service.findByID(par as any).subscribe(response => {
      this.email = response;
      console.log(console);
    })
    
  }

}
