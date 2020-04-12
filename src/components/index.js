import todoVuex from './todo-vuex/module';

const req = require.context('./', true, /\.vue$/);
const atoms = {};

req.keys().forEach((fileName) => {
  const componentName = fileName.replace(/^.+\/([^/]+)\.vue/, '$1');
  atoms[componentName] = req(fileName).default;
});

export default atoms;

export const modules = {
  todoVuex,
};
