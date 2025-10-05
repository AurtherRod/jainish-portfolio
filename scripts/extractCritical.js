const critical = require('critical');

critical.generate({
  inline: true,
  base: 'build/',
  src: 'index.html',
  target: 'index.html',
  width: 1300,
  height: 900,
  minify: true
}).then(() => {
  console.log('✓ Critical CSS extracted');
}).catch(err => {
  console.error('✗ Error:', err);
});
