import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { UserProvidersEnum } from 'src/common/enums/user-providers.enum';
import { UserStatusEnum } from 'src/common/enums/user-status.enum';
import { IsEnum } from 'class-validator';
import { EntityHelper } from 'src/utils/helpers/entity.helper';

@Entity()
export class User extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, comment: '이메일' })
  email: string | null;

  @Column({ nullable: true, comment: '비밀번호' })
  password?: string | null;

  public previousPassword: string;

  @AfterLoad()
  public loadPreviousPassword(): void {
    this.previousPassword = this.password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword() {
    if (this.previousPassword !== this.password && this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  @Index()
  @Column({ default: UserProvidersEnum.email, comment: '제공업체' })
  @IsEnum(UserProvidersEnum)
  provider: UserProvidersEnum;

  @Index()
  @Column({ name: 'social_id', default: '', comment: '소셜 아이디' })
  socialId: string;

  @Column({ nullable: true, comment: '이름' })
  name?: string | null;

  @Index()
  @Column({ default: UserStatusEnum.active, comment: '회원상태' })
  @IsEnum(UserStatusEnum)
  status: UserStatusEnum;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}
