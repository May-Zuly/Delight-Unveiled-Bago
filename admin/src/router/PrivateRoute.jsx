import { Navigate, Route } from "react-router-dom";

import { Permissions } from "@config/permission";

export default function PrivateRoute({ requiredPermission, ...rest }) {
  const userPermissions = [Permissions.ADMIN, Permissions.USER];

  if (!userPermissions.includes(requiredPermission)) {
    return <Navigate to="/forbidden" />;
  }

  return <Route {...rest} />;
}
