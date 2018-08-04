import * as mongoose from 'mongoose';

import { SpotifyTrackSchema } from '../services/tracks/schemas/spotify-track.schema';

export const SpotifySavedTrackSchema = new mongoose.Schema({
  addedAt: String,
  track: SpotifyTrackSchema
});
