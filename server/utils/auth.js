const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // function for our authenticated routes
  authMiddleware: function ({ req }) {
    // allows token to be sent via  req.query or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }
    console.log("the token: " + token)
    if (!token) {
      // return res.status(400).json({ message: 'You have no token!' });
      return req;
    }
    else {
      // verify token and get user data out of it
      try {
        const { data } = jwt.verify(token, secret, { maxAge: expiration });
        const currentUser = jwt.verify(token, secret, { maxAge: expiration });
        req.user = data;
        req.currentUser = currentUser;
        console.log("hereis the user")
        console.log(req.user)
        console.log(req.currentUser)
      } catch {
        console.log('Invalid token');
        // return res.status(400).json({ message: 'invalid token!' });
      }

      // send to next endpoint
      // next();
      return req;
    }
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    console.log(payload)
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
