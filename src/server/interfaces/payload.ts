/**
 * Payload interface
 *
 * @author Richard Nguyen <richard.ng0616@gmail.com>
 */
import User from "@server/entities/User";

export interface Payload {
  message: string;
  success: boolean;
  payload?: Record<string, unknown> | User;
}
