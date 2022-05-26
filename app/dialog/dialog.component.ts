import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validator, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  favoriteSeason:string="";
  freshness: string[] = ['Baked', 'Freshly Cut', 'Cooked', 'Display'];
  productForm!:FormGroup;
  actionBtn:string="save";
  constructor(private formbuilder:FormBuilder,
    private apiservice:ApiService,
    private dialogref:MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editdata:any )
    { }

  ngOnInit(): void {
    this.productForm = this.formbuilder.group({
      productName:['',Validators.required],
      category:['',Validators.required],
      freshness:['',Validators.required],
      price:['',Validators.required],
      comment:['',Validators.required],
      date:['',Validators.required]
    })
    if(this.editdata){
      this.actionBtn="Update"
      this.productForm.controls['productName'].setValue(this.editdata.productName);
      this.productForm.controls['category'].setValue(this.editdata.category);
      this.productForm.controls['freshness'].setValue(this.editdata.freshness);
      this.productForm.controls['price'].setValue(this.editdata.price);
      this.productForm.controls['comment'].setValue(this.editdata.comment);
      this.productForm.controls['date'].setValue(this.editdata.date);
    }
  }
  addProduct(){
    if(!this.editdata){
      if(this.productForm.valid){
        this.apiservice.postProduct(this.productForm.value)
        .subscribe({
          next:(res)=>{alert("Product added succesfully")
          this.productForm.reset()
          this.dialogref.close('save')},
          error:()=>{alert("error encoutered")}
        })
      }
    }
    else{
        this.updateProduct()
    }
    console.log(this.productForm.value)
  }
  updateProduct(){
    this.apiservice.putProduct(this.productForm.value,this.editdata.id)
    .subscribe(()=>{
      this.productForm.reset();
      this.dialogref.close("update")
    })
  }
}
