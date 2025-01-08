import {
  Component,
  Directive,
  Injectable,
  InjectionToken,
  NgModule,
  Pipe,
  PipeTransform,
} from '@angular/core';

import mockHelperConsoleThrow from '../mock-helper/mock-helper.console-throw';
import mockHelperGet from '../mock-helper/mock-helper.get';

import { MockBuilder } from './mock-builder';

@Injectable()
class TargetService {}

const TARGET_TOKEN = new InjectionToken('TARGET_TOKEN');

@Pipe({
    name: 'target',
    standalone: false
})
class TargetPipe implements PipeTransform {
  protected name = 'pipe:';

  public transform(value: string): any {
    return `${this.name}${value}`;
  }
}

@Component({
    selector: 'target',
    template: 'target',
    standalone: false
})
class TargetComponent {}

@Directive({
    selector: 'target',
    standalone: false
})
class TargetDirective {}

@NgModule({
  declarations: [TargetComponent, TargetDirective, TargetPipe],
})
class TargetModule {}

describe('MockBuilderPromise', () => {
  mockHelperConsoleThrow();

  it('skips dependencies in kept providers', async () => {
    await MockBuilder().keep(TargetService, { dependency: true });
    expect(() => mockHelperGet(TargetService)).toThrowError(
      /Cannot find an instance/,
    );
  });

  it('adds non dependencies in kept providers', async () => {
    await MockBuilder().keep(TargetService);
    expect(mockHelperGet(TargetService)).toBeTruthy();
  });

  it('skips dependencies in mock providers', async () => {
    await MockBuilder().mock(TargetService, TargetService, {
      dependency: true,
    });
    expect(() => mockHelperGet(TargetService)).toThrowError(
      /Cannot find an instance/,
    );
  });

  it('adds non dependencies in mock providers', async () => {
    await MockBuilder().mock(TargetService);
    expect(mockHelperGet(TargetService)).toBeTruthy();
  });

  it('respects several kept overloads', async () => {
    await MockBuilder()
      .keep({
        ngModule: TargetModule,
        providers: [
          {
            multi: true,
            provide: TARGET_TOKEN,
            useValue: 1,
          },
        ],
      })
      .keep({
        ngModule: TargetModule,
        providers: [
          {
            multi: true,
            provide: TARGET_TOKEN,
            useValue: 2,
          },
        ],
      });
    expect(mockHelperGet(TARGET_TOKEN)).toEqual([1, 2]);
  });

  it('respects several mock overloads', async () => {
    await MockBuilder()
      .mock({
        ngModule: TargetModule,
        providers: [
          {
            multi: true,
            provide: TARGET_TOKEN,
            useValue: 1,
          },
        ],
      })
      .mock({
        ngModule: TargetModule,
        providers: [
          {
            multi: true,
            provide: TARGET_TOKEN,
            useValue: 2,
          },
        ],
      });
    expect(() => mockHelperGet(TARGET_TOKEN)).toThrowError(
      /Cannot find an instance/,
    );
  });

  it('throws an error on a services replacement', () => {
    expect(() =>
      MockBuilder().replace(TargetModule, TargetService),
    ).toThrowError(/Cannot replace the declaration/);
    expect(() =>
      MockBuilder().replace(TargetService, TargetModule),
    ).toThrowError(/Cannot replace the declaration/);
  });
});
