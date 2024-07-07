const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const connectDB = require('./config');
const schema = require('./schemas/schema');
const authMiddleware = require('./middleware/authMiddleware');
const rateLimit = require('express-rate-limit');

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

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes'
});

app.use(limiter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
