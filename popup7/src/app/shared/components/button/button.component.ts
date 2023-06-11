import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() public label = '';
  @Input() public color = 'primary';
  @Input() public disabled = false;

  @Output() private customSubmit = new EventEmitter<void>();

  handleClick() {
    this.customSubmit.emit();
  }
}
