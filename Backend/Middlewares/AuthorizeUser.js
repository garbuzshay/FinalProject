// const authorizeUser = (requiredRole) => {
//     return (req, res, next) => {
//       const { userRole } = req;
  
//       if (!userRole) {
//         return res.status(401).json({ message: 'Unauthorized' });
//       }
  
//       if (userRole !== requiredRole) {
//         return res.status(403).json({ message: 'Forbidden' });
//       }
  
//       next();
//     };
//   };
  
//   export default authorizeUser;
  

const authorizeUser = (requiredRoles) => {
  return (req, res, next) => {
    const { userRole } = req;

    // Check if no user role is available
    if (!userRole) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Check if the requiredRoles is an array or a single role string and perform the check accordingly
    const roles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];

    // Check if the user's role is included in the allowed roles
    if (!roles.includes(userRole)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    // Proceed to the next middleware if the user has the required role
    next();
  };
};

export default authorizeUser;
