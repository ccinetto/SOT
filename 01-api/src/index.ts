import myFancyWebServer from './services/server';

myFancyWebServer.listen(8080, () => {
  console.log('SERVER UP');
});
