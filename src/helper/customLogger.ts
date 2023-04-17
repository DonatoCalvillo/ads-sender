import { Logger } from '@nestjs/common';

const STRING_LENGTH = 70;

export enum ValidLogTypes {
  log = 'log',
  warning = 'warning',
  error = 'error',
}

export enum ValidLogFormat {
  center = 'center',
  right = 'right',
}

export const customLogger = (
  sentence: string = '',
  type: ValidLogTypes = ValidLogTypes.log,
  format: ValidLogFormat = ValidLogFormat.center,
) => {
  let final_log: string = format === ValidLogFormat.center ? '' : sentence;

  if (format === ValidLogFormat.center) {
    const sentence_length: number = sentence.length + 2;

    const right_space: number = Math.ceil(
      (STRING_LENGTH - sentence_length) / 2,
    );

    const left_space = Math.floor((STRING_LENGTH - sentence_length) / 2);

    for (var i = 0; i < right_space; i++) {
      final_log += '=';
    }

    final_log += sentence ? ` ${sentence} ` : `==`;

    for (let i = 0; i < left_space; i++) {
      final_log += '=';
    }
  }

  switch (type) {
    case ValidLogTypes.log:
      Logger.log(final_log);
      break;
    case ValidLogTypes.warning:
      Logger.warn(final_log);
      break;
    case ValidLogTypes.error:
      Logger.error(final_log);
      break;
    default:
      break;
  }
};
