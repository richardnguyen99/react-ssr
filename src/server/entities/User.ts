/**
 * Define User entity to map to a database collection
 *
 * @author Richard Nguyen <richard.ng0616@gmail.com>
 */
import { Entity, BaseEntity, ObjectID, ObjectIdColumn, Column } from "typeorm";

@Entity("User")
class User extends BaseEntity {
  @ObjectIdColumn()
  id!: ObjectID;

  @Column("text")
  firstname!: string;

  @Column("text")
  lastname!: string;

  @Column("text")
  username!: string;

  @Column("text")
  password!: string;

  @Column("text")
  email!: string;

  @Column("time with time zone")
  created!: string;

  @Column("time with time zone")
  modified!: string;

  @Column("boolean")
  isActive!: boolean;

  @Column("boolean")
  isAdmin!: boolean;
}

export default User;
