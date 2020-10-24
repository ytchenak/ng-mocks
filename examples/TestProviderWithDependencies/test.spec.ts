import { Injectable, NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MockBuilder, MockInstance, MockReset } from 'ng-mocks';

// Dependency 1
@Injectable()
class Service1 {
  protected name = 'service1';

  trigger(): string {
    return this.name;
  }
}
// Dependency 2
@Injectable()
class Service2 {
  protected name = 'service2';

  trigger(): string {
    return this.name;
  }
}

// A simple service, it might have contained more logic,
// but it is redundant for the test demonstration.
@Injectable()
class TargetService {
  public readonly value1: string;
  public readonly value2: string;

  constructor(dep1: Service1, dep2: Service2) {
    this.value1 = dep1.trigger();
    this.value2 = dep2.trigger();
  }
}

// A module that provides all services
@NgModule({
  providers: [Service1, Service2, TargetService],
})
class TargetModule {}

describe('TestProviderWithDependencies', () => {
  // Because we want to test the service, we pass it as the first
  // parameter of MockBuilder. To correctly satisfy its dependencies
  // we need to pass its module as the second parameter.
  beforeEach(() => MockBuilder(TargetService, TargetModule));

  beforeAll(() => {
    // Let's customize a bit behavior of the mocked copy of Service1.
    MockInstance(Service1, {
      init: instance => {
        instance.trigger = () => 'mock1';
      },
    });
    // Let's customize a bit behavior of the mocked copy of Service2.
    MockInstance(Service2, {
      init: instance => {
        instance.trigger = () => 'mock2';
      },
    });
  });

  afterAll(MockReset);

  it('creates TargetService', () => {
    // Creates an instance only if all dependencies are present.
    const service = TestBed.get(TargetService);

    // Let's assert behavior.
    expect(service.value1).toEqual('mock1');
    expect(service.value2).toEqual('mock2');
  });
});
