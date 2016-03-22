'strict mode';
const pkg = require('../package.json');
const path= require('path');
const express= require('express');
const http= require('http');

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);

app.set('service', { name: pkg.name, version: pkg.version });
app.set('port', port);
app.set('server', server);

app.get('/', function (req, res) {
  res.send('Hello World!');
});


const boot = function (done) {
  server.listen(app.get('port'), done)
}

const shutdown = function(done) {
  server.close();
  if (done)
    done()
}

if (require.main === module) {
  boot(()=> {
    console.info('Express server listening on port ' + app.get('port'));
    function exitOnSignal(signal) {
      console.log("Hooking "+signal+"...")
      process.on(signal, () => {
        console.log(`$(signal) received, stopping server...`);
        server.close(() => {
          console.log('server stopped');
          process.exit();
        });
      });
    }
    // close server gracefully...
    // handle ctrl-c
    exitOnSignal('SIGINT');
    // handle docker stop
    exitOnSignal('SIGTERM');
  });

} else {
  console.info('Running app as a module')
  exports.boot = boot;
  exports.shutdown = shutdown;
  exports.port = app.get('port');
}
