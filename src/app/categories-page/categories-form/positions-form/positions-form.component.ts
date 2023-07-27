import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IPosition } from 'src/app/shared/interfaces';
import { PositionsService } from 'src/app/shared/services/positions.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MaterialInstance, MaterialService } from 'src/app/shared/material.service';

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.scss']
})
export class PositionsFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input('categoryId') categoryId!: string;
  @ViewChild('modal') modalRef!: ElementRef;
  positions: IPosition[] = [];
  loading = false;
  positionId!: string | undefined | null;
  modal!: MaterialInstance | any;
  form!: FormGroup;
  constructor(private positinosService: PositionsService) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      cost: new FormControl(1, [Validators.required, Validators.min(1)])
    });
    this.loading = true;
    this.positinosService.fetch(this.categoryId).subscribe(positions => {
      this.positions = positions;
      this.loading = false;
    });
  }
  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef);
  }
  onSelectPosition(position: IPosition) {
    this.positionId = position._id;
    this.form.patchValue({
      name: position.name,
      cost: position.cost
    });
    this.modal.open();
    MaterialService.updateTextInputes();
  }
  onAddPosition() {
    this.positionId = null;
    this.form.reset({
      name: null,
      cost: 1
    });
    this.modal.open();
    MaterialService.updateTextInputes();
  }
  onCancel() {
    this.modal.close();
  }
  onDeletePosition(event: Event, position: IPosition) {
    event.stopPropagation();
    const decision = window.confirm(`Видалити позицію ${position.name} ?`);
    if (decision) {
      this.positinosService.delete(position).subscribe((response) => {
        const idx = this.positions.findIndex(p => p._id === position._id);
        this.positions.splice(idx, 1);
        MaterialService.toast(response.message);
      }, error => MaterialService.toast(error.error.message));
    }
  }
  onSubmit() {
    this.form.disable();
    const newPosition: IPosition = {
      name: this.form.value.name,
      cost: this.form.value.cost,
      category: this.categoryId
    };
    const completed = () => {
      this.modal.close();
      this.form.reset({ name: '', cost: 1 });
      this.form.enable();
    };
    if (this.positionId) {
      newPosition._id = this.positionId;
      this.positinosService.update(newPosition).subscribe(position => {
        const idx = this.positions.findIndex(p => p._id === position._id);
        this.positions[idx] = position;
        MaterialService.toast('Позиція оновлена');
      }, error => MaterialService.toast(error.error.message),
        completed
      );
    } else {
      this.positinosService.create(newPosition).subscribe(position => {
        MaterialService.toast('Позиція створена');
        this.positions.push(position);
      }, error => MaterialService.toast(error.error.message),
        completed
      );
    }
  }
  ngOnDestroy(): void {
    this.modal.destroy();
  }
}
