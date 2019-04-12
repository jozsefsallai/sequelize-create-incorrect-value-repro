# sequelize-create-incorrect-value-repro

## Environment

- Node: v10.15.2
- npm: 6.4.1
- Yarn: 1.13.0
- OS: Windows 10 / Debian Sid
- MySQL: Ver 15.1 Distrib 10.3.9-MariaDB (Windows), Ver 14.14 Distrib 5.7.25 (Debian)

## The Problem

When a model has a BIGINT column (haven't tested with other types), sometimes the inserted values are altered, not identical to the ones passed to the ORM. After creation, the ORM registers the values correctly, but the values in the database are different (usually the last few digits). Length is ok.

**Note that this works correctly on older versions (I have used v4.43.0 in the past). After upgrading to v5.3.0, the issue has appeared.**

## Prerequisites

A MySQL user called "joe" identified by password "joe".

## Reproduction Steps

**Clone the repo**

```sh
git clone git@github.com:jozsefsallai/sequelize-create-incorrect-value-repro
cd sequelize-create-incorrect-value-repro
```

**Install deps**

```sh
npm i -g yarn
yarn
```

**Create the db and run the migration:**

```sh
yarn create:db
yarn migrate
```

**Create a value:**

```sh
yarn create:value
```

In this step the output is correct, so the ORM knows the correct values. The issue happens when writing to the db.

**Count the values that match the ones added previously:**

```sh
yarn count
```

Expected output: 1<br>Actual output: 0

*or*

**List the values that match the ones added previously:**

```sh
yarn list:values
```

Expected output: the previously added record<br>Actual output: nothing.

**List all values that were added:**

```sh
yarn list:all-values

Expected output:
 - first: 245890903133257730
 - second: 190067261967433730
 - third: 481267216386621440
Executing (default): SELECT `id`, `createdAt`, `updatedAt`, `first`, `second`, `third` FROM `test` AS `test`; Values:
 - first: 2458909031332577(30)28
 - second: 1900672619674337(30)28
 - third: 481267216386621440
 - first: 2458909031332577(30)28
 - second: 1900672619674337(30)28
 - third: 481267216386621440
```

diff is added to make it easier to tell the difference.

Instead of **30**, the last two digits are **28** in the database.
