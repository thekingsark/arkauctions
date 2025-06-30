import { Router } from 'express'
import { Authenticator } from '../middlewares/auth.js'
import { HttpRateLimiter } from '../middlewares/rate-limiter.js'
import { CommentsController } from '../../modules/comments/controller.js'
import { HttpIPRateLimiter } from '../middlewares/ip_rate_limiter.js'

const commentsRouter = Router()

commentsRouter.post(
  '/',
  await Authenticator.authenticateHttp(),
  HttpRateLimiter.limitRequestsForUser,
  CommentsController.create
)

commentsRouter.get(
  '/count/:auctionId',
  HttpIPRateLimiter.limitRequestsForUser,
  CommentsController.countForAuction
)

commentsRouter.get(
  '/auction/:auctionId',
  await Authenticator.authenticateHttp(),
  HttpRateLimiter.limitRequestsForUser,
  CommentsController.loadForAuction
)

commentsRouter.get(
  '/translate/:commentId/:lang',
  await Authenticator.authenticateHttp(),
  HttpRateLimiter.limitRequestsForUser,
  CommentsController.translateContent
)

commentsRouter.delete(
  '/:commentId',
  await Authenticator.authenticateHttp(),
  HttpRateLimiter.limitRequestsForUser,
  CommentsController.deleteComment
)

export { commentsRouter }
