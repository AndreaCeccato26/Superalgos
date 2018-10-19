import {
  GraphQLBoolean,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull
} from 'graphql'
import { epoch } from '../../utils/functions'
import { CompetitionType } from '../types'
import Competition from '../../models/competition'

const args = {
  devTeam: { type: new GraphQLNonNull(GraphQLString) },
  includeOld: { type: GraphQLBoolean }
}

const resolve = (parent, args, context) => {
  return Competition.find(
    Object.assign(
      {
        participants: { $elemMatch: { devTeam: args.devTeam } }
      },
      args.includeOld ? { finishDatetime: { $gt: epoch() } } : {}
    )
  )
}

const query = {
  competitionsByDevTeam: {
    type: new GraphQLList(CompetitionType),
    args,
    resolve
  }
}

export default query
