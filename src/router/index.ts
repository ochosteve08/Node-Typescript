import express from 'express'
import authRoutes from './auth.routes'

const router = express.Router();

// export default (): express.Router =>{
//     authRoutes(router)
//     return router;
// }
router.use('/auth',authRoutes)

export default router