import { AlbumsService } from './services/albums/albums.service';
import { ArtistsService } from './services/artists/artists.service';
import { BrowseService } from './services/browse/browse.service';
import { FollowService } from './services/follow/follow.service';
import { LibraryService } from './services/library/library.service';
import { PersonalizationService } from './services/personalization/personalization.service';
import { PlayerService } from './services/player/player.service';
import { PlaylistsService } from './services/playlists/playlists.service';
import { SearchService } from './services/search/search.service';
import { TracksService } from './services/tracks/tracks.service';
import { UsersService } from './services/users-profile/users.service';
import { SpotifyClient } from './spotify-client.class';

/**
 * SpotifyAPI
 *
 * @export
 * @class SpotifyAPI
 */
export class SpotifyAPIClient {
  /**
   * The SpotifyClient
   *
   * @private
   * @type {SpotifyClient}
   * @memberof SpotifyAPI
   */
  private readonly spotifyClient: SpotifyClient;

  /**
   * The Spotify Web API ClientID
   *
   * @memberof SpotifyAPI
   */
  public readonly clientID;

  /**
   * The Spotify Web API SecretID
   *
   * @memberof SpotifyAPI
   */
  public readonly secretID;

  /**
   * The albums domain Spotify API wrapper
   *
   * @type {AlbumsService}
   * @memberof SpotifyAPI
   */
  public albums: AlbumsService;

  /**
   * The artists domain Spotify API wrapper
   *
   * @type {ArtistsService}
   * @memberof SpotifyAPI
   */
  public artists: ArtistsService;

  /**
   * The browse domain Spotify API wrapper
   *
   * @type {BrowseService}
   * @memberof SpotifyAPI
   */
  public browse: BrowseService;

  /**
   * The follow domain Spotify API wrapper
   *
   * @type {FollowService}
   * @memberof SpotifyAPI
   */
  public follow: FollowService;

  /**
   * The library domain Spotify API wrapper
   *
   * @type {LibraryService}
   * @memberof SpotifyAPI
   */
  public library: LibraryService;

  /**
   * The personalization domain Spotify API wrapper
   *
   * @type {PersonalizationService}
   * @memberof SpotifyAPI
   */
  public personalization: PersonalizationService;

  /**
   * The player domain Spotify API wrapper
   *
   * @type {PlayerService}
   * @memberof SpotifyAPI
   */
  public player: PlayerService;

  /**
   * The playlists domain Spotify API wrapper
   *
   * @type {PlaylistsService}
   * @memberof SpotifyAPI
   */
  public playlists: PlaylistsService;

  /**
   * The search domain Spotify API wrapper
   *
   * @type {SearchService}
   * @memberof SpotifyAPI
   */
  public search: SearchService;

  /**
   * The tracks domain Spotify API wrapper
   *
   * @type {TracksService}
   * @memberof SpotifyAPI
   */
  public tracks: TracksService;

  /**
   * The users profile domain Spotify API wrapper
   *
   * @type {UsersService}
   * @memberof SpotifyAPI
   */
  public usersProfile: UsersService;

  /**
   * Creates an instance of SpotifyAPI.
   *
   * @param {string} clientID
   * @param {string} secretID
   * @memberof SpotifyAPI
   */
  constructor(clientID: string, secretID: string) {
    this.spotifyClient = new SpotifyClient();
    this.clientID = clientID;
    this.secretID = secretID;
    this.albums = new AlbumsService(this.spotifyClient);
    this.artists = new ArtistsService(this.spotifyClient);
    this.browse = new BrowseService(this.spotifyClient);
    this.follow = new FollowService(this.spotifyClient);
    this.library = new LibraryService(this.spotifyClient);
    this.personalization = new PersonalizationService(this.spotifyClient);
    this.player = new PlayerService(this.spotifyClient);
    this.playlists = new PlaylistsService(this.spotifyClient);
    this.search = new SearchService(this.spotifyClient);
    this.tracks = new TracksService(this.spotifyClient);
    this.usersProfile = new UsersService(this.spotifyClient);
  }

  /**
   * Set the access token
   *
   * @param {string} accessToken
   * @memberof SpotifyAPI
   */
  public setAccessToken(accessToken: string) {
    this.spotifyClient.setAccessToken(accessToken);
  }
}

/**
 * Exporting classes
 */

export { SpotifyAlbum } from './services/albums/classes/spotify-album.class';

export { SpotifyArtist } from './services/artists/classes/spotify-artist.class';

export {
  SpotifyCategory
} from './services/browse/classes/spotify-category.class';

export {
  SpotifyRecommendationsParameters
} from './services/browse/classes/spotify-recommendations-parameters.class';
export {
  SpotifyRecommendationsSeed
} from './services/browse/classes/spotify-recommendations-seed.class';
export {
  SpotifyRecommendations
} from './services/browse/classes/spotify-recommendations.class';

export {
  SpotifyContext
} from './services/player/classes/spotify-context.class';
export {
  SpotifyCurrentlyPlaying
} from './services/player/classes/spotify-currently-playing.class';
export { SpotifyDevice } from './services/player/classes/spotify-device.class';
export {
  SpotifyPlayHistory
} from './services/player/classes/spotify-play-history.class';
export {
  SpotifyPlayingContext
} from './services/player/classes/spotify-playing-context.class';

export { SpotifyQuery } from './services/search/classes/spotify-query.class';
export {
  SpotifySearchResult
} from './services/search/classes/spotify-search-result.class';

