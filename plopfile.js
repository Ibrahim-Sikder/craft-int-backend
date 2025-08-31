/* eslint-disable no-undef */
module.exports = function (plop) {
  plop.setGenerator('module', {
    description: 'Generate module with controller, service, model, etc.',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Enter module name (e.g. room, incomeCategory)',
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: 'src/app/modules/{{camelCase name}}',
        templateFiles: 'plop-templates/*.hbs',
        base: 'plop-templates',
        stripExtensions: ['hbs'],
      },
    ],
  });
};
