import * as mongoose from 'mongoose';

import { SpotifySimplifiedTrackSchema } from '../../../schemas/spotify-simplified-track.schema';
import { SpotifyContextSchema } from './spotify-context.schema';

export const SpotifyPlayHistorySchema = new mongoose.Schema({
  track: SpotifySimplifiedTrackSchema,
  playedAt: String,
  context: SpotifyContextSchema
});
