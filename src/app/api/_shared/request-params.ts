import { z } from 'zod';

/***
 * Parse FormData into PHP-style $_POST parsing:
 *
 * 1. params submitted on input[name="something[very][0][deep]"] becomes an object like { something: { very: [ deep: "..."] } }.
 * 2. converts input[type=number] into actual numbers
 *
 ***/
export function getRequestParams(formData: FormData): any {
  const reducer = function (object: any, pair: any) {
    const keys = pair[0].replace(/\]/g, '').split('[');
    const key = keys[0];
    let value = pair[1];

    if (keys.length > 1) {
      let i, x, segment;
      const last = value;
      const type = isNaN(keys[1]) ? {} : [];

      value = segment = object[key] || type;

      for (i = 1; i < keys.length; i++) {
        x = keys[i];

        if (i == keys.length - 1) {
          if (Array.isArray(segment)) {
            segment.push(last);
          } else {
            segment[x] = last;
          }
        } else if (segment[x] == undefined) {
          segment[x] = isNaN(keys[i + 1]) ? {} : [];
        }

        segment = segment[x];
      }
    }

    // Transform values into integers otherwise number inputs
    // will be sent as a string to the server side.
    if (/^-?\d+\.?\d*$/.test(`${value}`)) {
      object[key] = Number(value);
    } else {
      object[key] = value;
    }

    return object;
  };

  return Array.from(formData).reduce(reducer, {});
}
