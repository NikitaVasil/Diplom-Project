# Команды Prisma

- Команда генерирует пользовательскую библиотеку на основе данных, записанных в файле schema.prisma
  `npx prisma generate`

- Команда `migrate dev` генерирует и применяет миграции к БД находящейся в указннаом пути:
  `npx prisma migrate dev --schema=./src/conf/DB/schema.prisma`


## Usage

  $ prisma migrate [command] [options]

Commands for development

         dev   Create a migration from changes in Prisma schema, apply it to the database
               trigger generators (e.g. Prisma Client)
       reset   Reset your database and apply all migrations, all data will be lost

Commands for production/staging

      deploy   Apply pending migrations to the database
      status   Check the status of your database migrations
     resolve   Resolve issues with database migrations, i.e. baseline, failed migration, hotfix

Command for any stage

        diff   Compare the database schema from two arbitrary sources

Options

  ```
    -h, --help   Display this help message
    --schema   Custom path to your Prisma schema
  ```