export {
  SpotifyAudioAnalysis
} from './services/tracks/classes/spotify-audio-analysis.class';
export {
  SpotifyAudioFeatures
} from './services/tracks/classes/spotify-audio-features.class';
export { SpotifyTrack } from './services/tracks/classes/spotify-track.class';

export {
  SpotifyUser
} from './services/users-profile/classes/spotify-user.class';

export { SpotifyCopyright } from './classes/spotify-copyright.class';
export {
  SpotifyCursorBasedPaging
} from './classes/spotify-cursor-based-paging.class';
export { SpotifyCursor } from './classes/spotify-cursor.class';
export { SpotifyFollowers } from './classes/spotify-followers.class';
export { SpotifyImage } from './classes/spotify-image.class';
export { SpotifyLinkedTrack } from './classes/spotify-linked-track.class';
export { SpotifyPaging } from './classes/spotify-paging.class';
export { SpotifySavedAlbum } from './classes/spotify-saved-album.class';
export { SpotifySavedTrack } from './classes/spotify-saved-track.class';
export {
  SpotifySimplifiedAlbum
} from './classes/spotify-simplified-album.class';
export {
  SpotifySimplifiedArtist
} from './classes/spotify-simplified-artist.class';
export {
  SpotifySimplifiedPlaylist
} from './classes/spotify-simplified-playlist.class';
export {
  SpotifySimplifiedTrack
} from './classes/spotify-simplified-track.class';

/**
 * Exporting mongo schemas
 */

export {
  SpotifyAlbumSchema
} from './services/albums/schemas/spotify-album.schema';

export {
  SpotifyArtistSchema
} from './services/artists/schemas/spotify-artist.schema';

export {
  SpotifyCategorySchema
} from './services/browse/schemas/spotify-category.schema';

export {
  SpotifyRecommendationsSeedSchema
} from './services/browse/schemas/spotify-recommendations-seed.schema';
export {
  SpotifyRecommendationsSchema
} from './services/browse/schemas/spotify-recommendations.schema';

export {
  SpotifyContextSchema
} from './services/player/schemas/spotify-context.schema';
export {
  SpotifyCurrentlyPlayingSchema
} from './services/player/schemas/spotify-currently-playing.schema';
export {
  SpotifyDeviceSchema
} from './services/player/schemas/spotify-device.schema';
export {
  SpotifyPlayHistorySchema
} from './services/player/schemas/spotify-play-history.schema';
export {
  SpotifyPlayingContextSchema
} from './services/player/schemas/spotify-playing-context.schema';

export {
  SpotifySearchResultSchema
} from './services/search/schemas/spotify-search-result.schema';

export {
  SpotifyAudioAnalysisSchema
} from './services/tracks/schemas/spotify-audio-analysis.schema';
export {
  SpotifyAudioFeaturesSchema
} from './services/tracks/schemas/spotify-audio-features.schema';
export {
  SpotifyTrackSchema
} from './services/tracks/schemas/spotify-track.schema';

export {
  SpotifyUserSchema
} from './services/users-profile/schemas/spotify-user.schema';

export { SpotifyCopyrightSchema } from './schemas/spotify-copyright.schema';
export {
  generateCursorBasedPagingSchema
} from './schemas/spotify-cursor-based-paging.schema';
export { SpotifyCursorSchema } from './schemas/spotify-cursor.schema';
export { SpotifyFollowersSchema } from './schemas/spotify-followers.schema';
export { SpotifyImageSchema } from './schemas/spotify-image.schema';
export {
  SpotifyLinkedTrackSchema
} from './schemas/spotify-linked-track.schema';
export { generatePagingSchema } from './schemas/spotify-paging.schema';
export { SpotifySavedAlbumSchema } from './schemas/spotify-saved-album.schema';
export { SpotifySavedTrackSchema } from './schemas/spotify-saved-track.schema';
export {
  SpotifySimplifiedAlbumSchema
} from './schemas/spotify-simplified-album.schema';
export {
  SpotifySimplifiedArtistSchema
} from './schemas/spotify-simplified-artist.schema';
export {
  SpotifySimplifiedPlaylistSchema
} from './schemas/spotify-simplified-playlist.schema';
export {
  SpotifySimplifiedTrackSchema
} from './schemas/spotify-simplified-track.schema';

/**
 * Exporting enums
 */

export { SpotifyFieldFilterType } from './enums/spotify-field-filter-type.enum';
export {
  SpotifySearchEntityType
} from './enums/spotify-search-entity-type.enum';
export { SpotifySearchTagType } from './enums/spotify-search-tag-type.enum';

/**
 * Exporting types
 */

export { SpotifyAlbumType } from './types/spotify-album-type.type';
export { SpotifyBase64Image } from './types/spotify-base-64-image.type';
export { SpotifyCopyrightType } from './types/spotify-copyright-type';
export { SpotifyEntityType } from './types/spotify-entity-type.type';
export { SpotifyExternalIDs } from './types/spotify-external-ids.type';
export { SpotifyExternalURLs } from './types/spotify-external-urls.type';
export {
  SpotifyPlaylistTrackPosition
} from './types/spotify-playlist-track-position.type';
export {
  SpotifyReleaseDatePrecision
} from './types/spotify-release-date-precision.type';
export { SpotifyRepeatState } from './types/spotify-repeat-state.type';
export { SpotifyRestrictions } from './types/spotify-restrictions.type';
export { SpotifySnapshotID } from './types/spotify-snapshot-id.type';
export { SpotifyTimeRange } from './types/spotify-time-range.type';
