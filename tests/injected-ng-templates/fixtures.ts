import { Component, ContentChild, Input, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
    selector: 'custom-injection',
    template: `
    <div *ngIf="items && items.length">
      <ng-template ngFor [ngForOf]="items" [ngForTemplate]="injectedBlock"></ng-template>
    </div>
    <div #child></div>
  `,
    standalone: false
})
export class CustomInjectionComponent<T> {
  @ContentChild('block', {} as never) public injectedBlock?: TemplateRef<any>;
  @Input() public items?: T[];
  @ViewChild('child', {} as never) public ownChild?: ViewContainerRef;
}
