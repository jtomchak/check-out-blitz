[![Blitz.js](https://raw.githubusercontent.com/blitz-js/art/master/github-cover-photo.png)](https://blitzjs.com)

This is a [Blitz.js](https://github.com/blitz-js/blitz) app.

# **check-out-blitz**

## Getting Started

1. First run migration for a new instance of your local database. (SQLite in this case)
   `blitz prisma migrate dev`

```sh

❯ blitz prisma migrate dev
Environment variables loaded from .env
Prisma schema loaded from db/schema.prisma
Datasource "db": SQLite database "db.sqlite" at "file:./db.sqlite"

SQLite database db.sqlite created at file:./db.sqlite

Applying migration `20211201230330_initial_migration`
Applying migration `20211203223939_add_question_and_choice`
Applying migration `20211203230238_questions_version`
Applying migration `20211203232800_questions_versioned`

The following migration(s) have been applied:

migrations/
  └─ 20211201230330_initial_migration/
    └─ migration.sql
  └─ 20211203223939_add_question_and_choice/
    └─ migration.sql
  └─ 20211203230238_questions_version/
    └─ migration.sql
  └─ 20211203232800_questions_versioned/
    └─ migration.sql

Your database is now in sync with your schema.

✔ Generated Prisma Client (3.6.0 | library) to ./node_modules/@prisma/client in 92ms

```

1. Run your app in the development mode.

```
blitz dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

1. Create an account

1. Navigate to '/questions'

1. Create several questions with multiple choices.

1. Edit those Choices will generate a new version of that question.

1. `yarn studio` will load the prisma studio at http://localhost:5555 and let you browse the data tables

### Resources

- [Version Normal Form or Temporal DB Design](https://www.dropbox.com/s/8hnkzet6fueblz7/TemporalDBDesign.pdf?dl=0)
- [Bi-temporal rdbms 2014](https://www.slideshare.net/TommCarr/bitemporal-rdbms-2014)
