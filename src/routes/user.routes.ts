import { Hono } from "hono"
import { register } from "../controllers/user.controller.ts"
import { UserRoles } from "../constants.ts"
const router = new Hono()

router.post('/register/tenant', register(UserRoles.TENANT));
router.post('/register/landlord', register(UserRoles.LANDLORD));

export default router;