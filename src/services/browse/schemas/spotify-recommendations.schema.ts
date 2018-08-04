import * as mongoose from 'mongoose';

import { SpotifySimplifiedTrackSchema } from '../../../schemas/spotify-simplified-track.schema';
import { SpotifyRecommendationsSeedSchema } from './spotify-recommendations-seed.schema';

export const SpotifyRecommendationsSchema = new mongoose.Schema({
  seeds: [SpotifyRecommendationsSeedSchema],
  tracks: [SpotifySimplifiedTrackSchema]
});
