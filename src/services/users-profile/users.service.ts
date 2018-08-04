import { AxiosResponse } from 'axios';

import { SpotifyClient } from '../../spotify-client.class';
import { SpotifyUser } from './classes/spotify-user.class';
import { SpotifyUserAPIResponse } from './interfaces/spotify-user-api-response.interface';

/**
 * UsersService
 *
 * @export
 * @class UsersService
 */
export class UsersService {
  /**
   * Creates an instance of UsersService.
   *
   * @param {SpotifyClient} spotifyClient
   * @memberof UsersService
   */
  constructor(private readonly spotifyClient: SpotifyClient) {}

  /**
   * Get Current User's Profile
   *
   * @returns {Promise<SpotifyUser>}
   * @memberof UsersService
   */
  public async getCurrentUser(): Promise<SpotifyUser> {
    let response: AxiosResponse<SpotifyUserAPIResponse>;

    try {
      response = await this.spotifyClient.get<SpotifyUserAPIResponse>('/me');
    } catch (error) {
      console.error(error);
    }

    const user = SpotifyUser.fromJSON(response.data);

    return user;
  }

  /**
   * Get a User's Profile
   *
   * @param {string} id
   * @returns {Promise<SpotifyUser>}
   * @memberof UsersService
   */
  public async getUser(id: string): Promise<SpotifyUser> {
    let response: AxiosResponse<SpotifyUserAPIResponse>;

    try {
      response = await this.spotifyClient.get<SpotifyUserAPIResponse>(
        `/users/${id}`
      );
    } catch (error) {
      console.error(error);
    }

    const user = SpotifyUser.fromJSON(response.data);

    return user;
  }
}
