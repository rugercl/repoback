import {Application, config} from './devdeps.ts';
import { logger } from './logger/logger';

import {router} from './routes/index.ts';
// import {logger} from './logger/logger.ts';

const {PORT} = config();
const app = new Application();
app.use(logger);
app.use(router.routes());

console.log(`Server running on port ${PORT}`);

app.listen({port: PORT});

// app.use((ctx)=>{
//     ctx.response.body = 'Hello World';

// });
// app.listen({port: 8080});