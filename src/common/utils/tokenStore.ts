/**
 * This file is used to store acces token in memory
 *
 * @author Richard Nguyen <richard.ng0616@gmail.com>
 */

let token: string;

export const setAccessToken = (t: string): void => {
  token = t;
};

export const getAccessToken = (): string => token;
