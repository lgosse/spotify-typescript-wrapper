import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';

export const spotifyApiUrl = 'https://api.spotify.com/v1';

/**
 * SpotifyClient
 * Wrapper around HttpService specified for Spotify
 *
 * @export
 * @class SpotifyClient
 */
export class SpotifyClient {
  /**
   * The access token
   *
   * @private
   * @type {string}
   * @memberof SpotifyClient
   */
  private accessToken: string;

  /**
   * Creates an instance of SpotifyClient.
   *
   * @memberof SpotifyClient
   */
  constructor() {}

  /**
   * Set the access token
   *
   * @param {string} accessToken
   * @memberof SpotifyClient
   */
  public setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }

  /**
   * Perform a GET request on specified Spotify public API endpoint
   *
   * @template T
   * @param {string} endpoint
   * @param {AxiosRequestConfig} [config]
   * @returns {AxiosPromise<T>}
   * @memberof SpotifyClient
   */
  public get<T>(
    endpoint: string,
    config?: AxiosRequestConfig
  ): AxiosPromise<T> {
    return axios.get(`${spotifyApiUrl}${endpoint}`, this.mergeConfig(config));
  }

  /**
   * Perform a DELETE request on specified Spotify public API endpoint
   *
   * @template T
   * @param {string} endpoint
   * @param {AxiosRequestConfig} [config]
   * @returns {AxiosPromise<T>}
   * @memberof SpotifyClient
   */
  public delete<T>(
    endpoint: string,
    config?: AxiosRequestConfig
  ): AxiosPromise<T> {
    return axios.delete(
      `${spotifyApiUrl}${endpoint}`,
      this.mergeConfig(config)
    );
  }

  /**
   * Perform a HEAD request on specified Spotify public API endpoint
   *
   * @template T
   * @param {string} endpoint
   * @param {AxiosRequestConfig} [config]
   * @returns {AxiosPromise<T>}
   * @memberof SpotifyClient
   */
  public head<T>(
    endpoint: string,
    config?: AxiosRequestConfig
  ): AxiosPromise<T> {
    return axios.head(`${spotifyApiUrl}${endpoint}`, this.mergeConfig(config));
  }

  /**
   * Perform a POST request on specified Spotify public API endpoint
   *
   * @template T
   * @param {string} endpoint
   * @param {*} [data]
   * @param {AxiosRequestConfig} [config]
   * @returns {AxiosPromise<T>}
   * @memberof SpotifyClient
   */
  public post<T>(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<T> {
    return axios.post(
      `${spotifyApiUrl}${endpoint}`,
      data,
      this.mergeConfig(config)
    );
  }

  /**
   * Perform a PUT request on specified Spotify public API endpoint
   *
   * @template T
   * @param {string} endpoint
   * @param {*} [data]
   * @param {AxiosRequestConfig} [config]
   * @returns {AxiosPromise<T>}
   * @memberof SpotifyClient
   */
  public put<T>(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<T> {
    return axios.put(
      `${spotifyApiUrl}${endpoint}`,
      data,
      this.mergeConfig(config)
    );
  }

  /**
   * Perform a PATCH request on specified Spotify public API endpoint
   *
   * @template T
   * @param {string} endpoint
   * @param {*} [data]
   * @param {AxiosRequestConfig} [config]
   * @returns {AxiosPromise<T>}
   * @memberof SpotifyClient
   */
  public patch<T>(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<T> {
    return axios.patch(
      `${spotifyApiUrl}${endpoint}`,
      data,
      this.mergeConfig(config)
    );
  }

  /**
   * Merge provided AxiosRequestConfig and Authorization header
   *
   * @private
   * @param {AxiosRequestConfig} [config]
   * @memberof SpotifyClient
   */
  private mergeConfig(config?: AxiosRequestConfig): AxiosRequestConfig {
    const authorizationHeader = `Bearer ${this.accessToken}`;

    return config
      ? {
          ...config,
          headers: config.headers
            ? {
                ...config,
                Authorization: authorizationHeader
              }
            : {
                Authorization: authorizationHeader
              }
        }
      : {
          headers: {
            Authorization: authorizationHeader
          }
        };
  }
}
