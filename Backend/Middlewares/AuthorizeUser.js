const authorizeUser = (requiredRole) => {
    return (req, res, next) => {
      const { userRole } = req;
  
      if (!userRole) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      if (userRole !== requiredRole) {
        return res.status(403).json({ message: 'Forbidden' });
      }
  
      next();
    };
  };
  
  export default authorizeUser;
  