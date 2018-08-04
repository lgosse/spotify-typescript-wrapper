import * as mongoose from 'mongoose';

import { SpotifyCopyrightSchema } from '../../../schemas/spotify-copyright.schema';
import { SpotifyImageSchema } from '../../../schemas/spotify-image.schema';
import { generatePagingSchema } from '../../../schemas/spotify-paging.schema';
import { SpotifySimplifiedArtistSchema } from '../../../schemas/spotify-simplified-artist.schema';
import { SpotifySimplifiedTrackSchema } from '../../../schemas/spotify-simplified-track.schema';

export const SpotifyAlbumSchema = new mongoose.Schema({
  id: String,
  albumType: String,
  artists: [SpotifySimplifiedArtistSchema],
  availableMarkets: [String],
  copyrights: [SpotifyCopyrightSchema],
  externalIds: mongoose.SchemaTypes.Mixed,
  externalUrls: mongoose.SchemaTypes.Mixed,
  genres: [String],
  href: String,
  images: [SpotifyImageSchema],
  label: String,
  name: String,
  popularity: String,
  releaseDate: String,
  releaseDatePrecision: String,
  tracks: generatePagingSchema(SpotifySimplifiedTrackSchema),
  type: String,
  uri: String
});
