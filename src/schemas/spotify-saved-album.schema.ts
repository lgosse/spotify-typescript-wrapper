import * as mongoose from 'mongoose';

import { SpotifyAlbumSchema } from '../spotify-api.class';

export const SpotifySavedAlbumSchema = new mongoose.Schema({
  addedAt: String,
  album: SpotifyAlbumSchema
});
