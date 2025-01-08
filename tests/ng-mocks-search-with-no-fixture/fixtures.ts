import { Component, Input, NgModule } from '@angular/core';

@Component({
    selector: 'target-ng-mocks-search-with-no-fixture',
    template: '{{ target }}',
    standalone: false
})
export class TargetComponent {
  @Input() public readonly target = '';
}

@Component({
    selector: 'missed',
    template: 'missed',
    standalone: false
})
export class MissedComponent {}

@Component({
    selector: 'test',
    template: '<target-ng-mocks-search-with-no-fixture target="1"></target-ng-mocks-search-with-no-fixture><target-ng-mocks-search-with-no-fixture target="2"></target-ng-mocks-search-with-no-fixture>',
    standalone: false
})
export class TestComponent {}

@NgModule({
  declarations: [TargetComponent, MissedComponent, TestComponent],
})
export class TargetModule {}
