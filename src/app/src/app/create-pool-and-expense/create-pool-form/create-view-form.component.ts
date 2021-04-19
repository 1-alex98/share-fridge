import {Component, OnInit, TemplateRef} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PoolService} from "../../communication/pool.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PoolClass} from "../../communication/pool-class";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: 'app-create-view-form',
  templateUrl: './create-view-form.component.html',
  styleUrls: ['./create-view-form.component.css']
})
export class CreateViewFormComponent implements OnInit {
  poolForm= new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    description: new FormControl(''),
  });
  private inviteUrl: string= "/app/pool/invite?token=";
  pool: PoolClass;
  tokenUrl: string;
  tokenControl= new FormControl();
  copied: boolean;

  constructor(private poolService: PoolService, private router:Router, private route:ActivatedRoute, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.route.params.subscribe(value => {
      let poolId = value["id"];
      if(!poolId) return;
      this.poolService.getMyPools().subscribe(value1 => {
        let poolClass = value1.find(value2 => value2.id = poolId);
        if(! poolClass){
          alert("No such pool");
        }
        this.pool = poolClass;
        this.poolForm.patchValue(poolClass);
      })
    })
  }

  onSubmit() {
    this.poolService.createPool(this.poolForm.getRawValue())
      .subscribe(id=>{
        this.router.navigate(["/pool/view/"+id])
      })
  }

  get name() { return this.poolForm.get('name'); }

  generateInvite(content) {
    this.poolService.generateInvite(this.pool.id)
      .subscribe(token => {
        this.copied = false;
        this.tokenUrl = window.location.origin + this.inviteUrl + encodeURI(token);
        this.tokenControl.setValue(this.tokenUrl);
        this.openModal(content);
      })
  }

  toClipBoard() {
    navigator.clipboard.writeText(this.tokenUrl).then(finished => this.copied = true);
  }

  openModal(content){
    this.modalService.open(content,  {ariaLabelledBy: 'modal-basic-title'});
  }
}
