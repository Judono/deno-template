import { Hono } from 'hono';
import UserRoutes from './user.routes.ts';
import AuthRoutes from './auth.routes.ts';
import { hasAnyRole } from '../middlewares/authorization.ts';
import { logger } from 'hono/logger'
import { UserRoles } from '../constants.ts';


const router = new Hono();

router.use(logger());
router.route("/user", UserRoutes);
router.route("/auth", AuthRoutes);

router.get("/tenant", ...hasAnyRole([UserRoles.TENANT]) , (c) => {
  return c.text("TENANT");
});

router.get("/landlord", ...hasAnyRole([UserRoles.LANDLORD]) , (c) => {
  return c.text("LANLORD");
});

export default router;