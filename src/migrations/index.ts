import * as migration_20251019_172658 from './20251019_172658'
import * as migration_20251019_175310_seed_user from './20251019_175310_seed_user'
import * as migration_20251019_180745_seed_services from './20251019_180745_seed_services'
import * as migration_20251019_234238_team_members from './20251019_234238_team_members'

export const migrations = [
  {
    up: migration_20251019_172658.up,
    down: migration_20251019_172658.down,
    name: '20251019_172658',
  },
  {
    up: migration_20251019_175310_seed_user.up,
    down: migration_20251019_175310_seed_user.down,
    name: '20251019_175310_seed_user',
  },
  {
    up: migration_20251019_180745_seed_services.up,
    down: migration_20251019_180745_seed_services.down,
    name: '20251019_180745_seed_services',
  },
  {
    up: migration_20251019_234238_team_members.up,
    down: migration_20251019_234238_team_members.down,
    name: '20251019_234238_team_members',
  },
]
