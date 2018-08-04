import * as mongoose from 'mongoose';

import { SpotifySimplifiedAlbumSchema } from '../../../schemas/spotify-simplified-album.schema';
import { SpotifyArtistSchema } from '../../artists/schemas/spotify-artist.schema';
import { SpotifyTrackSchema } from '../../tracks/schemas/spotify-track.schema';
import { SpotifySimplifiedPlaylistSchema } from '../../../schemas/spotify-simplified-playlist.schema';

export const SpotifySearchResultSchema = new mongoose.Schema({
  albums: [SpotifySimplifiedAlbumSchema],
  artists: [SpotifyArtistSchema],
  playlists: [SpotifySimplifiedPlaylistSchema],
  tracks: [SpotifyTrackSchema]
});
