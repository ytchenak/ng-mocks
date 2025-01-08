import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'pure',
    pure: true,
    standalone: false
})
export class PurePipe implements PipeTransform {
  public readonly name = 'PurePipe';
  public value: any;

  public transform(value: string): string {
    this.value = value;

    return `${this.name}:${value}`;
  }
}

@Pipe({
    name: 'impure',
    pure: false,
    standalone: false
})
export class ImpurePipe implements PipeTransform {
  public readonly name = 'ImpurePipe';
  public value: any;

  public transform(value: string): string {
    this.value = value;

    return `${this.name}:${value}`;
  }
}
