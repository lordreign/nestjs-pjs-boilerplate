import moment from 'moment';
import { DateFormatEnum } from 'src/common/enums/date-format.enum';

interface ToNumberOptions {
  default?: number;
  min?: number;
  max?: number;
}

export function toMoment(
  value: string,
  dateFormat: DateFormatEnum = DateFormatEnum.DASH_YYYYMMDD,
): moment.Moment {
  return moment(value, dateFormat);
}

export function toBoolean(value: string): boolean {
  value = value.toLowerCase();

  return value === 'true' || value === '1' ? true : false;
}

function checkProperNumber(value: number, opts: ToNumberOptions = {}) {
  let newValue = value;
  if (Number.isNaN(newValue)) {
    newValue = opts.default;
  }

  if (opts.min && newValue < opts.min) {
    newValue = opts.min;
  }
  if (opts.max && newValue > opts.max) {
    newValue = opts.max;
  }
  return newValue;
}

export function toInt(value: string, opts: ToNumberOptions = {}): number {
  const newValue: number = Number.parseInt(value || String(opts.default), 10);
  return checkProperNumber(newValue, opts);
}

export function toFloat(value: string, opts: ToNumberOptions = {}): number {
  const newValue: number = Number.parseFloat(value || String(opts.default));
  return checkProperNumber(newValue, opts);
}
