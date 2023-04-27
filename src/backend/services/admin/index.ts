import AuthorizationError from "@/backend/errors/AuthorizationError";

import { UserRole } from "@/types/index"
import { getUserRoleById } from "../userService";

const verifyAdminAccess = async (id: string) => {
  const role = await getUserRoleById(id);

  if (role !== UserRole.ADMIN) {
    throw new AuthorizationError("Anda tidak berhak mengakses resource ini");
  }
}

export default verifyAdminAccess;
