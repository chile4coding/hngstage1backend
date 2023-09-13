import { Router } from "express";
import {
  getUserProfile,
  getUser,
  deleteUser,
  updateUser,
  createUser,
} from "../controller/controller";
import { check, body, param } from "express-validator";

const route = Router();

route.post(
  "/api",
  [
    body("username")
      .custom((value) => {
        if (
          /(\b(SELECT|INSERT|UPDATE|DELETE|FROM|WHERE|DROP|ALTER|UNION)\b|\-\-|\/\*|\*\/)/i.test(
            value
          )
        ) {
          throw new Error("String contains special characters");
        }
        return true;
      })
      .isEmpty()
      .isString(),
  ],
  createUser
);
// route.get(
//   "/api/:user_id",
//   [
//     param("user_id")
//       .custom((value) => {
//         if (
//           /(\b(SELECT|INSERT|UPDATE|DELETE|FROM|WHERE|DROP|ALTER|UNION)\b|\-\-|\/\*|\*\/)/i.test(
//             value
//           )
//         ) {
//           throw new Error("String contains special characters");
//         }
//         return true;
//       })
//       .isString()
//       .isEmpty(),
//   ],
//   getUserProfile
// );
route.patch(
  "/api/:user_id",
  [
    body("username")
      .custom((value) => {
        if (
          /(\b(SELECT|INSERT|UPDATE|DELETE|FROM|WHERE|DROP|ALTER|UNION)\b|\-\-|\/\*|\*\/)/i.test(
            value
          )
        ) {
          throw new Error("String contains special characters");
        }
        return true;
      })
      .isString()
      .isEmpty(),
    param("user_id")
      .custom((value) => {
        if (
          /(\b(SELECT|INSERT|UPDATE|DELETE|FROM|WHERE|DROP|ALTER|UNION)\b|\-\-|\/\*|\*\/)/i.test(
            value
          )
        ) {
          throw new Error("String contains special characters");
        }
        return true;
      })
      .isString()
      .isEmpty(),
  ],
  updateUser
);
route.delete(
  "/api/:user_id",
  [
    param("user_id")
      .custom((value) => {
        if (
          /(\b(SELECT|INSERT|UPDATE|DELETE|FROM|WHERE|DROP|ALTER|UNION)\b|\-\-|\/\*|\*\/)/i.test(
            value
          )
        ) {
          throw new Error("String contains special characters");
        }
        return true;
      })
      .isString()
      .isEmpty(),
  ],
  deleteUser
);
route.get(
  "/api/:user_id",
  [
    param("user_id")
      .custom((value) => {
        if (
          /(\b(SELECT|INSERT|UPDATE|DELETE|FROM|WHERE|DROP|ALTER|UNION)\b|\-\-|\/\*|\*\/)/i.test(
            value
          )
        ) {
          throw new Error("String contains special characters");
        }
        return true;
      })
      .isString()
      .isEmpty(),
  ],
  getUser
);

export default route;
