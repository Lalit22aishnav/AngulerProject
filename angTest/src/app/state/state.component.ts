import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';


interface IState {
  Id: number,
  StateCode: string,
  StateName: string
}

@Component({
  selector: 'app-state',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './state.component.html',
  styleUrl: './state.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class StateComponent {

  stateForm: FormGroup;
  stateFieldProperty: Record<string, any> = {
    stateCodeMinlen: 3,
    stateNameMinlen: 3,
    haveError: ""
  };
  AddEdit: boolean = false;
  stateObj: IState[] = [{
    Id: 1,
    StateCode: "Raj",
    StateName: "Rajasthan"
  }];

  constructor(
    private fb: FormBuilder,
  ) {
    this.stateForm = this.fb.group({
      stateId: [],
      stateCode: ['', [
        Validators.required,
        Validators.minLength(this.stateFieldProperty["stateCodeMinlen"]),
      ]
      ],
      stateName: ['', [
        Validators.required,
        Validators.minLength(this.stateFieldProperty["stateNameMinlen"]),
      ]
      ]
    });
  }


  stateSave() {

    if (this.stateForm.valid) {

      let _stateId = this.stateForm.get("stateId")?.value;
      let _stateCode = this.stateForm.get("stateCode")?.value;
      let _stateName = this.stateForm.get("stateName")?.value;

      this.stateObj.forEach((val) => {
        if (_stateCode == val.StateCode || _stateName == val.StateName) {
          this.stateFieldProperty["hasError"] = "Cannot Add/Edit StateCode Or StateName Twice"
        }
      });

      if (!this.AddEdit) {
        this.stateObj.push({
          Id: this.stateObj.length + 1,
          StateCode: _stateCode,
          StateName: _stateName
        })
      } else {
        const item = this.stateObj.find((state) => state.Id === _stateId);
        if (item) {
          item.StateCode = _stateCode;
          item.StateName = _stateName;
        }
        this.AddEdit = false;
      }
      this.stateForm.reset();
    }
  }


  stateEdit(stateO: IState) {
    this.stateForm.setValue({
      stateId: stateO.Id,
      stateCode: stateO.StateCode,
      stateName: stateO.StateName
    })
    this.AddEdit = true;

  }

  stateDelete(stateO: IState) {
    this.stateObj.forEach((val, index) => {
      if (val.Id == stateO.Id) {
        this.stateObj.splice(index, 1);
        return;
      }
    })
  }
}
