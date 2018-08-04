import { AxiosResponse } from 'axios';

import { SpotifyPaging } from '../../classes/spotify-paging.class';
import { SpotifyPagingAPIResponse } from '../../interfaces/spotify-paging-api-response.interface';
import { SpotifyClient } from '../../spotify-client.class';
import { SpotifyTimeRange } from '../../types/spotify-time-range.type';
import { SpotifyArtist } from '../artists/classes/spotify-artist.class';
import { SpotifyArtistAPIResponse } from '../artists/interfaces/spotify-artist-api-response.interface';
import { SpotifyTrack } from '../tracks/classes/spotify-track.class';
import { SpotifyTrackAPIResponse } from '../tracks/interfaces/spotify-track-api-response.interface';

/**
 * PersonalizationService
 *
 * @export
 * @class PersonalizationService
 */
export class PersonalizationService {
  /**
   * Creates an instance of PersonalizationService.
   *
   * @param {SpotifyClient} spotifyClient
   * @memberof PersonalizationService
   */
  constructor(private readonly spotifyClient: SpotifyClient) {}

  /**
   * Get User top Artists
   *
   * @param {number} [limit]
   * @param {number} [offset]
   * @param {SpotifyTimeRange} [timeRange]
   * @returns {Promise<SpotifyPaging<SpotifyArtist>>}
   * @memberof PersonalizationService
   */
  public async getUserTopArtists(
    limit?: number,
    offset?: number,
    timeRange?: SpotifyTimeRange
  ): Promise<SpotifyPaging<SpotifyArtist>> {
    let response: AxiosResponse<
      SpotifyPagingAPIResponse<SpotifyArtistAPIResponse>
    >;

    try {
      response = await this.spotifyClient.get<
        SpotifyPagingAPIResponse<SpotifyArtistAPIResponse>
      >(`/me/top/artists`);
    } catch (error) {
      console.error(error);
    }

    const topArtists = SpotifyPaging.fromJSON<
      SpotifyArtist,
      SpotifyArtistAPIResponse
    >(
      response.data,
      response.data.items.map(item => SpotifyArtist.fromJSON(item))
    );

    return topArtists;
  }

  /**
   * Get User top Tracks
   *
   * @param {number} [limit]
   * @param {number} [offset]
   * @param {SpotifyTimeRange} [timeRange]
   * @returns {Promise<SpotifyPaging<SpotifyTrack>>}
   * @memberof PersonalizationService
   */
  public async getUserTopTracks(
    limit?: number,
    offset?: number,
    timeRange?: SpotifyTimeRange
  ): Promise<SpotifyPaging<SpotifyTrack>> {
    let response: AxiosResponse<
      SpotifyPagingAPIResponse<SpotifyTrackAPIResponse>
    >;

    try {
      response = await this.spotifyClient.get<
        SpotifyPagingAPIResponse<SpotifyTrackAPIResponse>
      >(`/me/top/artists`);
    } catch (error) {
      console.error(error);
    }

    const topTracks = SpotifyPaging.fromJSON<
      SpotifyTrack,
      SpotifyTrackAPIResponse
    >(
      response.data,
      response.data.items.map(item => SpotifyTrack.fromJSON(item))
    );

    return topTracks;
  }
}
