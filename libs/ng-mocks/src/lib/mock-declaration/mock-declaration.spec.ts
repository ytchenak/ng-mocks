import {
  Component,
  Directive,
  Pipe,
  PipeTransform,
} from '@angular/core';

import {
  MockDeclaration,
  MockDeclarations,
} from './mock-declaration';

@Component({
    selector: 'empty-template-container',
    template: '',
    standalone: false
})
class TargetComponent {}

@Directive({
    selector: '[target]',
    standalone: false
})
class TargetDirective {}

@Pipe({
    name: 'target',
    standalone: false
})
class TargetPipe implements PipeTransform {
  protected name = 'target';

  public transform(value: any): string {
    return `${this.name}${value}`;
  }
}

class Target {
  public name = 'target';
}

describe('MockDeclaration', () => {
  it('should process a set correctly', () => {
    const mocks: any[] = MockDeclarations(
      TargetComponent,
      TargetDirective,
      TargetPipe,
    );
    expect(mocks.length).toEqual(3);
    expect(mocks[0].nameConstructor).toEqual(
      'MockMiddlewareComponentMockBase',
    );
    expect(mocks[1].nameConstructor).toEqual(
      'MockMiddlewareDirectiveMockBase',
    );
    expect(mocks[2].nameConstructor).toEqual('MockMiddlewareMock');
    expect(mocks[0].name).toEqual('MockOfTargetComponent');
    expect(mocks[1].name).toEqual('MockOfTargetDirective');
    expect(mocks[2].name).toEqual('MockOfTargetPipe');
  });

  it('should process components with an empty template correctly', () => {
    const mock: any = MockDeclaration(TargetComponent);
    expect(mock.nameConstructor).toEqual(
      'MockMiddlewareComponentMockBase',
    );
    expect(mock.name).toEqual('MockOfTargetComponent');
  });

  it('should process directives correctly', () => {
    const mock: any = MockDeclaration(TargetDirective);
    expect(mock.nameConstructor).toEqual(
      'MockMiddlewareDirectiveMockBase',
    );
    expect(mock.name).toEqual('MockOfTargetDirective');
  });

  it('should process pipes correctly', () => {
    const mock: any = MockDeclaration(TargetPipe);
    expect(mock.nameConstructor).toEqual('MockMiddlewareMock');
    expect(mock.name).toEqual('MockOfTargetPipe');
  });

  it('throws on unknown types', () => {
    expect(() => MockDeclaration(Target)).toThrowError(
      /MockDeclaration does not know how to mock Target/,
    );
  });

  it('throws on unknown types with their names', () => {
    expect(() => MockDeclaration({} as never)).toThrowError(
      'MockDeclaration does not know how to mock [object Object]',
    );
  });
});
