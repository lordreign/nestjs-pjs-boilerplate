import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Board } from '../../entities/board.entity';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Board)
      .values([
        { title: 'Timber', content: 'Saw' },
        { title: 'Phantom', content: 'Lancer' },
      ])
      .execute();
  }
}
