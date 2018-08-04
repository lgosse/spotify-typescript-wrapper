import { AxiosResponse } from 'axios';
import * as querystring from 'querystring';

import { SpotifyPaging } from '../../classes/spotify-paging.class';
import { SpotifySimplifiedAlbum } from '../../classes/spotify-simplified-album.class';
import { SpotifySimplifiedPlaylist } from '../../classes/spotify-simplified-playlist.class';
import { SpotifyPagingAPIResponse } from '../../interfaces/spotify-paging-api-response.interface';
import { SpotifySimplifiedAlbumAPIResponse } from '../../interfaces/spotify-simplified-album-api-response.interface';
import { SpotifySimplifiedPlaylistAPIResponse } from '../../interfaces/spotify-simplified-playlist.interface';
import { SpotifyClient } from '../../spotify-client.class';
import { SpotifyCategory } from './classes/spotify-category.class';
import { SpotifyRecommendationsParameters } from './classes/spotify-recommendations-parameters.class';
import { SpotifyRecommendations } from './classes/spotify-recommendations.class';
import { SpotifyCategoryAPIResponse } from './interfaces/spotify-category.interface';
import { SpotifyRecommendationsAPIResponse } from './interfaces/spotify-recommendations-api-response.interface';

/**
 * BrowseService
 *
 * @export
 * @class BrowseService
 */
export class BrowseService {
  /**
   * Creates an instance of BrowseService.
   *
   * @param {SpotifyClient} spotifyClient
   * @memberof BrowseService
   */
  constructor(private readonly spotifyClient: SpotifyClient) {}

  /**
   * Get a Category
   *
   * @param {string} id
   * @param {string} [country]
   * @param {string} [locale]
   * @returns {Promise<SpotifyCategory>}
   * @memberof BrowseService
   */
  public async getCategory(
    id: string,
    country?: string,
    locale?: string
  ): Promise<SpotifyCategory> {
    let response: AxiosResponse<SpotifyCategoryAPIResponse>;

    try {
      response = await this.spotifyClient.get<SpotifyCategoryAPIResponse>(
        `browse/categories/${id}${
          country || locale
            ? querystring.stringify({
                country,
                locale
              })
            : ''
        }`
      );
    } catch (error) {
      console.error(error);
    }

    const category = SpotifyCategory.fromJSON(response.data);

    return category;
  }

  /**
   * Get a Category's Playlists
   *
   * @param {string} id
   * @param {string} [country]
   * @param {number} [limit]
   * @param {number} [offset]
   * @returns {Promise<SpotifyPaging<SpotifySimplifiedPlaylist>>}
   * @memberof BrowseService
   */
  public async getCategoryPlaylist(
    id: string,
    country?: string,
    limit?: number,
    offset?: number
  ): Promise<SpotifyPaging<SpotifySimplifiedPlaylist>> {
    let response: AxiosResponse<
      SpotifyPagingAPIResponse<SpotifySimplifiedPlaylistAPIResponse>
    >;

    try {
      response = await this.spotifyClient.get<
        SpotifyPagingAPIResponse<SpotifySimplifiedPlaylistAPIResponse>
      >(
        `browse/categories/${id}/playlists${
          country || limit || offset
            ? querystring.stringify({
                country,
                limit,
                offset
              })
            : ''
        }`
      );
    } catch (error) {
      console.error(error);
    }

    const playlists = SpotifyPaging.fromJSON<
      SpotifySimplifiedPlaylist,
      SpotifySimplifiedPlaylistAPIResponse
    >(
      response.data,
      response.data.items.map(item => SpotifySimplifiedPlaylist.fromJSON(item))
    );

    return playlists;
  }

