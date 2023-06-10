import { AfterViewInit, Directive, ElementRef, Renderer2 } from "@angular/core";

@Directive({
  selector: "[appCloseDialog]",
})
export class CloseDialogDirective implements AfterViewInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    const element = this.el.nativeElement;
    this.renderer.setAttribute(element, "mat-dialog-close", "");
  }
}
