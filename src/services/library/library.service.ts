import { AxiosResponse } from 'axios';
import * as querystring from 'querystring';

import { SpotifyPaging } from '../../classes/spotify-paging.class';
import { SpotifySavedAlbum } from '../../classes/spotify-saved-album.class';
import { SpotifySavedTrack } from '../../classes/spotify-saved-track.class';
import { SpotifyPagingAPIResponse } from '../../interfaces/spotify-paging-api-response.interface';
import { SpotifySavedAlbumAPIResponse } from '../../interfaces/spotify-saved-album-api-response.interface';
import { SpotifySavedTrackAPIResponse } from '../../interfaces/spotify-saved-track-api-response.interface';
import { SpotifyClient } from '../../spotify-client.class';

/**
 * LibraryService
 *
 * @export
 * @class LibraryService
 */
export class LibraryService {
  /**
   * Creates an instance of LibraryService.
   *
   * @param {SpotifyClient} spotifyClient
   * @memberof LibraryService
   */
  constructor(private readonly spotifyClient: SpotifyClient) {}

  /**
   * Check User's Saved Albums
   *
   * @param {string[]} ids
   * @returns {Promise<Boolean[]>}
   * @memberof LibraryService
   */
  public async checkUserSavedAlbums(ids: string[]): Promise<Boolean[]> {
    let response: AxiosResponse<Boolean[]>;

    try {
      response = await this.spotifyClient.get<Boolean[]>(
        `/me/albums/contains?ids=${ids.reduce((acc, id) => acc + `,${id}`)}`
      );
    } catch (error) {
      console.error(error);
    }

    return response.data;
  }

  /**
   * Check User's Saved Tracks
   *
   * @param {string[]} ids
   * @returns {Promise<Boolean[]>}
   * @memberof LibraryService
   */
  public async checkUserSavedTracks(ids: string[]): Promise<Boolean[]> {
    let response: AxiosResponse<Boolean[]>;

    try {
      response = await this.spotifyClient.get<Boolean[]>(
        `/me/tracks/contains?ids=${ids.reduce((acc, id) => acc + `,${id}`)}`
      );
    } catch (error) {
      console.error(error);
    }

    return response.data;
  }

  /**
   * Get Current User's Saved Albums
   *
   * @param {number} [limit]
   * @param {number} [offset]
   * @param {string} [market]
   * @returns {Promise<SpotifyPaging<SpotifySavedAlbum>>}
   * @memberof LibraryService
   */
  public async getCurrentUserSavedAlbums(
    limit?: number,
    offset?: number,
    market?: string
  ): Promise<SpotifyPaging<SpotifySavedAlbum>> {
    let response: AxiosResponse<
      SpotifyPagingAPIResponse<SpotifySavedAlbumAPIResponse>
    >;

    try {
      response = await this.spotifyClient.get<
        SpotifyPagingAPIResponse<SpotifySavedAlbumAPIResponse>
      >(
        `/me/albums${
          limit || offset || market
            ? `?${querystring.stringify({
                limit,
                offset,
                market
              })}`
            : ''
        }`
      );
    } catch (error) {
      console.error(error);
    }

    const savedAlbums = SpotifyPaging.fromJSON<
      SpotifySavedAlbum,
      SpotifySavedAlbumAPIResponse
    >(
      response.data,
      response.data.items.map(item => SpotifySavedAlbum.fromJSON(item))
    );

    return savedAlbums;
  }

  /**
   * Get a User's Saved Tracks
   *
   * @param {number} [limit]
   * @param {number} [offset]
   * @param {string} [market]
   * @returns {Promise<SpotifyPaging<SpotifySavedTrack>>}
   * @memberof LibraryService
   */
  public async getCurrentUserSavedTracks(
    limit?: number,
    offset?: number,
    market?: string
  ): Promise<SpotifyPaging<SpotifySavedTrack>> {
    let response: AxiosResponse<
      SpotifyPagingAPIResponse<SpotifySavedTrackAPIResponse>
    >;

    try {
      response = await this.spotifyClient.get<
        SpotifyPagingAPIResponse<SpotifySavedTrackAPIResponse>
      >(
        `/me/tracks${
          limit || offset || market
            ? `?${querystring.stringify({
                limit,
                offset,
                market
              })}`
            : ''
        }`
      );
    } catch (error) {
      console.error(error);
    }

    const savedTracks = SpotifyPaging.fromJSON<
      SpotifySavedTrack,
      SpotifySavedTrackAPIResponse
    >(
      response.data,
      response.data.items.map(item => SpotifySavedTrack.fromJSON(item))
    );

    return savedTracks;
  }

  /**
   * Remove Albums for Current User
   *
   * @param {string[]} ids
   * @returns {Promise<void>}
   * @memberof LibraryService
   */
  public async removeAlbumsForCurrentUser(ids: string[]): Promise<void> {
    let response: AxiosResponse<void>;

    try {
      response = await this.spotifyClient.delete<void>(
        `/me/albums?ids=${ids.reduce((acc, id) => acc + `,${id}`, '')}`
      );
    } catch (error) {
      console.error(error);
    }

    return;
  }

  /**
   * Remove User's Saved Tracks
   *
   * @param {string[]} ids
   * @returns {Promise<void>}
   * @memberof LibraryService
   */
  public async removeUserSavedTracks(ids: string[]): Promise<void> {
    let response: AxiosResponse<void>;

    try {
      response = await this.spotifyClient.delete<void>(
        `/me/tracks?ids=${ids.reduce((acc, id) => acc + `,${id}`, '')}`
      );
    } catch (error) {
      console.error(error);
    }

    return;
  }

  /**
   * Save Albums for Current User
   *
   * @param {string[]} ids
   * @returns {Promise<void>}
   * @memberof LibraryService
   */
  public async saveAlbumsForCurrentUser(ids: string[]): Promise<void> {
    let response: AxiosResponse<void>;

    try {
      response = await this.spotifyClient.put<void>(
        `/me/albums?ids=${ids.reduce((acc, id) => acc + `,${id}`, '')}`
      );
    } catch (error) {
      console.error(error);
    }

    return;
  }

  /**
   * Save Tracks for User
   *
   * @param {string[]} ids
   * @returns {Promise<void>}
   * @memberof LibraryService
   */
  public async saveTracksForUser(ids: string[]): Promise<void> {
    let response: AxiosResponse<void>;

    try {
      response = await this.spotifyClient.put<void>(
        `/me/tracks?ids=${ids.reduce((acc, id) => acc + `,${id}`, '')}`
      );
    } catch (error) {
      console.error(error);
    }

    return;
  }
}
