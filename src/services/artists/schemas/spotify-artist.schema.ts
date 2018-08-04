import * as mongoose from 'mongoose';

import { SpotifyFollowersSchema } from '../../../schemas/spotify-followers.schema';
import { SpotifyImageSchema } from '../../../schemas/spotify-image.schema';

export const SpotifyArtistSchema = new mongoose.Schema({
  id: String,
  externalURLs: mongoose.SchemaTypes.Mixed,
  followers: SpotifyFollowersSchema,
  genres: [String],
  href: String,
  images: [SpotifyImageSchema],
  name: String,
  popularity: Number,
  type: String,
  uri: String
});
