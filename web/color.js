const path = require('path');
const fs = require('fs');
const { generateTheme, getLessVars } = require('antd-theme-generator');

const themeVariables = getLessVars(path.join(__dirname, './client/src/styles/theme.less'))
const defaultVars = getLessVars('./node_modules/antd/lib/style/themes/default.less')

const darkVars = {
  ...getLessVars('./node_modules/antd/lib/style/themes/dark.less'),
  '@primary-color': defaultVars['@primary-color'],
  '@picker-basic-cell-active-with-range-color': 'darken(@primary-color, 20%)',
};
const lightVars = {
  ...getLessVars('./node_modules/antd/lib/style/themes/compact.less'),
  '@primary-color': defaultVars['@primary-color'],
  '@layout-header-background': defaultVars['@white']
};
fs.writeFileSync('./client/src/themes/dark.json', JSON.stringify(darkVars));
fs.writeFileSync('./client/src/themes/light.json', JSON.stringify(lightVars));
fs.writeFileSync('./client/src/themes/theme.json', JSON.stringify(themeVariables));

const options = {
  stylesDir: path.join(__dirname, './client/src/styles'),
  antDir: path.join(__dirname, './node_modules/antd'),
  varFile: path.join(__dirname, './client/src/styles/theme.less'),
  mainLessFile: path.join(__dirname, './client/src/styles/antd.less'),
  themeVariables: Array.from(new Set([
    ...Object.keys(darkVars),
    ...Object.keys(lightVars),
    ...Object.keys(themeVariables),
  ])),
  //   themeVariables: [
  //     '@primary-color',
  //     '@link-color',
  //     '@secondary-color',
  //     '@text-color',
  //     '@text-color-secondary',
  //     '@disabled-color',
  //     '@heading-color',
  //     '@layout-body-background',
  //     '@btn-primary-bg',
  //     '@layout-header-background',
  //     '@border-color-base',
  //     '@component-background',
  //     '@body-background'
  //   ],
  indexFileName: 'index.html',
  outputFilePath: path.join(__dirname, './client/assets/color.less'),
  customColorRegexArray: [/^fade\(.*\)$/]
}

generateTheme(options).then(less => {
  console.log('Theme generated successfully');
}).catch(error => {
  console.log('Error', error);
});