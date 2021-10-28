console.log('Ejecutando JS en el cliente');
const clientWS = io.connect();

// let i = 0;
// const intervalId = setInterval(() => {
//   if (i < 40) {
//     const data = {
//       msg: 'hola',
//       data: new Date(),
//       i,
//     };
//     clientWS.emit('sot-dev-backend', data);
//     i++;
//   } else clearInterval(intervalId);
// }, 3000);

clientWS.on('all', (data) => {
  console.log(data);
});
