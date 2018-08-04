import * as mongoose from 'mongoose';

import { SpotifyFollowersSchema } from '../../../schemas/spotify-followers.schema';
import { SpotifyImageSchema } from '../../../schemas/spotify-image.schema';
import { generatePagingSchema } from '../../../schemas/spotify-paging.schema';
import { SpotifyPlaylistTrackSchema } from '../../playlists/schemas/spotify-playlist-track.schema';
import { SpotifyUserSchema } from '../../users-profile/schemas/spotify-user.schema';

export const SpotifyPlaylistSchema = new mongoose.Schema({
  collaborative: Boolean,
  description: String,
  externalURLs: mongoose.SchemaTypes.Mixed,
  followers: SpotifyFollowersSchema,
  href: String,
  id: String,
  images: [SpotifyImageSchema],
  owner: SpotifyUserSchema,
  public: Boolean,
  snapshotID: String,
  tracks: generatePagingSchema(SpotifyPlaylistTrackSchema),
  type: String,
  uri: String
});
