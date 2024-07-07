const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const connectDB = require('./config');
const schema = require('./schemas/schema');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(authMiddleware);

// GraphQL endpoint
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
