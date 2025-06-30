import { Model, DataTypes, literal } from 'sequelize'
import { DATABASE_MODELS } from '../../constants/model-names.js'
import { Account } from '../accounts/model.js'
import { Auction } from '../auctions/model.js'
import { getModelConfig } from '../../utils/db.js'

export class Comment extends Model {
  declare id: string
  declare accountId: string
  declare auctionId: string

  declare content: string
  declare parentCommentId: string

  declare readonly createdAt: Date
  declare readonly updatedAt: Date

  declare readonly account?: Account
  declare readonly replies?: Comment[]

  static initModel = initModel
  static initAssociations = initAssociations
}

function initModel(): void {
  const modelConfig = getModelConfig(DATABASE_MODELS.COMMENTS)
  Comment.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: literal('gen_random_uuid()'),
        primaryKey: true,
      },
      accountId: {
        type: DataTypes.UUID,
        references: {
          model: DATABASE_MODELS.ACCOUNTS,
          key: 'id',
        },
      },
      auctionId: {
        type: DataTypes.UUID,
        references: {
          model: DATABASE_MODELS.AUCTIONS,
          key: 'id',
        },
        allowNull: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      parentCommentId: {
        type: DataTypes.UUID,
        references: {
          model: DATABASE_MODELS.COMMENTS,
          key: 'id',
        },
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    modelConfig
  )
}

function initAssociations() {
  Comment.belongsTo(Account, {
    foreignKey: 'accountId',
    onDelete: 'cascade',
  })

  Comment.belongsTo(Comment, {
    foreignKey: 'parentCommentId',
    onDelete: 'cascade',
  })

  Comment.belongsTo(Auction, {
    foreignKey: 'auctionId',
  })

  Comment.hasMany(Comment, {
    foreignKey: 'parentCommentId',
    as: 'replies',
  })
}
