import * as migration_20241028_195515_initial from './20241028_195515_initial';

export const migrations = [
  {
    up: migration_20241028_195515_initial.up,
    down: migration_20241028_195515_initial.down,
    name: '20241028_195515_initial'
  },
];
