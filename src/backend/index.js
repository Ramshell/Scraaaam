const mongoose = require('mongoose');
import app from './app';

mongoose.connect('mongodb://localhost/projects');


const port = 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));

export default app;
