const program = require('commander');
const Model = require('./db/models/Test');
const jsDiff = require('diff');
const chalk = require('chalk');

program
  .option('--n, --create', 'Create a row.')
  .option('--c, --count', 'Count rows.')
  .option('--l, --list', 'List rows.')
  .option('--a, --all', 'List all rows.')
  .option('--nodiff', 'No diff')
  .parse(process.argv);

// original data is string
const MODEL_TEMPLATE = {
  first: '245890903133257730',
  second: '190067261967433730',
  third: '481267216386621440'
};

console.log(`Expected output:
 - first: ${MODEL_TEMPLATE.first}
 - second: ${MODEL_TEMPLATE.second}
 - third: ${MODEL_TEMPLATE.third}`);

const first = parseInt(MODEL_TEMPLATE.first, 10);
const second = parseInt(MODEL_TEMPLATE.second, 10);
const third = parseInt(MODEL_TEMPLATE.third, 10);

function getDiffString(val1, val2, noDiff) {
  if (noDiff) {
    return val2;
  }

  val1 = val1.toString();
  val2 = val2.toString();

  const diff = jsDiff.diffChars(val1, val2);

  let output = '';
  diff.forEach(part => {
    if (part.added) {
      return output += chalk.green(chalk.strikethrough(part.value));
    }

    if (part.removed) {
      return output += `(${chalk.red(part.value)})`;
    }

    return output += part.value;
  });

  return output;
}

function add() {
  return Model.create({ first, second, third })
    .then(function (value) {
      console.log('Created value: (it says it is that, but its not)');
      console.log(` - first: ${value.first}`);
      console.log(` - second: ${value.second}`);
      console.log(` - third: ${value.third}`);
      process.exit();
    })
    .catch(err => {
      throw new Error(err);
    });
}

function count() {
  return Model.count({ where: {
    first,
    second,
    third
  } })
    .then(ct => {
      console.log(ct);
      process.exit();
    })
    .catch(err => {
      throw new Error(err);
    });
}

function list() {
  return Model.findAll({ where: {
    first,
    second,
    third
  } })
    .then(values => {
      console.log('Values:');
      values.forEach(value => {
        console.log(` - first: ${value.first}`);
        console.log(` - second: ${value.second}`);
        console.log(` - third: ${value.third}`);
      });
    })
    .catch(err => {
      throw new Error(err);
    });
}

function listAll() {
  return Model.findAll()
    .then(values => {
      console.log('Values:');
      values.forEach(value => {
        console.log(` - first: ${getDiffString(first, value.first, program.nodiff)}`);
        console.log(` - second: ${getDiffString(second, value.second, program.nodiff)}`);
        console.log(` - third: ${getDiffString(third, value.third, program.nodiff)}`);
      });
    })
    .catch(err => {
      throw new Error(err);
    });
}

if (program.create) {
  return add();
}

if (program.count) {
  return count();
}

if (program.list) {
  return list();
}

if (program.all) {
  return listAll();
}
