import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatChipInputEvent } from "@angular/material/chips";
import { MatDialog } from "@angular/material/dialog";
import { Observable, Subscription } from "rxjs";
import { DialogComponent } from "src/app/shared/components/dialog/dialog.component";
import { DialogService } from "src/app/shared/services/dialog.service";
import { ENTER, COMMA } from "@angular/cdk/keycodes";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnInit, OnDestroy {
  @ViewChild("input") input: ElementRef<HTMLInputElement> | undefined =
    undefined;

  public newEmails: Observable<string[]>;
  public existingEmailsForDisplay: Observable<string[]>;
  public duplicateEmails: Observable<string[]>;
  public form: FormGroup;
  public emailChips: string[] = [];
  public addOnBlur = true;
  public readonly separatorKeysCodes = [ENTER, COMMA];

  private dialogSubscription: Subscription;
  private emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  constructor(
    private fb: FormBuilder,
    private dialogService: DialogService,
    public dialog: MatDialog
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.initialize();

    this.dialogSubscription = this.dialogService.showDialog$.subscribe(
      (data) => {
        if (data) {
          this.openDialog();
        } else {
          this.dialogService.writeToExistingEmails(this.emailsField.value);
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.dialogSubscription) {
      this.dialogSubscription.unsubscribe();
    }
  }

  get emailsField() {
    return this.form.get("emailsField");
  }

  handleSubmitClick() {
    this.emailsField.setValue(this.emailChips);
    this.dialogService.handleEmailsArray(this.emailsField.value);

    this.clear();
    this.form.reset();
  }

  add(event: MatChipInputEvent): void {
    const value = event.value.trim();
    // Add email
    if (value && this.validateEmail(value)) {
      this.emailChips.push(value);
    }
    // Clear the input value
    event.input.value = "";
  }

  remove(email: string): void {
    const index = this.emailChips.indexOf(email);

    if (index >= 0) {
      this.emailChips.splice(index, 1);
    }
  }

  private initialize(): void {
    this.newEmails = this.dialogService.newEmails$;
    this.existingEmailsForDisplay = this.dialogService.existingForDisplay$;
    this.duplicateEmails = this.dialogService.duplicates$;
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      emailsField: [[]],
    });
  }
  private validateEmail(email: string): boolean {
    return this.emailPattern.test(email);
  }

  private openDialog(): void {
    this.dialog.open(DialogComponent, {
      width: "70%",
    });
  }

  private clear() {
    this.emailChips = [];

    if (this.input) {
      this.input.nativeElement.value = "";
    }
  }
}