  /**
   * Get a List of Categories
   *
   * @param {string} [country]
   * @param {string} [locale]
   * @param {number} [limit]
   * @param {number} [offset]
   * @returns {Promise<SpotifyPaging<SpotifyCategory>>}
   * @memberof BrowseService
   */
  public async getCategories(
    country?: string,
    locale?: string,
    limit?: number,
    offset?: number
  ): Promise<SpotifyPaging<SpotifyCategory>> {
    let response: AxiosResponse<
      SpotifyPagingAPIResponse<SpotifyCategoryAPIResponse>
    >;

    try {
      response = await this.spotifyClient.get<
        SpotifyPagingAPIResponse<SpotifyCategoryAPIResponse>
      >(
        `/browse/categories${
          country || locale || limit || offset
            ? `?${querystring.stringify({
                country,
                locale,
                limit,
                offset
              })}`
            : ''
        }`
      );
    } catch (error) {
      console.error(error);
    }

    const categories = SpotifyPaging.fromJSON<
      SpotifyCategory,
      SpotifyCategoryAPIResponse
    >(
      response.data,
      response.data.items.map(item => SpotifyCategory.fromJSON(item))
    );

    return categories;
  }

  /**
   * Get a List of Featured Playlists
   *
   * @param {string} [locale]
   * @param {string} [country]
   * @param {number} [timestamp]
   * @param {number} [limit]
   * @param {number} [offset]
   * @returns {Promise<SpotifyPaging<SpotifySimplifiedPlaylist>>}
   * @memberof BrowseService
   */
  public async getFeaturedPlaylists(
    locale?: string,
    country?: string,
    timestamp?: number,
    limit?: number,
    offset?: number
  ): Promise<SpotifyPaging<SpotifySimplifiedPlaylist>> {
    let response: AxiosResponse<
      SpotifyPagingAPIResponse<SpotifySimplifiedPlaylistAPIResponse>
    >;

    try {
      response = await this.spotifyClient.get<
        SpotifyPagingAPIResponse<SpotifySimplifiedPlaylistAPIResponse>
      >(
        `browse/featured-playlists${
          locale || country || timestamp || limit || offset
            ? `?${querystring.stringify({
                locale,
                country,
                timestamp,
                limit,
                offset
              })}`
            : ''
        }`
      );
    } catch (error) {
      console.error(error);
    }

    const playlists = SpotifyPaging.fromJSON<
      SpotifySimplifiedPlaylist,
      SpotifySimplifiedPlaylistAPIResponse
    >(
      response.data,
      response.data.items.map(item => SpotifySimplifiedPlaylist.fromJSON(item))
    );

    return playlists;
  }

  /**
   * Get a List of New Releases
   *
   * @param {string} [country]
   * @param {string} [limit]
   * @param {number} [offset]
   * @returns {Promise<SpotifyPaging<SpotifySimplifiedAlbum>>}
   * @memberof BrowseService
   */
  public async getNewReleases(
    country?: string,
    limit?: string,
    offset?: number
  ): Promise<SpotifyPaging<SpotifySimplifiedAlbum>> {
    let response: AxiosResponse<
      SpotifyPagingAPIResponse<SpotifySimplifiedAlbumAPIResponse>
    >;

    try {
      response = await this.spotifyClient.get<
        SpotifyPagingAPIResponse<SpotifySimplifiedAlbumAPIResponse>
      >(
        `/browse/releases${
          country || limit || offset
            ? `?${querystring.stringify({
                country,
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
      SpotifySimplifiedAlbum,
      SpotifySimplifiedAlbumAPIResponse
    >(
      response.data,
      response.data.items.map(item => SpotifySimplifiedAlbum.fromJSON(item))
    );

    return albums;
  }

  /**
   * Get Recommendations Based on Seeds
   *
   * @param {SpotifyRecommendationsParameters} params
   * @returns {Promise<SpotifyRecommendations>}
   * @memberof BrowseService
   */
  public async getRecommendations(
    params: SpotifyRecommendationsParameters
  ): Promise<SpotifyRecommendations> {
    let response: AxiosResponse<SpotifyRecommendationsAPIResponse>;

    try {
      response = await this.spotifyClient.get<
        SpotifyRecommendationsAPIResponse
      >(
        `/recommendations${
          Object.keys(params).length
            ? `?${querystring.stringify(params.toJSON())}`
            : ''
        }`
      );
    } catch (error) {
      console.log(error);
    }

    const recommendations = SpotifyRecommendations.fromJSON(response.data);

    return recommendations;
  }
}
