import { Component } from '@angular/core';

@Component({
    selector: 'child-component',
    template: 'some template',
    standalone: false
})
export class ChildComponent {
  public performAction(s: string) {
    return s ? this : this;
  }
}
