import { InjectionToken, Injector } from '@angular/core';

import { AbstractType, Type } from '../common/core.types';
import ngMocksUniverse from '../common/ng-mocks-universe';

/**
 * @see https://github.com/ike18t/ng-mocks#mockinstance
 */
export function MockInstance<T>(
  declaration: InjectionToken<T>,
  init?: (instance: T | undefined, injector: Injector | undefined) => Partial<T>,
): void;

/**
 * @see https://github.com/ike18t/ng-mocks#mockinstance
 */
export function MockInstance<T>(
  declaration: InjectionToken<T>,
  config?: {
    init?: (instance: T | undefined, injector: Injector | undefined) => Partial<T>;
  },
): void;

/**
 * @see https://github.com/ike18t/ng-mocks#mockinstance
 */
export function MockInstance<T>(
  declaration: Type<T> | AbstractType<T>,
  init?: (instance: T, injector: Injector | undefined) => void | Partial<T>,
): void;

/**
 * @see https://github.com/ike18t/ng-mocks#mockinstance
 */
export function MockInstance<T>(
  declaration: Type<T> | AbstractType<T>,
  config?: {
    init?: (instance: T, injector: Injector | undefined) => void | Partial<T>;
  },
): void;

export function MockInstance<T>(declaration: Type<T> | AbstractType<T> | InjectionToken<T>, data?: any) {
  const config = typeof data === 'function' ? { init: data } : data;
  const universeConfig = ngMocksUniverse.config.has(declaration) ? ngMocksUniverse.config.get(declaration) : {};
  if (config) {
    ngMocksUniverse.config.set(declaration, {
      ...universeConfig,
      ...config,
    });
  } else {
    ngMocksUniverse.config.set(declaration, {
      ...universeConfig,
      init: undefined,
    });
  }
}

export function MockReset() {
  ngMocksUniverse.config.clear();
}
