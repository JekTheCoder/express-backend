import express from 'express';
import router from './routes';
import 'dotenv/config';

const app = express();

/**
 * App Variables
 */
app.set('PORT', process.env.PORT || 8080);

/**
 * Middlewares
 */
app.use(express.json());

/**
 * App Routes
 */
app.use('/api', router);

/**
 * Launch
 */

app.listen(app.get('PORT'), () => {
    console.log('🚀 Launching on port ' + app.get('PORT'))
});