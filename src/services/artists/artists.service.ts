import { AxiosResponse } from 'axios';
import * as querystring from 'querystring';

import { SpotifyPaging } from '../../classes/spotify-paging.class';
import { SpotifyPagingAPIResponse } from '../../interfaces/spotify-paging-api-response.interface';
import { SpotifyClient } from '../../spotify-client.class';
import { SpotifyAlbum } from '../albums/classes/spotify-album.class';
import { SpotifyAlbumAPIResponse } from '../albums/interfaces/spotify-album-api-response.interface';
import { SpotifyTrack } from '../tracks/classes/spotify-track.class';
import { SpotifyTrackAPIResponse } from '../tracks/interfaces/spotify-track-api-response.interface';
import { SpotifyArtist } from './classes/spotify-artist.class';
import { SpotifyArtistAPIResponse } from './interfaces/spotify-artist-api-response.interface';

/**
 * Wrapper around artists catefory of spotify Web API service
 *
 * @export
 * @class ArtistsService
 */
export class ArtistsService {
  /**
   * Creates an instance of ArtistsService.
   *
   * @param {SpotifyClient} spotifyClient
   * @memberof ArtistsService
   */
  constructor(private readonly spotifyClient: SpotifyClient) {}

  /**
   * Get an Artist
   *
   * @param {string} id
   * @returns {Promise<Artist>}
   * @memberof ArtistsService
   */
  public async getArtist(id: string): Promise<SpotifyArtist> {
    let response: AxiosResponse<SpotifyArtistAPIResponse>;

    try {
      response = await this.spotifyClient.get<SpotifyArtistAPIResponse>(
        `/artists/${id}`
      );
    } catch (error) {
      console.error(error);
    }

    const artist = SpotifyArtist.fromJSON(response.data);

    return artist;
  }

  /**
   * Get Several Artists
   *
   * @param {string} ids
   * @returns {Promise<SpotifyArtist[]>}
   * @memberof ArtistsService
   */
  public async getSeveralArtists(ids: string[]): Promise<SpotifyArtist[]> {
    let response: AxiosResponse<{ artists: SpotifyArtistAPIResponse[] }>;

    try {
      response = await this.spotifyClient.get<{
        artists: SpotifyArtistAPIResponse[];
      }>(`/artists?ids=${ids.reduce((acc, id) => acc + `,${id}`, '')}`);
    } catch (error) {
      console.error(error);
    }

    const artists = response.data.artists.map(artist =>
      SpotifyArtist.fromJSON(artist)
    );

    return artists;
  }

  /**
   * Get an Artist's Albums
   *
   * @param {string} id
   * @param {string} [albumType]
   * @param {string} [market]
   * @param {number} [limit]
   * @param {number} [offset]
   * @returns {Promise<SpotifyPaging<SpotifyAlbum[]>>}
   * @memberof ArtistsService
   */
  public async getArtistAlbums(
    id: string,
    albumType?: string,
    market?: string,
    limit?: number,
    offset?: number
  ): Promise<SpotifyPaging<SpotifyAlbum>> {
    let response: AxiosResponse<
      SpotifyPagingAPIResponse<SpotifyAlbumAPIResponse>
    >;

    try {
      response = await this.spotifyClient.get<
        SpotifyPagingAPIResponse<SpotifyAlbumAPIResponse>
      >(
        `/artists/${id}/albums${
          albumType || market || limit || offset
            ? `?${querystring.stringify({
                albumType,
                market,
                limit,
                offset
              })}`
            : ''
        }`
      );
    } catch (error) {
      console.error(error);
    }

    const albums = SpotifyPaging.fromJSON<
      SpotifyAlbum,
      SpotifyAlbumAPIResponse
    >(
      response.data,
      response.data.items.map(item => SpotifyAlbum.fromJSON(item))
    );

    return albums;
  }

  /**
   * Get an Artist's Top Tracks
   *
   * @param {string} id
   * @param {string} [country]
   * @returns {Promise<SpotifyTrack[]>}
   * @memberof ArtistsService
   */
  public async getArtistTopTracks(
    id: string,
    country?: string
  ): Promise<SpotifyTrack[]> {
    let response: AxiosResponse<{ tracks: SpotifyTrackAPIResponse[] }>;

    try {
      response = await this.spotifyClient.get<{
        tracks: SpotifyTrackAPIResponse[];
      }>(`artists/${id}/top-tracks${country ? `?country=${country}` : ''}`);
    } catch (error) {
      console.error(error);
    }

    const topTracks = response.data.tracks.map(track =>
      SpotifyTrack.fromJSON(track)
    );

    return topTracks;
  }

  /**
   * Get an Artist's Related Artists
   *
   * @param {string} id
   * @returns {Promise<SpotifyArtist[]>}
   * @memberof ArtistsService
   */
  public async getArtistRelatedArtists(id: string): Promise<SpotifyArtist[]> {
    let response: AxiosResponse<{ artists: SpotifyArtistAPIResponse[] }>;

    try {
      response = await this.spotifyClient.get<{
        artists: SpotifyArtistAPIResponse[];
      }>(`/artists/${id}/related-artists`);
    } catch (error) {
      console.error(error);
    }

    const relatedArtists = response.data.artists.map(artist =>
      SpotifyArtist.fromJSON(artist)
    );

    return relatedArtists;
  }
}
