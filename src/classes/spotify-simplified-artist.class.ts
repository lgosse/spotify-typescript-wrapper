import { SpotifySimplifiedArtistAPIResponse } from '../interfaces/spotify-simplified-artist-api-response.interface';
import { SpotifyEntityType } from '../types/spotify-entity-type.type';
import { SpotifyExternalURLs } from '../types/spotify-external-urls.type';

/**
 * SpotifySimplifiedArtist
 *
 * @export
 * @class SpotifySimplifiedArtist
 */
export class SpotifySimplifiedArtist {
  /**
   * Creates an instance of SpotifySimplifiedArtist.
   *
   * @param {SpotifySimplifiedArtist} artist
   * @memberof SpotifySimplifiedArtist
   */
  constructor(artist: SpotifySimplifiedArtist) {
    Object.keys(artist).forEach(key => {
      this[key] = artist[key];
    });
  }

  /**
   * Load SpotifySimplifiedArtist from JSON
   *
   * @static
   * @param {SpotifySimplifiedArtistAPIResponse} artist
   * @returns
   * @memberof SpotifySimplifiedArtist
   */
  static fromJSON(artist: SpotifySimplifiedArtistAPIResponse) {
    return new this({
      id: artist.id,
      externalUrls: artist.external_urls,
      href: artist.href,
      name: artist.name,
      type: artist.type,
      uri: artist.uri
    });
  }

  /**
   * The Spotify ID for the artist.
   *
   * @type {string}
   * @memberof SpotifySimplifiedArtist
   */
  readonly id: string;

  /**
   * Known external URLs for this artist.
   *
   * @type {SpotifyExternalURLs}
   * @memberof SpotifySimplifiedArtist
   */
  readonly externalUrls: SpotifyExternalURLs;

  /**
   * A link to the Web API endpoint providing full details of the artist.
   *
   * @type {string}
   * @memberof SpotifySimplifiedArtist
   */
  readonly href: string;

  /**
   * The name of the artist
   *
   * @type {string}
   * @memberof SpotifySimplifiedArtist
   */
  readonly name: string;

  /**
   * The object type: "artist"
   *
   * @type {SpotifyEntityType}
   * @memberof SpotifySimplifiedArtist
   */
  readonly type: SpotifyEntityType;

  /**
   * The Spotify URI for the artist.
   *
   * @type {string}
   * @memberof SpotifySimplifiedArtist
   */
  readonly uri: string;
}
