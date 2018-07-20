module.exports = ({ env }) => ({
    plugins: getPlugins(env === 'production')
  });
  
  function getPlugins (isProduction) {
    const result = {
      'postcss-nesting': {},
      'autoprefixer': {remove: false} // fügt -webkit-/-moz- für Browsers hinzu
    };
    return result;
  }
