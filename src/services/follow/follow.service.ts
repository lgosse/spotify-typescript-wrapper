import { AxiosResponse } from 'axios';
import * as querystring from 'querystring';

import { SpotifyCursorBasedPaging } from '../../classes/spotify-cursor-based-paging.class';
import { SpotifyCursorBasedPagingAPIResponse } from '../../interfaces/spotify-cursor-based-paging-api-response.interface';
import { SpotifyClient } from '../../spotify-client.class';
import { SpotifyEntityType } from '../../types/spotify-entity-type.type';
import { SpotifyArtist } from '../artists/classes/spotify-artist.class';
import { SpotifyArtistAPIResponse } from '../artists/interfaces/spotify-artist-api-response.interface';

/**
 * FollowService
 *
 * @export
 * @class FollowService
 */
export class FollowService {
  /**
   * Creates an instance of FollowService.
   *
   * @param {SpotifyClient} spotifyClient
   * @memberof FollowService
   */
  constructor(private readonly spotifyClient: SpotifyClient) {}

  /**
   * Check if Current User Follows Artists or Users
   *
   * @param {SpotifyEntityType} type
   * @param {string[]} ids
   * @returns {Promise<Boolean>}
   * @memberof FollowService
   */
  public async doCurrentUserFollowsArtistsOrUsers(
    type: SpotifyEntityType,
    ids: string[]
  ): Promise<Boolean> {
    let response: AxiosResponse<Boolean>;

    try {
      response = await this.spotifyClient.get<Boolean>(
        `me/following/contains${
          type || ids
            ? `?${querystring.stringify({
                type,
                ids: ids.reduce((acc, id) => acc + `,${id}`, '')
              })}`
            : ''
        }`
      );
    } catch (error) {
      console.error(error);
    }

    return response.data;
  }

  /**
   * Check if Users Follow a Playlist
   *
   * @param {string} ownerID
   * @param {string} playlistID
   * @param {string[]} ids
   * @returns {Promise<Boolean[]>}
   * @memberof FollowService
   */
  public async doUsersFollowPlaylist(
    ownerID: string,
    playlistID: string,
    ids: string[]
  ): Promise<Boolean[]> {
    let response: AxiosResponse<Boolean[]>;

    try {
      response = await this.spotifyClient.get<Boolean[]>(
        `/users/${ownerID}/playlists/${playlistID}/followers/contains?ids=${ids.reduce(
          (acc, id) => acc + `,${id}`,
          ''
        )}`
      );
    } catch (error) {
      console.error(error);
    }

    return response.data;
  }

  /**
   * Follow Artists or Users
   *
   * @param {string[]} ids
   * @returns {Promise<void>}
   * @memberof FollowService
   */
  public async followArtistsOrUsers(ids: string[]): Promise<void> {
    try {
      await this.spotifyClient.put<void>(
        `/me/following?ids=${ids.reduce((acc, id) => acc + `,${id}`, '')}`
      );
    } catch (error) {
      console.error(error);
    }

    return;
  }

  /**
   * Follow a Playlist
   *
   * @param {string} ownerID
   * @param {string} playlistID
   * @param {boolean} [isPublic]
   * @returns {Promise<void>}
   * @memberof FollowService
   */
  public async followPlaylist(
    ownerID: string,
    playlistID: string,
    isPublic?: boolean
  ): Promise<void> {
    try {
      await this.spotifyClient.put<void>(
        `/users/${ownerID}/playlists/${playlistID}/followers`,
        { public: isPublic }
      );
    } catch (error) {
      console.error(error);
    }

    return;
  }

  /**
   * Get User's Followed Artists
   *
   * @param {string} [type]
   * @param {number} [limit]
   * @param {string} [after]
   * @returns {Promise<SpotifyCursorBasedPaging<SpotifyArtist>>}
   * @memberof FollowService
   */
  public async getCurrentUserFollowedArtists(
    type?: string,
    limit?: number,
    after?: string
  ): Promise<SpotifyCursorBasedPaging<SpotifyArtist>> {
    let response: AxiosResponse<
      SpotifyCursorBasedPagingAPIResponse<SpotifyArtistAPIResponse>
    >;

    try {
      response = await this.spotifyClient.get<
        SpotifyCursorBasedPagingAPIResponse<SpotifyArtistAPIResponse>
      >(
        `/me/following${
          type || limit || after
            ? `?${querystring.stringify({
                type,
                limit,
                after
              })}`
            : ''
        }`
      );
    } catch (error) {
      console.error(error);
    }

    const artists = SpotifyCursorBasedPaging.fromJSON<
      SpotifyArtist,
      SpotifyArtistAPIResponse
    >(
      response.data,
      response.data.items.map(item => SpotifyArtist.fromJSON(item))
    );

    return artists;
  }

  /**
   * Unfollow Artists or Users
   *
   * @param {string[]} ids
   * @returns {Promise<void>}
   * @memberof FollowService
   */
  public async unfollowArtistsOrUsers(ids: string[]): Promise<void> {
    let response: AxiosResponse<void>;

    try {
      response = await this.spotifyClient.delete<void>(
        `/me/following?ids=${ids.reduce((acc, id) => acc + `,${id}`, '')}`
      );
    } catch (error) {
      console.error(error);
    }

    return;
  }

  /**
   * Unfollow a Playlist
   *
   * @param {string} ownerID
   * @param {string} playlistID
   * @returns {Promise<void>}
   * @memberof FollowService
   */
  public async unfollowPlaylist(
    ownerID: string,
    playlistID: string
  ): Promise<void> {
    let response: AxiosResponse<void>;

    try {
      response = await this.spotifyClient.delete<void>(
        `/users/${ownerID}/playlists/${playlistID}/followers`
      );
    } catch (error) {
      console.error(error);
    }

    return;
  }
}
