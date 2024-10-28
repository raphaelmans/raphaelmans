import * as migration_20241028_195515_initial from './20241028_195515_initial';
import * as migration_20241028_213035_blog_html from './20241028_213035_blog_html';

export const migrations = [
  {
    up: migration_20241028_195515_initial.up,
    down: migration_20241028_195515_initial.down,
    name: '20241028_195515_initial',
  },
  {
    up: migration_20241028_213035_blog_html.up,
    down: migration_20241028_213035_blog_html.down,
    name: '20241028_213035_blog_html'
  },
];
