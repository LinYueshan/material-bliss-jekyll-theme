import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { createHistory, createMemoryHistory } from 'history';
import { Router, RouterContext, browserHistory, match } from 'react-router';


import routes from './routes';
import Root from './components/root';

/*export default function render(locals, callback) {
  Router.run(routes, locals.path, (Handler) => {
    const html = ReactDOMServer.renderToStaticMarkup(React.createElement(Handler, locals));
    callback(null, `<!DOCTYPE html> ${html}`);
  });
}*/

/*if (typeof document !== 'undefined') {
  //client render
}*/
/*ReactDOM.render(
  <Router history={browserHistory} routes={routes} />, document.getElementById('root'));
  */
  var createElement = function (Component, props) {
   return <Component key={new Date().getTime()} {...props} />;
 };


if (typeof document !== 'undefined') {
  const root = document.getElementById('root');
  ReactDOM.render(<Router history={browserHistory} routes={routes} createElement={createElement} />, root);
}

module.exports = function (locals, callback) {
  var history = createMemoryHistory();
  var location = history.createLocation(locals.path);

  return match({
    routes: routes,
    location: location }, function (error, redirectLocation, renderProps) {
      var html = ReactDOMServer.renderToStaticMarkup(
        <Root location={location}>
          <RouterContext {...renderProps} />
        </Root>
      );
      return callback(null, html);
    });
  };


/*export default (locals, callback) => {
    let history = createMemoryHistory();
    let location = history.createLocation(locals.path);
    console.log(locals.path);

  return match({
    routes: routes,
    location: location
    }, (error, redirectLocation, renderProps) => {
      let html = ReactDOMServer.renderToStaticMarkup(
        <Root location={location}>
          <RouterContext {...renderProps} />
        </Root>
      );
      return callback(null, html);
    });
  };
*/