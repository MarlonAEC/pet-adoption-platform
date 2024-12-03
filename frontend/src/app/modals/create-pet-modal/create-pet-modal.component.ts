import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputComponent } from "../../components/input/input.component";
import { LineSelectorComponent } from "../../components/line-selector/line-selector.component";
import { TypographyComponent } from "../../components/typography/typography.component";
import { CheckboxComponent } from '../../components/checkbox/checkbox.component';
import { PetService } from '../../services/pet.service';
import { Pet } from '../../models/pet.model';

@Component({
  selector: 'app-create-pet-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, InputComponent, LineSelectorComponent, TypographyComponent, CheckboxComponent],
  templateUrl: './create-pet-modal.component.html',
  styleUrl: './create-pet-modal.component.css'
})
export class CreatePetModalComponent {
  name = new FormControl('', Validators.required);
  breed = new FormControl('', Validators.required);
  age = new FormControl('', Validators.required);
  weight = new FormControl('', Validators.required);
  color = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  background = new FormControl('', Validators.required);
  species = new FormControl('', Validators.required);
  address = new FormControl('', Validators.required);
  sex = new FormControl('', Validators.required);
  health = new FormControl('', Validators.required);
  value = new FormControl<number>(0, Validators.required);
  temperament_how_calmed = new FormControl<number>(0);
  temperament_how_social = new FormControl<number>(0);
  temperament_how_attention_seeking = new FormControl<number>(0);
  temperament_how_active = new FormControl<number>(0);
  temperament_how_loud = new FormControl<number>(0);
  needs_experienced_owner = new FormControl<boolean>(false);
  postal_code = new FormControl<string>('', Validators.required);
  _house_trained = new FormControl<boolean>(false);
  _declawed = new FormControl<boolean>(false);
  _good_with_kids = new FormControl<boolean>(false);
  _good_with_dogs = new FormControl<boolean>(false);
  _good_with_cats = new FormControl<boolean>(false);
  _spayed = new FormControl<boolean>(false);
  _vaccinated = new FormControl<boolean>(false);
  _wormed = new FormControl<boolean>(false);
  favourite_things = new FormControl<string[]>([]);
  requirements_for_new_home = new FormControl<string[]>([]);

  form: FormGroup;
  step: number = 0;
  petId: number | null = null;
  selectedImages: File[] = [];
  imagePreviews: string[] = [];
  @Input() newlyCreatedPet: Pet | null = null;
  @Output() handleSubmit = new EventEmitter();
  @Output() handleClose = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if(changes['newlyCreatedPet']){
      if(this.newlyCreatedPet){
        this.setPetId(this.newlyCreatedPet.id);
      }
    }
  }

  setStep(index: number) {
    this.step = index % 2;
  }

  setPetId(id: number) {
    this.petId = id;
  }

  onFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if(target.files) {
      this.selectedImages = Array.from(target.files);
      this.imagePreviews = [];

      for(const file of this.selectedImages) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if(e.target && typeof e.target.result === 'string') {
            this.imagePreviews.push(e.target.result);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }

  removeImage(index: number, fileInput: HTMLInputElement): void {
    this.selectedImages.splice(index, 1);
    this.imagePreviews.splice(index, 1);
    // Create a new DataTransfer object
    const dataTransfer = new DataTransfer();
    this.selectedImages.forEach(file => dataTransfer.items.add(file));

    // Update the file input with the new FileList
    fileInput.files = dataTransfer.files;
  }

  handleSubmitPetImages() {
    if (this.selectedImages.length != 0 && this.petId) {
      const formData = new FormData();
      this.selectedImages.forEach(file => formData.append('images', file));
      this.petService.addImagesToPet(this.petId, formData).subscribe({
        next: (response) => {
          console.log('Images uploaded successfully', response);
        },
        error: (error) => {
          console.error('Failed to upload images', error);
        }
      });
    } else {
      console.error('No images selected or petId not set');
    }
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly petService: PetService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      breed: this.breed,
      age: this.age,
      weight: this.weight,
      color: this.color,
      description: this.description,
      background: this.background,
      species: this.species,
      address: this.address,
      sex: this.sex,
      health: this.health,
      value: this.value,
      'temperament_how_calmed': this.temperament_how_calmed,
      'temperament_how_social': this.temperament_how_social,
      'temperament_how_attention_seeking': this.temperament_how_attention_seeking,
      'temperament_how_active': this.temperament_how_active,
      'temperament_how_loud': this.temperament_how_loud,
      needs_experienced_owner: this.needs_experienced_owner,
      postal_code: this.postal_code,
      _house_trained: this._house_trained,
      _declawed: this._declawed,
      _good_with_kids: this._good_with_kids,
      _good_with_dogs: this._good_with_dogs,
      _good_with_cats: this._good_with_cats,
      _spayed: this._spayed,
      _vaccinated: this._vaccinated,
      _wormed: this._wormed,
      favourite_things: this.favourite_things,
      requirements_for_new_home: this.requirements_for_new_home
    });
  }

  submit() {
    if(this.form.valid){
      this.handleSubmit.emit(this.form.value);
      this.setStep(this.step + 1);
    }
    else {
      this.form.markAllAsTouched();
    }
  }

  close() {
    this.handleClose.emit();
  }
}
